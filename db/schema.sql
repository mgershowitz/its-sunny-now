DROP TABLE IF EXISTS episodes;

CREATE TABLE episodes (
  episode_id serial unique primary key,
  title TEXT not null,
  season INT not null,
  episode INT not null,
  director TEXT not null,
  writer TEXT not null,
  description TEXT not null,
  day INT not null,
  start TEXT not null
);
