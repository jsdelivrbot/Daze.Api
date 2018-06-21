set search_path = public;

create table if not exists project(
    id bigint primary key not null default public.id_generator(),
    name varchar(200) not null,
    description varchar(400),
    url varchar(100),
    published_year integer
);

-- (* ends here *)