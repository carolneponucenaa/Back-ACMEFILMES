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

const bodyParserJSON = bodyParser.json()
//Import dos arquivos internos do projeto
const controllerFilmes = require('./controller/controller_filme.js')
const controllerGenero = require('./controller/controller_genero.js')
const controllerClassificacao = require('./controller/controller_classificacao.js')
const controllerAtores = require('./controller/controller_atores.js')
const controllerDiretores = require('./controller/controller_diretores.js')


//FILMES
//////////////////////////////////////////////////////////////////////////////////

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

    let contentType = request.headers['content-type']
    console.log('contentType')
    
    let dadosBody = request.body

    let resultDados = await controllerFilmes.setInserirNovoFilme(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.delete('/v2/acmefilmes/delete/:id',  cors(), bodyParserJSON, async (request, response, next) => {
   
    let idFilme = request.params.id
    let dadosFilme = await controllerFilmes.setExcluirFilme(idFilme)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
})

app.put('/v2/acmefilmes/update/:id', cors(), bodyParserJSON, async function(request,response,next){

    let FilmesID = request.params.id
    let dadosFilme = request.body
    console.log(dadosFilme)
    let contentType = request.headers['content-type'];
    let resultUptadedFilme = await controllerFilmes.setAtualizarFilme(FilmesID, dadosFilme,contentType);

    response.status(resultUptadedFilme.status_code)
    response.json(resultUptadedFilme)

} )

//GENERO
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.get('/v2/Acme/generos', cors(), async function(request, response, next){
    let dadosGenero = await controllerGenero.getListarGenero()

    if (dadosGenero){
    response.json(dadosGenero)
    response.status (200)
    }else{
        response.json({message: 'Nenhum registro encontrado'})
        response.status(404)
    }

})

app.post('/v2/Acme/generos', cors(), bodyParserJSON, async function(request, response, next){

    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultDados = await controllerGenero.setInserirNovoGenero(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.delete('/v2/Acme/generos/:id',  cors(), bodyParserJSON, async (request, response, next) => {
   
    let idGenero = request.params.id
    let dadosGenero = await controllerGenero.setExcluirGenero(idGenero)

    response.status(dadosGenero.status_code)
    response.json(dadosGenero)

})

app.put('/v2/Acmegeneros/update/:id', cors(), bodyParserJSON, async function(request,response,next){

    let GenerosID = request.params.id
    let dadosGenero = request.body
    console.log(dadosGenero)
    let contentType = request.headers['content-type'];
    let resultUptadedGenero = await controllerGenero.setAtualizarGenero(GenerosID, dadosGenero,contentType);

    response.status(resultUptadedGenero.status_code)
    response.json(resultUptadedGenero)

} )

//CLASSIFICAÇÃO
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.post('/v2/Acme/classificacao', cors(), bodyParser.json(), async function(request, response, next){
    let contentType = request.headers['content-type']
    console.log('contentType')
    
    let dadosBody = request.body

    let resultDados = await controllerClassificacao.setInserirClassificacao(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)

})

app.get('/v2/Acme/classificacao', cors(), async function(request, response, next){
    let dadosClassificacao = await controllerClassificacao.getListarClassificacao()

    if (dadosClassificacao){
    response.json(dadosClassificacao)
    response.status (200)
    }else{
        response.json({message: 'Nenhum registro encontrado'})
        response.status(404)
    }

})

app.delete('/v2/Acme/classificacao/:id',  cors(), bodyParserJSON, async (request, response, next) => {
   
    let idClassificacao = request.params.id
    let dadosClassificacao = await controllerClassificacao.setExcluirClassificacao(idClassificacao)

    response.status(dadosClassificacao.status_code)
    response.json(dadosClassificacao)

})
app.put('/v2/Acmeclassificacao/update/:id', cors(), bodyParserJSON, async function(request,response,next){

    let ClassificacaoID = request.params.id
    let dadosClassificacao = request.body
    console.log(dadosClassificacao)
    let contentType = request.headers['content-type'];
    let resultUptadedClassificacao = await controllerClassificacao.setAtualizarClassificacao(ClassificacaoID, dadosClassificacao,contentType);

    response.status(resultUptadedClassificacao.status_code)
    response.json(resultUptadedClassificacao)

})

//ATORES
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.post('/v2/Acme/atores', cors(), bodyParser.json(), async function(request, response, next){
    let contentType = request.headers['content-type']
    
    let dadosBody = request.body

    let resultDados = await controllerAtores.setInserirAtores(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)

})

app.get('/v2/Acme/atores', cors(), async function(request, response, next){
    let dadosAtores = await controllerAtores.getListarAtores()

    if (dadosAtores){
    response.json(dadosAtores)
    response.status (200)
    }else{
        response.json({message: 'Nenhum registro encontrado'})
        response.status(404)
    }

})

app.delete('/v2/Acme/atores/:id',  cors(), bodyParserJSON, async (request, response, next) => {
   
    let idAtores = request.params.id
    let dadosAtores = await controllerAtores.setExcluirAtores(idAtores)

    response.status(dadosAtores.status_code)
    response.json(dadosAtores)

})

app.put('/v2/Acmeatores/update/:id', cors(), bodyParserJSON, async function(request,response,next){

    let atoresID = request.params.id
    let dadosAtores = request.body
    console.log(dadosAtores)
    let contentType = request.headers['content-type'];
    let resultUptadedAtores = await controllerAtores.setAtualizarAtores(atoresID, dadosAtores,contentType);

    response.status(resultUptadedAtores.status_code)
    response.json(resultUptadedAtores)

})




//DIRETORES
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/v2/Acme/diretores', cors(), bodyParser.json(), async function(request, response, next){
    let contentType = request.headers['content-type']
    
    let dadosBody = request.body

    let resultDados = await controllerDiretores.setInserirDiretores(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)

})

app.get('/v2/Acme/diretores', cors(), async function(request, response, next){
    let dadosAtores = await controllerDiretores.getListarDiretores()

    if (dadosAtores){
    response.json(dadosAtores)
    response.status (200)
    }else{
        response.json({message: 'Nenhum registro encontrado'})
        response.status(404)
    }

})

app.delete('/v2/Acme/diretores/:id',  cors(), bodyParserJSON, async (request, response, next) => {
   
    let idDiretor = request.params.id
    let dadosDiretores = await controllerDiretores.setExcluirDiretores(idDiretor)

    response.status(dadosDiretores.status_code)
    response.json(dadosDiretores)

})

app.put('/v2/Acme/update/:id', cors(), bodyParserJSON, async function(request,response,next){

    let diretorID = request.params.id
    let dadosDiretores = request.body
    console.log(dadosDiretores)
    let contentType = request.headers['content-type'];
    let resultUptadedDiretores = await controllerDiretores.setAtualizarDiretores(diretorID, dadosAtores,contentType);

    response.status(resultUptadedDiretores.status_code)
    response.json(resultUptadedDiretores)

})






app.listen('8080', function() {
    console.log('API funcionando e aguardando requisições')
})
