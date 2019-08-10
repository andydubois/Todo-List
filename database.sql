CREATE TABLE todolist
(
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR (40) NOT NULL,
    "completed" VARCHAR (6) NOT NULL,
    "type" VARCHAR NOT NULL,
    "notes" VARCHAR (100)
);