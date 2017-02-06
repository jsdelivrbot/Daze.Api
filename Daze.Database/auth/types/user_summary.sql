set search_path = auth;

create type user_summary as (
    id bigint, 
    email varchar(255),
    status varchar(128),
    can_login boolean,
    is_admin boolean,
    display_name varchar(255),
    user_key varchar(18),
    email_validation_token varchar(36),
    user_for interval,
    profile jsonb,
    logs jsonb,
    notes jsonb
);

-- (* ends here *)