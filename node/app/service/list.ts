import { Service } from 'egg';
import axios from 'axios'
import qiniu from 'qiniu'
import path from 'path'

const pageSize = 32
let pageNumber = 576

let pageNum = 0
const sqlPageSize = 5

const step = (num: number) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, num)
  })
}

qiniu.conf.ACCESS_KEY = '2alru5_IaH7milnTTB2f2Y-fhKMRWf1S9CYFLaMm'
qiniu.conf.SECRET_KEY = 'yN8Nf2JD1L6O2gN9EqBJ03Gz6SsLiCHRlG_amyza'

const cline = new qiniu.rs.BucketManager()

function getName(url) {
  const basename = path.basename(url)

  const name = basename.split('.')[0]

  return name
}

function uploadImg(url) {
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

  // 入口
  async startGet() {
    // await this.getMakeAPieList()

    // return await this.fetchImg()
    // return await this.getDetail('xGyKj1qMBW')
  }

  // 存储列表
  async createListItem(dataList: any) {
    const pr = dataList.map(item => {
      return {
        cid: item.cid,
        uid: item.uid,
        title: item.title,
        description: item.description,
        thumbnail_url: item.thumbnailURL,
      }
    })
    return this.ctx.model.List.bulkCreate(pr)
  }

  // 爬取列表
  async getMakeAPieList() {
    pageNumber++
    this.ctx.logger.info(`开始查询， 当前第${pageNumber}页`)
    const url = `https://www.makeapie.com/chart/list?builtinTags[]=category-work&sortBy=rank&pageSize=${pageSize}&pageNumber=${pageNumber}&author=all`


    try {
      const res = await axios.get(url)

      const data = res.data.data

      const list = data.charts || []

      if (!list.length) {
        this.logger.error('list 长度为空')
        return
      }

      if (pageNumber > 1000) {
        this.logger.error('pageNumber 达到预期， 结束')
        return
      }

      try {
        this.logger.info(`查询到${list.length}条， 开始插入`)
        await this.createListItem(list)
        this.logger.info('插入完成， 等待3秒')
        await step(3000)
        await this.getMakeAPieList()
      } catch (e) {
        this.logger.error(`发生错误 当前进度${pageNumber}`,)
        this.logger.error(e)
        return
      }
    } catch (err) {
      this.logger.error('请求错误')
      this.logger.error(err)
    }
  }

  //
  async getMakeAPieDetail() {
    pageNum++
    this.ctx.logger.info(`开始查询第${pageNum}页， 每页${sqlPageSize}`)
    const list = await this.searchData()
    if (list.length === 0) {
      this.ctx.logger.info('爬取完成')
      return '爬取完成'
    }
    if (pageNum > 4000) {
      this.ctx.logger.error('爬取到限制的条数， 结束任务')
      return '爬取到限制的条数， 结束任务'
    }
    this.ctx.logger.info(`查询到${list.length}条数据， 开始爬取`)
    await this.batchGetDetail(list)
    this.ctx.logger.info('爬取完成， 等待1s')
    await step(1000)
    await this.getMakeAPieDetail()
  }

  // 取出数据和cid
  async searchData() {
    const res = await this.ctx.model.List.findAll({
      offset: pageNum * sqlPageSize,
      limit: sqlPageSize
    })

    return res
  }

  async batchGetDetail(list: any) {
    const queryList = list.map(({ cid }) => {
      return this.getDetail(cid)
    })
    await Promise.all(queryList)
  }

  // 查询单个详情
  async getDetail(cid: string) {
    const url = `https://www.makeapie.com/chart/get/${cid}`
    try {
      const res = await axios.get(url)
      this.ctx.logger.error(res.data)
      const data = res.data.data
      await this.saveDetail(data)
      return data
    } catch (err) {
      this.ctx.logger.error(`发生错误， 错误cid ${cid}`)
      this.ctx.logger.error(err)
    }
  }

  async saveDetail(data) {
    const obj = {
      cid: data.cid,
      title: data.title,
      description: data.description,
      thumbnail_url: data.thumbnailURL,
      echarts_version: data.echartsVersion,
      code: data.code,
      html: data.html,
      external_scripts: data.externalScripts,
      star_count: data.starCount,
      comment_count: data.commentCount,
      custom_tags: (data.customTags || []).join(','),
      builtin_tags: (data.builtinTags || []).join(','),
      theme: data.theme,
      layout: data.layout,
      view_count: data.viewCount,
      version: data.version,
      parent_version: data.parentVersion,
      published_version: data.publishedVersion,
      last_update_time: data.lastUpdateTime
    }

    await this.ctx.model.Detail.create(obj)

    return 'ok'
  }
}

