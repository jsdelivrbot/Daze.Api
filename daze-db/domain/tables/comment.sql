set search_path = public;

create table if not exists comment (
    id bigint primary key not null default public.id_generator(),
    post_id bigint not null,
    username varchar(300) not null,
    body text,

    constraint fk_comment_post foreign key(post_id) references post(id)
);

-- (* ends here *)