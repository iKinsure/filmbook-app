package com.ikinsure.filmbook;

import com.ikinsure.filmbook.film.Film;
import com.ikinsure.filmbook.film.FilmRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    CommandLineRunner init(FilmRepository repository) {
        return args -> {
            repository.saveAll(List.of(
                    new Film("Lord of the Rings", "Hobbit starts a journey"),
                    new Film("Harry Potter", "Boy learns the truth about himself")
            ));
        };
    }

}
