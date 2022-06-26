# Desafio programação - ByCoders

(O arquivo README.md original com as regras do desafio pode ser encontrado [aqui](https://github.com/icarodebarros/desafio-dev/edit/main/README.old.md))

Esse projeto consiste em duas aplicações (front e back) que permitem o upload de arquivos `.txt` contento, em um [formato específico](https://github.com/ByCodersTec/desafio-ruby-on-rails/blob/master/CNAB.txt), dados de movimentações financeiras de lojas. 
Além da possibilidade de salvar esses dados, ainda é possível visualizar as transações não apenas do arquivo inserido, mas também pelos registros já salvos no banco de dados anteriormente. O formato de visualização das transações é agrupado por loja, com indicação visual de entradas ou saídas de capital, além de um totalizador dos valores ao final da lista.

## Anotações

1. A api back-end é bastante simples pois a instrução era para focar no front-end.
2. O front-end foi criado em React usando template Typescrypt. Pelo tempo curto disponível para o desenvolvimento ficaram pendentes algumas melhorias como: amadurecimento do Context criado para facilitar a comunicação entre componentes, divisão de códigos em componentes mais atômicos, e a implementação dos testes unitários.

## Configuração

O projeto foi desenvolvido para funcionar em 3 contêiners docker (db, api, react app), logo, para rodá-lo basta:
1. Ter o docker instalado no ambiente
2. Abrir o terminal na raiz do projeto
3. Rodar o comando `docker-compose up -d`

OBS1.: O front roda na porta 3000, e o back na 9001

OBS2.: Caso o log da api apresente erro de conecção com o banco (ECONNREFUSED) da primeira vez que executar, basta reiniciar o container (apenas da API).