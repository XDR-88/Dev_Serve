var express = require('express');
var router = express.Router();
const pool=require('../pool');

// 获取所有酒店信息
router.get('/', function(req, res, next) {
  let obj=req.params;
  pool.query('SELECT * FROM earth_hotel ORDER BY id',(err,data)=>{
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

// 获取单一酒店信息
router.get('/detail', function(req, res, next) {
  // 获取客户端传来的id参数
  let id = req.query.id;
  pool.query('SELECT * FROM earth_hotel WHERE id=?',[id],(err,data)=>{
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

// 添加酒店信息
router.post('/add', function(req, res, next) {
  let obj = req.body;
  pool.query('INSERT INTO earth_hotel SET ?',[obj],(err,data)=>{
    if(err){
      next(err);
      return;
    }
    console.log(data.affectedRows);
    if(data.affectedRows === 1){
      res.send({
        "code": 200,
        "msg": '添加成功'
      });
    }else{
      res.send({
        "code": 201,
        "msg": '添加失败'
      }); 
    }
  })
});

// 修改酒店信息
router.put('/edit',(req,res,next)=>{
  let obj=req.body;
  console.log(obj);
  pool.query(`UPDATE earth_hotel SET name="${obj.name}",hdesc="${obj.hdesc}",price="${obj.price}",phone="${obj.phone}",address="${obj.address}",info="${obj.info}",server1="${obj.server1}",server2="${obj.server2}",atlas="${obj.atlas}",tips="${obj.tips}" WHERE id="${obj.id}";`,(err,data)=>{
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

// 删除酒店信息
router.delete('/del/:id',(req,res,next)=>{
  let obj=req.params;
  pool.query('DELETE FROM earth_hotel WHERE id=?',[obj.id],(err,data)=>{
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