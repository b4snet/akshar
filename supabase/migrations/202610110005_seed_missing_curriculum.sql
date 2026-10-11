-- Migration: 202610110005_seed_missing_curriculum.sql
-- Description: Idempotent seed for NEB curriculum data (fills missing rows)

-- Insert education level (ON CONFLICT DO NOTHING)
INSERT INTO education_levels (id, name, display_order)
VALUES ('11111111-1111-1111-1111-111111111111', 'NEB', 1)
ON CONFLICT (id) DO NOTHING;

-- Insert grades 11 and 12
INSERT INTO grades (id, education_level_id, name, display_order)
VALUES ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', '11', 1),
       ('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', '12', 2)
ON CONFLICT (id) DO NOTHING;

-- Insert streams for each grade (Science and Management)
INSERT INTO streams (id, grade_id, name, display_order)
VALUES ('44444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', 'Science', 1),
       ('55555555-5555-5555-5555-555555555555', '22222222-2222-2222-2222-222222222222', 'Management', 2),
       ('66666666-6666-6666-6666-666666666666', '33333333-3333-3333-3333-333333333333', 'Science', 1),
       ('77777777-7777-7777-7777-777777777777', '33333333-3333-3333-3333-333333333333', 'Management', 2)
ON CONFLICT (id) DO NOTHING;

-- Insert a few subjects for Science stream (grade 11)
INSERT INTO subjects (id, stream_id, name, code, optional, display_order)
VALUES ('88888888-8888-8888-8888-888888888888', '44444444-4444-4444-4444-444444444444', 'Physics', 'PHY', false, 1),
       ('99999999-9999-9999-9999-999999999999', '44444444-4444-4444-4444-444444444444', 'Chemistry', 'CHE', false, 2),
       ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '44444444-4444-4444-4444-444444444444', 'Biology', 'BIO', false, 3),
       ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '44444444-4444-4444-4444-444444444444', 'Mathematics', 'MATH', false, 4)
ON CONFLICT (id) DO NOTHING;

-- Insert a sample unit for Physics
INSERT INTO units (id, subject_id, title, description, display_order)
VALUES ('cccccccc-cccc-cccc-cccc-cccccccccccc', '88888888-8888-8888-8888-888888888888', 'Mechanics', 'Fundamentals of motion and forces', 1)
ON CONFLICT (id) DO NOTHING;

-- Insert a sample chapter for Mechanics unit
INSERT INTO chapters (id, unit_id, title, description, display_order)
VALUES ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'Vectors and Scalars', 'Understanding vector quantities', 1)
ON CONFLICT (id) DO NOTHING;

-- Insert a sample topic
INSERT INTO topics (id, chapter_id, title, objectives, language, difficulty, display_order)
VALUES ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'Vector addition', 'Learn how to add vectors graphically and analytically', 'en', 2, 1)
ON CONFLICT (id) DO NOTHING;

-- Insert a learning resource for the topic
INSERT INTO learning_resources (id, topic_id, type, title, url, language)
VALUES ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'article', 'Vector addition tutorial', 'https://example.com/vector-addition', 'en')
ON CONFLICT (id) DO NOTHING;

-- Insert a simple assessment (quiz) linked to the topic
INSERT INTO assessments (id, topic_id, name, description, max_score, passing_score)
VALUES ('11111111-2222-3333-4444-555555555555', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Vector Quiz', 'Basic questions about vector addition', 10, 6)
ON CONFLICT (id) DO NOTHING;
