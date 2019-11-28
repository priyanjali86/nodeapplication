const express=require('express');
const mysql=require('mysql');
const bodyParser=require('body-parser')
const app=express();
app.use(bodyParser.json());
const conn=mysql.createConnection(
    {
        host:'localhost',
        user:'sammy',
        password:'p@ssW0rd',
        database:'restful_db'
    }
);
 
//connect to database
conn.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected...');
  });

//show all products
  app.get('/api/getAll',(req,res)=>
  {
    let sql='select *from product';  
    let query=conn.query(sql,(err,results)=>{
        if(err) throw err;
        res.send(JSON.stringify({"status":200,"error":null,"response":results}));
    });
  });
  app.post('/api/saveProduct',(req,res)=>
  {
      let data={product_name:req.body.product_name,product_price:req.body.product_price};
      let sql="INSERT INTO product SET ?";
      let query=conn.query(sql,data,(err,results)=> {
          if(err) throw err;
          res.send(JSON.stringify({"status":200,"error":null,"response":results}));
      })
  })



//   app.post('/api/products',(req, res) => {
//     let data = {product_name: req.body.product_name, product_price: req.body.product_price};
//     let sql = "INSERT INTO product SET ?";
//     let query = conn.query(sql, data,(err, results) => {
//       if(err) throw err;
//       console.log(err);
//       res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
//     });
//   });

app.listen(3000,()=>{
   
    console.log('server started on port 3000');
})

   
    
