CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    due_date TIMESTAMP,
    priority VARCHAR(50),
    status VARCHAR(50) DEFAULT 'To Do'
);

INSERT INTO tasks (name, description, due_date, priority, status)
VALUES ('Test Task', 'This is a sample task', NOW(), 'High', 'To Do');
