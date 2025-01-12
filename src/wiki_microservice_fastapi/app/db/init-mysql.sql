-- Drop the database if it exists
DROP DATABASE IF EXISTS wiki;

-- Create the database
CREATE DATABASE IF NOT EXISTS wiki;

-- Create the user 'pipo' with access from any host (%)
CREATE USER IF NOT EXISTS 'pipo'@'%' IDENTIFIED BY 'man';

-- Grant all privileges on the 'wiki' database to the user 'pipo'
GRANT ALL PRIVILEGES ON wiki.* TO 'pipo'@'%' WITH GRANT OPTION;

-- Switch to the 'wiki' database
USE wiki;


-- mysqldump

-- creo tabla eventos
