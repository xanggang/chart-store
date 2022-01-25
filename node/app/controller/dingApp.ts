import { Controller } from 'egg';
import { Prefix, Get } from '../decorator/router'


@Prefix('/dingApp')
export default class DingClientController extends Controller {

  @Get('/getUserAccessToken')
  async getAccessToken() {
    const code = this.ctx.query.code
    const token = await this.ctx.service.dingApp.getUserToken(code)
    this.ctx.success(token)
  }

  /**
   * 获取钉钉个人token
   */
  @Get('/getUserToken')
  async getUserToken() {
    const code = this.ctx.query.code
    if (!code) return this.ctx.error('code不存在')
    try {
      const res = await this.ctx.service.dingApp.getUserToken(code)
      this.ctx.success(res)
    } catch (err) {
      this.ctx.error('获取用户token失败', err)
    }
  }

  /**
   * 获取扫码用户信息
   */
  @Get('/getUserInfo')
  async getUserInfo() {
    const code = this.ctx.query.code
    if (!code) return this.ctx.error('code不存在')
    try {
      const res = await this.ctx.service.dingApp.getUserToken(code)
      const userInfo = await this.ctx.service.dingApp.getUserInfo(res.body.accessToken)
      this.ctx.success(userInfo)
    } catch (err) {
      this.ctx.error('获取用户失败', err)
    }
  }
}
