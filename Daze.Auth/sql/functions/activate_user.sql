set search_path = auth;

create or replace function activate_user(em varchar, reason varchar)
return user_summary
as $$
declare user_sum user_summary;
begin
	set search_path = auth;
	 
	select change_status(em, 10, reason) into user_sum;
end;
$$ language plpgsql;



-- (* ends here *)