import Request from '../models/requestModel';
import { Op } from 'sequelize';  // Объект для работы с операциями

// Создание нового обращения
export const createRequest = async (subject: string, text: string) => {
  const newRequest = await Request.create({
    subject,
    text,
    status: 'new',
  });
  return newRequest;
};

// Начать работу с обращением
export const startWork = async (id: string) => {
  const request = await Request.findByPk(id);
  if (!request) {
    throw new Error('Request not found');
  }
  request.status = 'in_progress';
  await request.save();
  return request;
};

// Завершить обращение
export const completeRequest = async (id: string, solution: string) => {
  const request = await Request.findByPk(id);
  if (!request) {
    throw new Error('Request not found');
  }
  request.status = 'completed';
  request.solution = solution;
  await request.save();
  return request;
};

// Отменить обращение
export const cancelRequest = async (id: string, reason: string) => {
  const request = await Request.findByPk(id);
  if (!request) {
    throw new Error('Request not found');
  }
  request.status = 'canceled';
  request.cancelReason = reason;
  await request.save();
  return request;
};

// Получить список обращений с фильтрацией по датам
export const getRequests = async (startDate?: string, endDate?: string) => {
  const where: any = {};

  if (startDate && endDate) {
    where.createdAt = {
      [Op.between]: [new Date(startDate), new Date(endDate)],
    };
  }

  const requests = await Request.findAll({ where });
  return requests;
};

// Отменить все обращения в статусе "в работе"
export const cancelInProgressRequests = async () => {
  const requests = await Request.findAll({
    where: {
      status: 'in_progress',
    },
  });

  requests.forEach(async (request) => {
    request.status = 'canceled';
    await request.save();
  });

  return requests;
};

// Получить все незакрытые обращения
export const getOpenRequests = async () => {
  const requests = await Request.findAll({
    where: {
      status: {
        [Op.notIn]: ['completed', 'canceled'],  // Используем Op.notIn для фильтрации
      },
    },
  });
  return requests;
};