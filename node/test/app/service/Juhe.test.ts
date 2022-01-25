// import assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';

describe('test/app/service/Juhe.test.js', () => {
  let ctx: Context;

  before(async () => {
    ctx = app.mockContext();
  });

  it('getSimpleWeatherByCity', async () => {
    const ctx = app.mockContext();
    const result = await ctx.service.juhe.getSimpleWeatherByCity('杭州');
    console.log(result);
    // console.log(result);
  });
});
