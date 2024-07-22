import { config } from "dotenv";

class Config {
    port;
    mysql_user;
    mysql_host;
    mysql_pass;
    mysql_db;
    mysql_port;
    constructor() { 
        config();
    }

    getPort(){
        this.port = process.env.PORT || 3002;
        return this.port;
    }

    getMysql_user(){
        this.mysql_user = process.env.MySQL_USER || "";
        return this.mysql_user;
    }

    getMysql_port(){
        this.mysql_port = process.env.MySQL_PORT || "";
        return this.mysql_port;
    }

    getMysql_pass(){
        this.mysql_pass = process.env.MySQL_PASS || "";
        return this.mysql_pass
    }

    getMysql_db(){
        this.mysql_db = process.env.MySQL_DB || "";
        return this.mysql_db;
    }

    getMysql_host(){
        this.getMysql_host = process.env.MySQL_HOST || "";
        return this.mysql_host;
    }
    
}

export const conf = new Config();