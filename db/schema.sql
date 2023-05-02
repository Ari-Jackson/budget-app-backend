DROP DATABASE IF EXISTS transactions_dev;
CREATE DATABASE transactions_dev;

\c transactions_dev;

CREATE TABLE transactions (
 id SERIAL PRIMARY KEY,
 title TEXT NOT NULL,
 amount DECIMAL NOT NULL,
 transaction_date INT NOT NULL,
 transaction_from TEXT,
 category TEXT,
 deposit BOOLEAN NOT NULL DEFAULT false
);

\d transactions;
