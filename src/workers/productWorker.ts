import { connectRabbitMQ } from "../config/rabbitMq";
import { Product } from "../models/product";
import { IProduct } from "../types/inference";

interface QueueMessage {
  action: 'create' | 'update' | 'delete';
  product?: IProduct;
  id?: string;
}

async function processMessage(msg: QueueMessage): Promise<void> {
  try {
    switch (msg.action) {
      case 'create':
        if (msg.product) {
          await Product.create(msg.product);
          console.log(`Product created with ID: ${msg.product.id}`);
        } else {
          console.warn('Create action received without product data.');
        }
        break;
      case 'update':
        if (msg.product) {
          const [affectedRows] = await Product.update(msg.product, {
            where: { id: msg.product.id },
          });
          if (affectedRows > 0) {
            console.log(`Product updated with ID: ${msg.product.id}`);
          } else {
            console.warn(`No product found to update with ID: ${msg.product.id}`);
          }
        } else {
          console.warn('Update action received without product data.');
        }
        break;
      case 'delete':
        if (msg.id) {
          const affectedRows = await Product.destroy({
            where: { id: msg.id },
          });
          if (affectedRows > 0) {
            console.log(`Product deleted with ID: ${msg.id}`);
          } else {
            console.warn(`No product found to delete with ID: ${msg.id}`);
          }
        } else {
          console.warn('Delete action received without ID.');
        }
        break;
      default:
        console.warn(`Unknown action received: ${msg.action}`);
    }
  } catch (error: any) {
    console.error('Error processing message:', error.message || error);
  }
}


async function startWorker():Promise<void>{
    const channel = await connectRabbitMQ();

    await channel.consume('product_queue', async (msg) => {
        if (msg) {
            const message: QueueMessage = JSON.parse(msg.content.toString());
            processMessage(message);
            channel.ack(msg);
        }
    }, {noAck: false});

    console.log('Worker started');
}


startWorker().catch(console.error); 