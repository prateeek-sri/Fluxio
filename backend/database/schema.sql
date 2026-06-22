-- [PARTNER] Initial database schema blueprint
CREATE TABLE IF NOT EXISTS matches (
    id SERIAL PRIMARY KEY,
    target_url TEXT NOT None,
    score INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS telemetry_history (
    id SERIAL PRIMARY KEY,
    match_id INT REFERENCES matches(id),
    timestamp BIGINT,
    node_id TEXT,
    latency_ms INT,
    status TEXT
);