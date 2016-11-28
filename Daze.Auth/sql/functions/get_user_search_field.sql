set search_path = auth;

create or replace function get_user_search_field (email varchar, first_name varchar, last_name varchar, out tsvector) 
as $$
declare 
	vectorized_email tsvector := to_tsvector(email) ;
	vectorized_first_name tsvector := to_tsvector(first_name) ;
	vectorized_last_name tsvector := to_tsvector(last_name) ;
begin 
	
	select str_agg (
		to_tsvector( 'hermesgjini@gmail.com' ),
		to_tsvector( 'hermes' ),
		to_tsvector( 'gjini' ) )

end;
$$ language plpgsql;


select *
from users 



-- (* ends here *)