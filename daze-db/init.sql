create database daze_db with
owner = daze
encoding = 'UTF8'
lc_collate = 'English_United States.1252'
lc_ctype = 'English_United States.1252'
tablespace = pg_default
connection limit = -1;

drop schema if exists auth cascade;
drop schema if exists domain cascade;

create schema auth;
create schema domain;

set search_path = auth;
select 'Schema initialized' as Works;

create extension if not exists pgcrypto
with schema auth;

insert into user (email, first, last)
values ( 'hermesgjini@gmail.com', 'hermes', 'gjini' );

insert into role (id, role)
values (10, 'Administrator'), (99, 'user')

insert into status (name, description, can_login)
values
( 'Active', 'User can login, etc', true ),
( 'Suspended', 'Cannot login for a given reason', false ),
( 'Not Approved', 'Member needs to be approved (email validation)', false ),
( 'Banned', 'Member has been banned', false ),
( 'Locked', 'Member is locked out due to failed logins', false )

select *
from public.register ('hermesgjini@gmail.com', 'mnbvcxz');

select *
from public.authenticate('hermesgjini@gmail.com', 'mnbvcxz')

select *
from public.authenticate(
    'hermesgjini@gmail.com',
    '$2a$10$zUUp0.cLgNEkB3.CAmHM8e9EsJvHs0C3yx12/2UkCOT8II.CUf4xi',
    'local_login')



-- (* ends here *)