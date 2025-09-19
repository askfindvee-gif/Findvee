
DROP TABLE vendors;

CREATE TABLE businesses (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name TEXT NOT NULL,
  category TEXT,
  address TEXT,
  phone TEXT,
  image_url TEXT,
  approved BOOLEAN DEFAULT false,
  owner TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_businesses_approved ON businesses(approved);
CREATE INDEX idx_businesses_owner ON businesses(owner);
