import { Controller } from 'egg';
import { Prefix, Get, Post } from '../decorator/router'


@Prefix('/dingRobot')
export default class DingRobotClientController extends Controller {

  @Get('/send')
  async testSendMessage() {
    const messageContent = await this.ctx.service.juhe.getSimpleWeather()
    const res = await this.ctx.service.dingRobot.sendTextMsg([ '0lMdWRS11D3M3smlqjPm3AiEiE' ], messageContent)
    this.ctx.success(res)
  }

  @Get('/getSimpleWeather')
  async fetSimpleWeather() {
    const res = await this.ctx.service.juhe.getSimpleWeatherByCity()
    const lifeData = await this.ctx.service.juhe.getSimpleWeatherLifeByCity()

    const life = lifeData.life || {}

    const msg = `杭州今日天气：${res.realtime.info}
     温度：${res.realtime.temperature}℃，
     湿度： ${res.realtime.humidity}%，
     ${res.realtime.direct}${res.realtime.power},
     ${life.kongtiao?.v ? `空调指数：${life.kongtiao.v} ${life.kongtiao.des}` : ''}
     ${life.guomin?.v ? `过敏指数：${life.guomin.v} ${life.guomin.des}` : ''}
     ${life.shushidu?.v ? `舒适度：${life.shushidu.v} ${life.shushidu.des}` : ''}
     ${life.chuanyi?.v ? `穿衣指数：${life.chuanyi.v} ${life.chuanyi.des}` : ''}
     ${life.ganmao?.v ? `感冒风险：${life.ganmao.v} ${life.ganmao.des}` : ''}
     ${life.ziwaixian?.v ? `紫外线指数：${life.ziwaixian.v} ${life.ziwaixian.des}` : ''}
     ${life.daisan?.v ? `带伞指数：${life.daisan.v} ${life.daisan.des}` : ''}
     `

    this.ctx.success(msg)
  }

  @Get('/getDouyinHot')
  async getDouyinHot() {
    const rankList = await this.ctx.service.juhe.getDouyinHotVideos()
    const title = '今日抖音热点'
    let message = '#### 今日douyin热点'
    rankList.forEach(item => {
      message += `\n - [${item.title}](${item.share_url})`
    })

    const res = await this.ctx.service.dingRobot.sendMarkDownMsg(title, message)
    this.ctx.success(res)
  }

  @Post('/ding')
  async getDingServiceMessage() {
    const { request: { body } } = this.ctx
    const { senderStaffId, text: { content } } = body
    console.log(body);

    if ([ '天气' ].includes(content)) {
      const messageContent = await this.ctx.service.juhe.getSimpleWeather()
      await this.ctx.service.dingRobot.sendTextMsg([ senderStaffId ], messageContent)
    }

    if ([ '抖音', '抖音热点' ].includes(content)) {
      const messageContent = await this.ctx.service.juhe.getDouyinHotVideos()
      await this.ctx.service.dingRobot.sendTextMsg([ senderStaffId ], messageContent)
    }

    this.ctx.success('ok')
  }
}
