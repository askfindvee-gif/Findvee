
-- Remove the sample businesses added for other cities
DELETE FROM businesses WHERE owner = 'admin' AND city IN ('Udupi', 'Manipal', 'Koteshwara') AND created_at >= datetime('now', '-1 minute');
