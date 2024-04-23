/*********************************
 * Objetivo: Arquivo responsável por realizar validações, consistencia e regra de negócio para os filmes
 * Data: 30/01/2024
 * Autor: Carolina Neponucena
 * Versão: 1.0
 */
const message = require('../model/config')
const filmesDAO = require('../model/DAO/filme.js')

//Inserir um novo filme
const setInserirNovoFilme = async function(dadosFilme, contentType){ 
    try{
        if (String (contentType).toLowerCase() == 'application/json'){

            let resultDadosFilme ={}
        
            if( dadosFilme.nome             == '' || dadosFilme.nome            == undefined || dadosFilme.nome.length              > 80    ||
            dadosFilme.sinopse          == '' || dadosFilme.sinopse         == undefined || dadosFilme.sinopse.length           > 65000 ||
            dadosFilme.duracao          == '' || dadosFilme.duracao         == undefined || dadosFilme.duracao.length           > 8     ||
            dadosFilme.data_lancamento  == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento.length   > 10    ||
            dadosFilme.foto_capa        == '' || dadosFilme.foto_capa       == undefined || dadosFilme.foto_capa.length         > 200   ||
            dadosFilme.valor_unitario.length > 8  || 
            dadosFilme.id_classificacao == ''|| dadosFilme.id_classificacao == undefined || dadosFilme.id_classificacao == null
        ){

            return message.ERROR_REQUIRED_FIELDS 

        }else{

            let statusValidated = false
        
            if(dadosFilme.data_relancamento != null){
                if(dadosFilme.data_relancamento.length > 10)
                    return message.ERROR_REQUIRED_FIELDS 
                else
                 statusValidated = true
            }else{
                statusValidated = true
            }

            if (statusValidated){

                let novoFilme = await filmesDAO.insertFilme(dadosFilme)

                if(novoFilme){
                    resultDadosFilme.status         = message.SUCESS_CREATED_ITEM.status;
                    resultDadosFilme.status_code    = message.SUCESS_CREATED_ITEM.status_code;
                    resultDadosFilme.message        = message.SUCESS_CREATED_ITEM.message
                    resultDadosFilme.filme          = dadosFilme
                    return resultDadosFilme 
                }else{
                    return message.ERROR_INTERNAL_SERVER_DB 
                }
            }
        }
        }else{
            return message.ERROR_CONTENT_TYPE
        }
            }catch(error){
                return message.ERROR_INTERNAL_SERVER
            }
            }
        
        

//Atualizar um filme existente
const setAtualizarFilme = async function(id, dadosFilme, contentType){
    try{
        if (String (contentType).toLowerCase() == 'application/json'){
            let statusValidated = false
            let atualizarFilmeJSON={}
        
            if( dadosFilme.nome             == '' || dadosFilme.nome            == undefined || dadosFilme.nome.length              > 80    ||
            dadosFilme.sinopse          == '' || dadosFilme.sinopse         == undefined || dadosFilme.sinopse.length           > 65000 ||
            dadosFilme.duracao          == '' || dadosFilme.duracao         == undefined || dadosFilme.duracao.length           > 8     ||
            dadosFilme.data_lancamento  == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento.length   > 10    ||
            dadosFilme.foto_capa        == '' || dadosFilme.foto_capa       == undefined || dadosFilme.foto_capa.length         > 200   ||
            dadosFilme.valor_unitario.length > 8 ){
                return message.ERROR_REQUIRED_FIELDS 
            }else{
                let statusValidated = false
            
                if(dadosFilme.data_relancamento != null){
                    if(dadosFilme.data_relancamento.length > 10)
                        return message.ERROR_REQUIRED_FIELDS 
                    else
                        statusValidated = true
                }else{
                    statusValidated = true
                
                    if (statusValidated){
                        let filmeAtualizado = await filmesDAO.updateFilme(dadosFilme, id)
                        if(filmeAtualizado){
                            atualizarFilmeJSON.status         = message.SUCESS_CREATED_ITEM.status;
                            atualizarFilmeJSON.status_code    = message.SUCESS_CREATED_ITEM.status_code;
                            atualizarFilmeJSON.message        = message.SUCESS_CREATED_ITEM.message
                            atualizarFilmeJSON.id = id
                            atualizarFilmeJSON.filme          = dadosFilme
                
                            return atualizarFilmeJSON
                        }else{
                            return message.ERROR_INTERNAL_SERVER_DB 
                        }
                    }
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE
        }
    }catch(error){
        return message.ERROR_INTERNAL_SERVER
    }
}

//Excluir um filme existente
const setExcluirFilme = async function(id){
    try {

        let idFilme = id

        let validaFilme = await getBuscarFilme(idFilme)

        let dadosFilme = await filmesDAO.deleteFilme(idFilme)

        if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {

            return message.ERROR_INVALID_ID 

        } else if(validaFilme.status == false){
            return message.ERROR_NOT_FOUND

        } else {
            
            if(dadosFilme)
                return message.SUCESS_DELETED_ITEM 
            else
                return message.ERROR_INTERNAL_SERVER_DB

        }


    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
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