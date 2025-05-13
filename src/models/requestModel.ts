import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';

class Request extends Model {
  public id!: number;
  public subject!: string;
  public text!: string;
  public status!: 'new' | 'in_progress' | 'completed' | 'canceled';
  public solution?: string;
  public cancelReason?: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Request.init(
  {
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('new', 'in_progress', 'completed', 'canceled'),
      defaultValue: 'new',
      allowNull: false,
    },
    solution: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cancelReason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Request',
    tableName: 'requests',
  }
);

export default Request;
