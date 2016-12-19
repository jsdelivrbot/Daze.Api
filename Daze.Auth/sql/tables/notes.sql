set search_path = auth;

create table notes (
    id serial not null primary key,
    content varchar(255),
    user_id bigint,

    constraint fk_notes_user foreign key(user_id) references users(id)
);



-- (* ends here *)