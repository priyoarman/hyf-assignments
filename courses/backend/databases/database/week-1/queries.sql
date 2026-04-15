-- Part 1: Basic CRUD Operations

INSERT INTO user (name, email) VALUES ('Arman Hossain', 'priyoarman1996@gmail.com');

INSERT INTO task (title, description, status_id, due_date) VALUES ('Learn SQL', 'Practice database queries', 2, DATETIME('now', '+7 days'));

INSERT INTO user_task (user_id, task_id) VALUES (
    (SELECT id FROM user WHERE email = 'priyoarman1996@gmail.com'), 
    (SELECT id FROM task WHERE title = 'Learn SQL')
);

UPDATE task SET title = 'Master SQL Basics' WHERE title = 'Learn SQL';
UPDATE task SET due_date = DATETIME('now', '+14 days') WHERE title = 'Master SQL Basics';
UPDATE task SET status_id = 3 WHERE title = 'Master SQL Basics';

DELETE FROM task WHERE id = 3;

-- Part 2: Working with Relationships

SELECT u.id, u.name, u.email FROM user u
LEFT JOIN user_task ut ON u.id = ut.user_id
WHERE ut.task_id IS NULL;

SELECT t.id, t.title, t.description, s.name AS status_name, t.due_date FROM task t
JOIN status s ON t.status_id = s.id
WHERE s.name = 'Done';

SELECT t.id, t.title, t.description, s.name AS status_name, t.due_date FROM task t
JOIN status s ON t.status_id = s.id
WHERE t.due_date < DATETIME('now');

-- Part 3: Modifying the Database Schema

ALTER TABLE task ADD COLUMN priority TEXT DEFAULT 'Medium' CHECK(priority IN ('Low', 'Medium', 'High'));

UPDATE task SET priority = 'High' WHERE id IN (1, 2);
UPDATE task SET priority = 'Low' WHERE id IN (4, 5);

CREATE TABLE category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    color TEXT NOT NULL
);

CREATE TABLE task_category (
    task_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    PRIMARY KEY (task_id, category_id),
    FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
);

INSERT INTO category (name, color) VALUES ('Work', 'red');
INSERT INTO category (name, color) VALUES ('Personal', 'blue');
INSERT INTO category (name, color) VALUES ('Study', 'green');

INSERT INTO task_category (task_id, category_id) VALUES (1, 1);
INSERT INTO task_category (task_id, category_id) VALUES (1, 3);
INSERT INTO task_category (task_id, category_id) VALUES (2, 1);
INSERT INTO task_category (task_id, category_id) VALUES (3, 2);
INSERT INTO task_category (task_id, category_id) VALUES (4, 2);
INSERT INTO task_category (task_id, category_id) VALUES (5, 3);

-- Part 4: Advanced Queries
-- Now that you've enhanced the database, write queries to:

-- Find all tasks in a specific category (e.g., "Work")

-- List tasks ordered by priority (High to Low) and by due date (earliest first)

-- Find which category has the most tasks

-- Get all high priority tasks that are either "In Progress" or "To Do"

-- Find users who have tasks in more than one category

SELECT t.title, c.name AS category_name FROM task t
JOIN task_category tc ON t.id = tc.task_id
JOIN category c ON tc.category_id = c.id
WHERE c.name = 'Work';

SELECT t.title, t.priority, t.due_date FROM task t
ORDER BY 
    CASE t.priority
        WHEN 'High' THEN 1
        WHEN 'Medium' THEN 2
        WHEN 'Low' THEN 3
    END ASC,
    t.due_date ASC;

SELECT c.name AS category_name, COUNT(tc.task_id) AS task_count FROM category c
JOIN task_category tc ON c.id = tc.category_id
GROUP BY c.id
ORDER BY task_count DESC
LIMIT 1;

SELECT t.title, t.priority, s.name AS status_name FROM task t
JOIN status s ON t.status_id = s.id
WHERE t.priority = 'High' AND s.name IN ('In Progress', 'Not started');

SELECT u.name, COUNT(DISTINCT tc.category_id) AS category_count FROM user u
JOIN user_task ut ON u.id = ut.user_id
JOIN task t ON ut.task_id = t.id
JOIN task_category tc ON ut.task_id = tc.task_id
GROUP BY u.id
HAVING category_count > 1;