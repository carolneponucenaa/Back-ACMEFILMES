/*********************************
 * Objetivo: Arquivo responsável por realizar validações, consistencia e regra de negócio para classificacao
 * Data: 23/04/2024
 * Autor: Carolina Neponucena
 * Versão: 1.0
 */
const message = require('../model/config')
const classificacaoDAO = require('../model/DAO/classificacao.js')

const setInserirClassificacao = async function(dadosClassificacao, contentType){

    try{

        if (String (contentType).toLowerCase() == 'application/json'){

            let statusValidate = false
            let newClassificacaoJSON = {}

            if (dadosClassificacao.faixa_etaria == '' || dadosClassificacao.faixa_etaria == undefined || dadosClassificacao.faixa_etaria == null || dadosClassificacao.faixa_etaria.length > 2 ||
                dadosClassificacao.classificacao == ''|| dadosClassificacao.classificacao == undefined || dadosClassificacao.classificacao == null || dadosClassificacao.classificacao.length > 100 ||
                dadosClassificacao.caracteristica == ''|| dadosClassificacao.caracteristica == undefined || dadosClassificacao.caracteristica == null || dadosClassificacao.caracteristica.length > 100 ||
                dadosClassificacao.icone == ''|| dadosClassificacao.icone == undefined || dadosClassificacao.icone == null || dadosClassificacao.icone > 300){
                    return message.ERROR_REQUIRED_FIELDS
            }else{
                statusValidate = true
            }

            if(statusValidate){

                let newClassificacao = await classificacaoDAO.insertClassificacao(dadosClassificacao)

                if(newClassificacao){
                    newClassificacaoJSON.status = message.SUCESS_CREATED_ITEM.status
                    newClassificacaoJSON.status_code = message.SUCESS_CREATED_ITEM.status_code
                    newClassificacaoJSON.message = message.SUCESS_CREATED_ITEM.message
                    newClassificacaoJSON.classificacao = dadosClassificacao

                    return newClassificacaoJSON
                }else{
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE
        }
    }catch(error){
        console.log(error)
        return message.ERROR_INTERNAL_SERVER
    }
}
const getListarClassificacao = async function(){

    let classificacaoJSON = {};
    let dadosClassificacao = await classificacaoDAO.selectAllClassificacao();

    if(dadosClassificacao){
        classificacaoJSON.classificacao = dadosClassificacao;
        classificacaoJSON.quantidade = dadosClassificacao.length;
        classificacaoJSON.status_code = 200;

        return classificacaoJSON;
    }else{
        return false;
    }
}

const getBuscarClassificacao = async function(id){
    let idClassificacao = id
    let classificacaoJSON = {}

    if (idClassificacao == '' || idClassificacao == undefined || isNaN(idClassificacao)){
        return message.ERROR_INVALID_ID
    }else{

        let dadosClassificacao = await classificacaoDAO.selectByIdClassificacao(idClassificacao)
        if(dadosClassificacao){

            if(dadosClassificacao.length > 0){
            classificacaoJSON.classificacao = dadosClassificacao
            classificacaoJSON.status_code = 200

            return classificacaoJSON
        }else{
            return message.ERROR_NOT_FOUND
        }
        }else{
           return message.ERROR_INTERNAL_SERVER_DB
        }
    }
}

const setExcluirClassificacao = async function (id) {
    try {

        let idClassificacao = id

        let validaClassificacao = await getBuscarClassificacao(idClassificacao)

        let dadosClassificacao = await classificacaoDAO.deleteClassificacao(idClassificacao)

        if (idClassificacao == '' || idClassificacao == undefined || isNaN(idClassificacao)) {

            return message.ERROR_INVALID_ID 

        } else if(validaClassificacao.status == false){
            return message.ERROR_NOT_FOUND

        } else {
            
            if(dadosClassificacao)
                return message.SUCESS_DELETED_ITEM 
            else
                return message.ERROR_INTERNAL_SERVER_DB

        }


    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER
    }
}

const setAtualizarClassificacao = async function(id, dadosClassificacao, contentType){
    try{
        if (String (contentType).toLowerCase() == 'application/json'){
            let statusValidated = false
            let atualizarClassificacaoJSON={}
        
            if( dadosClassificacao.faixa_etaria             == '' || dadosClassificacao.faixa_etaria            == undefined || dadosClassificacao.faixa_etaria.length              > 80    ||
            dadosClassificacao.classificacao          == '' || dadosClassificacao.classificacao         == undefined || dadosClassificacao.classificacao.length           > 65 ||
            dadosClassificacao.caracteristica          == '' || dadosClassificacao.caracteristica         == undefined || dadosClassificacao.caracteristica.length           > 800     ||
            dadosClassificacao.icone        == '' || dadosClassificacao.icone       == undefined || dadosClassificacao.icone.length         > 200   ){
                return message.ERROR_REQUIRED_FIELDS 
            }else{
                statusValidated = true
            }
                    if (statusValidated){
                        let caracteristicaAtualizada = await classificacaoDAO.updateClassificacao(id, dadosClassificacao)

                        if(caracteristicaAtualizada){
                            atualizarClassificacaoJSON.status         = message.SUCESS_CREATED_ITEM.status;
                            atualizarClassificacaoJSON.status_code    = message.SUCESS_CREATED_ITEM.status_code;
                            atualizarClassificacaoJSON.message        = message.SUCESS_CREATED_ITEM.message,
                            atualizarClassificacaoJSON.id = id,
                            atualizarClassificacaoJSON.classificacao          = dadosClassificacao
                
                            return atualizarClassificacaoJSON
                        }else{
                            return message.ERROR_INTERNAL_SERVER_DB 
                        }
                    
            }
        }else{
            return message.ERROR_CONTENT_TYPE
        }
    }catch(error){
        console.log(error)
        return message.ERROR_INTERNAL_SERVER
    }
}

module.exports = {
    setInserirClassificacao,
    getListarClassificacao,
    setExcluirClassificacao,
    getBuscarClassificacao,
    setAtualizarClassificacao
  }