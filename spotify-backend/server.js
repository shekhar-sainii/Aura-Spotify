import express from 'express';
import { config } from 'dotenv';
config();
import cors from 'cors'
import songRouter from './src/routes/songRoute.js'
import albumRouter from './src/routes/albumRoute.js'
import { connectDB } from './src/config/mongDB.js';
import { connectCloud } from './src/config/cloudinary.js';


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