-- caution, will delete all functions
-- drop table if exists users cascade; 
set search_path = auth;

create table user (
    id bigint primary key not null default id_generator(),
    user_key varchar(36) not null default generate_rand_string(18),
    email varchar(255) unique not null,
    first varchar(255),
    last varchar(255),
    search_field tsvector,
    created_at timestamptz default now() not null,
    status_id int
);

-- (* end here *)