import { Product } from "../models/product";
import { IProduct } from "../types/inference";
import { sendToQueue } from "./rabbitMQServices";
import { Op } from "sequelize";



export async function getAllProduct(): Promise<IProduct[]>{
    return await Product.findAll();
}

export async function getProductById(id: string): Promise<IProduct | null>{
    return await Product.findByPk(id);
}


export async function createProduct(productData: IProduct): Promise<IProduct> {
  // console.log('Received product data:', productData);
  try {
    const product = await Product.create(productData);
    // console.log('Product created successfully:', product);
    sendToQueue('product_queue', {action: 'create', product});
    return product;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}



export async function updateProduct(id: string, productData: Partial<IProduct>):Promise<IProduct>{
    const product = {id, ...productData};
    sendToQueue('product_queue', {action: 'update', product});
    return product as IProduct;
}

export async function deleteProduct(id: string): Promise<void>{
    await Product.destroy({where: {id}});
    sendToQueue('product_queue', {action: 'delete', id});
}

export async function searchProduct(search: string): Promise<IProduct[]>{
    return await Product.findAll({
        where: {
            [Op.or]: [
              {
                name: {
                  [Op.like]: `%${search}%` 
                },
              },
              {
                description: {
                  [Op.like]: `%${search}%` 
                },
              },
            ],
          },
        });
}

export async function* getProductStream(): AsyncGenerator<IProduct>{
    const pageSize = 10;
    let offset = 0;

    while(true){
        const products = await Product.findAll({offset: offset, limit: pageSize});

        if(products.length === 0){
            break;
        };
        
        for(const product of products){
            yield product;
        }
        offset += pageSize;
    }
}


