-- Provisioned once on first container initialization.
-- Keeps the PHPUnit testing database beside the development database so
-- backend tests can run against real PostgreSQL (TESTING_STRATEGY §13).
CREATE DATABASE akshar_testing;
