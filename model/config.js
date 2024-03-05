const ERROR_INVALID_ID = {status: false, status_code:400, message:'O ID encaminhado na requisição não é válido'}
const ERROR_REQUIRED_FIELDS = {status: false, status_code:400, message:'Existem campos obrigatórios que não foram preenchidos ou ultrapassaram o limite de caracters !!!'}
const ERROR_NOT_FOUND = {status: false, status_code:404, message:'Nenhum item encontrado'}
const ERROR_INTERNAL_SERVER_DB = {status: false, status_code:500, message:'Ocorreram erros no processamento no Banco de Dados. Conate o administrador da API'}
const SUCESS_CREATED_ITEM = {status: true, status_code: 201,message: 'Item criado com sucesso no Banco de Dados!!!'}

module.exports ={
    ERROR_INVALID_ID,
    ERROR_REQUIRED_FIELDS,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_DB,
    SUCESS_CREATED_ITEM
}