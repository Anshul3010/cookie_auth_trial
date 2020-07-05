const express = require('express');

const cors = require('cors');
const cookieParser = require('cookie-parser');



const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());



app.use('/login',(req,res)=>{
    res.cookie('token','LOGINSUCCESSFUL')
    res.status(200).json({
       status: 'success',
       message: 'loggedIn'
    });
});

app.use('/logout',(req,res) => {
    res.clearCookie('token');
    res.status(200).json({
        status: 'success',
        message: 'Logout successful'
    });
});

app.use('/resource',(req,res) => {
    if(req.cookies.token){
        res.status(200).json({
            status: 'success',
            message: 'successfully accessed the resources',

        });

    }
    if(!req.cookies.token){
        res.status(403).json({
            status: 'error',
            message: 'you are not allowed to accesss this resource'
        });
    }
});

app.use('*',(req,res)=> {
    res.status(404).json({
        status: 'error',
        message: 'route not Available'
    });
});




module.exports = app;