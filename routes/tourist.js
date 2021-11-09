var express = require('express');
var router = express.Router();
const pool=require('../pool');

// 获取指定用户下的游客信息
router.get('/', function(req, res, next) {
  let familyId = req.query.familyId;
  pool.query('SELECT name,card_style,card_number FROM earth_tourist WHERE familyId=? ORDER BY id DESC',[familyId],(err,data)=>{
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

// 获取单一游客信息
router.get('/detail', function(req, res, next) {
  // 获取客户端传来的id参数
  let id = req.query.id;
  pool.query('SELECT * FROM earth_tourist WHERE id=?',[id],(err,data)=>{
    if(err){
      next(err);
      return;
    }
    if(data.length!==0){
      res.send({
        "code": 200,
        "msg": '查找成功',
        "result": data[0]
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

// 添加游客
router.post('/add', function(req, res, next) {
  let obj = req.body;
  pool.query('INSERT INTO earth_tourist SET ?',[obj],(err,data)=>{
    if(err){
      next(err);
      return;
    }
    console.log(data.affectedRows);
    if(data.affectedRows === 1){
      res.send({
        "code": 200,
        "msg": '游客添加成功'
      });
    }else{
      res.send({
        "code": 201,
        "msg": '游客添加失败'
      }); 
    }
  })
});

// 修改游客
router.put('/edit',(req,res,next)=>{
  let obj=req.body;
  console.log(obj);
  pool.query(`UPDATE earth_tourist SET name="${obj.name}",card_style="${obj.card_style}",card_number="${obj.card_number}" WHERE card_number="${obj.card_oldnumber}";`,(err,data)=>{
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

// 删除游客
router.delete('/del/:id',(req,res,next)=>{
  let obj=req.params;
  pool.query('DELETE FROM earth_tourist WHERE id=?',[obj.id],(err,data)=>{
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