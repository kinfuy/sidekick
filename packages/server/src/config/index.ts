import * as dotenv from 'dotenv';

class ConfigEnv {
  secret: string;
  host: string;
  port: string;

  //mysql
  username: string;
  password: string;
  database: string;

  constructor(envConfig: any) {
    this.secret = envConfig.APP_SECRET;
    this.host = envConfig.DB_HOST;
    this.port = envConfig.DB_PORT;

    this.username = envConfig.DB_USER;
    this.password = envConfig.DB_PASSWORD;
    this.database = envConfig.DB_DATABASE;
  }
}

const envConfig = new ConfigEnv(dotenv.config().parsed);

export { envConfig };
