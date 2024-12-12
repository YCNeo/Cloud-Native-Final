USE `cns_db`;

-- fake data rule:
-- 1. 3 different groups
-- 2. 4 channels, 3 Identities and 3 Tags in each groups
-- 3. every channel has 3 Activities, 10 Accounting records and 0 ~ 2 Plans
-- 4. 10 users can simultaneously join 3 different groups, and each user can be assigned multiple different Identities within each groups.
-- 5. Each user within the groups can access any Channels.
-- 6. Each user within the channel can send messages to other users within the channel
-- 7. Users can chat in multiple Channels simultaneously.
-- 8. Each user within the channel can create or update Plans and Activities
-- 9. Each user within the channel can create Accounting records
-- 10. Each user within the channel can be the payer in any Accounting records within the channel
-- 11. attendees_ids is formed as "U001,U002,U003....."
-- 12. Each user within the channel can be the attendee in any Accounting records within the channel

-- Insert data into 'user' table
INSERT INTO `user` VALUES
('U001', 'user1', 'user1@example.com', '0b14d501a594442a01c6859541bcb3e8164d183d32937b851835442f69d5c94e', '1234567890', 'User 1 description', NULL, '1990-01-01', '0', NOW(), NULL),
('U002', 'user2', 'user2@example.com', '6cf615d5bcaac778352a8f1f3360d23f02f34ec182e259897fd6ce485d7870d4', '1234567891', 'User 2 description', NULL, '1991-02-02', '1', NOW(), NULL),
('U003', 'user3', 'user3@example.com', '5906ac361a137e2d286465cd6588ebb5ac3f5ae955001100bc41577c3d751764', '1234567892', 'User 3 description', NULL, '1992-03-03', '2', NOW(), NULL),
('U004', 'user4', 'user4@example.com', 'b97873a40f73abedd8d685a7cd5e5f85e4a9cfb83eac26886640a0813850122b', '1234567893', 'User 4 description', NULL, '1993-04-04', '0', NOW(), NULL),
('U005', 'user5', 'user5@example.com', '8b2c86ea9cf2ea4eb517fd1e06b74f399e7fec0fef92e3b482a6cf2e2b092023', '1234567894', 'User 5 description', NULL, '1994-05-05', '1', NOW(), NULL),
('U006', 'user6', 'user6@example.com', '598a1a400c1dfdf36974e69d7e1bc98593f2e15015eed8e9b7e47a83b31693d5', '1234567895', 'User 6 description', NULL, '1995-06-06', '2', NOW(), NULL),
('U007', 'user7', 'user7@example.com', '5860836e8f13fc9837539a597d4086bfc0299e54ad92148d54538b5c3feefb7c', '1234567896', 'User 7 description', NULL, '1996-07-07', '0', NOW(), NULL),
('U008', 'user8', 'user8@example.com', '57f3ebab63f156fd8f776ba645a55d96360a15eeffc8b0e4afe4c05fa88219aa', '1234567897', 'User 8 description', NULL, '1997-08-08', '1', NOW(), NULL),
('U009', 'user9', 'user9@example.com', '9323dd6786ebcbf3ac87357cc78ba1abfda6cf5e55cd01097b90d4a286cac90e', '1234567898', 'User 9 description', NULL, '1998-09-09', '2', NOW(), NULL),
('U010', 'user10', 'user10@example.com', 'aa4a9ea03fcac15b5fc63c949ac34e7b0fd17906716ac3b8e58c599cdc5a52f0', '1234567899', 'User 10 description', NULL, '1999-10-10', '0', NOW(), NULL);


-- Insert data into 'groups' table
INSERT INTO `groups` VALUES
('G001', 'Group Alpha', FALSE, NULL, 'This is Group Alpha.', NULL, NOW(), 'U001', NULL, NULL),
('G002', 'Group Beta', TRUE, NULL, 'This is Group Beta.', NULL, NOW(), 'U002', NULL, NULL),
('G003', 'Group Gamma', FALSE, NULL, 'This is Group Gamma.', NULL, NOW(), 'U003', NULL, NULL);

