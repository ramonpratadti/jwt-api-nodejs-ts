import { Router, Request, Response, NextFunction } from 'express';

//import sendnotification from '../services/pushNotification';

class ProtectedRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  static sendResponse(res: Response, data: any) {
    res.json({
      status: res.statusCode,
      data
    });
  }

  /**
   * getAllData
   */
  public async getAllData(req: Request, res: Response): Promise<any> {
    ProtectedRouter.sendResponse(res, { success: true });
  }

  /**
   * getDataById
   */
  public getDataById(req: Request, res: Response) {
    ProtectedRouter.sendResponse(res, { success: true });
  }

  /**
   * createData
   */
  public async createData(req: Request, res: Response) {

  }

  /**
   * updateData
   */
  public updateData(req: Request, res: Response) {

  }

  /**
  * deleteData
  */
  public deleteData(req: Request, res: Response) {

  }

  routes() {
    this.router.get('/', this.getAllData);
    this.router.post('/', this.createData);
  }
}

export default new ProtectedRouter();;