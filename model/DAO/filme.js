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

const insertFilme = async function(dadosFilme, contentType){
    try{
    let = sql
    if(dadosFilme.data_relancamento == null || dadosFilme.data_relancamento == undefined ||
        dadosFilme.data_relancamento == ''){

     sql = `insert into tbl_filme( nome,
                                      sinopse,
                                      duracao,
                                      data_lancamento,
                                      
                                      foto_capa,
                                      valor_unitario
                                    ) values (
                                        '${dadosFilme.nome}',
                                        '${dadosFilme.sinopse}',
                                        '${dadosFilme.duracao}',
                                        '${dadosFilme.data_lancamento}',
                                        '${dadosFilme.foto_capa}',
                                        '${dadosFilme.valor_unitario}'
                                    )

                                    )`
        
} else{
    sql = `insert into tbl_filme( nome,
        sinopse,
        duracao,
        data_lancamento,
        data_relancamento,
        foto_capa,
        valor_unitario
      ) values (
          '${dadosFilme.nome}',
          '${dadosFilme.sinopse}',
          '${dadosFilme.duracao}',
          '${dadosFilme.data_lancamento}',
          '${dadosFilme.data_relancamento}',
          '${dadosFilme.foto_capa}',
          '${dadosFilme.valor_unitario}'
      )

      )`

      }
      let result = await prisma.$executeRawUnsafe(sql)
      if (result)
      return true
      else
      return false
}catch(error){
    return false
}
}  


const updateFilme = async (dadosFilme, idFilme) => {

    let sql

    try {

        if (dadosFilme.data_relancamento == null ||
            dadosFilme.data_relancamento == undefined ||
            dadosFilme.data_relancamento == ''
        ) {

            sql = `update tbl_filme set 
                                                '${dadosFilme.nome}',
                                                '${dadosFilme.sinopse}',
                                                '${dadosFilme.duracao}',
                                                '${dadosFilme.data_lancamento}',
                                                '${dadosFilme.foto_capa}',
                                                '${dadosFilme.valor_unitario}'
                    where id = ${idFilme}`

        } else {

            sql = `update tbl_filme set
                                                   '${dadosFilme.nome}',
                                                   '${dadosFilme.sinopse}',
                                                   '${dadosFilme.duracao}',
                                                   '${dadosFilme.data_lancamento}',
                                                   '${dadosFilme.data_relancamento}',
                                                   '${dadosFilme.foto_capa}',
                                                   '${dadosFilme.valor_unitario}'
                    where id = ${idFilme}`

        }
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true

        else
            return false

    } catch (error) {

        return false
    }

}


const deleteFilme = async (id) => {

    try {
        let sql = `delete from tbl_filme where id = ${id}`

        let rsFilmes = await prisma.$queryRawUnsafe(sql)

        return rsFilmes

    } catch (error) {
        return false
    }

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