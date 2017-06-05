set search_path = auth;

create table user_role (
    user_id bigint not null,
    role_id int not null,
    
    constraint fk_user_role_user foreign key (user_id) references user(id),
    constraint fk_user_role_role foreign key (role_id) references role(id)
);

-- (* ends here *)