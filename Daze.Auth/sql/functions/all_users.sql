set search_path = auth;

create or replace function auth.all_users ()
returns setof auth.users
as $$
	select *
	from auth.users
$$ language sql;



-- (* ends here *)