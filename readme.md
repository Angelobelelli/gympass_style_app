# App

Gympass style app

## RFs (Requisitos Funcionais)

- [x] Deve ser possivel se cadastrar;
- [x] Deve ser possivel realizar login;
- [x] Deve ser possivel obter o perfil de um usuario logado;
- [x] Deve ser possivel obter o numero de check-ins realizados pelo usuario logado;
- [x] Deve ser possivel o usuario obter seu historico de check-ins;
- [x] Deve ser possivel o usuario buscar academias proximas( até 10km );
- [x] Deve ser possivel o usuario buscar academias pelo nome;
- [x] Deve ser possivel o usuario realizar check-in em uma academia;
- [x] Deve ser possivel validar o check-in de um usuario;
- [x] Deve ser possivel cadastrar uma academia;

## RNs (Regras de Negócio)

- [x] O usuario não deve poder se cadastrar com um email ja existente;
- [x] O usuario não pode fazer 2 check-ins no mesmo dia;
- [x] O usuario não pode fazer check-ins se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por admintradores;
- [ ] A academia só pode ser cadastrada por administradores



## RNFs (Requisitos não funcionais)

- [x] A senha do usuario precisa estar criptografada;
- [x] Os dados da aplicacao precisam estar em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por pagina;
- [ ] A aplicacao precisa ter um sistema de login com JWT;
