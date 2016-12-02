set search_path = auth;

-- first function
create or replace function authenticate (key varchar, token varchar, prov varchar default 'local')
returns table (
    new_id bigint,
    success boolean,
    message varchar(255)
)
as $$
declare 
    found_user users;
    return_message varchar(50);
    found_id bigint;
    success boolean;
begin
    set search_path = auth;

    if prov = 'local' then 
        select l.user_id
        from logins as l
        where provider = prov
        and provider_key = key
        and provider_token = crypt (token, provider_token)
        limit 1 
        into found_id;
    else
        select l.user_id
        from logins as l
        where provider = prov
        and provider_key = key
        and provider_token = token
        limit 1 into found_id;
    end if;

    if found_id is not null then 
        select *
        from users
        where id = found_id
        into found_user;

        insert into logs (user_id, subject, entry)
        values (found_id, 'Authentication', 'Logged user in using' || prov);

        return_message := 'successfully authenticated';
        success := true;
    else
        return_message := 'invalid login credentials';
        success := false;
    end if;

    return query
    select 
        found_id,
        success,
        return_message;
end;
$$ language plpgsql;

select * from auth.authenticate('hermesgjini@gmail.com', 'lols')

-- (* ends here *)