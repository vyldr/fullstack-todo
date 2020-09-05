CREATE TABLE todos (
    item_id SERIAL PRIMARY KEY,
    checked BOOL NOT NULL,
    content TEXT
);
