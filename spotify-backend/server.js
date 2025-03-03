import express from 'express';
import { config } from 'dotenv';
config();
import cors from 'cors'
import songRouter from './routes/songRoute.js'
import albumRouter from './routes/albumRoute.js'
import { connectDB } from './config/mongDB.js';
import { connectCloud } from './config/cloudinary.js';


const app = express();
const PORT = process.env.PORT || 4000
connectCloud();

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send("Api Working")
})

app.use('/api/song', songRouter)
app.use('/api/album', albumRouter)



app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
    connectDB();
})