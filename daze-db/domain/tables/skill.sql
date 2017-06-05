set search_path = public;

create table if not exists skill (
    id bigint primary key not null default public.id_generator(),
	name varchar(200),
    level int default 0,
	focus_area varchar(200)
    --focus_area focus_area_type
);

-- (* ends here *)