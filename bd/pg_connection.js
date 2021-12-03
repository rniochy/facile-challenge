import pg  from 'pg'
import dotenv from 'dotenv'

dotenv.config();

const client = new pg.Client(process.env.BD_URI);

client.connect(err => {
    if (err) throw err;
    else { console.log("Rodou ...") }
});

export default client;