# Teste Backend Pagar.me
Teste técnico do Pagar.me, desenvolvido com NodeJS, ExpressJS e a base de dados, feita com PostgresSQL, usando Sequelize para o ORM.

# Requerido
* Docker
* Docker-Compose
* NodeJS

## Como usar

1. clone o repositório: git@github.com:alexandrejuk/Payment-Service-Provider.git
2. cd Payment-Service-Provider
3. npm install
4. docker-compose up -d (para iniciar o banco de dados)
5. npm run migrate (para criar as tabelas)
6. npm test (para executar os testes)
7. npm start (para iniciar a aplicação)


## Endpoint da API
1. api/v1/companies
2. api/v1/companies/:companyId/transactions
3. api/v1/companies/:companyId/balance

## EndPoint Companies

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
A api possibilita buscar as informações de uma company(Empresa) por Id com o método get, segue exemplo do **endpoint**, desse método.

```
GET http://localhost:3000/api/v1/companies/8f528bb0-5fb4-467b-87ef-f74039959da2
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

## EndPoint Transactions 

## Método POST 
A api possibilita capturar uma transação de pagamento, para a realização da captura a api utiliza o método POST. Todas as transações enviada para o endpoint **transactions ou balance**, deve conter o **companyId** no params do endpoint, segue exemplo do **body**, desse método.

```
POST http://localhost:3000/api/v1/companies/:companyId/transactions
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
}
```

Exemplo da resposta do **endpoint** acima:

```json
{
  "id": "5c972659-c62d-4e6c-b19a-09129d3848d6",
  "amount": 1000,
  "card_number": "4444",
  "card_cvv": "677",
  "card_expiration_date": "1220",
  "card_holder_name": "Alexandre dos Santos Soares",
  "description": "xbox 360",
  "payment_method": "debt_card",
  "payment_date": "2019-06-28T18:43:37.000Z",
  "updatedAt": "2019-07-01T13:17:56.772Z",
  "createdAt": "2019-07-01T13:17:56.772Z"
}
```

## Método GET 
A api possibilita buscar as informações das transações processadas com os seus recebíveis. Todas as transações enviada para o endpoint **transactions ou balance**, deve conter o **companyId** no params do endpoint, segue exemplo do **body**, desse método.

```
GET http://localhost:3000/api/v1/companies/:companyId/transactions
```

Exemplo da resposta do **endpoint** acima:

```json
[
  {
    "id": "ec2cdd4e-1ebe-494f-a528-dd1f2459f193",
    "amount": 970,
    "status": "paid",
    "payment_date": "2019-06-28T18:43:37.000Z",
    "createdAt": "2019-07-01T17:38:21.402Z",
    "updatedAt": "2019-07-01T17:38:21.402Z",
    "transactionId": "d64ebcd7-63e8-4788-b742-736b92e44aa5",
    "transaction": {
      "id": "d64ebcd7-63e8-4788-b742-736b92e44aa5",
      "amount": 1000,
      "card_number": "4444",
      "card_cvv": "677",
      "card_expiration_date": "1220",
      "card_holder_name": "Alexandre dos Santos Soares",
      "description": "xbox 360",
      "payment_method": "debt_card",
      "payment_date": "2019-06-28T18:43:37.000Z",
      "createdAt": "2019-07-01T17:38:21.381Z",
      "updatedAt": "2019-07-01T17:38:21.381Z",
      "companyId": "e689c8d3-7d6b-4515-92d4-8b02c61c441f"
    }
  },
  {
    "id": "89adf84a-c487-4497-b7f7-bfce5a54df6c",
    "amount": 970,
    "status": "paid",
    "payment_date": "2019-06-28T18:43:37.000Z",
    "createdAt": "2019-07-01T18:49:42.745Z",
    "updatedAt": "2019-07-01T18:49:42.745Z",
    "transactionId": "dc1ecbdd-9412-4907-95a1-cb199e7f0976",
    "transaction": {
      "id": "dc1ecbdd-9412-4907-95a1-cb199e7f0976",
      "amount": 1000,
      "card_number": "4444",
      "card_cvv": "677",
      "card_expiration_date": "1220",
      "card_holder_name": "Alexandre dos Santos Soares",
      "description": "xbox 360",
      "payment_method": "debt_card",
      "payment_date": "2019-06-28T18:43:37.000Z",
      "createdAt": "2019-07-01T18:49:42.724Z",
      "updatedAt": "2019-07-01T18:49:42.724Z",
      "companyId": "e689c8d3-7d6b-4515-92d4-8b02c61c441f"
    }
  }
]
```


## EndPoint Balance 

## Método GET 
A api possibilita buscar as informações dos recebíveis das transações processadas. Todas as transações enviada para o endpoint **transactions ou balance**, deve conter o **companyId** no params do endpoint, segue exemplo do **body**, desse método.

```
GET http://localhost:3000/api/v1/companies/:companyId/balance
```

Exemplo da resposta do **endpoint** acima:

```json
{
  "waiting_funds": 2850,
  "available": 1940
}
```

## Autor
[Alexandre dos Santos Soares](https://github.com/alexandrejuk)
