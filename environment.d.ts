declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test';
        DB_NAME: string;
        DB_USER: string;
        DB_HOST: string;
        DB_PORT: number;
        DB_DRIVER: 'mysql' | 'postgres';
        DB_PASSWORD: string;
      }
    }
  }
  
  export {};