-- Insert data into 'channel' table
INSERT INTO `channel` VALUES
('C001', 'Alpha General', 'G001', NULL, 'General discussion for Group Alpha.', NOW(), 'U001', NULL, NULL),
('C002', 'Alpha Projects', 'G001', NULL, 'Project discussions for Group Alpha.', NOW(), 'U002', NULL, NULL),
('C003', 'Alpha Events', 'G001', NULL, 'Event planning for Group Alpha.', NOW(), 'U003', NULL, NULL),
('C004', 'Alpha Random', 'G001', NULL, 'Random talks for Group Alpha.', NOW(), 'U004', NULL, NULL),
('C005', 'Beta General', 'G002', NULL, 'General discussion for Group Beta.', NOW(), 'U002', NULL, NULL),
('C006', 'Beta Projects', 'G002', NULL, 'Project discussions for Group Beta.', NOW(), 'U005', NULL, NULL),
('C007', 'Beta Events', 'G002', NULL, 'Event planning for Group Beta.', NOW(), 'U006', NULL, NULL),
('C008', 'Beta Random', 'G002', NULL, 'Random talks for Group Beta.', NOW(), 'U003', NULL, NULL),
('C009', 'Gamma General', 'G003', NULL, 'General discussion for Group Gamma.', NOW(), 'U003', NULL, NULL),
('C010', 'Gamma Projects', 'G003', NULL, 'Project discussions for Group Gamma.', NOW(), 'U007', NULL, NULL),
('C011', 'Gamma Events', 'G003', NULL, 'Event planning for Group Gamma.', NOW(), 'U008', NULL, NULL),
('C012', 'Gamma Random', 'G003', NULL, 'Random talks for Group Gamma.', NOW(), 'U009', NULL, NULL);


-- Insert data into 'tag' table
INSERT INTO `tag` VALUES
('T001', 'Urgent', 'G001', NOW()),
('T002', 'Important', 'G001', NOW()),
('T003', 'Review', 'G001', NOW()),
('T004', 'Bug', 'G002', NOW()),
('T005', 'Feature', 'G002', NOW()),
('T006', 'Discussion', 'G002', NOW()),
('T007', 'Meeting', 'G003', NOW()),
('T008', 'Announcement', 'G003', NOW()),
('T009', 'Feedback', 'G003', NOW());


-- Insert data into 'identity' table
INSERT INTO `identity` VALUES
('R001', 'Alpha Admin', 'G001', NULL, '#FF5733', 'Admin role for Group Alpha.', NOW(), NULL, NULL),
('R002', 'Alpha Member', 'G001', NULL, '#33FF57', 'Member role for Group Alpha.', NOW(), NULL, NULL),
('R003', 'Alpha Guest', 'G001', NULL, '#3357FF', 'Guest role for Group Alpha.', NOW(), NULL, NULL),
('R004', 'Beta Admin', 'G002', NULL, '#FF33A6', 'Admin role for Group Beta.', NOW(), NULL, NULL),
('R005', 'Beta Member', 'G002', NULL, '#A6FF33', 'Member role for Group Beta.', NOW(), NULL, NULL),
('R006', 'Beta Guest', 'G002', NULL, '#33A6FF', 'Guest role for Group Beta.', NOW(), NULL, NULL),
('R007', 'Gamma Admin', 'G003', NULL, '#FF8633', 'Admin role for Group Gamma.', NOW(), NULL, NULL),
('R008', 'Gamma Member', 'G003', NULL, '#86FF33', 'Member role for Group Gamma.', NOW(), NULL, NULL),
('R009', 'Gamma Guest', 'G003', NULL, '#3386FF', 'Guest role for Group Gamma.', NOW(), NULL, NULL);


-- Insert data into 'group_member' table
INSERT INTO `group_member` VALUES
('G001', 'U001'),
('G001', 'U002'),
('G001', 'U003'),
('G001', 'U004'),
('G001', 'U005'),
('G002', 'U003'),
('G002', 'U004'),
('G002', 'U005'),
('G002', 'U006'),
('G002', 'U007'),
('G003', 'U006'),
('G003', 'U007'),
('G003', 'U008'),
('G003', 'U009'),
('G003', 'U010');


-- Insert data into 'assign_id' table
INSERT INTO `assign_id` VALUES
('U001', 'R001'), -- U001 is Alpha Admin
('U002', 'R002'), -- U002 is Alpha Member
('U003', 'R002'), -- U003 is Alpha Member
('U004', 'R003'), -- U004 is Alpha Guest
('U005', 'R002'), -- U005 is Alpha Member
('U003', 'R004'), -- U003 is Beta Admin
('U004', 'R005'), -- U004 is Beta Member
('U005', 'R005'), -- U005 is Beta Member
('U006', 'R006'), -- U006 is Beta Guest
('U006', 'R007'), -- U006 is Gamma Admin
('U007', 'R008'), -- U007 is Gamma Member
('U008', 'R008'), -- U008 is Gamma Member
('U009', 'R009'), -- U009 is Gamma Guest
('U010', 'R008'); -- U010 is Gamma Member


