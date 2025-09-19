
DROP INDEX idx_businesses_owner;
DROP INDEX idx_businesses_approved;
DROP TABLE businesses;

CREATE TABLE vendors (
id INTEGER PRIMARY KEY AUTOINCREMENT,
user_id TEXT NOT NULL,
name TEXT NOT NULL,
email TEXT,
phone TEXT,
website TEXT,
address TEXT,
city TEXT,
state TEXT,
zip_code TEXT,
country TEXT,
description TEXT,
industry TEXT,
logo_url TEXT,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
