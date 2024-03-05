/*********************************
 * Objetivo: Arquivo responsável por realizar validações, consistencia e regra de negócio para os filmes
 * Data: 30/01/2024
 * Autor: Carolina Neponucena
 * Versão: 1.0
 */

//Para realizar a integração com o banco de dados precisamos de uma biblioteca 
/* SEQUELIZE ORM (biblioteca mais antiga)
   PRISMA ORM (biblioteca mais atual)
   FASTFY ORM (biblioteca mais atual)

   Instalação do PRISMA ORM
   npm install prisma --save (É quem realiza a conexao com o BD)
   npm install @prisma/client --save (É quem executa os scripts SQL )

   Após as instalações rodar o comando:
   npx prisma init (Esse comando inicializa)
   */
//Import das bibliotecas do projeto
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const funcoes = require('./controller/functions')

const app = express()

app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET')
    app.use(cors())
    next()
})

const bodyParserJSON = bodyParser.json
//Import dos arquivos internos do projeto
const controllerFilmes = require('./controller/controller_filme.js')
//1

app.get('/v1/Acme/filmes ', cors(), async function(request, response, next) {

    response.json(funcoes.todosFilmes())
    response.status(200)

})
app.get('/v2/Acme/filmes', cors(), async function(request, response, next){
    let dadosFilmes = await controllerFilmes.getListarFilme()

    if (dadosFilmes){
    response.json(dadosFilmes)
    response.status (200)
    }else{
        response.json({message: 'Nenhum registro encontrado'})
        response.status(404)
    }

})

app.post('/v2/Acme/filme', cors(), bodyParserJSON, async function(request, response, next){
    let dadosBody = request.body

    let resultDados = await controllerFilmes.setInserirNovoFilme(dadosBody)

    response.status(resultDados.status_code)
    response.json(resultDados)
})
app.listen('8080', function() {
    console.log('API funcionando e aguardando requisições')
})