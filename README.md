# Payroll Management System

Run the following commands to run postgresql:
```bash
docker run --name my-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d --rm postgres:13-alpine
```

To interact with the database through psql, run the following command:
```bash
docker exec -it -u postgres my-postgres psql
```

