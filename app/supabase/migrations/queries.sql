-- Create profiles table
CREATE TABLE public.profiles (
  prof_id int8 NOT NULL,  -- Define the primary key column 'prof_id' of type int8 (BIGINT), not allowing NULL values
  id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,  -- Define 'id' column of type UUID, not allowing NULL values, with a foreign key constraint referencing 'id' in 'auth.users' table. The CASCADE option ensures that if a referenced user is deleted, the corresponding row in 'profiles' is also deleted.
  first_name varchar,  -- Define 'first_name' column of type VARCHAR
  last_name varchar,  -- Define 'last_name' column of type VARCHAR
  email varchar NOT NULL,  -- Define 'email' column of type VARCHAR, not allowing NULL values
  encrypted_password varchar NOT NULL,  -- Define 'encrypted_password' column of type VARCHAR, not allowing NULL values
  PRIMARY KEY (prof_id)  -- Set 'prof_id' as the primary key for the table
);


CREATE OR REPLACE FUNCTION sync_insert_to_profiles()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (prof_id, id, first_name, last_name, email, encrypted_password)
  VALUES (
    NEW.prof_id,  -- Use the 'prof_id' value from the new row in 'auth.users'
    NEW.id,  -- Use the 'id' value from the new row in 'auth.users'
    NULL,  -- Assuming these values are null initially
    NULL,
    NEW.email,
    NEW.encrypted_password
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION sync_update_to_profiles()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.profiles
  SET email = NEW.email,
      encrypted_password = NEW.encrypted_password,
      first_name = NEW.first_name,  -- Assuming first_name can also be updated
      last_name = NEW.last_name  -- Assuming last_name can also be updated
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- Delete Function
CREATE OR REPLACE FUNCTION sync_delete_to_profiles()
RETURNS TRIGGER AS $$
BEGIN
  -- Define the function body
  DELETE FROM public.profiles
  WHERE id = OLD.id;  -- Delete the row in 'profiles' where 'id' matches the old 'id' value from 'auth.users' (the row being deleted)
  RETURN OLD;  -- Return the old row to be processed by the triggering statement
END;
$$ LANGUAGE plpgsql;  -- End of function definition using PL/pgSQL language



--triggers

--Insert Trigger 
CREATE TRIGGER after_insert_user
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION sync_insert_to_profiles();


--Update Trigger
CREATE TRIGGER after_update_user
AFTER UPDATE ON auth.users
FOR EACH ROW
EXECUTE FUNCTION sync_update_to_profiles();


--Delete Trigger
CREATE TRIGGER after_delete_user
AFTER DELETE ON auth.users
FOR EACH ROW
EXECUTE FUNCTION sync_delete_to_profiles();





--Step 1: Create the new cashier_clearance table


CREATE TABLE cashier_clearance (
    studentno INT PRIMARY KEY,
    cleared BOOLEAN NOT NULL,
    uncleared BOOLEAN NOT NULL CHECK (cleared <> uncleared),
    remarks TEXT,
    FOREIGN KEY (studentno) REFERENCES table_students(studentno)
);

-- Add a check constraint to ensure remarks is only set when uncleared is true
ALTER TABLE cashier_clearance
ADD CONSTRAINT chk_remarks_uncleared
CHECK (uncleared = FALSE OR (uncleared = TRUE AND remarks IS NOT NULL));

--Step 2: Modify the tablestudents table
ALTER TABLE table_students
RENAME COLUMN cashieriscleared TO is_cashier_cleared;

--Step 3: Set up triggers to synchronize the is_cashier_cleared column

-- Function to update is_cashier_cleared in tablestudents after insert or update in cashier_clearance
CREATE OR REPLACE FUNCTION sync_cashier_clearance_to_students() 
RETURNS TRIGGER AS $$
BEGIN
    UPDATE table_students
    SET is_cashier_cleared = NEW.cleared
    WHERE studentno = NEW.studentno;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update is_cashier_cleared in tablestudents after delete in cashier_clearance
CREATE OR REPLACE FUNCTION remove_cashier_clearance_from_students() 
RETURNS TRIGGER AS $$
BEGIN
    UPDATE tablestudents
    SET is_cashier_cleared = FALSE
    WHERE studentno = OLD.studentno;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;


--create trigger

-- Trigger for after insert on cashier_clearance
CREATE TRIGGER trg_cashier_clearance_insert
AFTER INSERT ON cashier_clearance
FOR EACH ROW
EXECUTE FUNCTION sync_cashier_clearance_to_students();

-- Trigger for after update on cashier_clearance
CREATE TRIGGER trg_cashier_clearance_update
AFTER UPDATE ON cashier_clearance
FOR EACH ROW
EXECUTE FUNCTION sync_cashier_clearance_to_students();

-- Trigger for after delete on cashier_clearance
CREATE TRIGGER trg_cashier_clearance_delete
AFTER DELETE ON cashier_clearance
FOR EACH ROW
EXECUTE FUNCTION remove_cashier_clearance_from_students();


--insert initial data

-- Insert initial data into tablestudents
INSERT INTO table_students (studentno, name, program, year, is_cashier_cleared, is_discipline_cleared) VALUES
(10001, 'John Doe', 'BSIT', 1, TRUE, TRUE),
(10002, 'Jane Smith', 'BSCS', 2, FALSE, FALSE),
(10003, 'Alice Johnson', 'BSCpE', 3, TRUE, TRUE),
(10004, 'Bob Brown', 'ACT', 4, FALSE, FALSE),
(10005, 'Carol White', 'ART', 1, TRUE, TRUE);

-- Insert corresponding data into cashier_clearance
INSERT INTO cashier_clearance (studentno, cleared, uncleared, remarks) VALUES
(10001, TRUE, FALSE, NULL),
(10002, FALSE, TRUE, 'Outstanding fees'),
(10003, TRUE, FALSE, NULL),
(10004, FALSE, TRUE, 'Pending documents'),
(10005, TRUE, FALSE, NULL);



-- Custom types
create type public.app_permission as enum ('channels.delete', 'messages.delete');
create type public.app_role as enum ('admin', 'moderator');

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


create type public.role_permission as enum ('users.delete', 'users.add', 'users.update');
create type public.office_role as enum ('admin', 'cashier', 'discipline', 'mis', 'registrar');

-- USER ROLES
create table public.system_roles (
  id        bigint generated by default as identity primary key,
  user_id   uuid references public.office on delete cascade not null,
  role      office_role not null,
  unique (user_id, role)
);
comment on table public.system_roles is 'Application roles for each user.';

-- ROLE PERMISSIONS
create table public.role_permissions (
  id           bigint generated by default as identity primary key,
  role         officce_role not null,
  permission   role_permission not null,
  unique (role, permission)
);
comment on table public.role_permissions is 'Application permissions for each role.'











ALTER TABLE auth.users RENAME TO users;

ALTER TABLE auth.users
ALTER COLUMN role DEFAULT 'users' CHECK (role IN ('admin', 'cashier', 'discipline', 'guidance', 'librarian', 'mis', 'programHead', 'purchasing', 'registrar'));

CREATE TABLE valid_roles (
    role_name VARCHAR(50) PRIMARY KEY
);

INSERT INTO valid_roles (role_name) 
VALUES 
    ('admin'),
    ('cashier'),
    ('discipline'),
    ('guidance'),
    ('librarian'),
    ('mis'),
    ('programHead'),
    ('purchasing'),
    ('registrar');


-- Assume you have a role 'web_user' that your web application uses
GRANT USAGE ON SCHEMA auth TO admin;

-- Grant necessary permissions on the auth.users table
GRANT SELECT, INSERT, UPDATE, DELETE ON auth.users TO authenticated;

-- If you need to grant permissions on other tables in the auth schema, adjust accordingly
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA auth TO authenticated;

-- Set default privileges for future tables and sequences
ALTER DEFAULT PRIVILEGES IN SCHEMA auth GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA auth GRANT USAGE, SELECT ON SEQUENCES TO authenticated;


SELECT id, email, role FROM auth.users;
UPDATE auth.users
SET role = 'admin'
WHERE email = 'admin@sjdelmonte.sti.edu.ph';

SELECT id, email, role FROM auth.users;
UPDATE auth.users
SET role = 'admin'
WHERE email = 'admin@sjdelmonte.sti.edu.ph';

SELECT id, email, role FROM auth.users;
UPDATE auth.users
SET role = 'programhead'
WHERE email = 'programhead@sjdelmonte.sti.edu.ph';

UPDATE auth.users
SET is_super_admin = true
WHERE email = '';

-- Retrieve current information for all users
SELECT id, email, role
FROM auth.users;

-- Update the role for each user
UPDATE auth.users
SET role = 
    CASE 
        WHEN email = 'admin@sjdelmonte.sti.edu.ph'THEN 'admin'
        WHEN email = 'cashier@sjdelmonte.sti.edu.ph' THEN 'cashier'
        WHEN email = 'discipline@sjdelmonte.sti.edu.ph' THEN 'discipline'
        WHEN email = 'guidance@sjdelmonte.sti.edu.ph' THEN 'guidance'
        WHEN email = 'librarian@sjdelmonte.sti.edu.ph' THEN 'librarian'
        WHEN email = 'mis@sjdelmonte.sti.edu.ph' THEN 'mis'
        WHEN email = 'programHead@sjdelmonte.sti.edu.ph' THEN 'programHead'
        WHEN email = 'purchasing@sjdelmonte.sti.edu.ph' THEN 'purchasing'
        WHEN email = 'registrar@sjdelmonte.sti.edu.ph' THEN 'registrar'
        ELSE 'user' -- Default role if email does not match any specific case
    END;

UPDATE auth.users
SET role = 
    CASE 
        WHEN email = 'programHead@sjdelmonte.sti.edu.ph' THEN 'programHead'
        WHEN email = 'cashier@sjdelmonte.sti.edu.ph' THEN 'cashier'
        ELSE 'user' -- Default role if email does not match any specific case
    END;





select * from auth.users;

create table public.profiles (
  Prof_id int8 primary key,
  id uuid not null references auth.users on delete cascade,
  name text,
  email uuid not null references auth.users on delete cascade,
  role not null references auth.users on delete cascade,
  primary key (id)
);
select * from public.profiles;



drop table public.profiles

DELETE FROM auth.users;








CREATE TABLE table_students (
    studentno BIGINT PRIMARY KEY CHECK (studentno BETWEEN 10000000000 AND 99999999999),
    name VARCHAR(255) NOT NULL,
    program VARCHAR(50) NOT NULL CHECK (program IN ('BSIT', 'BSCS', 'BSCpE', 'ACT', 'ART', 'BSBA', 'BSAIS', 'BSA', 'BSRTCS', 'BACOMM', 'BAPsych', 'BSTM')),
    year INT NOT NULL CHECK (year IN (1, 2, 3, 4)),
    section INT NOT NULL CHECK (section BETWEEN 100 AND 999),
    is_cashier_cleared BOOLEAN NOT NULL,
    cashier_remarks TEXT,
    CONSTRAINT chk_cashier_remarks CHECK (is_cashier_cleared = TRUE OR cashier_remarks IS NOT NULL)
);

INSERT INTO table_students (studentno, name, program, year, section, is_cashier_cleared, cashier_remarks) VALUES
(10000000001, 'John Doe', 'BSIT', 1, 101, TRUE, NULL),
(10000000002, 'Jane Smith', 'BSCS', 2, 102, FALSE, 'Pending payment'),
(10000000003, 'Alice Johnson', 'BSCpE', 3, 103, TRUE, NULL),
(10000000004, 'Bob Brown', 'ACT', 4, 104, FALSE, 'Overdue balance'),
(10000000005, 'Carol White', 'ART', 1, 105, TRUE, NULL),
(10000000006, 'David Black', 'BSBA', 2, 106, FALSE, 'Documents missing'),
(10000000007, 'Eve Green', 'BSAIS', 3, 107, TRUE, NULL),
(10000000008, 'Frank Blue', 'BSA', 4, 108, TRUE, NULL),
(10000000009, 'Grace Red', 'BSRTCS', 1, 109, FALSE, 'Pending payment'),
(10000000010, 'Henry Yellow', 'BACOMM', 3, 110, TRUE, NULL),
(10000000011, 'Grace Blue', 'BAPsych', 2, 111, FALSE, 'Overdue balance'),
(10000000012, 'Ivy Purple', 'BSIT', 1, 112, TRUE, NULL),
(10000000013, 'Jack Gray', 'BSCS', 2, 113, FALSE, 'Pending payment'),
(10000000014, 'Kathy Pink', 'BSCpE', 3, 114, TRUE, NULL),
(10000000015, 'Leo Orange', 'ACT', 4, 115, FALSE, 'Documents missing'),
(10000000016, 'Mona Violet', 'ART', 1, 116, TRUE, NULL),
(10000000017, 'Nina White', 'BSBA', 2, 117, FALSE, 'Pending payment'),
(10000000018, 'Oscar Black', 'BSAIS', 3, 118, TRUE, NULL),
(10000000019, 'Pam Brown', 'BSA', 4, 119, TRUE, NULL),
(10000000020, 'Quinn Green', 'BSRTCS', 1, 120, FALSE, 'Pending payment'),
(10000000021, 'Rita Blue', 'BAPsych', 2, 121, FALSE, 'Overdue balance'),
(10000000022, 'Sam Red', 'BACOMM', 3, 122, TRUE, NULL),
(10000000023, 'Tina Yellow', 'BSTM', 4, 123, FALSE, 'Pending payment'),
(10000000024, 'Uma Orange', 'BSIT', 1, 124, TRUE, NULL),
(10000000025, 'Vic Gray', 'BSCS', 2, 125, FALSE, 'Documents missing'),
(10000000026, 'Wendy Pink', 'BSCpE', 3, 126, TRUE, NULL),
(10000000027, 'Xander Purple', 'ACT', 4, 127, FALSE, 'Pending payment'),
(10000000028, 'Yara White', 'ART', 1, 128, TRUE, NULL),
(10000000029, 'Zane Black', 'BSBA', 2, 129, FALSE, 'Overdue balance'),
(10000000030, 'Amy Green', 'BSAIS', 3, 130, TRUE, NULL),
(10000000031, 'Bill Blue', 'BSA', 4, 131, TRUE, NULL),
(10000000032, 'Cara Red', 'BSRTCS', 1, 132, FALSE, 'Pending payment'),
(10000000033, 'Dan Blue', 'BAPsych', 2, 133, FALSE, 'Documents missing'),
(10000000034, 'Ella Yellow', 'BACOMM', 3, 134, TRUE, NULL),
(10000000035, 'Fay Orange', 'BSTM', 4, 135, FALSE, 'Pending payment'),
(10000000036, 'Gina Pink', 'BSIT', 1, 136, TRUE, NULL),
(10000000037, 'Hank Gray', 'BSCS', 2, 137, FALSE, 'Overdue balance'),
(10000000038, 'Iris Purple', 'BSCpE', 3, 138, TRUE, NULL),
(10000000039, 'Jake Orange', 'ACT', 4, 139, FALSE, 'Pending payment'),
(10000000040, 'Karen White', 'ART', 1, 140, TRUE, NULL),
(10000000041, 'Liam Black', 'BSBA', 2, 141, FALSE, 'Documents missing'),
(10000000042, 'Mia Green', 'BSAIS', 3, 142, TRUE, NULL),
(10000000043, 'Nate Blue', 'BSA', 4, 143, TRUE, NULL),
(10000000044, 'Olive Red', 'BSRTCS', 1, 144, FALSE, 'Pending payment'),
(10000000045, 'Paul Blue', 'BAPsych', 2, 145, FALSE, 'Overdue balance'),
(10000000046, 'Quincy Yellow', 'BACOMM', 3, 146, TRUE, NULL),
(10000000047, 'Rosa Orange', 'BSTM', 4, 147, FALSE, 'Pending payment'),
(10000000048, 'Steve Pink', 'BSIT', 1, 148, TRUE, NULL),
(10000000049, 'Tara Gray', 'BSCS', 2, 149, FALSE, 'Documents missing'),
(10000000050, 'Uma Purple', 'BSCpE', 3, 150, TRUE, NULL),
(10000000051, 'Vince Orange', 'ACT', 4, 151, FALSE, 'Pending payment'),
(10000000052, 'Willa White', 'ART', 1, 152, TRUE, NULL),
(10000000053, 'Xena Black', 'BSBA', 2, 153, FALSE, 'Overdue balance'),
(10000000054, 'Yanni Green', 'BSAIS', 3, 154, TRUE, NULL),
(10000000055, 'Zara Blue', 'BSA', 4, 155, TRUE, NULL),
(10000000056, 'Chris Gray', 'BSRTCS', 1, 156, FALSE, 'Pending payment'),
(10000000057, 'Diana Yellow', 'BAPsych', 2, 157, FALSE, 'Documents missing'),
(10000000058, 'Evan Blue', 'BACOMM', 3, 158, TRUE, NULL),
(10000000059, 'Fiona Red', 'BSTM', 4, 159, FALSE, 'Pending payment'),
(10000000060, 'George Green', 'BSIT', 1, 160, TRUE, NULL),
(10000000061, 'Helen White', 'BSCS', 2, 161, FALSE, 'Overdue balance'),
(10000000062, 'Ian Black', 'BSCpE', 3, 162, TRUE, NULL),
(10000000063, 'Julia Orange', 'ACT', 4, 163, FALSE, 'Pending payment'),
(10000000064, 'Kevin Brown', 'ART', 1, 164, TRUE, NULL),
(10000000065, 'Lara White', 'BSBA', 2, 165, FALSE, 'Documents missing'),
(10000000066, 'Mike Green', 'BSAIS', 3, 166, TRUE, NULL),
(10000000067, 'Nora Blue', 'BSA', 4, 167, TRUE, NULL),
(10000000068, 'Omar Red', 'BSRTCS', 1, 168, FALSE, 'Pending payment'),
(10000000069, 'Paula Yellow', 'BAPsych', 2, 169, FALSE, 'Overdue balance'),
(10000000070, 'Quinn Black', 'BACOMM', 3, 170, TRUE, NULL),
(10000000071, 'Rachel Green', 'BSTM', 4, 171, FALSE, 'Pending payment'),
(10000000072, 'Steve Blue', 'BSIT', 1, 172, TRUE, NULL),
(10000000073, 'Tina Red', 'BSCS', 2, 173, FALSE, 'Documents missing'),
(10000000074, 'Umar Purple', 'BSCpE', 3, 174, TRUE, NULL),
(10000000075, 'Vera Orange', 'ACT', 4, 175, FALSE, 'Pending payment'),
(10000000076, 'Wade White', 'ART', 1, 176, TRUE, NULL),
(10000000077, 'Xenia Black', 'BSBA', 2, 177, FALSE, 'Overdue balance'),
(10000000078, 'Yves Green', 'BSAIS', 3, 178, TRUE, NULL),
(10000000079, 'Zara Blue', 'BSA', 4, 179, TRUE, NULL),
(10000000080, 'Alan Red', 'BSRTCS', 1, 180, FALSE, 'Pending payment'),
(10000000081, 'Bella Yellow', 'BAPsych', 2, 181, FALSE, 'Documents missing'),
(10000000082, 'Cody Black', 'BACOMM', 3, 182, TRUE, NULL),
(10000000083, 'Daisy Green', 'BSTM', 4, 183, FALSE, 'Pending payment'),
(10000000084, 'Ethan Blue', 'BSIT', 1, 184, TRUE, NULL),
(10000000085, 'Faith White', 'BSCS', 2, 185, FALSE, 'Overdue balance'),
(10000000086, 'Gabe Yellow', 'BSCpE', 3, 186, TRUE, NULL),
(10000000087, 'Holly Orange', 'ACT', 4, 187, FALSE, 'Pending payment'),
(10000000088, 'Ian Red', 'ART', 1, 188, TRUE, NULL),
(10000000089, 'Jane Blue', 'BSBA', 2, 189, FALSE, 'Documents missing'),
(10000000090, 'Kyle Green', 'BSAIS', 3, 190, TRUE, NULL),
(10000000091, 'Luna Black', 'BSA', 4, 191, TRUE, NULL),
(10000000092, 'Mia White', 'BSRTCS', 1, 192, FALSE, 'Pending payment'),
(10000000093, 'Nate Yellow', 'BAPsych', 2, 193, FALSE, 'Overdue balance'),
(10000000094, 'Oscar Blue', 'BACOMM', 3, 194, TRUE, NULL),
(10000000095, 'Pia Red', 'BSTM', 4, 195, FALSE, 'Pending payment'),
(10000000096, 'Quinn Green', 'BSIT', 1, 196, TRUE, NULL),
(10000000097, 'Rina White', 'BSCS', 2, 197, FALSE, 'Documents missing'),
(10000000098, 'Sam Yellow', 'BSCpE', 3, 198, TRUE, NULL),
(10000000099, 'Tina Black', 'ACT', 4, 199, FALSE, 'Pending payment'),
(10000000100, 'Ula Blue', 'ART', 1, 200, TRUE, NULL);









INSERT INTO "UserTable" (id, name, email, role) VALUES
(10000, 'Tony Reichert', 'tony.reichert@example.com', 'USER'),
(10010, 'Emma Adams', 'emma.adams@example.com', 'PURCHASING'),
(10011, 'Brandon Stevens', 'brandon.stevens@example.com', 'LIBRARIAN'),
(10012, 'Megan Richards', 'megan.richards@example.com', 'GUIDANCE'),
(10013, 'Oliver Scott', 'oliver.scott@example.com', 'MIS'),
(10014, 'Grace Allen', 'grace.allen@example.com', 'PROGRAM HEAD'),
(10015, 'Noah Carter', 'noah.carter@example.com', 'CASHIER'),
(10016, 'Ava Perez', 'ava.perez@example.com', 'USER'),
(10017, 'Liam Johnson', 'liam.johnson@example.com', 'REGISTRAR'),
(10018, 'Sophia Taylor', 'sophia.taylor@example.com', 'DISCIPLINE'),
(10019, 'Lucas Harris', 'lucas.harris@example.com', 'PURCHASING'),
(10020, 'Mia Robinson', 'mia.robinson@example.com', 'USER'),
(10021, 'Ella Martinez', 'ella.martinez@example.com', 'GUIDANCE'),
(10022, 'Ethan Anderson', 'ethan.anderson@example.com', 'LIBRARIAN'),
(10023, 'Avery Thomas', 'avery.thomas@example.com', 'DISCIPLINE'),
(10024, 'Isabella Jackson', 'isabella.jackson@example.com', 'USER'),
(10025, 'Mason White', 'mason.white@example.com', 'MIS'),
(10026, 'Harper Harris', 'harper.harris@example.com', 'CASHIER'),
(10027, 'Logan Martin', 'logan.martin@example.com', 'PROGRAM HEAD'),
(10028, 'Aria Garcia', 'aria.garcia@example.com', 'REGISTRAR'),
(10029, 'James Lee', 'james.lee@example.com', 'USER'),
(10030, 'Charlotte Clark', 'charlotte.clark@example.com', 'PURCHASING'),
(10031, 'Henry Lewis', 'henry.lewis@example.com', 'GUIDANCE'),
(10032, 'Amelia Walker', 'amelia.walker@example.com', 'LIBRARIAN'),
(10033, 'Jack Young', 'jack.young@example.com', 'DISCIPLINE'),
(10034, 'Scarlett Hall', 'scarlett.hall@example.com', 'USER'),
(10035, 'Leo Allen', 'leo.allen@example.com', 'MIS'),
(10036, 'Chloe King', 'chloe.king@example.com', 'CASHIER'),
(10037, 'Benjamin Wright', 'benjamin.wright@example.com', 'PROGRAM HEAD'),
(10038, 'Sofia Scott', 'sofia.scott@example.com', 'REGISTRAR'),
(10039, 'Lucas Green', 'lucas.green@example.com', 'USER'),
(10040, 'Zoe Adams', 'zoe.adams@example.com', 'PURCHASING'),
(10041, 'Daniel Nelson', 'daniel.nelson@example.com', 'GUIDANCE'),
(10042, 'Lily Baker', 'lily.baker@example.com', 'LIBRARIAN'),
(10043, 'Matthew Carter', 'matthew.carter@example.com', 'DISCIPLINE'),
(10044, 'Grace Mitchell', 'grace.mitchell@example.com', 'USER'),
(10045, 'Sebastian Perez', 'sebastian.perez@example.com', 'MIS'),
(10046, 'Emily Roberts', 'emily.roberts@example.com', 'CASHIER'),
(10047, 'Aiden Turner', 'aiden.turner@example.com', 'PROGRAM HEAD'),
(10048, 'Mila Phillips', 'mila.phillips@example.com', 'REGISTRAR'),
(10049, 'Owen Campbell', 'owen.campbell@example.com', 'USER'),
(10050, 'Victoria Parker', 'victoria.parker@example.com', 'PURCHASING'),
(20000, 'Zoey Lang', 'zoey.lang@example.com', 'PROGRAM HEAD'),
(30000, 'Jane Fisher', 'jane.fisher@example.com', 'LIBRARIAN'),
(40000, 'William Howard', 'william.howard@example.com', 'REGISTRAR'),
(50000, 'Kristen Copper', 'kristen.cooper@example.com', 'GUIDANCE'),
(60000, 'Brian Kim', 'brian.kim@example.com', 'MIS'),
(70000, 'Michael Hunt', 'michael.hunt@example.com', 'CASHIER'),
(80000, 'Samantha Brooks', 'samantha.brooks@example.com', 'DISCIPLINE'),
(90000, 'Frank Harrison', 'frank.harrison@example.com', 'USER');
