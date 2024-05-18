create database web_server;

create table users(
  id serial primary key,
  balance numeric(15, 2) not null default 0.00,
  created_at timestamptz default current_timestamp
);