drop schema if exists auth cascade;

create schema auth;
set search_path = auth;

select 'Schema initialized' as Works;




-- ends here