import { Request, Response } from 'express';
import * as requestService from '../services/request.service';

/**
 * Обрабатывает создание нового обращения.
 * 
 * @param req - Запрос от клиента.
 * @param res - Ответ для клиента.
 */
export const createRequest = async (req: Request, res: Response) => {
  const { subject, text } = req.body;
  try {
    const newRequest = await requestService.createRequest(subject, text);
    res.status(201).json(newRequest);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unexpected error occurred' });
    }
  }
};

/**
 * Обрабатывает запрос на начало работы с обращением.
 * 
 * @param req - Запрос от клиента.
 * @param res - Ответ для клиента.
 */
export const startWork = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedRequest = await requestService.startWork(id);
    res.json(updatedRequest);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unexpected error occurred' });
    }
  }
};

/**
 * Обрабатывает запрос на завершение обращения.
 * 
 * @param req - Запрос от клиента.
 * @param res - Ответ для клиента.
 */
export const completeRequest = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { solution } = req.body;
  try {
    const completedRequest = await requestService.completeRequest(id, solution);
    res.json(completedRequest);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unexpected error occurred' });
    }
  }
};

/**
 * Обрабатывает запрос на отмену обращения.
 * 
 * @param req - Запрос от клиента.
 * @param res - Ответ для клиента.
 */
export const cancelRequest = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { reason } = req.body;
  try {
    const canceledRequest = await requestService.cancelRequest(id, reason);
    res.json(canceledRequest);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unexpected error occurred' });
    }
  }
};


/**
 * Обрабатывает запрос на получение списка обращений с возможностью фильтрации по датам.
 * 
 * @param req - Запрос от клиента.
 * @param res - Ответ для клиента.
 */
export const getRequests = async (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;
  try {
    const requests = await requestService.getRequests(startDate as string, endDate as string);
    res.json(requests);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unexpected error occurred' });
    }
  }
};


export const cancelInProgressRequests = async (req: Request, res: Response) => {
  try {
    const canceledRequests = await requestService.cancelInProgressRequests();
    res.json(canceledRequests);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unexpected error occurred' });
    }
  }
};

export const getOpenRequests = async (req: Request, res: Response) => {
  try {
    const requests = await requestService.getOpenRequests();
    res.json(requests);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unexpected error occurred' });
    }
  }
};