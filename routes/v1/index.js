const express = require('express');
const cityRoute = require('./city.route');
const countryRoute = require('./country.route');
const universityRoute = require('./university.route');
const courseRoute = require('./course.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

 const defaultRoutes = [
  {
    path: '/university',
    route: universityRoute,
  },
  {
    path: '/country',
    route: countryRoute,
  },
   {
   path: '/city',
   route: cityRoute,
 },
 {
  path: '/course',
  route: courseRoute,
},

 ];

const devRoutes = [
 
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
