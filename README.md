# api_testpet

## IMPORTANTE
Antes de rodar o projeto certifique se todos os requisitos abaixos foram cumpridos

#1 - Tenha instalado o NodeJs (v12 ou superior)

#2 - Tenha uma instancia de banco de dados do MySql (caso queira testar localmente)

#2.1 - No arquivo {.env} você pode configurar as principais variaveis de ambiente. Ele
  está apontando para uma instancia de banco de dados de testes previamente configurada.
  
  Caso o banco de testes não esteja em funcionamento você pode modificar as variaveis
  correspondentes nesse arquivo de acordo com sua necessidade.
  
  OBS. Esse arquivo foi deixado no git propositalmente para testes. Esse arquivo não
  deve ser deixado para versionamento no git em um ambiente de produção.



## Baixar o repositório e instalar as depenências

```bash
// Baixa o repositório
git clone https://github.com/matheuslipk/api_testpet
```

```bash
// Entrar na pasta do projeto
cd api_testpet
```

```bash
// Instalar as dependencias (De preferencia use o yarn)
'yarn'
```

ou

```bash
npm i
```


_(Durante o desenvolvimento foi utilizado o yarn como gerenciador de dependecias)_

## Rodar projeto

```bash
yarn dev
```

ou

```bash
npm run dev
```
