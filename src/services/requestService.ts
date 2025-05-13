import Request from '../models/requestModel';
import { Op } from 'sequelize';  // Объект для работы с операциями

export const createRequest = async (subject: string, text: string) => {
  const newRequest = await Request.create({
    subject,
    text,
    status: 'new',
  });
  return newRequest;
};

export const startWork = async (id: string) => {
  const request = await Request.findByPk(id);
  if (!request) {
    throw new Error('Request not found');
  }
  request.status = 'in_progress';
  await request.save();
  return request;
};

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

export const getOpenRequests = async () => {
  const requests = await Request.findAll({
    where: {
      status: {
        [Op.notIn]: ['completed', 'canceled'],
      },
    },
  });
  return requests;
};