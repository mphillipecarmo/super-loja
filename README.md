# Super Loja
link para o git : https://github.com/mphillipecarmo/super-loja.git

Nome: Marcos Phillipe Mendes do Carmo
Email: m.phillipe.acad@gmail.com

Trabalho realizado para a diciplina de WEB

Questão 1) Front-end: (30% da nota)
• Todas as páginas responsive design - Trazer melhorias que torne o site responsivo e com
melhor experiência para o usuário. - ok

• Modo escuro - ok(Seguindo configuração do navegador)

• Animações, transições e efeitos visuais diversos – APIs cosméticas ok (Animação das imagens da página principal e efeitos visuais no card)

• Organização do código em componentes - ok

• Processo de build para assets do front-end:

o Minimizar arquivos CSS e JS - ok (minimizado utilizando o cleancss)

o Eliminação de código morto JS

Questão 2) Back-end: (70% da nota)
• Conexão com Banco de Dados (Criar um banco de dados com as tabelas: Produto e Usuário) ok (MySql - utilizando o docker )

• Usuários devem ser cadastrados e autenticados para realizar as funções de “admin” do site.(Usuarios Logados(token no cookie) pode adicionar e remover produtos)

• As senhas devem ser persistidas no banco usando algum algoritmo de criptografia de via única. ok


• O usuário poderá inserir novos produtos, excluir e alterar os já existentes. ok

• Poderá ser utilizado camada de dados RESTful ok

• Permitir Upload de imagens dos produtos ok(Uploade de imagems dos produtos) 

#Para rodar
Será necessario o docker e o node.
Na pasta back-end/db:
    docker build . -t superloja
    docker-compose up -d
na pasta API:
    npm install
    npm start