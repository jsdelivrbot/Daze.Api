set search_path = auth;

create table role (
    id serial not null primary key,
    role varchar(128)
);


-- (* ends here *)