# API-BLOGPOSTS
API de CRUD de posts de blogs. Api desenvolvida para [desafio back-end da Trybe](https://github.com/betrybe/backend-test).  A API consiste em 11 endpoints para gerenciar usuários e posts. O projeto foi desenvolvido com em JavaScript, NodeJs (14.x), utilizando o framework [AdonisJS (4.1)](https://adonisjs.com/).
Uma versão, publicada pela plataforma heroku, está disponível [aqui](https://api-blogposts.herokuapp.com/).
## Índice
 1. [Endpoints](#endpoints)
	
	 1. [Adicionar Usuário](#adduser) 
	 2.  [Fazer Login](#login)
	 3.  [Listar Usuários](#lstuser)
	 4.  [Consultar Usuário](#getuser) 
	 5.  [Remover Usuário](#deluser) 
	 6.  [Adicionar Post](#addpost) 
	 7.  [Listar Posts](#lstpost) 
	 8.   [Consultar Post](#getpost)
	 9.    [Editar Post](#editpost)
	 10.  [Buscar Post](#searchpost) 
	 11.  [Remover Post](#delpost)

 
2. [Autenticação](#autenticação)
3. [Deploy](#deploy)


## ENDPOINTS
### Adicionar Usuário <a id="adduser"></a>
Este endpoint cria um usuário.

**Requisição HTTP**

    POST /user

**Parâmetros Body**
|Parâmetro|Descrição|Tipo|Obrigatório|
|--|--|--|--|
| displayName | Nome de exibição de usuário, deve ter no mínimo 8 caracteres. | String | Não|
| email | Endereço de email do usuário. | String | Sim |
| password | Senha de usuário, deve ter no mínimo 6 caracteres. | String | Sim |
| image | Imagem de perfil do usuário, deve ser uma url válida. | String | Não |

**Resposta**

    HTTP 201 Created
    {
        "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTYxNDU3NDM3MH0.Pb4J5QMQIq1FFcKPAZ8BT6GSHIqL1Et1flH6-wLVVQi"
    }
  -------------
### Fazer Login <a id="login"></a>
Este endpoint gera um token (jwt) para autenticação do usuário.

**Requisição HTTP**

    POST /login

**Parâmetros Body**
|Parâmetro|Descrição|Tipo|Obrigatório|
|--|--|--|--|
| email | Endereço de email do usuário. | String | Sim |
| password | Senha de usuário. | String | Sim |

**Resposta**

    HTTP 200 Ok
    {
        "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTYxNDU3NDM3MH0.Pb4J5QMQIq1FFcKPAZ8BT6GSHIqL1Et1flH6-wLVVQi"
    }
  -------------
### Listar Usuários <a id="lstuser"></a>
Este endpoint lista todos os usuários. Exige autenticação.

**Requisição HTTP**

    GET /user


**Resposta**

    HTTP 200 Ok
    [
        {
            "id":1,
            "displayName": "Joao Doe",
            "email": "joao@email.com",
            "image": "http://afernandes.adv.br/wp-content/uploads/Team-Member-3.jpg"
        },
        {
            "id":2,
            "displayName": "Maria Joaquina",
            "email": "maria@email.com",
            "image": "https://i0.wp.com/amonovelas.com.br/wp-content/uploads/2015/02/maria-joaquina-carrossel.jpg"
        }
    ]
  -------------
### Consultar Usuário <a id="getuser"></a>
Este endpoint retorna detalhes de um usuário. Exige autenticação.

**Requisição HTTP**

    GET /user/:id

**Parâmetros URL**

| Parâmetro | Descrição | Obrigatório | 
| -- | -- | -- |
| id | O id do usuário | Sim |


**Resposta**

    HTTP 200 Ok
    {
     "id":1,
     "displayName": "Joao Doe",
     "email": "joao@email.com",
     "image": "http://afernandes.adv.br/wp-content/uploads/Team-Member-3.jpg"
    }
    
  -------------
### Remover Usuário <a id="deluser"></a>
Este endpoint apaga o usuário autenticado. Exige autenticação.

**Requisição HTTP**

    DELETE /user/me

**Resposta**

    HTTP 204 No Content
  -------------
### Adicionar Post <a id="addpost"></a>
Este endpoint cria um novo post. Exige autenticação.

**Requisição HTTP**

    POST /post
    
**Parâmetros Body**
|Parâmetro|Descrição|Tipo|Obrigatório|
|--|--|--|--|
| title| Título de post. | String | Sim|
| content | Conteúdo de post. | String | Sim |

**Resposta**

    HTTP 201 Created
    {
        "title": "Primeiro post",
        "content": "Primeiro post criado",
        "userId": 1
    }
  -------------
### Listar Posts<a id="lstpost"></a>
Este endpoint lista todos posts. Exige autenticação.

**Requisição HTTP**

    GET /post

**Resposta**

    HTTP 200 Ok
    [
        {
            "id":  1,
            "title":  "Primeiro post",
            "content":  "Primeiro post feito",
            "published": "2021-03-01T04:20:00.617Z",
            "updated":  "2021-03-01T04:20:00.617Z",
            "user":  {
                "id":  1,
                "displayName":  null,
                "email":  "joao@email.com",
                "image":  null
            }
        },
        {
            "id":  2,
            "title":  "Segundo post",
            "content":  "Segundo post feito",
            "published":  "2021-03-01T04:20:57.980Z", 
            "updated":  "2021-03-01T04:20:57.980Z",
            "user":  {
                "id":  1,
                "displayName":  null,
                "email":  "joao@email.com",
                "image":  null
            }
        }
    ]
  -------------
### Consultar Post<a id="getpost"></a>
Este endpoint retorna detalhes de um post. Exige autenticação.

**Requisição HTTP**

    GET /post/:id

**Parâmetros URL**

| Parâmetro | Descrição | Obrigatório | 
| -- | -- | -- |
| id | O id do post | Sim |


**Resposta**

    HTTP 200 Ok
    {
        "id":  1,
        "title":  "Primeiro post",
        "content":  "Primeiro post feito",
        "published": "2021-03-01T04:20:00.617Z",
        "updated":  "2021-03-01T04:20:00.617Z",
        "user":  {
            "id":  1,
            "displayName":  null,
            "email":  "joao@email.com",
            "image":  null
        }
     }
   -------------
   
### Editar Post<a id="editpost"></a>
Este endpoint atualiza um post. Exige autenticação. Exige que usuário autenticado seja autor do post.

**Requisição HTTP**

    PUT /post/:id

**Parâmetros URL**

| Parâmetro | Descrição | Obrigatório | 
| -- | -- | -- |
| id | O id do post | Sim |


**Parâmetros Body**
|Parâmetro|Descrição|Tipo|Obrigatório|
|--|--|--|--|
| title| Título de post. | String | Sim|
| content | Conteúdo de post. | String | Sim |

**Resposta**

    HTTP 200 Ok
    {
        "title": "Primeiro post",
        "content": "Primeiro post criado",
        "userId": 1
    }
   -------------
### Buscar Posts<a id="searchpost"></a>
Este endpoint busca posts por título e conteúdo. Exige autenticação.

**Requisição HTTP**

    GET /post/search?q=:searchTerm

**Parâmetros Query**

| Parâmetro | Descrição | Obrigatório | 
| -- | -- | -- |
| q| Termo para efetuar busca em título e conteúdo de posts. | Não |

**Resposta**

    [
        {
            "id":  1,
            "title":  "Primeiro post",
            "content":  "Primeiro post feito",
            "published": "2021-03-01T04:20:00.617Z",
            "updated":  "2021-03-01T04:20:00.617Z",
            "user":  {
                "id":  1,
                "displayName":  null,
                "email":  "joao@email.com",
                "image":  null
            }
        },
        {
            "id":  2,
            "title":  "Segundo post",
            "content":  "Segundo post feito",
            "published":  "2021-03-01T04:20:57.980Z", 
            "updated":  "2021-03-01T04:20:57.980Z",
            "user":  {
                "id":  1,
                "displayName":  null,
                "email":  "joao@email.com",
                "image":  null
            }
        }
    ]
  --------



### Remover Post<a id="delpost"></a>
Este endpoint apaga um post. Exige autenticação. Usuário autenticado deve ser autor do post.

**Requisição HTTP**

    DELETE /post/:id

**Parâmetros URL**

| Parâmetro | Descrição | Obrigatório | 
| -- | -- | -- |
| id | O id do post | Sim |


**Resposta**

    HTTP 204 No Content

---------------

## Autenticação

Para requisições que exigem autenticação adicionar cabeçalho com chave `Authorization` e valor igual ao token de autenticação.

    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTYxNDU3NDM3MH0.Pb4J5QMQIq1FFcKPAZ8BT6GSHIqL1Et1flH6-wLVVQi"
----
## Deploy

Para implantação a aplicação tem como requisitos `NodeJS >= 8.0.0`, `npm >= 3.0.0`, e `git`.
 1. Para deploy da API é necessário um [banco de dados suportado](https://adonisjs.com/docs/4.1/database#_supported_databases). Decidido o tipo de banco de dados, é preciso fazer a instalação dos drivers necessários.
 2. Utilizando o arquivo `.env.example` deve-se configurar as variáveis de ambiente onde se deseja fazer deploy do sistema, ou definir um arquivo `.env` para isso.
 3. Instalar dependências de aplicação com `npm i`.
 4. Criar tabelas utilizando as migrations, com o comando `node ace migration:run` .
 5. Executar aplicação com `npm start`.
 

