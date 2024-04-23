/*********************************
 * Objetivo: Arquivo responsável por realizar validações, consistencia e regra de negócio para nacionalidade
 * Data: 23/04/2024
 * Autor: Carolina Neponucena
 * Versão: 1.0
 */

const {PrismaClient} = require('@prisma/client')


const prisma = new PrismaClient();

const insertNacionalidade=async function(dadosNacionalidade){
    try {
        let sql=`insert into tbl_nacionalidade (
                nome
            ) values(
                '${dadosNacionalidade.nome}'
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

const updateNacionalidade =async function(id, dadosNacionalidade){
    try {
        let sql=`
            update tbl_nacionalidade 

            set 
            nome="${dadosNacionalidade.nome}"

            where id=${id};
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

const deleteNacionalidade = async (id) => {

    try {
        let sql = `delete from tbl_nacionalidade where id = ${id}`

        let rsNacionalidade = await prisma.$queryRawUnsafe(sql)

        return rsNacionalidade

    } catch (error) {
        return false
    }

}

const selectAllNacionalidade = async function(){

    let sql = 'select * from tbl_nacionalidade'

    let rsNacionalidade = await prisma.$queryRawUnsafe(sql)

    if (rsNacionalidade.length > 0){
    return rsNacionalidade
}
    else{
    return false
}
}

const selectByIdNacionalidade = async function(id){
    try{
    let sql = `select * from tbl_nacionalidade where id= ${id}`
    let rsNacionalidade = await prisma.$queryRawUnsafe(sql)
    return rsNacionalidade
}
catch(error){
    return false
}}
module.exports
{
    insertNacionalidade,
    selectAllNacionalidade,
    selectByIdNacionalidade,
    deleteNacionalidade,
    updateNacionalidade
}