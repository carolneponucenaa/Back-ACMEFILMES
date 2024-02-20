const ERROR_INVALID_ID = {status: false, status_code:400, message:'O ID encaminhado na requisição não é válido'}
const ERROR_NOT_FOUND = {status: false, status_code:404, message:'Nenhum item encontrado'}
const ERROR_INTERNAL_SERVER_DB = {status: false, status_code:500, message:'Ocorreram erros no processamento no Banco de Dados. Conate o administrador da API'}

module.exports ={
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_DB
}