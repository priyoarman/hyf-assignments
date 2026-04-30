-- Part A: Aggregate Functions & Reporting

-- Part 1, Q1
-- Count the total number of tasks in the database.

SELECT COUNT(*) AS total_tasks FROM task;

-- Part 1, Q2
-- Count tasks per user. Include users with zero tasks.

SELECT u.name, COUNT(t.id) AS task_count FROM user u
LEFT JOIN task t ON u.id = t.user_id
GROUP BY u.id;

-- Part 1, Q3
-- Count tasks per status (To Do, In Progress, Done, Blocked).

SELECT s.name AS status_name, COUNT(t.id) AS task_count FROM status s
LEFT JOIN task t ON s.id = t.status_id
GROUP BY s.id;

-- Part 1, Q4
-- Find the user who has the most tasks assigned.

SELECT u.name, COUNT(t.id) AS task_count FROM user u
JOIN task t ON u.id = t.user_id
GROUP BY u.id
ORDER BY task_count DESC
LIMIT 1;

-- Part 1, Q5
-- Average tasks per user — only for users with at least one task.

SELECT AVG(task_count) AS avg_tasks_per_user FROM (
    SELECT COUNT(t.id) AS task_count FROM user u
    JOIN task t ON u.id = t.user_id
    GROUP BY u.id
) subquery;

-- Part 1, Q6
-- Find the earliest and latest due_date across all tasks.

SELECT MIN(due_date) AS earliest_due_date, MAX(due_date) AS latest_due_date FROM task;

-- Part 1, Q7
-- List categories with task counts, ordered most to least.

SELECT c.name AS category_name, COUNT(tc.task_id) AS task_count FROM category c
LEFT JOIN task_category tc ON c.id = tc.category_id
GROUP BY c.id
ORDER BY task_count DESC; 

-- Part 1, Q8
-- Find users who have more than 2 tasks assigned.

SELECT u.name, COUNT(t.id) AS task_count FROM user u
JOIN task t ON u.id = t.user_id
GROUP BY u.id
HAVING COUNT(t.id) > 2;



-- Part B: SQL Injection

-- 1. Spot the Vulnerability
-- The function above builds a SQL query using string concatenation — it glues user input directly into the query string without any sanitisation.

-- Explain in a comment in your .sql file: what would happen if userName was set to ' OR '1'='1? What data would be returned, and why is this dangerous?

-- Write the malicious string that an attacker could use to delete all tasks from the database. You do not need to run it — just write it as a comment with an explanation of how it works.

-- If userName was set to ' OR '1'='1, the query would be:

SELECT * FROM task WHERE user_id = (SELECT id FROM user WHERE name = '' OR '1'='1');

-- This would return all tasks in the database because the condition '1'='1' is always true, effectively bypassing the intended filter by user name. This is dangerous because it exposes all data to unauthorized access, allowing attackers to retrieve sensitive information.

-- The malicious string could be: '); DELETE FROM task; --

-- The string '); DELETE FROM task; -- would close the current query, execute a new query to delete all tasks, and then comment out the rest of the original query. This would result in all tasks being deleted from the database, a major security breach.

-- 2. Fix the Vulnerability
-- The vulnerable function can be rewritten so that user input never gets concatenated directly into the query string. Research how database libraries handle this safely and rewrite getTasksByUser using the appropriate pattern.

-- Write your fixed version as a code comment in your .sql file.

function getTasksByUser(userName) {
  const query = `SELECT * FROM task WHERE user_id = (SELECT id FROM user WHERE name = ?)`;
  db.all(query, [userName], (err, rows) => console.log(rows));
}



-- Part C: Transactions

-- Part 3, Q1
-- Reassign all tasks from user 1 to user 2, then delete user 1.
-- Use BEGIN TRANSACTION and COMMIT.

BEGIN TRANSACTION;
  -- UPDATE ...
  -- DELETE ...
COMMIT;

-- Verify nothing went wrong:

BEGIN TRANSACTION;
  UPDATE task SET user_id = 2 WHERE user_id = 1; -- Reassign tasks from user with id 1 to user with id 2
  DELETE FROM user WHERE id = 1; -- Delete the original user with id 1
COMMIT;

-- Part 3, Q2
-- Demonstrate a deliberate rollback.
-- Make some changes, then trigger a failure so everything rolls back.

BEGIN TRANSACTION;
  -- some updates...
  -- intentional failure here
ROLLBACK;

-- Verify nothing changed:

BEGIN TRANSACTION;
  UPDATE task SET user_id = 2 WHERE user_id = 1;
  DELETE FROM user WHERE id = 1;
ROLLBACK;




-- Part D: Putting It All Together

BEGIN TRANSACTION;
  INSERT OR ROLLBACK INTO category (name, color) VALUES ('Urgent', 'orange');
  INSERT INTO task_category (task_id, category_id)
  SELECT t.id, (SELECT id FROM category WHERE name = 'Urgent') FROM task t
  JOIN status s ON t.status_id = s.id
  WHERE s.name IN ('In progress', 'Not started');
COMMIT;


-- Write a second transaction that demonstrates a deliberate rollback: attempt to reassign tasks and then intentionally trigger a failure (e.g., try to insert a task with a non-existent status_id). The whole transaction should roll back so no changes are saved.

-- Part 4, Q2
-- Dashboard: single SELECT returning all four numbers:
--   total tasks, completed (Done), overdue, users with tasks

SELECT COUNT(*) AS total_tasks,
       SUM(CASE WHEN s.name = 'Done' THEN 1 ELSE 0 END) AS completed_tasks,
       SUM(CASE WHEN t.due_date < DATE('now') AND s.name != 'Done' THEN 1 ELSE 0 END) AS overdue_tasks,
       COUNT(DISTINCT t.user_id) AS users_with_tasks
FROM task t
JOIN status s ON t.status_id = s.id;
