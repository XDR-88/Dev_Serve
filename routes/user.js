var express = require('express');
var router = express.Router();
const pool=require('../pool');

/* 用户注册 */
router.post('/reg', function(req, res, next) {
  let name = req.body.name;
  let pwd = req.body.pwd;
  let phone = req.body.phone;
  pool.query('INSERT earth_user(name,pwd,phone) VALUES(?,MD5(?),?)',[name,pwd,phone],(err,data)=>{
    if(err){
      next(err);
      return;
    }
    console.log(data.affectedRows);
    if(data.affectedRows === 1){
      res.send({
        "code": 200,
        "msg": '注册成功'
      });
    }else{
      res.send({
        "code": 201,
        "msg": '注册失败'
      }); 
    }
  })
});

/* 用户登录 */
router.post('/login', function(req, res, next) {
  let obj = req.body;
  pool.query('SELECT * FROM earth_user WHERE name=? AND pwd=MD5(?)',[obj.name,obj.pwd],(err,data)=>{
    if(err){
      next(err);
      return;
    }
    console.log(data);
    if(data.length === 0){
      res.send({
        "code": 201,
        "msg": "登录失败，用户名或密码错误"
      })
    }else{
      res.send({
        "code": 200,
        "msg": "登录成功"
      })
    }
  })
});

// 修改个人信息
router.put('/edit',(req,res,next)=>{
  let obj=req.body;
  console.log(obj);
  pool.query(`UPDATE earth_user SET name="${obj.name}",pwd="${obj.pwd}",phone="${obj.phone}",avatar="${obj.avatar}",gender="${obj.gender}" WHERE phone="${obj.oldphone}";`,(err,data)=>{
      if(err){
          next(err);
          return;
      }
      // console.log(data.affectedRows);
      if(data.affectedRows === 1){
          res.send({
              "code": 200,
              "msg": '修改成功'
          });
      }else{
          res.send({
              "code": 201,
              "msg": '修改失败'
          }); 
      } 
  })
})

module.exports = router;
