# backend-koliko

## How to Run the App

1. Clone the repository:

   ```bash

   https://github.com/imronshoimov/backend-koliko

   cd backend-koliko

   npm install

   npm run start

   ```

2.Set tables and mock data in database folder:

```bash
  create database web_server;

  create table users(
    id serial primary key,
    balance numeric(15, 2) not null default 0.00,
    created_at timestamptz default current_timestamp
  );

  insert into users ( balance ) values ( 1000.00 );
```

3.Set environment in .env file:

```bash
  POSTGRES_USER=your_postgres_user
  POSTGRES_PASSWORD=your_postgres_password
  POSTGRES_DB=your_postgres_db
  SKINPORT_ENDPOINT=https://api.skinport.com/v1
  SKINPORT_APPID=your_skinport_app_id
  SKINPORT_CURRENCY=EUR
  SKINPORT_TRADABLE=0
```
