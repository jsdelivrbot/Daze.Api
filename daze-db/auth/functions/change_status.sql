set search_path = auth;

create or replace function change_status(em varchar, new_status_id varchar, reason varchar)
returns boolean
as $$ 
declare 
    found_id bigint;
    succeded boolean;
begin
    set search_path = auth;

    select id 
    from user
    where email = em 
    into found_id;
    
    select name
    from status
    where status_id = new_status_id 
    into status_name;

    if (found_id is not null) then 
        update user
        set status_id = new_status_id
        where id = found_id;

        insert into log (user_id, subject, entry)
        values (found_id, 'System', 'Changed status to ' || status_name || ' because ' || reason);
        succeded := true;
    end if;

    return succeded;
end;
$$ language plpgsql;

-- (* ends here *)