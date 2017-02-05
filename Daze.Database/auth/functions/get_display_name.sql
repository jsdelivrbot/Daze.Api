set search_path = auth;

create or replace function get_display_name (u users)
returns varchar(255)
as $$
declare
    dname varchar(255);
begin

    if (u.first is not null and u.last is not null) then
        select concat (u.first , ' ' , u.last) into dname;
    elseif (u.first is not null) then 
        select u.first into dname;
    elseif (u.last is not null) then 
        select u.last into dname;
    else 
        select u.email into dname ;
    end if;
    
    return dname;
end;
$$ language plpgsql;
