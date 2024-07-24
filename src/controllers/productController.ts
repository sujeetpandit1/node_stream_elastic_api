import { Request, Response } from 'express';
import * as productService from '../services/productService';

export async function getAllProduct(req: Request, res: Response): Promise<void> {
  try {
    const products = await productService.getAllProduct();
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}


//get product by id
export async function getProductById(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id;
    const product = await productService.getProductById(id);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    } else {
      res.status(200).json(product);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}

//create product
export async function createProduct(req: Request, res: Response): Promise<void> {
  try {
    const productData = req.body;
    const product = await productService.createProduct(productData);
    res.status(201).json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}

//update product
export async function updateProduct(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id;
    const productData = req.body;
    const product = await productService.updateProduct(id, productData);
    res.status(200).json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}

//delete product
export async function deleteProduct(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id;
    await productService.deleteProduct(id);
    res.sendStatus(204);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}

//search product
export async function searchProduct(req: Request, res: Response): Promise<void> {
  try {
    const search = req.query.search as string;
    const products = await productService.searchProduct(search);
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}

//stream api
export async function streamProduct(req: Request, res: Response): Promise<void> {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

  try {
    for await ( const product of productService.getProductStream()){
        res.write(JSON.stringify(product) + '\n');
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }finally{
    res.end();
  }
}