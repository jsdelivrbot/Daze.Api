set search_path = domain;

create table if not exists project (
    id bigint primary key not null default auth.id_generator(),
    name varchar(200) not null,
    description varchar(400),
    url varchar(100)
);

-- (* ends here *)