import { Service } from 'egg';

import type { IUser } from '../../types/user'

export default class userService extends Service {

  async createUser(userInfo: IUser) {
    const res = await this.ctx.model.User.findAll({
      where: {
        open_id: userInfo.openId,
      },
    })
    if (res.length) return res
    return this.ctx.model.User.create({
      nick: userInfo.nick,
      avatar_url: userInfo.avatarUrl,
      mobile: userInfo.mobile,
      open_id: userInfo.openId,
      union_id: userInfo.unionId,
      state_code: userInfo.stateCode,
      staff_id: userInfo.staffId,
    })
  }
}
