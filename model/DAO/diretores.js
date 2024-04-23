/*********************************
 * Objetivo: Arquivo responsável por realizar validações, consistencia e regra de negócio para os diretores
 * Data: 23/04/2024
 * Autor: Carolina Neponucena
 * Versão: 1.0
 */

const {PrismaClient} = require('@prisma/client')


const prisma = new PrismaClient();