import amqp, {Channel, Connection} from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();


let channel: Channel;


async function connectRabbitMQ(): Promise<Channel>{
    try {
        const connection: Connection = await amqp.connect(process.env.RABBIT_URL!);
        channel = await connection.createChannel();
        // await channel.assertQueue(process.env.QUEUE_NAME!, {durable: true});
        console.log('Connected to RabbitMQ');
        return channel;
    } catch (error) {
        console.error("Connection Rabbit MQ Error",error);
        process.exit(1);
    }
}

function getChannel(): Channel{
    if(!channel) throw new Error("Rabbit MQ not connected")
    return channel;
}

export {connectRabbitMQ, getChannel};