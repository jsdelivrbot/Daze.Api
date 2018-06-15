set search_path = public;

create table if not exists resource (
    id bigint primary key not null default public.id_generator(),
    category varchar(255),
    name varchar(255),
    link varchar(255),
    description varchar(255)
);

-- (* ends here *)
