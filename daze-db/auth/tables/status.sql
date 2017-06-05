set search_path = auth;

create table status (
    id serial not null primary key,
    name varchar(128),
    description varchar(128),
    can_login boolean
);

-- (* ends here *)