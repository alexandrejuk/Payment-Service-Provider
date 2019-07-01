# Test Backend Pagar.me
Teste técnico do Pagar.me, desenvolvido com NodeJS, ExpressJS e a base de dados, feita com PostgresSQL, usando Sequelize para o ORM.

# Requerido
* Docker
* Docker-Compose
* NodeJS

## Como usar

## Endpoint da API
1. api/v1/companies
2. api/v1/transactions
3. api/v1/balance

# EndPoint Companies 
## Método POST 
A api possibilita cadastrar a company(Empresa) que irá utilizar a api com o método POST, segue exemplo do **body**, desse método.

```
POST http://localhost:3000/api/v1/companies
```

### Body Params
Field        | Required  | Info 
------------ | --------- | -------
social_name  | true      | Nome da empresa
cnpj         | true      | CNPJ da empresa



```json
{
  "social_name": "Company name ltda",
  "cnpj": "11222333000100"
}
```

Exemplo da resposta do **endpoint** acima:

```json
{
  "id": "8f528bb0-5fb4-467b-87ef-f74039959da2",
  "social_name": "Company name ltda",
  "cnpj": "11222333000100",
  "updatedAt": "2019-07-01T12:54:22.188Z",
  "createdAt": "2019-07-01T12:54:22.188Z"
}
```

## Método GET por Id
A api possibilita buscar informações de uma a company(Empresa) por Id com o método get, segue exemplo do **endpoint**, desse método.

```
POST http://localhost:3000/api/v1/companies/8f528bb0-5fb4-467b-87ef-f74039959da2
```
Exemplo da resposta do **endpoint** acima:

```json
{
  "id": "8f528bb0-5fb4-467b-87ef-f74039959da2",
  "social_name": "Company name ltda",
  "cnpj": "11222333000100",
  "updatedAt": "2019-07-01T12:54:22.188Z",
  "createdAt": "2019-07-01T12:54:22.188Z"
}
```

# EndPoint Transactions 
## Método POST 
A api possibilita capturar uma transação de pagamento, para a realização da captura a api utiliza o método POST, segue exemplo do **body**, desse método. Todas as transações enviada para API deve conter o campo **companyId**

```
POST http://localhost:3000/api/v1/transactions
```

### Body Params
Field                   | Required  | Info 
----------------------- | --------- | ---------------------------------------------
amount                  | true      | valor da transação
card_number             | true      | número do cartão
card_cvv                | true      | cvv do cartão
card_expiration_date    | true      | data de expiração
card_holder_name        | true      | nome impresso
description             | true      | descrição da transação
payment_method          | true      | forma de pagamento crédito ou débito
payment_date            | true      | data que foi realizado o pagamento
companyId               | true      | id da empresa que a transação foi processada

```json
{
  "amount": 1000,
  "card_number": "1111222233334444",
  "card_cvv": "677",
  "card_expiration_date": "1220",
  "card_holder_name": "Alexandre dos Santos Soares",
  "description": "xbox 360",
  "payment_method": "debt_card",
  "payment_date": "Fri Jun 28 2019 15:43:37 GMT-0300 (Brasilia Standard Time)",
  "companyId": "8f528bb0-5fb4-467b-87ef-f74039959da2"
}
```

Exemplo da resposta do **endpoint** acima:

```json
{
  "id": "5c972659-c62d-4e6c-b19a-09129d3848d6",
  "amount": 1000,
  "card_number": "1111222233334444",
  "card_cvv": "677",
  "card_expiration_date": "1220",
  "card_holder_name": "Alexandre dos Santos Soares",
  "description": "xbox 360",
  "payment_method": "debt_card",
  "payment_date": "2019-06-28T18:43:37.000Z",
  "companyId": "9491ebf1-6b16-4fef-bc39-ee0c7b2192a7",
  "updatedAt": "2019-07-01T13:17:56.772Z",
  "createdAt": "2019-07-01T13:17:56.772Z"
}
```

## Autor
[Alexandre dos Santos Soares](https://github.com/alexandrejuk)