/*********************************
 * Objetivo: Arquivo responsável por realizar validações, consistencia e regra de negócio para os filmes
 * Data: 16/04/2024
 * Autor: Carolina Neponucena
 * Versão: 1.0
 */

const {PrismaClient} = require('@prisma/client')


const prisma = new PrismaClient();

const insertGenero=async function(dadosGenero){
    try {
        let sql=`insert into tbl_genero (
                nome
            ) values(
                    '${dadosGenero.nome}'
            )`
            let result=await prisma.$executeRawUnsafe(sql)
            if(result)
                return true
            else
                return false
    } catch (error) {
        return false
    }
}

const updateGenero=async function(id, dadosGenero){
    try {
        let sql=`
            update tbl_genero 

            set 
                nome='${dadosGenero.nome}'

            where id='${id}';
        `
        let result=await prisma.$executeRawUnsafe(sql)
        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteGenero = async (id) => {

    try {
        let sql = `delete from tbl_genero where id = ${id}`

        let rsGenero = await prisma.$queryRawUnsafe(sql)

        return rsGenero

    } catch (error) {
        return false
    }

}

const selectAllGeneros = async function(){

    let sql = 'select * from tbl_genero'

    let rsGenero = await prisma.$queryRawUnsafe(sql)

    if (rsGenero.length > 0){
    return rsGenero
}
    else{
    return false
}
}

const selectByIdGenero = async function(id){
    try{
    let sql = `select * from tbl_genero where id= ${id}`
    let rsGenero = await prisma.$queryRawUnsafe(sql)
    return rsGenero
}
catch(error){
    return false
}}

// const selectByNomeGenero=async function(nome){
//     let nomeGenero=nome
//     try {
//         let sql=`select * from tbl_genero where nome like "%${nomeGenero}%"`
//         let rsGenero=await prisma.$queryRawUnsafe(sql)
//         return rsGenero
//     } catch (error) {
//         return false
//     }
// }

module.exports = {
    insertGenero,
    updateGenero,
    deleteGenero,
    selectAllGeneros,
    selectByIdGenero
  }