-- Insert data into 'feat_plan' table
INSERT INTO `feat_plan` VALUES
('P001', 'Alpha Plan 1', 'C001', '#FF0000', NULL, 'Plan description 1', NOW(), 'U001', NULL, NULL),
('P002', 'Alpha Plan 2', 'C001', '#00FF00', NULL, 'Plan description 2', NOW(), 'U002', NULL, NULL),
('P003', 'Alpha Plan 3', 'C002', '#0000FF', NULL, 'Plan description 3', NOW(), 'U003', NULL, NULL),
('P004', 'Alpha Plan 4', 'C004', '#FFFF00', NULL, 'Plan description 4', NOW(), 'U004', NULL, NULL),
('P005', 'Beta Plan 1', 'C005', '#FF00FF', NULL, 'Plan description 5', NOW(), 'U003', NULL, NULL),
('P006', 'Beta Plan 2', 'C006', '#00FFFF', NULL, 'Plan description 6', NOW(), 'U005', NULL, NULL),
('P007', 'Beta Plan 3', 'C006', '#C0C0C0', NULL, 'Plan description 7', NOW(), 'U006', NULL, NULL),
('P008', 'Beta Plan 4', 'C008', '#800080', NULL, 'Plan description 8', NOW(), 'U007', NULL, NULL),
('P009', 'Gamma Plan 1', 'C010', '#808000', NULL, 'Plan description 9', NOW(), 'U006', NULL, NULL),
('P010', 'Gamma Plan 2', 'C010', '#008080', NULL, 'Plan description 10', NOW(), 'U008', NULL, NULL),
('P011', 'Gamma Plan 3', 'C011', '#800000', NULL, 'Plan description 11', NOW(), 'U009', NULL, NULL);


