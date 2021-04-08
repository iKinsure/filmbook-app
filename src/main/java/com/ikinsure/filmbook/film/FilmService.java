package com.ikinsure.filmbook.film;

import com.ikinsure.filmbook.image.Image;
import com.ikinsure.filmbook.image.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

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
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Unable to find film resource " + id));
    }

    public Film createFilm(Film film) {

        // find image by given id
        Long imageId = film.getImageId();
        Image image = imageRepository
                .findById(imageId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_ACCEPTABLE,
                        "Invalid image id " + imageId));

        // set relation between image and film
        film.setImage(image);

        return repository.save(film);
    }

    public Film updateFilm(Long id, Film newFilm) {

        // get film to update by id
        Film previous = repository
                .findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Unable to find film resource " + id));

        if (newFilm.getImageId() != null) {

            // get updated image
            Long imageId = newFilm.getImageId();
            Image image = imageRepository
                    .findById(imageId)
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_ACCEPTABLE,
                            "Invalid image id " + imageId));

            // update image
            previous.setImageId(imageId);
            previous.setImage(image);
        }

        if (newFilm.getTitle() != null) {
            previous.setTitle(newFilm.getTitle());
        }

        if (newFilm.getReleaseDate() != null) {
            previous.setReleaseDate(newFilm.getReleaseDate());
        }

        if (newFilm.getDescription() != null) {
            previous.setDescription(newFilm.getDescription());
        }

        repository.save(previous);
        return previous;
    }

    public void deleteFilmById(Long id) {
        repository.deleteById(id);
    }


}
