\c transactions_dev;

INSERT INTO transactions (title, amount, transaction_date, transaction_from, category, deposit) VALUES
('Direct Depost', 15, 1548381600,'Employer','Income', true),
('Direct Depost', 15, 1548381600,'Employer','Income', true),
('Cat Food', 12.5, 1548381600,'Trixies Pet Shop','Pets', false),
('Direct Depost', 15, 1548381600,'Employer','Income', true),
('Takeout', 23.75, 1548381600,'Hardee Chinese Food Shop','Food', false),
('Takeout', 23.75, 1548381600,'Hardee Chinese Food Shop','Food', false);

SELECT * FROM transactions;