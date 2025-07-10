import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import ProductRoute from './routes/ProductRoute.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static('public'));
app.use('/api', ProductRoute);

app.listen(process.env.PORT, () => console.log('Server up and running'));
