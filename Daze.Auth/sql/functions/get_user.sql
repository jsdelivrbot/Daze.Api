
create or replace function auth.get_user (email varchar)
returns auth.users
as $$
    select *
    from auth.users 
    where email = email
    limit 1
$$ language sql;
