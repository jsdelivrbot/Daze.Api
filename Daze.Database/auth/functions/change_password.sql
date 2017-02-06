set search_path = auth;

create or replace function change_password(em varchar, old_password varchar, new_password varchar)
returns boolean
as $$ 
declare 
    found_id bigint;
    succeded boolean;
begin
    set search_path = auth;

    select find_user_by_password(em, old_password)
    into found_id; 

    if (found_id is not null) then 
        update login 
        set provider_token = crypt(input_password, gen_salt('bf', 10)) 
        where user_id = found_id
        and provider = 'local';

        insert into log (user_id, subject, entry)
        values (found_id, 'Authentication', 'Password changed');

        succeded := true;
    else
        succeded := false;
    end if;

    return succeded;
end;
$$ language plpgsql;

-- (* ends here *)