import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { db } from './models/index.js';
import dotenv from 'dotenv';
import { gradeRouter } from './routes/gradeRouter.js';

dotenv.config();

 (async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado Mongoose!!")
  } catch (error) {   
    process.exit();
  }
})(); 

const app = express();

//define o dominio de origem para consumo do servico
  app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'https://app-grades-moreno.herokuapp.com',
  })
);  

app.use(gradeRouter);

app.get('/', (req, res) => {
  res.send('API em execucao');
});

app.listen(process.env.PORT, () => {
  console.log('Server Listen ...', process.env.PORT)
});
