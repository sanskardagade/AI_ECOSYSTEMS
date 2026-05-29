--Get the names, branches, and scores of students who scored above the class average in the exam_scores table.
SELECT s.name as student_name, 
       s.branch as student_branch,
       e.score
FROM exam_scores as e
    INNER JOIN students as s
        ON e.student_id = s.student_id
WHERE e.score > (
    SELECT AVG(score) as class_average
    FROM exam_scores
);


--Students eligible for placement 
--Criteria: At least on exam score is above 90 and any one of their project should have marks above 85

SELECT 
    s.student_id, s.name,s.branch
FROM students s
WHERE s.student_id IN (
    SELECT student_id
    FROM exam_scores
    WHERE score > 90
)AND    
s.student_id IN (
    SELECT student_id
    FROM projects
    WHERE marks > 85
);



--We need to have total score student has earned and number of exams student has attempted.
--we also need to have students name and branch in the result.

SELECT
    s.name,
    s.branch,
    total_stats.total_score,
    total_stats.number_of_attempts
FROM (
    SELECT
        student_id,
        SUM(score) AS total_score,
        COUNT(*) AS number_of_attempts
    FROM exam_scores
    GROUP BY student_id
) AS total_stats
INNER JOIN students AS s
    ON s.student_id = total_stats.student_id
ORDER BY total_stats.total_score DESC;


--For each project get students name,branch,project marks and their average exam score on same row

SELECT
    s.name,
    s.branch,
    p.title,
    p.marks,
    exam_avg.avg_score
FROM projects AS p
INNER JOIN students AS s
    ON s.student_id = p.student_id
INNER JOIN (
    SELECT
        student_id,
        AVG(score) AS avg_score
    FROM exam_scores
    GROUP BY student_id
) AS exam_avg
    ON exam_avg.student_id = p.student_id;


-- CREATE TABLE high_scorers_report (
--     report_id SERIAL PRIMARY KEY,
--     student_id INT,
--     student_name VARCHAR(50),
--     subject VARCHAR(50),
--     score INT
-- );

--There is need of a report where we have list of exam attempts which are above average (score > average class score) Also include name of student in the report.
INSERT INTO high_scorers_report (
    student_id,
    student_name,
    subject,
    score
)
SELECT
    s.student_id,
    s.name,
    e.subject,
    e.score
FROM exam_scores AS e
INNER JOIN students AS s
    ON s.student_id = e.student_id
WHERE e.score > (
    SELECT AVG(score)
    FROM exam_scores
);