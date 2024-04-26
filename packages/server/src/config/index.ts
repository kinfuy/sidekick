import * as dotenv from 'dotenv';

class ConfigEnv {
  secret: string;
  host: string;
  port: string;


  email:{
    host: string,
    port: number,
    secure: boolean,
    auth: {
      user: string,
      pass: string
    }
  }

  //mysql
  username: string;
  password: string;
  database: string;

  constructor(envConfig: any) {
    this.secret = envConfig.APP_SECRET;
    this.host = envConfig.DB_HOST;
    this.port = envConfig.DB_PORT;

    this.email = {
      host:envConfig.EMAIL_HOST,
      port:envConfig.EMAIL_PORT,
      secure:true,
      auth:{
        user:envConfig.EMAIL_USER,
        pass :envConfig.EMAIL_PASS
      }
    }
    

    this.username = envConfig.DB_USER;
    this.password = envConfig.DB_PASSWORD;
    this.database = envConfig.DB_DATABASE;
  }
}

const envConfig = new ConfigEnv(dotenv.config().parsed);

export { envConfig };
