import { DataTypes, Model, Sequelize } from "sequelize";
import { IProduct } from "../types/inference";


class Product extends Model<IProduct> implements IProduct {
  public id!: string;
  public name!: string;
  public price!: number;
  public description?: string;
}

// You need to pass the sequelize instance to the `init` method
function initializeProductModel(sequelize: Sequelize) {
  Product.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUID,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        // allowNull defaults to true
      },
      description: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize, // This is the connection instance
      tableName: 'products', // Specify the table name if needed
      timestamps: true, // Automatically manage `createdAt` and `updatedAt`
    }
  );
}

export { Product, initializeProductModel };
