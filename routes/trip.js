var express = require('express');
var router = express.Router();
const pool=require('../pool');

// 获取指定用户下的行程信息
router.get('/', function(req, res, next) {
  let familyId = req.query.familyId;
  pool.query('SELECT name,date,first_day_trip,second_day_trip,third_day_trip FROM earth_trip WHERE familyId=? ORDER BY id',[familyId],(err,data)=>{
    if(err){
      next(err);
      return;
    }
    if(data.length!==0){
      res.send({
        "code": 200,
        "msg": '行程查找成功',
        "result": data
      });
    }else{
      res.send({
        "code": 201,
        "msg": '行程查找失败'
      });
    }
    console.log(data.affectedRows);
  })
});

// 获取单一行程信息
router.get('/detail', function(req, res, next) {
  // 获取客户端传来的id参数
  let id = req.query.id;
  pool.query('SELECT * FROM earth_trip WHERE id=?',[id],(err,data)=>{
    if(err){
      next(err);
      return;
    }
    if(data.length!==0){
      res.send({
        "code": 200,
        "msg": '查找成功',
        "result": data
      });
    }else{
      res.send({
        "code": 201,
        "msg": '查找失败'
      });
    }
    console.log(data.affectedRows);
  })
});

// 添加行程
router.post('/add', function(req, res, next) {
  let obj = req.body;
  pool.query('INSERT INTO earth_trip SET ?',[obj],(err,data)=>{
    if(err){
      next(err);
      return;
    }
    console.log(data.affectedRows);
    if(data.affectedRows === 1){
      res.send({
        "code": 200,
        "msg": '行程添加成功'
      });
    }else{
      res.send({
        "code": 201,
        "msg": '行程添加失败'
      }); 
    }
  })
});

// 修改行程
router.put('/edit',(req,res,next)=>{
  let obj=req.body;
  console.log(obj);
  pool.query(`UPDATE earth_trip SET name="${obj.name}",date="${obj.date}",first_day_trip="${obj.first_day_trip}",second_day_trip="${obj.second_day_trip}",third_day_trip="${obj.third_day_trip}" WHERE id="${obj.id}";`,(err,data)=>{
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

// 删除行程
router.delete('/del/:id',(req,res,next)=>{
  let obj=req.params;
  pool.query('DELETE FROM earth_trip WHERE id=?',[obj.id],(err,data)=>{
      if(err){
          next(err);
          return;
      }
      if(data.affectedRows === 0){
          res.send({
            "code": 201,
            "msg": "删除失败"
          })
      }else{
          res.send({
            "code": 200,
            "msg": "删除成功"
          })
      }
  })
})

module.exports = router;