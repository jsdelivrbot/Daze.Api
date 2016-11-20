-- caution, will delete all functions
drop table if exists auth.users cascade; 

create table auth.users (
    id serial primary key,
    email varchar(255) unique not null,
    created_at timestamptz default now() not null,
    status varchar(10) default 'active'
);