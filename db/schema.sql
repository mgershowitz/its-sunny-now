DROP TABLE IF EXISTS episodes;

CREATE TABLE episodes (
  episode_id serial unique primary key,
  imdb_id TEXT not null,
  day INT not null,
  start TIME not null
);
