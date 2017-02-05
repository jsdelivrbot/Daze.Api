set search_path = auth;

create or replace function generate_rand_string(len int default 36) 
returns text
as $$
select substring( md5(random()::text), 0, len+1)
$$ language sql;

select auth.generate_rand_string(12);


-- (* ends here *)