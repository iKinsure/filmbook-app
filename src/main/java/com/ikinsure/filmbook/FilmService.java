package com.ikinsure.filmbook;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

}
