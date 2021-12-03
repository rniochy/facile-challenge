import express  from 'express';
import crypto from 'crypto-js'
import client from '../bd/pg_connection.js';
import dotenv from 'dotenv';

     dotenv.config();
     const router_user = express.Router();

     // Rota para criar usuário 
     router_user.post('/register', async(req, res)=>{
     const {name} = req.body;
     const nameEncripted = crypto.AES.encrypt(name, process.env.SECRET_KEY).toString();

     if(!name) return res.status(400).send({
               "code": "E_VALIDATION_FAILURE",
               "message": "O campo \'name\' é obrigatório"    
          })

     try {
          const query  = `insert into user_facile (name) values('${nameEncripted}')` ;
          await client.query(query)
     
          return res.status(200).send({
               "id": 1,
               "encripted_name": "shazam"
               })

     } catch(err){
          return;
     }
     });

     // Pegando o Usuario 
     router_user.get('/encripts/:id', async(req, res)=>{
               const {id} = req.params;

               try {
                    const query = `select name from user_facile where id = ${id} `;
                    const {rows} = await client.query(query);

                    const bytes  = crypto.AES.decrypt(rows[0].name, process.env.SECRET_KEY);

                    const decriptedName = bytes.toString(crypto.enc.Utf8);
                    
                    return res.send({
                         "name": decriptedName
                    });

               } catch(err){
                    return;
               }
     })

export default router_user;
