import { sign } from 'jsonwebtoken';
import { hashSync, compareSync } from 'bcrypt';
import { config } from '../config';

class UtilsController {
  constructor() { }

  generateToken = (payload: any) => {
    return sign(payload, config.JWT_PRIVATE_KEY);
  }

  hashPassword = (password: string) => {
    return hashSync(password, config.SALT_ROUNDS);
  }

  comparePasswords = (password: string, hashedPassword: string) => {
    return compareSync(password, hashedPassword);
  }

}

const Utils: UtilsController = new UtilsController();
export default Utils;