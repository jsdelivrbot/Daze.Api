set search_path = auth;

create or replace function change_password(em varchar, old_password varchar, new_password)
returns user_summary
as $$ 
declare 
    found_id bigint;
begin
    set search_path = auth;
    -- find the user
    select find_user_by_password(em, old_password)
    into found_id; 
    -- change the password
    if (found_id is not null) then 
        update logins 
        set provider_token = crypt(input_password, gen_salt('bf', 10)) 
        where user_id = found_id
        and provider = 'local';
        -- log it
        insert into logs(user_id, subject, entry)
        values (found_id, 'Authentication', 'Password changed')
        -- add note to account 
        insert into notes(user_id, note) 
        values (found_id, 'Succesfully changed password')
    end if;

    return get_user(em);
end;
$$ language plpgsql;


-- (* ends here *)