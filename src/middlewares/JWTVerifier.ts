import { verify } from 'jsonwebtoken';
import { config } from '../config';
import { ACCESS_DENIED } from '../messages';

export const isTokenValid = (req, res, next) => {
  const token = req.headers.authorization;

  verify(token, config.JWT_PRIVATE_KEY, (err, result) => {
    if (!err) {
      return next();
    } else {
      //console.log('err :', err);
      res.status(401).json(ACCESS_DENIED);
    }
  })
}