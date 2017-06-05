set search_path = public;

-- DROP FUNCTION public.authenticate (key varchar, token varchar, prov varchar )
create or replace function public.authenticate (key varchar, token varchar, prov varchar default 'local')
returns table (
    new_id bigint,
    success boolean,
    message varchar(255),
    password varchar(255)
)
as $$
declare
    found_user public.user;
    found_id bigint;
    return_message varchar(50);
    return_success boolean := false;
    return_password varchar (255);
    can_login boolean := false;
begin
    set search_path = auth;

    if (prov = 'local') then
        select public.find_user_by_password(key, token)
        into found_id;
    else
        select l.user_id
        from "public".login as l
        where provider = prov
        and provider_key = key
        and provider_token = token
        limit 1
        into found_id;
    end if;

    if (found_id is not null) then
        select *
        from public.user
        where id = found_id
        into found_user;

        select s.can_login
        from public.status as s
        where id = found_user.status_id
        into can_login;

        if (can_login) then
            insert into public.log (user_id, subject, entry)
            values (found_id, 'Authentication', 'Logged user in using ' || prov);

            select provider_token
            from public.login
            where user_id = found_id
            and provider = 'local'
            into return_password;

            return_message := 'successfully authenticated';
            return_success := true;
        else
            insert into public.log (user_id, subject, entry)
            values (found_id, 'Authentication', 'User tried to login, is locked out ' || prov);

            return_success := false;
            return_message := 'The user is currently locked out';
        end if;

    end if;

    return query
    select found_id, return_success, return_message, return_password;
end;
$$ language plpgsql;

-- (* ends here *)