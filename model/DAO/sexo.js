/*********************************
 * Objetivo: Arquivo responsável por realizar validações, consistencia e regra de negócio para os sexo
 * Data: 23/04/2024
 * Autor: Carolina Neponucena
 * Versão: 1.0
 */

const {PrismaClient} = require('@prisma/client')


const prisma = new PrismaClient();

const insertSexo=async function(dadosSexo){
    try {
        let sql=`insert into tbl_sexo (
                sigla,
                nome
            ) values(
                '${dadosSexo.sigla}'
                '${dadosSexo.nome}'
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

const updateSexo=async function(id, dadosSexo){
    try {
        let sql=`
            update tbl_sexo 

            set 
            sigla="${dadosSexo.sigla}"
            nome="${dadosSexo.nome}"

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

const deleteSexo = async (id) => {

    try {
        let sql = `delete from tbl_sexo where id = ${id}`

        let rsSexo = await prisma.$queryRawUnsafe(sql)

        return rsSexo

    } catch (error) {
        return false
    }

}

const selectAllSexo = async function(){

    let sql = 'select * from tbl_sexo'

    let rsSexo = await prisma.$queryRawUnsafe(sql)

    if (rsSexo.length > 0){
    return rsSexo
}
    else{
    return false
}
}

const selectByIdSexo = async function(id){
    try{
    let sql = `select * from tbl_sexo where id= ${id}`
    let rsSexo = await prisma.$queryRawUnsafe(sql)
    return rsSexo
}
catch(error){
    return false
}}
module.exports
{
    insertSexo,
    selectAllSexo,
    selectByIdSexo,
    deleteSexo,
    updateSexo
}