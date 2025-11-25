import postgres from "postgres";

// make sure postgres is running: sudo systemctl <status | start | stop> postgresql
// drop database: psql -U feelhippo -c "drop database repository_test"
// create auth database: psql -U feelhippo -c "create database repository_test"

// make sure database was created: psql -U feelhippo -d repository_test
// from psql prompt, connect: \connect
// and create the users table: CREATE TABLE users (id integer primary key generated always as identity, name VARCHAR(255), is_deleted BOOLEAN);

// create schema: psql -U feelhippo -c "create schema if not exists repository_test_schema"

// see all databases: psql -U feelhippo -l

// the below credentials refer to my own machine
const sql = postgres(
  "postgres://feelhippo:Filippo333@127.0.0.1:5432/repository_test",
  { transform: postgres.fromCamel },
);

export default sql;
