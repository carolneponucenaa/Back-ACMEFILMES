/*********************************
 * Objetivo: Arquivo responsável por realizar validações, consistencia e regra de negócio para os filmes
 * Data: 30/01/2024
 * Autor: Carolina Neponucena
 * Versão: 1.0
 */

//Import da biblioteca do prisma client
const {PrismaClient} = require('@prisma/client')

// Instanciando a classe PrismaClient
const prisma = new PrismaClient();

const insertFilme = async function(){

}

const updateFilme = async function(){
    
}

const deleteFilme = async function(){
    
}

const selectAllFilmes = async function(){
    //ScriptSQL para buscar todos os registros no BD
    let sql = 'select * from tbl_filme'

    /*
    $queryRawUnSafe(sql)                    --Encaminha uma variável
    $queryRaw('select * from tbl_filme')    --Encaminha direto o script
    */

    //Executa o scriptSQL no BD e guarda o retorno dos dados
    let rsFilmes = await prisma.$queryRawUnsafe(sql)

    //Validação para retornar os dados ou retornar false
    if (rsFilmes.length > 0){
    return rsFilmes
}
    else{
    return false
}
}

const selectByIdFilme = async function(id){
    try{
    let sql = `select * from tbl_filme where id= ${id}`
    let rsFilmes = await prisma.$queryRawUnsafe(sql)
    return rsFilmes
}
catch(error){
    return false
}}
module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme
}