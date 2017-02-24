set search_path = auth;

create table roles (
    id serial not null primary key,
    role varchar(128)
);


-- (* ends here *)