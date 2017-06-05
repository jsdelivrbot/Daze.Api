set search_path = auth;

alter table logins 
add constraint logins_users
foreign key (user_id) 
references users(id)
on delete cascade;

alter table logs 
add constraint logs_users
foreign key (user_id) 
references users(id)
on delete cascade;





-- (* ends here *)