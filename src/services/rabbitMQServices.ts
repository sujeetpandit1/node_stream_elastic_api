import { getChannel } from "../config/rabbitMq";



function sendToQueue(queueName: string, data: any): void{
    const channel = getChannel();
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), {persistent: true});
}

export {sendToQueue};