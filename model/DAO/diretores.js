/*********************************
 * Objetivo: Arquivo responsável por realizar validações, consistencia e regra de negócio para os diretores
 * Data: 23/04/2024
 * Autor: Carolina Neponucena
 * Versão: 1.0
 */

const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

const insertDiretores=async function(dadosDiretores){
    try {
        let sql=`insert into tbl_diretor( nome,
            nome_artistico,
            foto,
            data_nascimento,
            data_falecimento,
            biografia,
            sexo,
            id_sexo
          ) values (
              '${dadosDiretores.nome}',
              '${dadosDiretores.nome_artistico}',
              '${dadosDiretores.foto}',
              '${dadosDiretores.data_nascimento}',
              '${dadosDiretores.data_falecimento}',
              '${dadosDiretores.biografia}',
              '${dadosDiretores.sexo}',
              ${dadosDiretores.id_sexo}
          )`

          console.log(sql)
            let result=await prisma.$executeRawUnsafe(sql)
            if(result)
                return true
            else
                return false
    } catch (error) {
        return false
    }
}

const selectAllDiretores = async function(){

    let sql = 'select * from tbl_diretor'

    let rsDiretores = await prisma.$queryRawUnsafe(sql)

    if (rsDiretores.length > 0){
    return rsDiretores
}
    else{
    return false
}
}

const selectByIdDiretores = async function(id){
    try{
    let sql = `select * from tbl_diretor where id= ${id}`
    let rsDiretores = await prisma.$queryRawUnsafe(sql)
    return rsDiretores
}
catch(error){
    return false
}}

const deleteDiretores = async (id) => {

    try {
        let sql = `delete from tbl_diretor where id = ${id}`

        let rsDiretores = await prisma.$queryRawUnsafe(sql)

        return rsDiretores

    } catch (error) {
        return false
    }

}

const updateDiretores =async function(id, dadosDiretores){
    try {
        sql = `update tbl_diretor set 
                                                nome ='${dadosDiretores.nome}',
                                                nome_artistico = '${dadosDiretores.nome_artistico}',
                                                data_nascimento = '${dadosDiretores.data_nascimento}',
                                                data_falecimento = '${dadosDiretores.data_falecimento}',
                                                biografia = '${dadosDiretores.biografia}',
                                                sexo = '${dadosDiretores.sexo}',
                                                id_sexo = '${dadosDiretores.id_sexo}'
                    where id = ${id}`
        let result=await prisma.$executeRawUnsafe(sql)
        if(result)
            return true
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}
module.exports = {
    insertDiretores,
    updateDiretores,
    selectAllDiretores,
    selectByIdDiretores,
    deleteDiretores
  }