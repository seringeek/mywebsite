-- Create projects table for Side Projects
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('full-blown', 'micro', 'research')),
  tag TEXT NOT NULL,
  date_range TEXT NOT NULL,
  description TEXT NOT NULL,
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create proof_of_work table
CREATE TABLE IF NOT EXISTS proof_of_work (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  link TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookshelf table
CREATE TABLE IF NOT EXISTS bookshelf (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  cover_url TEXT,
  status TEXT NOT NULL CHECK (status IN ('reading', 'completed', 'want-to-read')),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create summaries table
CREATE TABLE IF NOT EXISTS summaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  source TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tools table
CREATE TABLE IF NOT EXISTS tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables (public read, admin write via service role)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE proof_of_work ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookshelf ENABLE ROW LEVEL SECURITY;
ALTER TABLE summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON proof_of_work FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON bookshelf FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON summaries FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON tools FOR SELECT USING (true);

-- Insert sample projects data
INSERT INTO projects (title, category, tag, date_range, description, link) VALUES
('AI Content Platform', 'full-blown', 'SaaS', 'Jan 2024 - Present', 'An AI-powered content generation platform for marketers and writers. Features include multi-model support, templates, and team collaboration.', 'https://example.com'),
('PM Interview Prep', 'full-blown', 'EdTech', 'Mar 2023 - Dec 2023', 'A comprehensive platform for product manager interview preparation with mock interviews, case studies, and personalized feedback.', 'https://example.com'),
('Quick Notes CLI', 'micro', 'Developer Tool', 'Nov 2024 - Present', 'A minimal command-line tool for capturing quick notes and ideas. Syncs across devices via cloud storage.', null),
('Habit Tracker Widget', 'micro', 'Productivity', 'Sep 2024 - Oct 2024', 'A simple iOS widget for tracking daily habits with streak counting and gentle reminders.', null),
('LLM Evaluation Framework', 'research', 'AI Research', 'Feb 2024 - Present', 'Research on evaluating LLM outputs for factual accuracy and hallucination detection in domain-specific contexts.', null),
('Marketplace Dynamics', 'research', 'Economics', 'Jun 2023 - Nov 2023', 'Analysis of pricing dynamics and network effects in two-sided marketplaces based on real-world data.', null);

-- Insert sample proof of work data
INSERT INTO proof_of_work (title, category, description, link) VALUES
('Scaled Marketplace 24x', 'Product', 'Led the growth of a food-tech marketplace from 1.5M to 36M monthly transactions through product-led growth strategies.', null),
('500+ PM Mentees', 'Mentorship', 'Mentored over 500 product professionals through communities, 1:1 sessions, and structured programs.', null),
('Learning Platform Acquisition', 'Building', 'Built and scaled Learning Curv, a PM learning platform that was later acquired by AIMER.', null),
('Southeast Asia Logistics Scale', 'Product', 'Scaled logistics products at Gojek used by millions of users across Southeast Asia.', null);

-- Insert sample bookshelf data
INSERT INTO bookshelf (title, author, status, rating) VALUES
('Thinking, Fast and Slow', 'Daniel Kahneman', 'completed', 5),
('The Mom Test', 'Rob Fitzpatrick', 'completed', 5),
('Zero to One', 'Peter Thiel', 'completed', 4),
('Inspired', 'Marty Cagan', 'reading', null),
('The Hard Thing About Hard Things', 'Ben Horowitz', 'want-to-read', null);

-- Insert sample summaries data
INSERT INTO summaries (title, source, content, category) VALUES
('Product-Market Fit Framework', 'Various Sources', 'A synthesis of different approaches to finding and validating product-market fit, including metrics, signals, and iteration strategies.', 'Product'),
('AI in Production', 'Research Papers', 'Key learnings from deploying AI systems in production environments - covering monitoring, evaluation, and iteration cycles.', 'AI');

-- Insert sample tools data
INSERT INTO tools (name, description, category, link) VALUES
('Cursor', 'AI-powered code editor that helps write and refactor code faster.', 'Development', 'https://cursor.com'),
('Linear', 'Modern issue tracking and project management for product teams.', 'Productivity', 'https://linear.app'),
('Figma', 'Collaborative design tool for creating interfaces and prototypes.', 'Design', 'https://figma.com'),
('Notion', 'All-in-one workspace for notes, docs, and project management.', 'Productivity', 'https://notion.so');
