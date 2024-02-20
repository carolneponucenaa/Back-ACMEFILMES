/*********************************
 * Objetivo: Arquivo responsável por realizar validações, consistencia e regra de negócio para os filmes
 * Data: 30/01/2024
 * Autor: Carolina Neponucena
 * Versão: 1.0
 */
const message = require('../model/config')
const filmesDAO = require('../model/DAO/filme.js')

//Inserir um novo filme
const setInserirNovoFilme = async function(){

}

//Atualizar um filme existente
const setAtualizarFilme = async function(){
    
}

//Excluir um filme existente
const setExcluirFilme = async function(){
    
}

//Retornar todos os filmes do banco de dados
const getListarFilme = async function(){
    //Cria o objeto JSON
    let filmesJSON = {}
    //Chama a função do DAO para retornar os dados do banco
    let dadosFilmes = await filmesDAO.selectAllFilmes()

    //Validação para criar o JSON dos dados
    if(dadosFilmes){
        //Cria o JSON de retorno dos dados
        filmesJSON.filmes = dadosFilmes
        filmesJSON.quantidade = dadosFilmes.length
        filmesJSON.status_code = 200

        return filmesJSON
    }else{
        return false
    }
}

//Retornar o filtro pelo ID
const getBuscarFilme = async function(id){
    let idFilme = id
    let filmeJSON = {}

    if (idFilme == '' || idFilme == undefined || isNaN(idFilme)){
        return message.ERROR_INVALID_ID
    }else{

        let dadosFilmes = await filmesDAO.selectByIdFilme(idFilme)
        if(dadosFilmes){

            if(dadosFilmes.length > 0){
            filmeJSON.filme = dadosFilmes
            filmeJSON.status_code = 200

            return filmeJSON
        }else{
            return message.ERROR_NOT_FOUND
        }
        }else{
           return message.ERROR_INTERNAL_SERVER_DB
        }
    }
}
module.exports = {
    setAtualizarFilme,
    getBuscarFilme,
    setExcluirFilme,
    setInserirNovoFilme,
    getListarFilme
}