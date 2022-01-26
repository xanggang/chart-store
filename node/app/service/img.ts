import { Service } from 'egg';
import axios from 'axios'
import qiniu from 'qiniu'
import path from 'path'

let pageNum = 1001
const sqlPageSize = 10

const step = (num: number) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, num)
  })
}


const cline = new qiniu.rs.BucketManager()

function getName(url) {
  const basename = path.basename(url)

  const name = basename.split('.')[0]

  return name
}

function uploadImg(url): any {
  const name = getName(url)
  return new Promise((resolve, reject) => {
    try {
      cline.fetch(
        url,
        'chart-hub',
        name,
        (e, respBody, respInfo) => {
          if (!e) {
            resolve({ respBody, respInfo })
            return
          }
          if (respInfo.status !== 200) {
            reject(respInfo)
            return;
          }
          reject(e)
        }
      )
    } catch (e) {
      reject(e)
    }
  })
}

export default class ListService extends Service {

  async searchDetail() {
    const res = await this.ctx.model.Detail.findAll({
      offset: pageNum * sqlPageSize,
      limit: sqlPageSize
    })
    return res
  }

  async uploadImgAndSave(item) {
    const url = item.thumbnail_url
    try {
      const { respBody } = await uploadImg(url)
      const key = respBody.key
      console.log(key);
      await item.update({ qiniu_img_url: key })
    } catch (e) {
      this.ctx.logger.error(`出错了， 错误条码${item.id}`)
      this.ctx.logger.error(e)
    }
  }

  async batchGetImg(list) {
    const queryList = list.map(item => {
      return this.uploadImgAndSave(item)
    })

    await Promise.all(queryList)
  }

  async fetchImg() {
    pageNum++
    this.ctx.logger.info(`开始爬取图片第${pageNum}页， 每页${sqlPageSize}`)
    const list = await this.searchDetail()
    if (list.length === 0) {
      this.ctx.logger.info('爬取完成')
      return '爬取完成'
    }
    if (pageNum > 2000) {
      this.ctx.logger.error('爬取到限制的条数， 结束任务')
      return '爬取到限制的条数， 结束任务'
    }
    this.ctx.logger.info(`查询到${list.length}条数据， 开始爬取`)
    await this.batchGetImg(list)
    await step(1000)
    await this.fetchImg()
  }

  async testSave() {
    const item = await this.ctx.model.Detail.findByPk(122)
    item.thumbnail_url = 'text'
    await item.update({ thumbnail_url: 'YYYY-MM-DD HH:mm:ss' })
    return item
  }
}

