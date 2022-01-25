import { Controller } from 'egg';
import { Prefix, Get } from '../decorator/router'

@Prefix('/log')
export default class HomeController extends Controller {
  @Get('/get')
  public async get() {
    this.ctx.success('500', 'sdsd');
  }
}
