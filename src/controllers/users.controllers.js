import { User } from "../DTO/userDTO.js";
import UserModels from "../models/UserModel.js";
class UserControllers{

    async createUser( req, res ){

        const { name, lastname, email } = req.body;
        if( !name || !lastname || !email ){
            return res.status( 400 ).json( { error: "Faltan datos" } );
        }
        const user = new User();
        user.setName( name );
        user.setLastname( lastname );
        user.setEmail( email );
        try {
            const result = await UserModels.create( user );
            return res.status( 201 ).json( result );
        } catch (error) {
            // console.error("Hubo un error creando el usuario: ", error);
            return res.status( 500 ).json( error );
        }
    }

    async getUserById( req, res ){
        const { idUser } = req.params;

        try {
            const result = await UserModels.read( idUser );
            return res.status( 200 ).json( result );
        } catch (error) {
            // console.error("Hubo un error obteniendo el usuario: ", error);
            return res.status( 500 ).json( error );
        }
    }

    async getAllUsers( req, res ){
        try {
            const result = await UserModels.readAll();
            return res.status( 200 ).json( result );
        } catch (error) {
            // console.error("Hubo un error obteniendo los usuarios: ", error);
            return res.status( 500 ).json( error );
        }
    }

    async updateUser( req, res ){
        const { idUser } = req.params;

        const { name, lastname, email } = req.body;
        if( !name || !lastname || !email ){ 
            return res.status( 400 ).json( { error: "Faltan datos" } );
        }

        const user = new User();
        user.setID( idUser );
        user.setName( name );
        user.setLastname( lastname );
        user.setEmail( email );
        try {
            const result = await UserModels.update( user );
            return res.status( 200 ).json( result );
        } catch (error) {
            // console.error("Hubo un error actualizando el usuario: ", error);
           return  res.status( 500 ).json( error );
        }

    }

    async deleteUser( req, res ){   
        const { idUser } = req.params;
        try {
            const result = await UserModels.delete( idUser );
            return res.status( 200 ).json( result );
        } catch (error) {
            // console.error("Hubo un error eliminando el usuario: ", error);
            return res.status( 500 ).json( error );
        }
    }
}
export default new UserControllers();