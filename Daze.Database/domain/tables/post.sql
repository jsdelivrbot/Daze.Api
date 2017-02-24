set search_path = public;

create table if not exists post (
    id bigint primary key not null default public.id_generator(),
    slug varchar(300) unique not null,
    title varchar(400) not null, 
    content text,
    created_at timestamptz default now(),
    modified_at timestamptz default now()
);

-- (* ends here *)