set search_path = public;

create table if not exists tag (
    id bigint primary key not null default public.id_generator(),
    tag_name varchar(100)
);

-- (* ends here *)