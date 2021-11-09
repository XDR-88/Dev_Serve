var express = require('express');
var router = express.Router();
const pool=require('../pool');

/* 管理员登录 */
router.post('/', function(req, res, next) {
  let obj = req.body;
  console.log(req.body);
  pool.query('SELECT * FROM earth_admin WHERE name=? AND pwd=MD5(?)',[obj.name,obj.pwd],(err,data)=>{
    if(err){
      next(err);
      return;
    }
    console.log(data);
    if(data.length === 0){
      res.send({
        "code": 201,
        "msg": "登录失败"
      })
    }else{
      res.send({
        "code": 200,
        "msg": "登陆成功"
      })
    }
  })
});

module.exports = router;
