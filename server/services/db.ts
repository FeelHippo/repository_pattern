import postgres from "postgres";

// make sure postgres is running: sudo systemctl <status | start | stop> postgresql
// drop database: psql -U postgres -c "drop database repository_test"
// create auth database: psql -U postgres -c "create database repository_test"

// the below credentials refer to my own machine
const sql = postgres(
  "postgres://feelhippo:Filippo333@localhost:5432/repository_test",
); // will use psql environment variables

export default sql;
