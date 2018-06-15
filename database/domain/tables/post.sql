set search_path = public;

create table if not exists post (
    id bigint primary key not null default public.id_generator(),
    slug varchar(400) unique not null,
    title varchar(400) not null,
    hero_content varchar(500),
    content text,
    cover_image varchar(255),
    created_at timestamptz default now(),
    modified_at timestamptz default now()
);

-- (* ends here *)
