import { Router, Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import UserCtrl from '../controllers/UserController';
import { ERROR_ON_SEND_DATA, } from '../messages';

class UserRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  static sendResponse(res: Response, data: any) {
    try {
      res.json({
        status: res.statusCode,
        data
      });
    } catch (error) {
      res.json({
        status: res.statusCode,
        ...ERROR_ON_SEND_DATA
      });
    }
  }

  /**
  * registerUser
  */
  public async registerUser(req: Request, res: Response) {
    let data = req.body;
    let user = await UserCtrl.registerUser(data);
    UserRouter.sendResponse(res, user);
  }

  /**
 * login
 */
  public async login(req: Request, res: Response) {
    let data = req.body;
    let response = await UserCtrl.loginUser(data);
    UserRouter.sendResponse(res, response);
  }

  /**
   * getUsers
   */
  public async getUsers(req: Request, res: Response) {
    let data = await UserCtrl.findUsers();
    try {
      res.json({
        status: res.statusCode,
        data
      });
    } catch (error) {
      res.json({
        status: res.statusCode,
        error
      });
    }
    // UserRouter.sendResponse(res, data);
  }

  /**
   * getUserById
   */
  public getUserById(req: Request, res: Response) {

  }

  /**
   * updateUser
   */
  public updateUser(req: Request, res: Response) {

  }

  /**
  * deleteUser
  */
  public deleteUser(req: Request, res: Response) {

  }

  routes() {
    this.router.get('/', this.getUsers);
    this.router.post('/register', this.registerUser);
    this.router.post('/login', this.login);
  }
}

export default new UserRouter();