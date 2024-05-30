-- Custom types
create type public.app_permission as enum (
  'access.admin', 'access.cashier', 'access.discipline', 
  'access.guidance', 'access.librarian', 'access.mis', 
  'access.programHead', 'access.purchasing', 'access.registrar', 
  'access.users'
);
create type public.app_role as enum (
  'admin', 'cashier', 'discipline', 'guidance', 'librarian', 
  'mis', 'programHead', 'purchasing', 'registrar', 'users'
);

-- USER ROLES
create table public.user_roles (
  id        bigint generated by default as identity primary key,
  user_id   uuid references public.users on delete cascade not null,
  role      app_role not null,
  unique (user_id, role)
);
comment on table public.user_roles is 'Application roles for each user.';

-- ROLE PERMISSIONS
create table public.role_permissions (
  id           bigint generated by default as identity primary key,
  role         app_role not null,
  permission   app_permission not null,
  unique (role, permission)
);
comment on table public.role_permissions is 'Application permissions for each role.';



-- inserting value to user_roles 
-- Assuming user_ids are available for each user
-- Replace 'uuid1', 'uuid2', etc. with actual user IDs

insert into public.user_roles (user_id, role)
values
  ('uuid1', 'admin'),
  ('uuid2', 'cashier'),
  ('uuid3', 'discipline'),
  ('uuid4', 'guidance'),
  ('uuid5', 'librarian'),
  ('uuid6', 'mis'),
  ('uuid7', 'programHead'),
  ('uuid8', 'purchasing'),
  ('uuid9', 'registrar'),
  ('uuid10', 'users');  -- Add more entries as needed for different users
-- inserting value to user_roles 



-- inserting value to role_permissions 
insert into public.role_permissions (role, permission)
values
  ('admin', 'access.admin'),
  ('cashier', 'access.cashier'),
  ('discipline', 'access.discipline'),
  ('guidance', 'access.guidance'),
  ('librarian', 'access.librarian'),
  ('mis', 'access.mis'),
  ('programHead', 'access.programHead'),
  ('purchasing', 'access.purchasing'),
  ('registrar', 'access.registrar'),
  ('users', 'access.users');
-- inserting value to role_permissions 




-- Create the auth hook function
create or replace function public.custom_access_token_hook(event jsonb)
returns jsonb
language plpgsql
stable
as $$
-- This block defines a new PostgreSQL function named custom_access_token_hook which takes a JSONB argument event and returns a JSONB. The function uses the PL/pgSQL language and is marked as stable, meaning it doesn't modify the database and returns consistent results for the same input.




  declare
    claims jsonb;
    user_role public.app_role;
    role_permissions jsonb;
  begin
--Declares three variables: claims to store the claims part of the JWT, user_role to store the user's role, and role_permissions to store permissions associated with the role.




    -- Check if the user has a role in the user_roles table
    select role into user_role from public.user_roles where user_id = (event->>'user_id')::uuid;
--Retrieves the role of the user from the user_roles table using the user ID from the event JSONB. If a matching role is found, it's stored in the user_role variable.




    claims := event->'claims';
--Extracts the existing claims from the event JSONB and assigns them to the claims variable.




    if user_role is not null then
      -- Set the user role claim
      claims := jsonb_set(claims, '{user_role}', to_jsonb(user_role));
--Checks if user_role is not null. If true, it adds or updates the user_role claim in the claims JSONB with the retrieved user role.




      -- Retrieve permissions for the role
      select jsonb_agg(permission) into role_permissions from public.role_permissions where role = user_role;


      

      if role_permissions is not null then
        -- Set the role permissions claim
        claims := jsonb_set(claims, '{role_permissions}', role_permissions);
      end if;
    else
      claims := jsonb_set(claims, '{user_role}', 'null');
    end if;

    -- Update the 'claims' object in the original event
    event := jsonb_set(event, '{claims}', claims);

    -- Return the modified or original event
    return event;
  end;
$$;




grant usage on schema public to supabase_auth_admin;




grant execute
  on function public.custom_access_token_hook
  to supabase_auth_admin;




revoke execute
  on function public.custom_access_token_hook
  from authenticated, anon;




grant all
  on table public.user_roles, public.role_permissions
to supabase_auth_admin;




revoke all
  on table public.user_roles, public.role_permissions
  from authenticated, anon;




create policy "Allow auth admin to read user roles and permissions" ON public.user_roles
as permissive for select
to supabase_auth_admin
using (true);




create policy "Allow auth admin to read role permissions" ON public.role_permissions
as permissive for select
to supabase_auth_admin
using (true);