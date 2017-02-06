set search_path = domain;

create table if not exists post_tag (
    post_id bigint not null, 
    tag_id bigint not null, 

    constraint pk_post_tag primary key (post_id, tag_id),
    constraint fk_post_tag_post foreign key (post_id) references post(id),
    constraint fk_post_tag_tag foreign key (tag_id) references tag(id)
);
