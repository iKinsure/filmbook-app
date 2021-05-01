package com.ikinsure.filmbook.film;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/films")
public class FilmController {

    private final FilmService service;

    @Autowired
    public FilmController(FilmService service) {
        this.service = service;
    }

    @GetMapping("")
    public List<FilmCommand> getFilms() {
        return service.getFilms();
    }

    @GetMapping("/{id}")
    public FilmCommand getFilmById(@PathVariable Long id) {
        return service.getFilmById(id);
    }

    @PostMapping("")
    public FilmCommand createFilm(@RequestBody @Valid FilmCommand film) {
        return service.createFilm(film);
    }

    @PutMapping("/{id}")
    public FilmCommand updateFilm(@PathVariable Long id,
                                  @RequestBody @Valid FilmCommand film) {
        return service.updateFilm(id, film);
    }

    @DeleteMapping("/{id}")
    public void deleteFilm(@PathVariable Long id) {
        service.deleteFilmById(id);
    }

}
