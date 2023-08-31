const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json())
app.use(cors());



//create database connection
const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"",
    database:"userdb"
})


app.post('/register', (req,res) =>{
 
    const sentEmail = req.body.Email
    const sentUserName = req.body.UserName
    const sentPassword = req.body.Password

    const SQL = 'INSERT INTO users (email, username, password) VALUES (?,?,?)'
    
    const Values = [sentEmail,sentUserName,sentPassword]

    db.query(SQL,Values, (err,results) => {
        if(err){
            res.send(err)
        }
        else{
            console.log('User inserted successfully')
            res.send({message: 'User added to db'})
        }
    })

})


app.post('/login', (req,res) => {
    const sentloginUserName = req.body.LoginUserName
    const sentloginPassword = req.body.LoginPassword

    const SQL = 'SELECT * FROM users WHERE username = ? && password = ?'
    
    const Values = [sentloginUserName,sentloginPassword]
    
    db.query(SQL,Values, (err,results) => {

        if(err){
            res.send({error: err})
        }
        if(results.length > 0 ){
            res.send(results)
        }
        else{
            res.send({message: `Kullanıcı bulunamadı`})
        }
    })


})


//Run server
app.listen(3002, ()=>{
    console.log('Server is running on port 3002');
})




