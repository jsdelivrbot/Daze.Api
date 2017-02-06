set search_path = domain;

create table if not exists post (
    id bigint primary key not null default auth.id_generator(),
    slug varchar(300) unique not null,
    title varchar(400) not null, 
    content jsonb,
    created_at timestamptz default now(),
    modified_at timestamptz default now()
);

-- (* ends here *)