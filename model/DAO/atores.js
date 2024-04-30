/*********************************
 * Objetivo: Arquivo responsável por realizar validações, consistencia e regra de negócio para os atores
 * Data: 23/04/2024
 * Autor: Carolina Neponucena
 * Versão: 1.0
 */

const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

const insertAtores=async function(dadosAtores){
    try {
        let sql=`insert into tbl_ator( nome,
            nome_artistico,
            foto,
            data_nascimento,
            data_falecimento,
            biografia,
            id_sexo
          ) values (
              '${dadosAtores.nome}',
              '${dadosAtores.nome_artistico}',
              '${dadosAtores.foto}',
              '${dadosAtores.data_nascimento}',
              '${dadosAtores.data_falecimento}',
              '${dadosAtores.biografia}',
              ${dadosAtores.id_sexo}
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

const selectAllAtores = async function(){

    let sql = 'select * from tbl_ator'

    let rsAtores = await prisma.$queryRawUnsafe(sql)

    if (rsAtores.length > 0){
    return rsAtores
}
    else{
    return false
}
}

const selectByIdAtores = async function(id){
    try{
    let sql = `select * from tbl_ator where id= ${id}`
    let rsAtores = await prisma.$queryRawUnsafe(sql)
    return rsAtores
}
catch(error){
    return false
}}

const deleteAtores = async (id) => {

    try {
        let sql = `delete from tbl_ator where id = ${id}`

        let rsAtores = await prisma.$queryRawUnsafe(sql)

        return rsAtores

    } catch (error) {
        return false
    }

}

const updateAtores =async function(id, dadosAtores){
    try {
        sql = `update tbl_ator set 
                                                nome ='${dadosAtores.nome}',
                                                nome_artistico = '${dadosAtores.nome_artistico}',
                                                data_nascimento = '${dadosAtores.data_nascimento}',
                                                data_falecimento = '${dadosAtores.data_falecimento}',
                                                biografia = '${dadosAtores.biografia}',
                                                id_sexo = '${dadosAtores.id_sexo}'
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
    insertAtores,
    updateAtores,
    selectAllAtores,
    selectByIdAtores,
    deleteAtores
  }