-- Insert data into 'feat_activity' table
INSERT INTO `feat_activity` VALUES
('A001', 'Alpha Activity 1', 'C001', NOW(), NULL, 'Activity 1 in Alpha General channel.', NOW(), 'U001', NULL, NULL),
('A002', 'Alpha Activity 2', 'C001', NOW(), NULL, 'Activity 2 in Alpha General channel.', NOW(), 'U002', NULL, NULL),
('A003', 'Alpha Activity 3', 'C001', NOW(), NULL, 'Activity 3 in Alpha General channel.', NOW(), 'U003', NULL, NULL),
('A004', 'Alpha Activity 4', 'C002', NOW(), NULL, 'Activity 4 in Alpha Projects channel.', NOW(), 'U002', NULL, NULL),
('A005', 'Alpha Activity 5', 'C002', NOW(), NULL, 'Activity 5 in Alpha Projects channel.', NOW(), 'U003', NULL, NULL),
('A006', 'Alpha Activity 6', 'C002', NOW(), NULL, 'Activity 6 in Alpha Projects channel.', NOW(), 'U004', NULL, NULL),
('A007', 'Alpha Activity 7', 'C003', NOW(), NULL, 'Activity 7 in Alpha Events channel.', NOW(), 'U003', NULL, NULL),
('A008', 'Alpha Activity 8', 'C003', NOW(), NULL, 'Activity 8 in Alpha Events channel.', NOW(), 'U004', NULL, NULL),
('A009', 'Alpha Activity 9', 'C003', NOW(), NULL, 'Activity 9 in Alpha Events channel.', NOW(), 'U005', NULL, NULL),
('A010', 'Alpha Activity 10', 'C004', NOW(), NULL, 'Activity 10 in Alpha Random channel.', NOW(), 'U005', NULL, NULL),
('A011', 'Alpha Activity 11', 'C004', NOW(), NULL, 'Activity 11 in Alpha Random channel.', NOW(), 'U001', NULL, NULL),
('A012', 'Alpha Activity 12', 'C004', NOW(), NULL, 'Activity 12 in Alpha Random channel.', NOW(), 'U002', NULL, NULL),
('A013', 'Beta Activity 1', 'C005', NOW(), NULL, 'Activity 1 in Beta General channel.', NOW(), 'U003', NULL, NULL),
('A014', 'Beta Activity 2', 'C005', NOW(), NULL, 'Activity 2 in Beta General channel.', NOW(), 'U004', NULL, NULL),
('A015', 'Beta Activity 3', 'C005', NOW(), NULL, 'Activity 3 in Beta General channel.', NOW(), 'U005', NULL, NULL),
('A016', 'Beta Activity 4', 'C006', NOW(), NULL, 'Activity 4 in Beta Projects channel.', NOW(), 'U005', NULL, NULL),
('A017', 'Beta Activity 5', 'C006', NOW(), NULL, 'Activity 5 in Beta Projects channel.', NOW(), 'U006', NULL, NULL),
('A018', 'Beta Activity 6', 'C006', NOW(), NULL, 'Activity 6 in Beta Projects channel.', NOW(), 'U007', NULL, NULL),
('A019', 'Beta Activity 7', 'C007', NOW(), NULL, 'Activity 7 in Beta Events channel.', NOW(), 'U006', NULL, NULL),
('A020', 'Beta Activity 8', 'C007', NOW(), NULL, 'Activity 8 in Beta Events channel.', NOW(), 'U007', NULL, NULL),
('A021', 'Beta Activity 9', 'C007', NOW(), NULL, 'Activity 9 in Beta Events channel.', NOW(), 'U003', NULL, NULL),
('A022', 'Beta Activity 10', 'C008', NOW(), NULL, 'Activity 10 in Beta Random channel.', NOW(), 'U004', NULL, NULL),
('A023', 'Beta Activity 11', 'C008', NOW(), NULL, 'Activity 11 in Beta Random channel.', NOW(), 'U005', NULL, NULL),
('A024', 'Beta Activity 12', 'C008', NOW(), NULL, 'Activity 12 in Beta Random channel.', NOW(), 'U006', NULL, NULL),
('A025', 'Gamma Activity 1', 'C009', NOW(), NULL, 'Activity 1 in Gamma General channel.', NOW(), 'U006', NULL, NULL),
('A026', 'Gamma Activity 2', 'C009', NOW(), NULL, 'Activity 2 in Gamma General channel.', NOW(), 'U007', NULL, NULL),
('A027', 'Gamma Activity 3', 'C009', NOW(), NULL, 'Activity 3 in Gamma General channel.', NOW(), 'U008', NULL, NULL),
('A028', 'Gamma Activity 4', 'C010', NOW(), NULL, 'Activity 4 in Gamma Projects channel.', NOW(), 'U008', NULL, NULL),
('A029', 'Gamma Activity 5', 'C010', NOW(), NULL, 'Activity 5 in Gamma Projects channel.', NOW(), 'U009', NULL, NULL),
('A030', 'Gamma Activity 6', 'C010', NOW(), NULL, 'Activity 6 in Gamma Projects channel.', NOW(), 'U010', NULL, NULL),
('A031', 'Gamma Activity 7', 'C011', NOW(), NULL, 'Activity 7 in Gamma Events channel.', NOW(), 'U009', NULL, NULL),
('A032', 'Gamma Activity 8', 'C011', NOW(), NULL, 'Activity 8 in Gamma Events channel.', NOW(), 'U010', NULL, NULL),
('A033', 'Gamma Activity 9', 'C011', NOW(), NULL, 'Activity 9 in Gamma Events channel.', NOW(), 'U006', NULL, NULL),
('A034', 'Gamma Activity 10', 'C012', NOW(), NULL, 'Activity 10 in Gamma Random channel.', NOW(), 'U007', NULL, NULL),
('A035', 'Gamma Activity 11', 'C012', NOW(), NULL, 'Activity 11 in Gamma Random channel.', NOW(), 'U008', NULL, NULL),
('A036', 'Gamma Activity 12', 'C012', NOW(), NULL, 'Activity 12 in Gamma Random channel.', NOW(), 'U009', NULL, NULL);


-- Insert data into 'feat_accounting' table

