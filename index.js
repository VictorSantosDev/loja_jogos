const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require('mysql');
const port = process.env.PORT || 3000;

const app = express();

// para pegar o request do body
app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(express.json());

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', (req, res) => {

    const sql = "SELECT * FROM produto order by id desc limit 3";   
    

    conn.query(sql, function (err, data) {
        if(err){
            console.log(err)
            return
        }

        const produtos = data;

        if(produtos == ''){
            verificaProdutos = false
        }else{
            verificaProdutos = true
        }

        if(produtos.length >= 3){
            exibirMais = true;
        }else{
            exibirMais = false;
        }

        res.render('home', {produtos, verificaProdutos, exibirMais});
    });

})

app.post('/produto/create', (req, res) => {
    
    const jogo = req.body.jogo;
    const quantidade = req.body.quantidade;
    const valor = req.body.valor;
    const aleatorio = req.body.aleatorio

    if(aleatorio == 1){
        let numeroAleatorio = Math.round(Math.random());
        let hexaAleatorio = Math.random().toString().slice(2);
        let indiceAleatorio = Math.round(hexaAleatorio.slice(0, 1));
        let num1 = Math.round(hexaAleatorio.slice(0, 1));
        let num2 = Math.round(hexaAleatorio.slice(1, 2));
        let num3 = Math.round(hexaAleatorio.slice(2, 3));
        let num4 = Math.round(hexaAleatorio.slice(3, 4));
        let num5 = Math.round(hexaAleatorio.slice(4, 5));
        let num6 = Math.round(hexaAleatorio.slice(5, 6));
    
    
        let aleatorio = [];
        aleatorio[0] = Array('a', '1', 'c', '2', 'e', '5', 'a', '7', 'c', '8');
        aleatorio[1] = Array('0', 'a', 'f', '8', '4', '5', '6', '7', '8', '5');
        aleatorio[2] = Array('a', '1', 'a', 'a', 'e', '5', 'a', '7', 'c', '7');
        aleatorio[3] = Array('0', 'b', '2', '5', 'f', 'a', '6', '7', '8', '9');
        aleatorio[4] = Array('a', '1', 'c', '8', 'e', 'f', 'a', 'a', 'c', '1');
        aleatorio[5] = Array('0', 'c', '2', '7', '4', '5', 'f', '7', '8', 'a');
        aleatorio[6] = Array('a', '1', 'e', '8', 'e', '5', 'a', 'f', 'c', '2');
        aleatorio[7] = Array('0', 'd', '2', '8', '4', '5', '6', '7', 'f', '8');
        aleatorio[8] = Array('a', '1', 'c', 'e', 'e', '5', 'a', '7', 'c', 'f');
        aleatorio[9] = Array('0', 'e', '2', '5', '4', '5', '6', '7', '8', '3');
        
        var cor = aleatorioHexadecimal(
            aleatorio[numeroAleatorio][num1],
            aleatorio[numeroAleatorio][num2],
            aleatorio[numeroAleatorio][num3],
            aleatorio[numeroAleatorio][num4],
            aleatorio[numeroAleatorio][num5],
            aleatorio[numeroAleatorio][num6],
        );
        function aleatorioHexadecimal(um, dois, tres, quatro, cinco, seis){
            let hexa = `#${um}${dois}${tres}${quatro}${cinco}${seis}`;
            return hexa
        }
    }
    

    if(req.body.jogo == ''){
        res.redirect('/');
    }else{
        const sql = `INSERT INTO produto (jogo, quantidade, valor, aleatorio) VALUES ('${jogo}', '${quantidade}', '${valor}', '${cor}')`
    
        conn.query(sql, function (err){
            if(err){
                console.log(err);
                return
            }
    
            res.redirect('/');
    
        })
    }
})

app.get('/filtro', (req, res) => {

    const sql = "SELECT * FROM produto order by id desc";   

    conn.query(sql, function (err, data) {
        if(err){
            console.log(err)
            return
        }

        const produtos = data;

        res.render('filtro', {produtos});
    });

})

app.get('/editar/:id', (req, res) => {
    const id = req.params.id;

    const sql = `SELECT * FROM produto WHERE id = ${id}`

    conn.query(sql, function (err, data){
        if(err){
            console.log(err);
            return
        }

        const produto = data[0]
        res.render('editar', {produto});

    })

})

app.post('/produto/update', (req, res) => {

    const id = req.body.id;
    const jogo = req.body.jogo;
    const quantidade = req.body.quantidade;
    const valor = req.body.valor;

    const sql = `UPDATE produto SET jogo = '${jogo}', quantidade = '${quantidade}', valor = '${valor}' WHERE id = '${id}'`

    conn.query(sql, function (err){
        if(err){
            console.log(err)
            return
        }

        res.redirect('/filtro');
    })
})


const conn = mysql.createConnection({
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'be7b28157c7767',
    password: 'c03f623a',
    database: 'heroku_128f32d67dd5426',
});

conn.connect(function(err) {
    if(err){
        console.log(err)
    }

    console.log('conectou com mysql!')

    app.listen(port); 
})