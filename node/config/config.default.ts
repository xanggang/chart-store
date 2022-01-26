import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import self from '../self.json'

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1637140682338_418';

  // add your egg config in here
  config.middleware = [];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  config.security = {
    csrf: {
      ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
      enable: false,
    },
    xframe: {
      enable: true,
      value: 'ALLOW-FROM',
    },
  }

  config.sequelize = {
    dialect: 'mysql',
    host: self.mysql.address,
    password: self.mysql.password,
    port: self.mysql.port,
    database: 'charts',
    timezone: '+08:00',
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
  }

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
