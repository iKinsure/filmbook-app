package com.ikinsure.filmbook.film;

import com.ikinsure.filmbook.image.Image;
import com.ikinsure.filmbook.image.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;


@Service
public class FilmService {

    private final FilmRepository repository;
    private final ImageRepository imageRepository;

    @Autowired
    public FilmService(FilmRepository repository, ImageRepository imageRepository) {
        this.repository = repository;
        this.imageRepository = imageRepository;
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
        Long imageId = film.getImageId();
        Image image = imageRepository
                .findById(imageId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_ACCEPTABLE,
                        "Invalid image id " + imageId));
        film.setImage(image);
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
