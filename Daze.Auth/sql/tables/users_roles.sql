set search_path = auth;

create table users_roles (
    user_id int not null,
    role_id int not null,
    
    constraint fk_users_roles_users foreign key (user_id) references users(id),
    constraint fk_users_roles_roles foreign key (role_id) references roles(id)
);


-- (* ends here *)