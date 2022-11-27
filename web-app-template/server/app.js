/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');

const port = 3000;
const app = express();

app.use('/static', express.static('/static'));
app.use('/assets', express.static('/assets'));

const hbs = exphbs.create({
  helpers: {
    escapeJS: ( data ) => {
      return JSON.stringify( data );
    }
  },
  extname: '.hbs'
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.enable('view cache');
app.locals.layout = false;

const commonIndex = (req, res) => {
  return res.render('index', {
    seo: {
      title: 'Web App',
      og_title: 'Web App',
      og_description: 'Web App',
      img_og_picture: '/assets/seo.jpg',
      og_site_name: 'Web App',
      url: '/',
      keywords: 'Web App'
    },
    data: {
      hostname: process.env.HOSTNAME
    }
  });
};

app.get('/', commonIndex);

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
