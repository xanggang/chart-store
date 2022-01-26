// import assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';

describe('test/app/service/list.test.js', () => {

  // before(async () => {
  //   console.log(1111);
  //   ctx = app.mockContext();
  // });

  // it('getSimpleWeatherByCity', async () => {
  //   const ctx = app.mockContext();
  //   const url = 'https://www.makeapie.com/ecg-storage/ec_gallery_thumbnail/xA3mS4EyUU.png?v=1547435545071'
  //   const result = await ctx.service.list.fetchImg(url);
  //   console.log(result);
  // });

  it('getSimpleWeatherByCity', async () => {
    const ctx = app.mockContext();
    const result = await ctx.service.img.fetchImg();
    console.log(result);
  });
});
