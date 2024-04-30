/*********************************
 * Objetivo: Arquivo responsável por realizar validações, consistencia e regra de negócio para nacionalidade
 * Data: 23/04/2024
 * Autor: Carolina Neponucena
 * Versão: 1.0
 */

const {PrismaClient} = require('@prisma/client')


const prisma = new PrismaClient();


const selectByIdNacionalidade = async function(id){
    try{
    let sql = `select * from tbl_nacionalidade where id= ${id}`
    let rsNacionalidade = await prisma.$queryRawUnsafe(sql)
    return rsNacionalidade
}
catch(error){
    return false
}}
module.exports = {
    selectByIdNacionalidade
}