import { DataTypes, Model, Sequelize } from "sequelize";
import { IProduct } from "../types/inference";

class Product extends Model<IProduct> implements IProduct {
  public id!: string;
  public name!: string;
  public price!: number;
  public description?: string;
}

function initializeProductModel(sequelize: Sequelize) {
  Product.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Product',
      tableName: 'products',
      timestamps: true,
    }
  );
}

export { Product, initializeProductModel };