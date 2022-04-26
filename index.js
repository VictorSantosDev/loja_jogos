const express = require("express");
const exphbs = require("express-handlebars");
const pool = require('./db/conn')
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

    pool.query(sql, function (err, data) {
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
        let valoresAlea = [];
        for(let i = 1; i <= 6; i++){

            let alea = Math.round(Math.random());
            valoresAlea.push(alea)
            
        }

        let hexaAleatorio = Math.random().toString().slice(2);
        // numero do hexadecimal aleatorios
        let hexaAlea = [];
        for(let i = 1; i <= 6; i++){
            let y = i + 1;
            let inteiro = Math.round(hexaAleatorio.slice(i, y));
            hexaAlea.push(inteiro)
        }

        let aleatorio = [];
        aleatorio[0] = Array('a', 'b', 'c', 'd', 'e', 'f', 'a', 'b', 'c', 'd');
        aleatorio[1] = Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9');

        // cor gerada
        var cor = aleatorioHexadecimal(
            aleatorio[valoresAlea[0]][hexaAlea[0]],
            aleatorio[valoresAlea[1]][hexaAlea[1]],
            aleatorio[valoresAlea[2]][hexaAlea[2]],
            aleatorio[valoresAlea[3]][hexaAlea[3]],
            aleatorio[valoresAlea[4]][hexaAlea[4]],
            aleatorio[valoresAlea[5]][hexaAlea[5]],
        );

        function aleatorioHexadecimal(um, dois, tres, quatro, cinco, seis){
            let hexa = `#${um}${dois}${tres}${quatro}${cinco}${seis}`;
            return hexa
        }
    }
    

    if(req.body.jogo == ''){
        res.redirect('/');
    }else{
        const sql = `INSERT INTO produto (??, ??, ??, ??) VALUES (?, ?, ?, ?)`
        const data = ['jogo', 'quantidade', 'valor', 'aleatorio', jogo, quantidade, valor, cor]

        pool.query(sql, data, function (err){
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

    pool.query(sql, function (err, data) {
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

        res.render('filtro', {produtos, verificaProdutos});
    });

})

app.get('/editar/:id', (req, res) => {
    const id = req.params.id;

    const sql = `SELECT * FROM produto WHERE ?? = ?`
    const data = ['id', id]

    pool.query(sql, data, function (err, data){

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

    const sql = `UPDATE produto SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?`
    const data = ['jogo', jogo, 'quantidade', quantidade, 'valor',   valor, 'id', id];

    pool.query(sql, data, function (err){
        if(err){
            console.log(err)
            return
        }

        res.redirect('/filtro');
    })
})

app.post('/produto/remover/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE from produto where ?? = ?`;
    const data = ['id', id];

    pool.query(sql, data, function (err) {
        if(err){
            console.log(err);
            return
        }

        res.redirect('/filtro');
    });
})


app.listen(port); 

