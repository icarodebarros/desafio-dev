# Desafio programação - ByCoders

(O arquivo README.md original com as regras do desafio pode ser encontrado [aqui](https://github.com/icarodebarros/desafio-dev/edit/main/README.old.md))

1. Esse projeto consiste em duas aplicações (front e back) que vizam realizar o desafio proposto.
A api back-end é extremamente simples pois a instrução era para focar no front-end. Dessa forma lhe faltam dependências básicas como ORM, inclusive necessária para segurança evitando problemas como SQL Injection. Assim, essa api é de cunho demostrativo apenas.
2. O front-end foi criado em React usando template Typescrypt. Pelo tempo curto disponível para o desenvolvimento ficaram pendentes algumas melhorias como: criação de um Contexto para facilitar a comunicação entre componentes, divisão de códigos em componentes mais atômicos, implementação dos testes unitários, e por fim uma maior interação com o API.

## Configuração

O projeto foi desenvolvido para funcionar em 3 contêiners docker (db, api, react app), logo, para rodá-lo basta:
1. Ter o docker instalado no ambiente
2. Abrir o terminal na raiz do projeto
3. Rodar o comando `docker-compose up -d`

OBS1.: O front roda na porta 3000, e o back na 9001
OBS2.: Caso o log da api apresente erro de conecção com o banco (ECONNREFUSED) da primeira vez que executar, basta reiniciar o container (apenas da API).