set search_path = auth;

    -- drop function if exists get_user (em varchar);
create or replace function get_user (em varchar)
returns user_summary
as $$
declare 
    dname varchar(510);
    found_user users;
    member_for timestamp;
    can_login boolean;
    is_admin boolean;
    return_status varchar(128); 
    json_logs jsonb;
    json_notes jsonb;
    user_status status;
begin
    set search_path = auth;

    if (exists (select u.id from users as u where u.email = em)) then
        select * from users into found_user;	

        -- display name
        dname := get_display_name();
        
        -- member_for
        select age (now(), found_user.created_at) into member_for;
        -- status
        select * from status where id = found_user.id into user_status;
        
        -- can_login
        can_login := user_status.can_login;
        return_status := user_status.name;
        -- is admin
        select 
            exists(select user_id 
                         from users_roles 
                         where user_id = found_user.id and role_id = 10) 
            into is_admin;
        -- logs
        select json_agg(l) from logs as l where user_id = found_user.id into json_logs; 
        -- notes 
        select json_agg(n) from notes as n where user_id = found_user.id into json_notes;

    end if;

    select (
        found_user.id, 
        found_user.email, 
        return_status, 
        can_login,
        is_admin,
        d_name,
        found_user.user_key,
        found_user.validation_token,
        member_for,
        found_user.profile,
        json_logs,
        json_notes)::user_summary;

end;
$$ language plpgsql;


-- (* ends here *)