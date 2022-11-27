/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
// const fetchData = require('./fetch-data');

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
      title: 'Nedii',
      og_title: 'Nedii',
      og_description: 'Nedii',
      img_og_picture: '/assets/seo.jpg',
      og_site_name: 'Nedii',
      url: '/',
      keywords: 'Nedii,expo,stands,negocios'
    },
    data: {
      hostname: process.env.HOSTNAME
    }
  });
};

app.get('/mi-cuenta', commonIndex);
app.get('/mi-cuenta/configuracion', commonIndex);
app.get('/mi-cuenta/direcciones', commonIndex);
app.get('/mi-cuenta/pagos', commonIndex);
app.get('/mi-cuenta/carrito', commonIndex);
app.get('/mi-cuenta/ordenes', commonIndex);
app.get('/mi-cuenta/favoritos', commonIndex);
app.get('/mi-cuenta/empresas', commonIndex);
app.get('/mi-cuenta/ventas', commonIndex);
app.get('/mi-cuenta/productos', commonIndex);
app.get('/mi-cuenta/servicios', commonIndex);
app.get('/mi-cuenta/platillos', commonIndex);
app.get('/mi-cuenta/inmuebles', commonIndex);
app.get('/mi-cuenta/vehiculos', commonIndex);
app.get('/terminos-y-condiciones', commonIndex);
app.get('/politica-de-privacidad', commonIndex);
app.get('/uso-de-datos-de-usuario', commonIndex);
app.get('/changelog', commonIndex);
app.get('/about', commonIndex);
app.get('/create-account', commonIndex);
app.get('/login', commonIndex);
app.get('/activate/:token', commonIndex);
app.get('/expos', commonIndex);
app.get('/buscador', commonIndex);
app.get('/categorias', commonIndex);
app.get('/categorias/:groupId', commonIndex);
app.get('/expos/:expoId', commonIndex);
app.get('/expos/:expoId/:groupId', commonIndex);
app.get('/empresa/:standId', commonIndex);
app.get('/empresa/:standId/productos', commonIndex);
app.get('/empresa/:standId/productos/:productId', commonIndex);
app.get('/empresa/:standId/news/:standNewsId', commonIndex);
app.get('/empresa/:standId/menu', commonIndex);
app.get('/empresa/:standId/menu/:mealId', commonIndex);
app.get('/empresa/:standId/servicios', commonIndex);
app.get('/empresa/:standId/servicios/:serviceId', commonIndex);
app.get('/empresa/:standId/vehiculos', commonIndex);
app.get('/empresa/:standId/vehiculos/:vehicleId', commonIndex);
app.get('/empresa/:standId/inmuebles', commonIndex);
app.get('/empresa/:standId/inmuebles/:realEstateId', commonIndex);
app.get('/empresa/:standId/tarjeta-de-negocio', commonIndex);
app.get('/', commonIndex);

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
