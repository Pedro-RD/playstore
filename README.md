# Playstore

## Comandos correr

Não usar ng serve. Usar:

```shell
npm run serve
```

## Instructions

Desenvolvimento de uma WEB App em Angular.

Objetivo

Uma empresa pretende desenvolver uma Web App que facilite, aos seus utilizadores, a escolha do próximo jogo grátis a jogar. Ainda não existe um nome para a App, cria o projeto com um cognome que a tua equipe ache interessante. A empresa já está a trabalhar numa API para guardar os dados dos utilizadores e pesquisar jogos. Em anexo, tens um ficheiro JSON com a estrutura e alguns dados de testes. Usa o pacote “json-server” do Node, para servires esse JSON como uma API de testes. Estás à vontade para alterar/melhorar a estrutura dos dados. A API tem vários recursos de filtragem de dados, vê a documentação em https://github.com/typicode/json-server.

Orientações iniciais:

Andes de começares a desenvolver, lê todos os requisitos da tarefa e assim teres um melhor contexto ao desenvolver as novas funcionalidades.
Quando terminares a tarefa, compacta (num ficheiro .zip) todos os ficheiros necessários para a execução do projeto (com exceção da pasta node_modules).
Anexa esse ficheiro .zip à tarefa.
E submete a tarefa.

### Requisitos

#### Início de sessão, registo e perfil

- Deve ser possível o utilizador iniciar sessão com os seus dados (simulação simples; com os dados do arquivo em anexo; a API permite pesquisa por atributos, ex.: email e password).
- Deve ser possível o utilizador criar uma conta.
- Não deve ser permitido a criação de uma conta com o mesmo e-mail de outra conta (a API permite pesquisa por um atributo).
- Uma conta deve ter sempre um nome, e-mail e password.
- Deve ser possível o utilizador altear os seus dados de conta.
- O utilizador deve poder alterar ou remover o URL da foto de perfil.
- Caso o perfil não tenha uma foto associada, a App deve apresentar um fundo colorido e a primeira letra do nome do perfil.
- O utilizador só pode navegar pelo resto da aplicação, com exceção da listagem de todos os jogos, após ter iniciado sessão.

#### Lista de jogos

- O ecrã inicial, deve mostrar a lista dos jogos.
  Deve ser possível o utilizador pesquisar por um título (a API permite pesquisa por um atributo; NOTA: A API de testes só permite pesquisar por um nome/valor completo!).
- Deve ser possível o utilizador filtrar os jogos por plataforma e género (existe um objeto na API que lista todas as plataformas e géneros; a API permite pesquisa por um atributo).
- Deve ser possível o utilizador ordenar a lista por ordem alfabética dos títulos e data de lançamento (a API permite a ordenação por um atributo).
- Ao selecionar um dos itens da lista de jogos, a aplicação deve mostrar os detalhes do jogo selecionado.

#### Listas dos utilizadores

- Cada perfil vai ter 4 lista personalizadas, nas quais o utilizador vai poder adicionar, remover, e transitar os seus jogos. São elas: Jogar mais tarde, A jogar atualmente, Jogado e Concluído.
- Deve ser possível o utilizador ter acesso a cada uma dessas listas.
- Na página de detalhes de um jogo, o utilizador deve conseguir saber se o jogo já está numa das listas, adicionar a uma lista e também poder trocar o jogo para outra lista.
  Layout
- A aplicação deve ter um layout dinâmico e intuitivo.
- A empresa ainda não tem uma identidade visual para a App, deves, portanto, sugerir uma identidade visual aplicando-a a App.

- Deves notificar dar feedback visual das ações do utilizador (seja sucesso ou erro).

## Critérios de Avaliação

- Funcionalidade: Implementação correta de todos os requisitos.
- Usabilidade: Interface intuitiva e experiência do utilizador.
- Qualidade do Código: Estrutura, organização e boas práticas.

TODOS:

- Mensagem de erro login
