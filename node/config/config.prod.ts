import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'

export default (appInfo: EggAppInfo) => {
  const config: PowerPartial<EggAppConfig> = {}

  console.log('PROD_MY_SQL_HOST', process.env.PROD_MY_SQL_HOST)
  console.log('PROD_MY_SQL_PASSWORD', process.env.PROD_MY_SQL_PASSWORD)
  console.log('PROD_MY_SQL_PORT', process.env.PROD_MY_SQL_PORT)

  config.keys = appInfo.name + '_1596444623473_2349'

  config.sequelize = {
    dialect: 'mysql',
    host: process.env.PROD_MY_SQL_HOST,
    password: process.env.PROD_MY_SQL_PASSWORD,
    port: process.env.PROD_MY_SQL_PORT ? Number(process.env.PROD_MY_SQL_PORT) : undefined,
    database: 'dingding',
    timezone: '+08:00',
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
  }

  config.cors = {
    origin: '',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  }

  config.logger = {
    level: 'DEBUG',
    allowDebugAtProd: true,
    disableConsoleAfterReady: false,
  }

  config.dingConfig = {
    webApp: {
      AppKey: 'ding14mflohavd7t0cyp',
      AppSecret: 'TZR7GQ5G0LtFesD5iwxUq3PfRP1mBW3mbdEkonw2128RCo3nmAs0nJVGbVzedZmg'
    },
    robot: {
      AppKey: 'dingiohx6edbznuggyic',
      AppSecret: 'NQ-hKdlPT_eqf53CLRSo05a2nMJ4ZW8j9zKP5ZlVjd1ALx00K-KpdcpZPnCcKUl-'
    }
  }

  return config
}
