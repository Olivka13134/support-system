import Request from '../models/requestModel';
import { Op } from 'sequelize';  // Объект для работы с операциями
import { Status } from '../models/statusEnum';


/**
 * Создает новое обращение.
 * 
 * @param subject - Тема обращения.
 * @param text - Текст обращения.
 * @returns Возвращает созданное обращение.
 */
export const createRequest = async (subject: string, text: string) => {
  const newRequest = await Request.create({
    subject,
    text,
    status: Status.NEW,
  });
  return newRequest;
};

/**
 * Начинает работу с обращением, меняя его статус на "в работе".
 * 
 * @param id - Идентификатор обращения.
 * @returns Обновленное обращение.
 */
export const startWork = async (id: string) => {
  const request = await Request.findByPk(id);
  if (!request) {
    throw new Error('Request not found');
  }
  request.status = Status.IN_PROGRESS;
  await request.save();
  return request;
};

/**
 * Завершается обработка обращения, меняя его статус на "завершено".
 * Также добавляется решение проблемы.
 * 
 * @param id - Идентификатор обращения.
 * @param solution - Текст решения проблемы.
 * @returns Обновленное обращение с решением.
 */
export const completeRequest = async (id: string, solution: string) => {
  const request = await Request.findByPk(id);
  if (!request) {
    throw new Error('Request not found');
  }
  request.status = Status.CANCELED;
  request.solution = solution;
  await request.save();
  return request;
};

/**
 * Отменяет обращение, меняя его статус на "отменено".
 * Также добавляется причина отмены.
 * 
 * @param id - Идентификатор обращения.
 * @param reason - Причина отмены.
 * @returns Обновленное обращение с причиной отмены.
 */
export const cancelRequest = async (id: string, reason: string) => {
  const request = await Request.findByPk(id);
  if (!request) {
    throw new Error('Request not found');
  }
  request.status = Status.CANCELED;
  request.cancelReason = reason;
  await request.save();
  return request;
};

/**
 * Получает все обращения с возможностью фильтрации по диапазону дат.
 * 
 * @param startDate - Начальная дата для фильтрации (формат YYYY-MM-DD).
 * @param endDate - Конечная дата для фильтрации (формат YYYY-MM-DD).
 * @returns Список обращений, отфильтрованных по дате.
 */
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
    request.status = Status.CANCELED;
    await request.save();
  });

  return requests;
};

/**
 * Получает все обращения, которые не закрыты (статусы не равны "completed" или "canceled").
 * 
 * @returns Список всех открытых обращений.
 */
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