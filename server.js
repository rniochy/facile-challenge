import express from 'express';
import cors from 'cors';
import router_user from  './controller/user_controller.js'

const port = process.env.PORT || 3333;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/user', router_user);

app.listen(port, ()=>{
     console.log("Servidor rodando...")
});