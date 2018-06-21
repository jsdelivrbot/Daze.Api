set search_path = public;

-- drop function if exists register(input_email varchar, password varchar)
create or replace function register(input_email varchar, input_password varchar)
returns table (
    new_id bigint,
    validation_token varchar(36),
    success boolean,
    message varchar(255)
)
as $$
declare
    hashed_password varchar (255) := public.crypt(input_password, public.gen_salt('bf', 10));
begin
    set search_path = public;

    -- verify if they dont exist
    if (not exists (select u.id
                    from public.user as u
                    where u.email = input_email))
    then

        insert into public.user (email)
        values (input_email)
        returning id into new_id;

        -- add login for local provider
        insert into public.login (user_id, provider_key, provider_token)
        values (new_id, input_email, hashed_password);

        -- add login for local_login provider
        insert into public.login (user_id, provider, provider_key, provider_token)
        values (new_id, 'local_login', input_email, hashed_password);

        -- token login
        insert into public.login (user_id, provider, provider_token)
        values (new_id, 'token', public.generate_rand_string(36) );

        -- add them to the user role
        insert into public.user_role (user_id, role_id)
        values (new_id, 99);

        -- log it
        insert into public.log (subject, user_id, entry)
        values ('Registration', new_id, 'User registered with email' || input_email);

        validation_token := public.generate_rand_string(36);

        success := true;
        message := 'Welcome';
    else
        success := false;
        select 'This email is already registered '
        into message;
    end if;

    return query
    select new_id, validation_token, success, message;
end;
$$ language plpgsql;

-- (* ends here *)