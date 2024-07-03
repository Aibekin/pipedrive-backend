import express from 'express';
import path from 'path';
import cors from 'cors';
import { add } from './controller/Pipedrive.js';
const app = express();

app.use(express.json());
app.use(cors());

app.post('/add', add);

app.listen(process.env.PORT || 4444, (err) => {
    if (err) {
        return console.log('err');
    }

    console.log("Server Ok")
});