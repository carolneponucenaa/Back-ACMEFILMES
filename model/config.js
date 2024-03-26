const ERROR_INVALID_ID = {status: false, status_code:400, message:'O ID encaminhado na requisição não é válido'}
const ERROR_REQUIRED_FIELDS = {status: false, status_code:400, message:'Existem campos obrigatórios que não foram preenchidos ou ultrapassaram o limite de caracters !!!'}
const ERROR_NOT_FOUND = {status: false, status_code:404, message:'Nenhum item encontrado'}
const ERROR_INTERNAL_SERVER_DB = {status: false, status_code:500, message:'Ocorreram erros no processamento no Banco de Dados. Contate o administrador da API'}
const SUCESS_CREATED_ITEM = {status: true, status_code: 201,message: 'Item criado com sucesso no Banco de Dados!!!'}
const ERROR_CONTENT_TYPE = {status: false,status_code: 415, message:'O content-type não é suportado na API. Deve-se encaminhar dados em formato application/json'}
const ERROR_INTERNAL_SERVER = {status: true, status_code: 500,message: 'Ocorreram erros no servidor Back-end na camada de serviços/negócios, portanto não foi possível processar a requisição. Contate o administrador da API!!'}
const SUCESS_DELETED_ITEM = {status: true, status_code: 201,message: 'Item excluído com sucesso no Banco de Dados!!!'}

module.exports ={
    ERROR_INVALID_ID,
    ERROR_REQUIRED_FIELDS,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_DB,
    SUCESS_CREATED_ITEM,
    ERROR_CONTENT_TYPE,
    ERROR_INTERNAL_SERVER,
    SUCESS_DELETED_ITEM
}