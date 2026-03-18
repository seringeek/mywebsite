-- Remove micro and research projects from the database
DELETE FROM projects WHERE category = 'micro';
DELETE FROM projects WHERE category = 'research';
