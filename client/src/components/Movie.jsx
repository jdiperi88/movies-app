import React from 'react';
    const Movie = (props) => {
        return (
            <div className="movie">
                <p>{props.movie.description}</p>
                <p>Genre: {props.movie.genre}</p>
                <span className="edit" onClick={() => props.selectEditedMovie(props.movie.id)}>Edit</span>
            </div>
        )
    }