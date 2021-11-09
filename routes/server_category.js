var express = require('express');
var router = express.Router();
const pool=require('../pool');

// 获取所有游客服务分类信息
router.get('/', function(req, res, next) {
  let obj=req.params;
  pool.query('SELECT * FROM earth_server_category ORDER BY id',(err,data)=>{
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

// 添加游客服务分类信息
router.post('/add', function(req, res, next) {
  let obj = req.body;
  pool.query('INSERT INTO earth_server_category SET ?',[obj],(err,data)=>{
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

// 修改游客服务分类信息
router.put('/edit',(req,res,next)=>{
  let obj=req.body;
  console.log(obj);
  pool.query(`UPDATE earth_server_category SET name="${obj.name}",intro="${obj.intro}",icon="${obj.icon}" WHERE id="${obj.id}";`,(err,data)=>{
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

// 删除游客服务分类信息
router.delete('/del/:id',(req,res,next)=>{
  let obj=req.params;
  pool.query('DELETE FROM earth_server_category WHERE id=?',[obj.id],(err,data)=>{
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