import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';
import { DBInstance } from './dbConfig';
import { isTokenValid } from './middlewares/JWTVerifier';

// import routes
import UserRouter from './routers/UserRouter';
import ProtectedRouter from './routers/ProtectedRouter';

class Server {
  // define 'api' as an express application type
  public api: express.Application;

  constructor() {
    this.api = express(); //instantiate the api
    this.config();
    this.routes();
  }

  public config() {
    // connect to DB
    DBInstance.connect();

    /**
     * Middlewares
     */
    this.api.use(bodyParser.urlencoded({
      extended: true
    }));
    this.api.use(bodyParser.json());
    
    // Log requests to console
    this.api.use(logger('dev'));

    /**
     * Compression
     * The middleware will attempt to compress response bodies for all 
     * request that traverse through the middleware, based on the given 
     * see: https://www.npmjs.com/package/compression
     */
    this.api.use(compression());

    /**
     * Helmet
     * Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
     * Helmet is actually just a collection of nine smaller middleware functions that set security-related HTTP headers
     * see: http://expressjs.com/en/advanced/best-practice-security.html
     */
    this.api.use(helmet());

    /**
     * Cors
     * Cross-Origin Resource Sharing (CORS) is a mechanism that uses additional HTTP 
     * headers to tell a browser to let a web application running at one origin (domain) 
     * have permission to access selected resources from a server at a different origin.
     * see: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
     * see: https://www.npmjs.com/package/cors
     */
    const corsOptions = {
      origin: '*', // can be a specific domain. Ex.: 'http://example.com'
      methods: ['GET', 'PUT', 'POST', 'DELETE'],
      allowedHeaders: ['X-Requested-With', 'Content-Type', 'application/json', 'Authorization'],
      credentials: true
    }
    this.api.use(cors(corsOptions));
  }

  public routes(): void {
    let router: express.Router;
    router = express.Router();

    this.api.use('/', router);
    this.api.use('/users', UserRouter.router);
    this.api.use('/protected', isTokenValid, ProtectedRouter.router);
  }

}

export default new Server().api;