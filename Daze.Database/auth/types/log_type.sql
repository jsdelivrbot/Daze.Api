set search_path = auth;

create type log_type as enum (
    'Registration',
    'Authentication',
    'Activity',
    'System'
);

-- (* ends here *)