// require express router and the api routes


const router = require('express').Router();
const apiRoutes = require('./api');

//router.use('/api', apiRoutes);
router.use('/api', apiRoutes);

//router.use((req, res)
// router.use((req, res) => {
//     res.status(404).send('<h1>404 Error!</h1>');
// }
// );

module.exports = router;