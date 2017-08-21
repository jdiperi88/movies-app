
Movie.create = (movie, userid) => {
  return db.one(`
    INSERT INTO movies
    (title, year, genre, user_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `, [movie.title, movie.year, movie.genre, userid]);
}