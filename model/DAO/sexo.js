/*********************************
 * Objetivo: Arquivo responsável por realizar validações, consistencia e regra de negócio para os sexo
 * Data: 23/04/2024
 * Autor: Carolina Neponucena
 * Versão: 1.0
 */

const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient();

const selectByIdSexo = async function(id){
    try{
    let sql = `select * from tbl_sexo where id= ${id}`
    let rsSexo = await prisma.$queryRawUnsafe(sql)
    return rsSexo
}
catch(error){
    return false
}}
module.exports = {
    selectByIdSexo
}