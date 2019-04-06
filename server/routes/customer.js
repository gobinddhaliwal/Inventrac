let express = require('express');
let router = express.Router();

let passport = require('passport');

let customerController = require('../controllers/customer');

function requireAuth(req, res, next) {
    // check if the user is logged in
    if(!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

/* GET Contact List page - READ Operation */
router.get('/', requireAuth, customerController.displayCustomerList);

/* GET Route for the Add page 
   this will display the Add page */
router.get('/add', requireAuth, customerController.displayAddPage);

/* POST Route for processing the Add page */
router.post('/add', requireAuth, customerController.processAddPage);

/* GET request - display the Edit page */
router.get('/edit/:id', requireAuth, customerController.displayEditPage);

/* POST request - Update the database with data from the Edit Page */
router.post('/edit/:id', requireAuth, customerController.processEditPage);

/* GET request to perform the delete action */
router.get('/delete/:id', requireAuth, customerController.performDelete);

module.exports = router;