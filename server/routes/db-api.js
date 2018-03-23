var express = require('express');
var router = express.Router();

const checkJwt = require('../auth').checkJwt;
const fetch = require('node-fetch');
router.post('/add',function(req, res, next){
  const userName = req.body.nickname;
  const answer = req.body.num;
  const date = req.body.date;
  var newData = {name:userName, num:answer,date: date};
  // console.log(newData);
  req.db.collection('calculator').count(function (err, count){
    if(!err && count ===0){
      req.db.collection('calculator').insertOne({num:answer});
    }
    else{
      req.db.collection('calculator').updateMany({},{$set:{num:answer}});
    }
  })
  // req.db.collection('calculator').updateOne({num:answer});
  res.json({
    res:'insert success'
  });
})

router.post('/find',function(req, res, next){
  const answer = req.body.num;
  req.db.collection('calculator').count(function (err, count){
    if(!err && count ===0){
      req.db.collection('calculator').insertOne({num:answer});
    }
    else{
      var result = req.db.collection('calculator').findOne({},function(err,result){
        if(result){
          res.json({
            data:result
          })
        }
      });
    }
  })
})


module.exports = router;
