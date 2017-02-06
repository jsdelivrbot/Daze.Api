set search_path = domain;

create table if not exists skill (
    id bigint primary key not null default auth.id_generator(),
    level int default 0,
    focus_area focus_area_type
);

-- (* ends here *)