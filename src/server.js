import wixRunMode from '@wix/wix-run-mode';
import ejs from 'ejs';
import wixExpressCsrf from '@wix/wix-express-csrf';
import wixExpressRequireHttps from '@wix/wix-express-require-https';
import {readFileSync} from 'fs';

import {factory} from './server-with-async';

module.exports = (app, context) => {
  const config = context.config.load('yoshi-async-await');
  const templatePath = './src/index.ejs';
  const templateFile = readFileSync(templatePath, 'utf8');
  const isProduction = wixRunMode.isProduction();

  app.use(wixExpressCsrf());
  app.use(wixExpressRequireHttps);

  app.get('/should-fail', factory().justDoIt);

  app.get('/', (req, res) => {
    const renderModel = getRenderModel(req);
    const html = ejs.render(templateFile, renderModel, {cache: isProduction, filename: templatePath});
    res.send(html);
  });

  function getRenderModel(req) {
    return {
      locale: req.aspects['web-context'].language,
      basename: req.aspects['web-context'].basename,
      debug: req.aspects['web-context'].debug || process.env.NODE_ENV === 'development',
      clientTopology: config.clientTopology,
      title: 'Wix Full Stack Project Boilerplate'
    };
  }

  return app;
};
