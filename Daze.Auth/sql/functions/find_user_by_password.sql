set search_path = auth;

create or replace function find_user_by_password(em varchar, input_password varchar) 
returns bigint
as $$
    set search_path = auth;

    select user_id 
    from logins 
    where provider = 'local'
    and provider_key = email
    and provider_key = email
    and provider_token = crypt(input_password, provider_token);

$$ language sql;


-- (* ends here *)