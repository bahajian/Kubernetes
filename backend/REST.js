const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const config = require('./config');

// connect to mysql
var pool = mysql.createPool(config.mysql);

// all the routes
router.get("/",function(req,res){
    res.json({"Message" : "Hello World !"});
});

router.get("/users",function(req,res){
  // code shown above, saving space here
});

router.get("/users/:user_id",function(req,res){
  // code shown above, saving space here
});

router.post("/users",function(req,res){
  // code shown above, saving space here
});

router.put("/users",function(req,res){
  // saving some space, scroll down for more
});

router.delete("/users/:email",function(req,res){
    var query = "DELETE from ?? WHERE ??=?";
    var table = ["user_login","user_email",req.params.email];
    query = mysql.format(query,table);
    pool.query(query, (err,rows) => {
        if(err) {
            return res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        }
        res.json({"Error" : false, "Message" : "Deleted the user with email "+req.params.email});
    });
});

module.exports = router;