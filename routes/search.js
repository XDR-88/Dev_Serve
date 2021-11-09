var express = require('express');
var router = express.Router();
const pool=require('../pool');

// 搜索
router.get('/', function(req, res, next) {
  // 获取客户端传来的name
  let name = "%" + req.query.name + "%";
  pool.query(`(SELECT id,name,imgurl FROM earth_theme WHERE name LIKE ?)
              UNION ALL
              (SELECT id,name,imgurl FROM earth_play WHERE name LIKE ?)
              UNION ALL
              (SELECT id,name,imgurl FROM earth_cafe WHERE name LIKE ?)
              UNION ALL
              (SELECT id,name,imgurl FROM earth_hotel WHERE name LIKE ?)
              UNION ALL
              (SELECT id,name,imgurl FROM earth_show WHERE name LIKE ?)
              UNION ALL
              (SELECT id,name,imgurl FROM earth_server WHERE name LIKE ?)`,[name,name,name,name,name,name],(err,data)=>{
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

module.exports = router;