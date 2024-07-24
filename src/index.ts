import express from 'express';
import dotenv from 'dotenv';
import productRouts from './routes/productRoutes'
import { connectDatabase } from './config/database';
import { connectRabbitMQ } from './config/rabbitMq';

dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRouts);

async function startServer(): Promise<void>{
    await connectDatabase();
    await connectRabbitMQ();

    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
}

startServer().catch(console.error)

