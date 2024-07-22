import mysql2 from "mysql2/promise";
import { conf } from "../config.js";
class DatabaseConnection{
    config;
    constructor(){

        this.config = {
            host: conf.getMysql_host(),
            user: conf.getMysql_user(),
            password: conf.getMysql_pass(),
            port: conf.getMysql_port(),
            database: conf.getMysql_db()
        }
        this.pool = mysql2.createPool(this.config);
    }

    async getConnection() {
        try {
            return await this.pool;
        } catch (error) {
            console.error("Hubo un error conectando a la base de datos: ", error);
            throw error;  // Es mejor lanzar el error para manejarlo en el lugar adecuado
        }
    }

}
export const db = new DatabaseConnection();