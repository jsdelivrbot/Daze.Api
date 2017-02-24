set search_path = auth;

-- drop function if exists register(input_email varchar, password varchar)
create or replace function register(input_email varchar, input_password varchar)
returns table (
    new_id bigint,
    validation_token varchar(36),
    success boolean,
    message varchar(255)
)
as $$ 
begin
    set search_path = auth;
    -- verify if they dont exist
    if (not exists (select id 
                    from users as u 
                    where u.email = input_email)) then 
        
        insert into user (email)
        values (input_email)
        returning id into new_id;
        
        -- add logins
        insert into login (user_id, provider_key, provider_token)
        values (new_id, input_email, crypt(input_password, gen_salt('bf', 10)) );

        -- token login
        insert into login (user_id, provider, provider_token)
        values (new_id, 'token', generate_rand_string(36) );
        
        -- add them to the user role 
        insert into user_role (user_id, role_id)
        values (new_id, 99)

        -- log it 
        insert into log (subject, user_id, entry)
        values ('Registration', new_id, 'User registered with email' || input_email);

        validation_token := generate_rand_string(36);

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