/*********************************
 * Objetivo: Arquivo responsável por realizar validações, consistencia e regra de negócio para os diretores
 * Data: 23/04/2024
 * Autor: Carolina Neponucena
 * Versão: 1.0
 */
const message = require('../model/config')
const diretoresDAO = require('../model/DAO/diretores.js')
const sexoDAO = require('../model/DAO/sexo')
const nacionalidadeDAO = require('../model/DAO/nacionalidade')

const setInserirDiretores = async function(dadosDiretores, contentType){

    try{

        if (String (contentType).toLowerCase() == 'application/json'){

            let statusValidate = false
            let newDiretoresJSON = {}

            if (dadosDiretores.nome == '' || dadosDiretores.nome == undefined || dadosDiretores.nome == null || dadosDiretores.nome.length > 2000 ||
                dadosDiretores.nome_artistico == ''|| dadosDiretores.nome_artistico == undefined || dadosDiretores.nome_artistico == null || dadosDiretores.nome_artistico.length > 2000 ||
                dadosDiretores.foto == ''|| dadosDiretores.foto == undefined || dadosDiretores.foto == null || dadosDiretores.foto.length > 1000 ||
                dadosDiretores.data_nascimento == ''|| dadosDiretores.data_nascimento == undefined || dadosDiretores.data_nascimento == null || dadosDiretores.data_nascimento > 300 ||
                dadosDiretores.data_falecimento == ''|| dadosDiretores.data_falecimento == undefined || dadosDiretores.data_falecimento == null || dadosDiretores.data_falecimento > 300||
                dadosDiretores.biografia == ''|| dadosDiretores.biografia == undefined || dadosDiretores.biografia == null || dadosDiretores.biografia > 3000 ||
                dadosDiretores.id_sexo == ''|| dadosDiretores.id_sexo == undefined || dadosDiretores.id_sexo == null
                ){
                    return message.ERROR_REQUIRED_FIELDS
            }else{
                statusValidate = true
            }

            if(statusValidate){

                let newDiretores = await diretoresDAO.insertDiretores(dadosDiretores)

                if(newDiretores){
                    newDiretoresJSON.status = message.SUCESS_CREATED_ITEM.status
                    newDiretoresJSON.status_code = message.SUCESS_CREATED_ITEM.status_code
                    newDiretoresJSON.message = message.SUCESS_CREATED_ITEM.message
                    newDiretoresJSON.diretores = dadosDiretores

                    return newDiretoresJSON
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

const getListarDiretores = async function(){

    let diretoresJSON = {}
    let dadosDiretores = await diretoresDAO.selectAllDiretores()

    if(dadosDiretores){

        const promisse = dadosDiretores.map(async(diretores)=>{
            let sexoJSON = await sexoDAO.selectByIdSexo(diretores.id_sexo)
            diretores.sexo = sexoJSON
            let nacionalidadeJSON = await nacionalidadeDAO.selectByIdNacionalidade(diretores.id)
           
            if(nacionalidadeJSON.length > 0){ 
                diretores.nacionalidade = nacionalidadeJSON
            }
        })

        await Promise.all(promisse)

        diretoresJSON.diretores = dadosDiretores

        diretoresJSON.quantidade = dadosDiretores.length
        diretoresJSON.status_code = 200

        return diretoresJSON
    }else{
        return false
    }
}

const getBuscarDiretores = async function(id){
    let idDiretor = id
    let diretoresJSON = {}

    if (idDiretor == '' || idDiretor == undefined || isNaN(idDiretor)){
        return message.ERROR_INVALID_ID
    }else{

        let dadosDiretores = await diretoresDAO.selectByIdDiretores(idDiretor)
        if(dadosDiretores){

            if(dadosDiretores.length > 0){
            diretoresJSON.diretores = dadosDiretores
            diretoresJSON.status_code = 200

            return diretoresJSON
        }else{
            return message.ERROR_NOT_FOUND
        }
        }else{
           return message.ERROR_INTERNAL_SERVER_DB
        }
    }
}

const setExcluirDiretores = async function (id) {
    try {

        let idDiretor = id

        let validaDiretores = await getBuscarDiretores(idDiretor)

        let dadosDiretores = await diretoresDAO.deleteDiretores(idDiretor)

        if (idDiretor == '' || idDiretor == undefined || isNaN(idDiretor)) {

            return message.ERROR_INVALID_ID 

        } else if(validaDiretores.status == false){
            return message.ERROR_NOT_FOUND

        } else {
            
            if(dadosDiretores)
                return message.SUCESS_DELETED_ITEM 
            else
                return message.ERROR_INTERNAL_SERVER_DB

        }


    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER
    }
}

const setAtualizarDiretores = async function(id, dadosDiretores, contentType){
    try{
        if (String (contentType).toLowerCase() == 'application/json'){
            let statusValidated = false
            let atualizarDiretorJSON={}
        
            if (dadosDiretores.nome == '' || dadosDiretores.nome == undefined || dadosDiretores.nome == null || dadosDiretores.nome.length > 2000 ||
                dadosDiretores.nome_artistico == ''|| dadosDiretores.nome_artistico == undefined || dadosDiretores.nome_artistico == null || dadosDiretores.nome_artistico.length > 2000 ||
                dadosDiretores.foto == ''|| dadosDiretores.foto == undefined || dadosDiretores.foto == null || dadosDiretores.foto.length > 1000 ||
                dadosDiretores.data_nascimento == ''|| dadosDiretores.data_nascimento == undefined || dadosDiretores.data_nascimento == null || dadosDiretores.data_nascimento > 300 ||
                dadosDiretores.data_falecimento == ''|| dadosDiretores.data_falecimento == undefined || dadosDiretores.data_falecimento == null || dadosDiretores.data_falecimento > 300||
                dadosDiretores.biografia == ''|| dadosDiretores.biografia == undefined || dadosDiretores.biografia == null || dadosDiretores.biografia > 3000 ||
                dadosDiretores.id_sexo == ''|| dadosDiretores.id_sexo == undefined || dadosDiretores.id_sexo == null
                ){
                return message.ERROR_REQUIRED_FIELDS 
            }else{
                statusValidated = true
            }
                    if (statusValidated){
                        let diretorAtualizado = await diretoresDAO.updateDiretores(id, dadosDiretores)

                        if(diretorAtualizado){
                            atualizarDiretorJSON.status         = message.SUCESS_CREATED_ITEM.status;
                            atualizarDiretorJSON.status_code    = message.SUCESS_CREATED_ITEM.status_code;
                            atualizarDiretorJSON.message        = message.SUCESS_CREATED_ITEM.message,
                            atualizarDiretorJSON.id = id,
                            atualizarDiretorJSON.diretores          = dadosDiretores
                
                            return atualizarDiretorJSON
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
    setInserirDiretores,
    setExcluirDiretores,
    getBuscarDiretores,
    getListarDiretores,
    setAtualizarDiretores
  }