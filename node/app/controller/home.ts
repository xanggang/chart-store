import { Controller } from 'egg';
import { Prefix, Get } from '../decorator/router'

@Prefix('/log')
export default class HomeController extends Controller {

  @Get('/get')
  public async get() {
    const res = await this.ctx.service.img.fetchImg()
    this.ctx.success(res);
  }
}
