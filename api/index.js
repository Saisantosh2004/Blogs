const express=require('express');
const cors=require('cors');
const bcrypt=require('bcrypt');
const mongoose = require('mongoose');
const User=require('./models/user');
const jwt=require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer=require('multer');
const fs=require('fs');
const post=require('./models/Post');

const salt=bcrypt.genSaltSync(10);

const app=express();
const secret='asdfghjkl1234567890'

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+'/uploads/'));

const uploadMiddleware = multer({ dest: 'uploads/' })

mongoose.connect('mongodb+srv://blog:4pXx1AKESt3wM6Nh@cluster0.hrkxijh.mongodb.net/?retryWrites=true&w=majority')

app.get('/test',(req,res)=>{
    res.json('test data');
})

app.post('/register',async (req,res)=>{
    const {username,password}=req.body;
    // console.log("hello")
    try{
        const userdata=await User.create({
            username,
            password:bcrypt.hashSync(password,salt)});
        res.json({userdata});
    }
    catch(er){
        res.status(401).json(er);
    }
})

app.post('/login', async (req,res)=>{
    const {username,password}=req.body;
    const userDoc= await User.findOne({username:username});
    const passOk= bcrypt.compareSync(password,userDoc.password);
    if(passOk){
        //loggedin
        jwt.sign({username,id:userDoc._id},secret,{},(err,token)=>{
            res.cookie('token',token).json({
                id:userDoc._id,
                username,
              });
        })
    }
    else{
        res.status('400').json("Invalid Credentials")
    }
})

app.get('/profile', (req,res)=>{
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err,info) => {
        if (err) throw err;
        res.json(info);
    });
});

app.post('/logout',(req,res)=>{
    res.cookie('token','').json('ok')
})

app.post('/post',uploadMiddleware.single('file'), async (req,res)=>{
    const {originalname,path}=req.file;
    const parts=originalname.split('.');
    const ext=parts[parts.length-1];
    const newPath=path+'.'+ext;

    fs.renameSync(path,newPath);
    const{title,summary,content}=req.body;
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err,info) => {
        if (err) throw err;
        const postDoc = await post.create({title,summary,content,cover:newPath,author:info.id});
        res.json({postDoc})
    });
})

app.get('/post',async (req,res)=>{
    const posts=await post.find().populate('author',['username']).sort({createdAt:-1}).limit(20);
    res.json(posts)
})

app.get('/post/:id',async (req,res)=>{
    const {id}=req.params;
    const postDoc=await post.findById(id).populate('author',['username']);
    res.json(postDoc)
})

app.put('/post',uploadMiddleware.single('file'), async (req,res) => {
    let newPath = null;
    if (req.file) {
      const {originalname,path} = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      newPath = path+'.'+ext;
      fs.renameSync(path, newPath);
    }
  
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err,info) => {
        if (err) throw err;
        const {id,title,summary,content} = req.body;
        const postDoc = await post.findById(id);
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if (!isAuthor) {
            return res.status(400).json('you are not the author');
        }
        await postDoc.updateOne({
            title,
            summary,
            content,
            cover: newPath ? newPath : postDoc.cover,
        });
              
      res.json(postDoc);
    });
  
  });

app.listen(4000,()=>{
    console.log("server started at port 4000")
});













//password: 4pXx1AKESt3wM6Nh

//  mongodb+srv://blog:<4pXx1AKESt3wM6Nh>@cluster0.hrkxijh.mongodb.net/?retryWrites=true&w=majority