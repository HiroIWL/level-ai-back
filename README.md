# **LevelAI – Backend**

Backend da aplicação **LevelAI**, uma plataforma de artigos focada em Inteligência Artificial.
Este serviço cuida exclusivamente da **autenticação de usuários** (registro e login), fornecendo tokens JWT para acesso seguro ao restante do ecossistema.

---

## **Tecnologias Utilizadas**

* **Node.js**
* **NestJS** – framework modular e escalável.
* **Prisma ORM** – acesso ao banco PostgreSQL.
* **PostgreSQL** – banco de dados principal.
* **JWT (Json Web Token)** – autenticação stateless.
* **Bcrypt** – hashing seguro de senhas.
* **Class-validator / class-transformer** – validações de DTOs.
* **Swagger** – documentação automática da API.

---

## **Arquitetura**

O projeto segue a arquitetura padrão do NestJS, utilizando **módulos altamente desacoplados**, **injeção de dependência**, **DTOs** e **providers**.

Fluxo principal:

1. **AuthController**
   Recebe as requisições de login e registro.

2. **AuthService**
   Regras de autenticação, hashing de senha, validação de credenciais e geração de token JWT.

3. **JwtStrategy**
   Estratégia Passport para validar tokens em rotas protegidas.

4. **PrismaService**
   Conexão com o banco, expondo o cliente Prisma para os módulos.

5. **DTOs**
   Garantem que o input do usuário esteja dentro dos padrões esperados e bem documentado via Swagger.

---

## **Estrutura de Pastas**

```
src/
  auth/
    auth.controller.ts      # Endpoints de login e registro
    auth.module.ts          # Módulo de autenticação
    auth.service.ts         # Regras de autenticação
    jwt-auth.guard.ts       # Guarda de rotas protegidas
    jwt.strategy.ts         # Estratégia JWT (Passport)
    authenticated-request.interface.ts
    jwt-payload.interface.ts

  dtos/
    base.dto.ts
    usuario.dto.ts          # DTO de usuário com validações e conversões de/para Prisma

  prisma/
    prisma.module.ts
    prisma.service.ts       # Client Prisma injetado no sistema

  app.module.ts             # Módulo raiz da aplicação
  main.ts                   # Bootstrap da API
```

### **Pasta prisma/**

```
prisma/
  schema.prisma             # Modelo do banco de dados
```

Modelo atual:

```
model Usuario {
  id       String  @id @default(uuid())
  nome     String
  email    String  @unique
  senha    String
  telefone String
}
```

---

## **Endpoints**

### **POST /auth/register**

Cria um novo usuário.
Retorna os dados cadastrados (sem senha).

### **POST /auth/login**

Valida credenciais e retorna:

```
{
  "access_token": "jwt..."
}
```

---

## **Fluxo de Autenticação**

1. O usuário registra → senha é **hasheada com bcrypt**.
2. O login verifica email + senha.
3. Se válido, gera um **JWT assinado com o JWT_SECRET**.
4. Rotas protegidas usam `JwtAuthGuard`.

---

## **Instalação e Execução**

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar o ambiente `.env`

```
DATABASE_URL="postgresql://..."
JWT_SECRET="uma-secret-boa"
```

### 3. Gerar cliente Prisma

```bash
npx prisma generate
```

### 4. Rodar migrações

```bash
npx prisma migrate dev
```

### 5. Iniciar servidor

```bash
npm run start:dev
```

---

## **Documentação da API (Swagger)**

Após subir o servidor:

```
http://localhost:3000/api
```

---

## **Status do Backend**

✔️ Autenticação completa
✔️ JWT implementado
✔️ Estrutura modular pronta
❗ O backend contém apenas o módulo de login/register neste momento

O backend serve de base para evoluir futuramente a API de artigos, categorias, recomendações e personalização.