-- 41 timestamp | shardid 13 | userid 10
set search_path = auth;

create sequence id_sequence;

create or replace function id_generator(out new_id bigint)
as $$
declare
    our_epoch bigint := 1072915200000; -- pluralsight founding
    seq_id bigint;
    now_ms bigint;
    shard_id int := 1;
begin
    select nextval('auth.id_sequence') % 1024 into seq_id;
    select floor( extract(epoch from now()) * 1000 ) into now_ms;
    new_id := (now_ms - our_epoch) << 23;
    new_id := new_id | (shard_id << 10);
  new_id := new_id | (seq_id);
end;
$$ language plpgsql;

-- (* ends here *)