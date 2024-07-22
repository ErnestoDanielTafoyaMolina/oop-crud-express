import { db } from "../db/connection.js";
import { User } from "../DTO/userDTO.js";

class UserModel {
    pool;
    constructor() {
        this.pool = db.pool;
    }

    async create(user) {
        const name = user.getName();
        const lastname = user.getLastname();
        const email = user.getEmail();
        const query = "INSERT INTO users (name, lastname, email) VALUES (?, ?, ?)";

        try {
            const [result] = await this.pool.query(query, [name, lastname, email]);
            return result;
        } catch (error) {
            console.error("Hubo un error creando el usuario: ", error);
            throw new Error("Error al crear el usuario");
        }
    }

    async read(id) {
        const user = new User();
        const query = "SELECT * FROM users WHERE idUser = ?";

        try {
            const [rows] = await this.pool.query(query, [id]);
            if (rows.length > 0) {
                const row = rows[0];
                user.setID(row.idUser);
                user.setName(row.name);
                user.setLastname(row.lastname);
                user.setEmail(row.email);
            }
            return user;
        } catch (error) {
            console.error("Hubo un error obteniendo al usuario: ", error);
            throw new Error("Error al obtener el usuario");
        }
    }

    async readAll() {
        const users = [];
        const query = "SELECT * FROM users";

        try {
            const [rows] = await this.pool.query(query);
            rows.forEach(row => {
                const user = new User();
                user.setID(row.idUser);
                user.setName(row.name);
                user.setLastname(row.lastname);
                user.setEmail(row.email);
                users.push(user);
            });
            return users;
        } catch (error) {
            console.error("Hubo un error obteniendo los usuarios: ", error);
            throw new Error("Error al obtener los usuarios");
        }
    }

    async update(user) {
        const query = "UPDATE users SET name = ?, lastname = ?, email = ? WHERE idUser = ?";

        try {
            const [result] = await this.pool.query(query, [
                user.getName(), user.getLastname(), user.getEmail(), user.getID()
            ]);
            return result;
        } catch (error) {
            console.error("Hubo un error actualizando el usuario: ", error);
            throw new Error("Error al actualizar el usuario");
        }
    }

    async delete(id) {
        const query = "DELETE FROM users WHERE idUser = ?";

        try {
            const [result] = await this.pool.query(query, [id]);
            return result;
        } catch (error) {
            console.error("Hubo un error eliminando el usuario: ", error);
            throw new Error("Error al eliminar el usuario");
        }
    }
}

export default new UserModel();
