var express = require('express');
var router = express.Router();
const pool=require('../pool');

// 获取所有房型信息
router.get('/', function(req, res, next) {
  let obj=req.params;
  pool.query('SELECT * FROM earth_house ORDER BY id',(err,data)=>{
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

// 获取指定分类下房型信息
router.get('/item', function(req, res, next) {
  // 获取客户端传来的分类id
  let familyId = req.query.familyId;
  pool.query('SELECT * FROM earth_house WHERE familyId=? ORDER BY id',[familyId],(err,data)=>{
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

// 获取单一房型信息
router.get('/detail', function(req, res, next) {
  // 获取客户端传来的id参数
  let id = req.query.id;
  pool.query('SELECT * FROM earth_house WHERE id=?',[id],(err,data)=>{
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

// 添加房型信息
router.post('/add', function(req, res, next) {
  let obj = req.body;
  pool.query('INSERT INTO earth_house SET ?',[obj],(err,data)=>{
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

// 修改房型信息
router.put('/edit',(req,res,next)=>{
  let obj=req.body;
  console.log(obj);
  pool.query(`UPDATE earth_house SET name="${obj.name}",size="${obj.size}",style="${obj.style}",people="${obj.people}",spec_name1="${obj.spec_name1}",spec_name2="${obj.spec_name2}",price1="${obj.price1}",price2="${obj.price2}",atlas="${obj.atlas}",tips="${obj.tips}" WHERE id="${obj.id}";`,(err,data)=>{
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

// 删除房型信息
router.delete('/del/:id',(req,res,next)=>{
  let obj=req.params;
  pool.query('DELETE FROM earth_house WHERE id=?',[obj.id],(err,data)=>{
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