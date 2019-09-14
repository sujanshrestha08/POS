const express= require('express')
const bodyparser=require('body-parser');
const cors=require('cors');
const jwt=require('jsonwebtoken');
const knex=require('knex');
const app=express();
const path= require('path');
const userhandler= require("./handler/userhandler");
const workhandler= require('./handler/work');
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.post('/register',userhandler.register);
app.post('/authenticate',userhandler.authenticate);
app.post('/bill',workhandler.bill)
app.post('/datas',userhandler.datas)
app.post('/offe',userhandler.offe)
app.post('/stock',workhandler.stock)
app.post('/record',workhandler.record)
app.get('/productmail',workhandler.productmail)
app.get('/getoffer',userhandler.getoffer)
app.get('/getmember',userhandler.getmember)
app.get('/gmail',workhandler.gmail)
app.get('/getstock',workhandler.getstock)
app.get('/getallstock',workhandler.getallstock)
app.get('/getallrecord',workhandler.getallrecord)
app.get('/getalluser',userhandler.getalluser)
app.get('/getbill',workhandler.getbill)
app.get('/getallbill',workhandler.getallbill)
app.get('/getallhistory',workhandler.getallhistory)
app.get('/gethistory',workhandler.gethistory)
app.get('/getmemberhistory',workhandler.getmemberhistory)
app.put('/updatedis', workhandler.updatedis)
app.put('/updateitem', workhandler.updateditem)
app.put('/updatestock', workhandler.updatestock)
app.put('/memberpoint', userhandler.memberpoint)
app.put('/updateuser', userhandler.updateuser)
app.delete('/deletebill',workhandler.deletebill)
app.delete('/deluser',userhandler.deluser)
app.listen(3000,()=> console.log('server is up at 30000'));