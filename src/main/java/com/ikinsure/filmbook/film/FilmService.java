package com.ikinsure.filmbook.film;

import com.ikinsure.filmbook.image.Image;
import com.ikinsure.filmbook.image.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FilmService {

    private final FilmRepository repository;
    private final ImageRepository imageRepository;

    @Autowired
    public FilmService(FilmRepository repository, ImageRepository imageRepository) {
        this.repository = repository;
        this.imageRepository = imageRepository;
    }

    public List<FilmCommand> getFilms() {
        return repository.findAll().stream()
                .map(this::parseFilm)
                .collect(Collectors.toList());
    }

    public FilmCommand getFilmById(Long id) {
        return repository
                .findById(id)
                .map(this::parseFilm)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Unable to find film resource " + id));
    }

    public FilmCommand createFilm(FilmCommand command) {

        // find image by given id
        Long imageId = command.getImageId();
        Image image = imageRepository
                .findById(imageId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_ACCEPTABLE,
                        "Invalid image id " + imageId));

        // set relation between image and film and create
        Film film = repository.save(new Film(
                command.getTitle(),
                command.getReleaseDate(),
                command.getDescription(),
                image
        ));

        // response
        command.setId(film.getId());
        return command;
    }

    public FilmCommand updateFilm(Long id, FilmCommand command) {

        // get film to update by id
        Film film = repository
                .findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Unable to find film resource " + id));


        if (command.getImageId() != null) {

            // get updated image
            Long imageId = command.getImageId();
            Image image = imageRepository
                    .findById(imageId)
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_ACCEPTABLE,
                            "Invalid image id " + imageId));

            // update image
            film.setImage(image);
        }

        if (command.getTitle() != null) {
            film.setTitle(command.getTitle());
        }

        if (command.getReleaseDate() != null) {
            film.setReleaseDate(command.getReleaseDate());
        }

        if (command.getDescription() != null) {
            film.setDescription(command.getDescription());
        }

        repository.save(film);
        return parseFilm(film);
    }

    public void deleteFilmById(Long id) {
        repository.deleteById(id);
    }

    private FilmCommand parseFilm(Film film) {
        return new FilmCommand(
                film.getId(),
                film.getTitle(),
                film.getReleaseDate(),
                film.getDescription(),
                film.getImage().getId()
        );
    }

}
