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
            data_nascimento,
            data_falecimento,
            
            biografia,
            sexo,
            id_sexo
          ) values (
              '${dadosAtores.nome}',
              '${dadosAtores.nome_artistico}',
              '${dadosAtores.data_nascimento}',
              '${dadosAtores.data_falecimento}',
              '${dadosAtores.biografia}',
              '${dadosAtores.sexo}'
              '${dadosAtores.id_sexo}'
          )

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
module.exports = {
    insertAtores
  }