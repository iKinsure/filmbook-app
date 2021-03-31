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
                    new Film("Lord of the Rings",
                            "Hobbit starts a journey"),
                    new Film("Harry Potter",
                            "Boy learns the truth about himself"),
                    new Film("Matrix",
                            "Computer hacker discovers the shocking truth about his life"),
                    new Film("Forrest Gump",
                            "The presidencies of Kennedy and Johnson, the Vietnam War," +
                                    " the Watergate scandal and other historical events unfold from " +
                                    "the perspective of an Alabama man with an IQ of 75, whose only " +
                                    "desire is to be reunited with his childhood sweetheart."),
                    new Film("The Lion King",
                            "Lion prince Simba and his father are targeted by his bitter uncle, " +
                                    "who wants to ascend the throne himself.")
            ));
        };
    }

}
