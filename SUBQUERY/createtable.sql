-- CREATE TABLE students(
--     student_id  SERIAL PRIMARY KEY,
--     name        VARCHAR(50) NOT NULL,
--     branch      INT
-- );

-- CREATE TABLE exam_scores(
--     score_id    SERIAL PRIMARY KEY,
--     student_id  INT NOT NULL REFERENCES students(student_id),
--     subject     VARCHAR(50) NOT NULL,
--     score       INT NOT NULL CHECK(score BETWEEN 0 AND 100),
--     exam_month  VARCHAR(20) NOT NULL
-- );

-- CREATE TABLE projects (
--     project_id  SERIAL PRIMARY KEY,
--     student_id  INT NOT NULL REFERENCES students(student_id),
--     title       VARCHAR(100) NOT NULL,
--     marks       INT NOT NULL CHECK(marks BETWEEN 0 AND 100)
-- );


-- Students Table
INSERT INTO students (name, branch) VALUES
('Aarav Sharma', 101),
('Priya Verma', 102),
('Rahul Gupta', 101),
('Sneha Patil', 103),
('Vikram Singh', 102),
('Ananya Rao', 104),
('Karan Mehta', 101),
('Neha Joshi', 103);

-- Exam Scores Table
INSERT INTO exam_scores (student_id, subject, score, exam_month) VALUES
(1, 'Mathematics', 85, 'January'),
(2, 'Physics', 78, 'January'),
(3, 'Chemistry', 92, 'February'),
(4, 'Mathematics', 88, 'February'),
(5, 'Physics', 67, 'March'),
(6, 'Chemistry', 95, 'March'),
(7, 'Mathematics', 74, 'April'),
(8, 'Physics', 81, 'April');

-- Projects Table
INSERT INTO projects (student_id, title, marks) VALUES
(1, 'Library Management System', 89),
(2, 'Online Voting System', 76),
(3, 'Weather Forecast App', 93),
(4, 'Student Portal', 85),
(5, 'Inventory Management', 72),
(6, 'AI Chatbot', 98),
(7, 'Hospital Management System', 80),
(8, 'E-Commerce Website', 87);