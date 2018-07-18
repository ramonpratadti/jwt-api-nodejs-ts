import { Router, Request, Response, NextFunction } from 'express';
import { IUserModel, UserModel } from '../models/User';
import { Document, Error } from 'mongoose';
import Utils from '../helpers/Utils';
import {
  ERROR_ON_SAVE_DOCUMENT,
  NO_CREDENTIALS_PROVIDED,
  EMAIL_USER_NOT_FOUND,
  ACCESS_DENIED,
  ERROR_ON_SEND_DATA,
  DEFAULT_ERROR,
  EMAIL_ALREADY_EXISTS
} from '../messages';
import { config } from '../config';

class UserController {
  constructor() { }

  /**
   * Create user
   */
  public async registerUser(user: IUserModel) {
    try {
      // encrypt password
      const hashedPassWord: string = Utils.hashPassword(String(user.password));
      user.password = hashedPassWord;
      // create user
      let document: any = await UserModel.create({ ...user });
      if (document._id) {
        let { email, createdAt } = document;
        return {
          success: true,
          user: { email, createdAt }
        }
      } else {
        return ERROR_ON_SAVE_DOCUMENT;
      }
    } catch (error) {

      if (error.code === 11000) {
        return EMAIL_ALREADY_EXISTS;
      }

      return DEFAULT_ERROR;
    }
  }

  /**
   * Create user
   */
  public async loginUser(credentials: any) {
    const { email, password } = credentials;
    if (!email || !password) {
      return NO_CREDENTIALS_PROVIDED;
    }

    let user: IUserModel = await UserModel.findOne({ email });

    if (!user) {
      return EMAIL_USER_NOT_FOUND;
    }

    try {
      //compare password from userDB with received password
      const passwordMatched = Utils.comparePasswords(String(password), user.password);

      if (passwordMatched) {
        //..then generate token
        const payload = {
          email: user.email,
        };
        const token = Utils.generateToken(payload);

        return {
          success: true,
          jwtToken: token
        };
      } else {
        return ACCESS_DENIED;
      }
    } catch (error) {
      return DEFAULT_ERROR;
    }
  }

  /**
   * Get all users
   */
  public async findUsers() {
    try {
      return await UserModel.find({}).exec();
    } catch (error) {
      throw error;
    }
  }
}

const UserCtrl: UserController = new UserController();
export default UserCtrl;