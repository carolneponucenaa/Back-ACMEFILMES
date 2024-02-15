/**********************************************************************
 * Objetivo: Informações sobre ACME filmes.
 * Data: 23/1/2024.
 * Autor: Carolina Neponucena Costa.
 * Versao: 1.0
 **********************************************************************/
var filmesDados = require('../model/filmes')

//Nesta requisição o sistema irá simplesmente devolver todos os filmes existentes na base de dados. 

const todosFilmes = () => {

    let filmes = filmesDados.filmes.filmes

    return filmes
}
// console.log(todosFilmes());

//Nesta requisição o sistema irá devolver os dados do filme realizando um filtro pelo ID do registro.

// const getId = (id) => {
//     let filmes = filmesDados.filmes.filmes
//     let jsonDados = null
//     let status = false

//     filmes.filmes.forEach( (dados) => {

//         if (id == dados.id) {

//            jsonDados = dados

//             status = true
//         }
//     })

//     if(status){
//         return jsonDados
//     } else {
//         return false
//     }
// }
// console.log(listarDadosId())