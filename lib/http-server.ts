import express = require('express');
import {Application} from 'express';
import * as bodyParser from 'body-parser';
import {gets} from './endpoint-decorators/get';
import {applyPost} from './apply-post';


/**
 * Http server launcher for current service.
 * @param service Target service instance
 * @param port
 */
export function launch(service: Object, port?: number) {
  console.log('Server launching...');

  const app: Application = express();

  // Logging
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
  });

  // Enabling JSON body parser
  app.use(bodyParser.json());


  // Applying GET endpoints
  for (let method of gets) {
    app.get(method.routes, (req, res) => {
      const result = service[method.methodName]();
      res.json(result);
    });
  }
  
  
  // Applying POST endpoints
  applyPost(app, service);


  const _port = port || 3000;
  app.listen(_port, () =>
    console.log(`Http server listening on port ${_port}`));
}
