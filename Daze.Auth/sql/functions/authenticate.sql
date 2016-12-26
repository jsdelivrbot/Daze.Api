set search_path = auth;

-- first function
create or replace function authenticate (key varchar, token varchar, prov varchar default 'local')
returns table (
    new_id bigint,
    success boolean,
    success boolean,
    message varchar(255)
)
as $$
declare 
    found_user users;
    return_message varchar(50);
    found_id bigint;
    success boolean := false;
    can_login boolean := false;
begin
    set search_path = auth;

    if (prov = 'local') then
        select get_user_by_password (key, token)
        into found_id;
    else
        select l.user_id
        from logins as l
        where provider = prov
        and provider_key = key
        and provider_token = token
        limit 1 into found_id;
    end if;

    if (found_id is not null) then 
        select * from users where id = found_id into found_user;
        
        select s.can_login from status as s where id = found_user.status_id into can_login;
    
        if (can_login) then 
            insert into logs (user_id, subject, entry)
            values (found_id, 'Authentication', 'Logged user in using' || prov);
            
            update users 
            set last_login = now(), login_count = login_count + 1
            where id = found_id;

            return_message := 'successfully authenticated';
            success := true;
        else 
            insert into logs (user_id, subject, entry)
            values (found_id, 'Authentication', 'User tried to login, is locked out' || prov);
            
            success := false;
            return_message := 'The user is currently locked out';
        end if;

    return query
    select
        found_id,
        success,
        return_message;
end;
$$ language plpgsql;



-- (* ends here *)