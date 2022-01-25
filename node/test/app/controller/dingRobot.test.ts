import assert from 'assert';
import { app } from 'egg-mock/bootstrap';

describe('test/app/controller/dingRobot.test.ts', () => {
  it('should GET /api/dingRobot/dd', async () => {
    const result = await app.httpRequest().get('/api/dingRobot/dd').expect(200);
    assert(result.text === 'hi, egg');
  });
});
