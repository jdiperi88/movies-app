
movieController.create = (req, res) => {
  Movie.create({
    title: req.body.title,
    year: req.body.year,
    genre: req.body.genre,
  }, req.user.id).then(() => {
    res.redirect('/movies');
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
};