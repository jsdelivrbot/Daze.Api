drop schema if exists auth cascade;

create schema auth;
set search_path = auth;

select 'Schema initialized' as Works;

create extension if not exists pgcrypto 
with schema auth;

insert into users (email, first, last)
values ( 'hermesgjini@gmail.com', 'hermes', 'gjini' );

insert into roles (id, role)
values (10, 'Administrator'), (99, 'user')

select * from authenticate('hermesgjini@gmail.com', 'lols')
select * from register ('hermesgjini@gmail.com', 'lols');

insert into status (name, description, can_login)
values 
( 'Active', 'User can login, etc', true ),
( 'Suspended', 'Cannot login for a given reason', false ),
( 'Not Approved', 'Member needs to be approved (email validation)', false ),
( 'Banned', 'Member has been banned', false ),
( 'Locked', 'Member is locked out due to failed logins', false )




-- (* ends here *)