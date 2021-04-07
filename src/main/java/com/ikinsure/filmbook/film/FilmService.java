package com.ikinsure.filmbook.film;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@Service
public class FilmService {

    private final FilmRepository repository;

    @Autowired
    public FilmService(FilmRepository repository) {
        this.repository = repository;
    }

    public List<Film> getFilms() {
        return repository.findAll();
    }

    public Film getFilmById(Long id) {
        return repository
                .findById(id)
                .orElseThrow(this::notFoundExc);
    }

    public Film createFilm(Film film) {
        return repository.save(film);
    }

    public Film updateFilm(Long id, Film film) {
        Film previous = repository.findById(id).orElseThrow(this::notFoundExc);

        if (film.getTitle() != null) {
            previous.setTitle(film.getTitle());
        }

        if (film.getReleaseDate() != null) {
            previous.setReleaseDate(film.getReleaseDate());
        }

        if (film.getDescription() != null) {
            previous.setDescription(film.getDescription());
        }

        repository.save(previous);
        return previous;
    }

    public void deleteFilmById(Long id) {
        repository.deleteById(id);
    }

    private ResponseStatusException notFoundExc() {
        return new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Unable to find film resource"
        );
    }

}
