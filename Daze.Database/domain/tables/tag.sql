set search_path = domain;

create table if not exists tag (
    id bigint primary key not null default auth.id_generator(), 
    name varchar(100)
);

-- (* ends here *)