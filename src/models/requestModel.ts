import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';
import { Status } from './statusEnum'; 


/**
 * Модель для обращения.
 * 
 * Описание структуры таблицы `requests` в базе данных, где:
 * - `subject` — тема обращения
 * - `text` — текст обращения
 * - `status` — текущий статус обращения: 'new', 'in_progress', 'completed', 'canceled'
 * - `solution` — решение проблемы, если обращение завершено
 * - `cancelReason` — причина отмены обращения, если оно отменено
 */

class Request extends Model {
  public id!: number;
  public subject!: string;
  public text!: string;
  public status!: Status;
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
      type: DataTypes.ENUM(Status.NEW, Status.IN_PROGRESS, Status.COMPLETED, Status.CANCELED),
      defaultValue: Status.NEW,
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
