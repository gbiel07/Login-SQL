const express = require('express');
const bodyParser = require('body-parser');

const mysql = require('mysql2');

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host:'localhost',
    user :'Gabriel',
    password :'SENAI123',
    database : 'Usuarios'
})

db.connect((error)=>{
    if(error){
        console.log('Erro ao conectar com o MySql')
    } else{
        console.log('Conectado ao SQL')
    }
})

    app.use(bodyParser.urlencoded({ extended: true }));

    app.get("/", (req, res)=>{
        res.sendFile(__dirname + '/login.html')
    })
app.post ("/login", (req, res)=>{

    const username = req.body.usuario
    const password = req.body.senha
    
    console.log(username)
    console.log(password)

    db.query('SELECT password FROM user WHERE username = ? ', [username], (error, results)=>{

    
        if (results.length > 0 ){

        const passwordBD = results [0].password;
        if (passwordBD == password){
            
        res.sendFile(__dirname + '/pg_inicial.html')
        console.log('Usuario Encontrado');
        console.log('Senha Correta');
        
        } else{
            res.sendFile(__dirname + '/erro.html')
            console.log('Usuario Encontrado')
            console.log('Senha Incorreta')
         } 
         } else{
            res.sendFile(__dirname + '/erro.html')
            console.log('Usuario não cadastrado')
         }
        

       
    })

});


app.listen(port, ()=>{
    console.log(`Servidor rodando no endereço: http://localhost:${port}`)
})