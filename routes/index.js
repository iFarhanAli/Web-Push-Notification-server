var express = require('express');
var router = express.Router();
var ClientAccountRepository = require('../Repository/ClientAccountRepository')
var clientAccountRepository = new ClientAccountRepository;
var Authentication = require('../authenticate/authentication')
var authenticator = new Authentication();

router.get('/login', function(req, res, next) {

    res.render('index', { title: 'Express' });

});

router.get('/logout', function(req, res, next) {
    var sess = req.session
    sess.email = null;
    res.render('index', { title: 'Express' });

});


/* GET home page. */
router.get('/authenticate', function(req, res, next) {
  var sess = req.session
    authenticator.login(req.query.email,req.query.pwd).then((result) =>{
       if(result) {
           sess.email = req.query.email;
           res.redirect('/dashboard');
       }
       else {
           res.redirect('/login');
       }
    });


});

router.get('/dashboard', function(req, res, next) {
    var sess = req.session
    if(sess.email ){
        clientAccountRepository.getAccountByEmail(sess.email).then(function (account) {
            res.render('dashboard', { app_id: account.clientId, secret: account.secret, email:account.email });
            });
    }
    else {
        res.redirect('/login');
    }

});

router.get('/register', function(req, res, next) {

    res.render('register',{});

});

router.post('/register', function(req, res, next) {


var result=   clientAccountRepository.createAccount(req.body.email, req.body.pwd)
    .catch((error) =>{console.log(error)});

    if(!result)
        res.render('register',{error: 'Email already exists'});
    else
        res.redirect('/login');

});


module.exports = router;