INSERT INTO `feat_accounting` VALUES
('AC001', 'C001', 'U001', 100.00, 'USD', 'U001,U002', 'Lunch;Team lunch at cafe', '2023-01-01', TRUE, NOW(), 'U001'),
('AC002', 'C001', 'U002', 150.00, 'USD', 'U001,U002,U003', 'Office Supplies;Purchased office supplies', '2023-01-02', FALSE, NOW(), 'U002'),
('AC003', 'C001', 'U003', 200.00, 'USD', 'U002,U003', 'Project Materials;Materials for project', '2023-01-03', TRUE, NOW(), 'U003'),
('AC004', 'C001', 'U004', 50.00, 'USD', 'U001,U004', 'Coffee;Coffee for meeting', '2023-01-04', TRUE, NOW(), 'U004'),
('AC005', 'C001', 'U005', 75.00, 'USD', 'U005', 'Snacks;Snacks for team', '2023-01-05', FALSE, NOW(), 'U005'),
('AC006', 'C001', 'U001', 120.00, 'USD', 'U001,U003,U005', 'Dinner;Team dinner', '2023-01-06', TRUE, NOW(), 'U001'),
('AC007', 'C001', 'U002', 90.00, 'USD', 'U002,U004', 'Transportation;Taxi fares', '2023-01-07', TRUE, NOW(), 'U002'),
('AC008', 'C001', 'U003', 60.00, 'USD', 'U001,U002,U003', 'Books;Reference books', '2023-01-08', FALSE, NOW(), 'U003'),
('AC009', 'C001', 'U004', 110.00, 'USD', 'U003,U004,U005', 'Tickets;Event tickets', '2023-01-09', TRUE, NOW(), 'U004'),
('AC010', 'C001', 'U005', 80.00, 'USD', 'U001,U005', 'Gifts;Gifts for clients', '2023-01-10', FALSE, NOW(), 'U005'),
('AC011', 'C002', 'U002', 130.00, 'USD', 'U002,U003', 'Software Subscription;Monthly subscription', '2023-01-11', TRUE, NOW(), 'U002'),
('AC012', 'C002', 'U003', 220.00, 'USD', 'U001,U003,U004', 'Equipment;New equipment', '2023-01-12', FALSE, NOW(), 'U003'),
('AC021', 'C005', 'U003', 150.00, 'USD', 'U003,U004', 'Team Building;Event expenses', '2023-01-13', TRUE, NOW(), 'U003'),
('AC022', 'C005', 'U004', 85.00, 'USD', 'U004,U005', 'Lunch;Group lunch', '2023-01-14', FALSE, NOW(), 'U004'),
('AC031', 'C009', 'U006', 95.00, 'USD', 'U006,U007', 'Workshop Fees;Fees for workshop', '2023-01-15', TRUE, NOW(), 'U006'),
('AC032', 'C009', 'U007', 60.00, 'USD', 'U007,U008', 'Refreshments;Drinks and snacks', '2023-01-16', FALSE, NOW(), 'U007');


-- Insert data into 'chat_in' table

INSERT INTO `chat_in` VALUES
('U001', 'C001', 'Welcome to Alpha General channel!', NOW()),
('U002', 'C001', 'Thank you, happy to be here.', NOW()),
('U003', 'C001', 'Looking forward to working with everyone.', NOW()),
('U004', 'C001', 'Hello all!', NOW()),
('U005', 'C001', 'Hi team!', NOW()),
('U002', 'C002', 'Project meeting at 2 PM.', NOW()),
('U003', 'C002', 'Got it, I will be there.', NOW()),
('U004', 'C002', 'I might be a bit late.', NOW()),
('U005', 'C002', 'No worries.', NOW()),
('U001', 'C002', 'See you all there.', NOW()),
('U003', 'C003', 'Event planning is underway.', NOW()),
('U004', 'C003', 'Do you need any help?', NOW()),
('U005', 'C003', 'I can assist.', NOW()),
('U001', 'C003', 'Let me know if resources are needed.', NOW()),
('U002', 'C003', 'Thanks everyone.', NOW()),
('U005', 'C004', 'Random thought: We should have a team outing.', NOW()),
('U001', 'C004', 'That sounds great!', NOW()),
('U002', 'C004', 'I agree!', NOW()),
('U003', 'C004', 'Count me in.', NOW()),
('U004', 'C004', 'Me too.', NOW()),
('U003', 'C005', 'Welcome to Beta General channel!', NOW()),
('U004', 'C005', 'Happy to join.', NOW()),
('U005', 'C005', 'Hello everyone!', NOW()),
('U006', 'C005', 'Greetings!', NOW()),
('U007', 'C005', 'Hi all!', NOW()),
('U006', 'C009', 'Welcome to Gamma General channel!', NOW()),
('U007', 'C009', 'Glad to be here.', NOW()),
('U008', 'C009', 'Hello everyone.', NOW()),
('U009', 'C009', 'Hi!', NOW()),
('U010', 'C009', 'Greetings!', NOW()),
('U007', 'C001', 'Hello Alpha Group!', NOW()),
('U009', 'C012', 'Random chat in Gamma Random channel.', NOW()),
('U010', 'C010', 'Working on Gamma Projects.', NOW());

