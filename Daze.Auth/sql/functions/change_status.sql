set search_path = auth;

create or replace function change_status(em varchar, new_status_id varchar, reason varchar)
returns user_summary
as $$ 
declare 
	found_id bigint;
	status_name varchar(50);
	user_record user_summary;
begin
	set search_path = auth;

	select id from users where email = em into found_id;
	select name from status where status_id = new_status_id into status_name;

	if (found_id is not null) then 
			
		-- reset the statuc 
		update users 
		set status_id = new_status_id 
		where id = found_id

		-- add a note
		insert into notes(user_id, note)
		values (found_id, 'Your status was changed to ' || status_name)

		-- add log
		insert into logs(user_id, subject, entry)
		values (found_id, 'System', 'Changed status to ' || status_name || ' because ' || reason)

		-- pull the user
		user_record := get_user(em);
		
	end if;

	return user_record;
end;
$$ language plpgsql;



-- (* ends here *)