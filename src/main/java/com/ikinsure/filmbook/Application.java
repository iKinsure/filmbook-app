package com.ikinsure.filmbook;

import com.ikinsure.filmbook.film.Film;
import com.ikinsure.filmbook.film.FilmRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
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

                    new Film("Lord of the Rings: The Fellowship of the Ring",
                            LocalDate.of(2001, 12, 10),
                            "A meek Hobbit from the Shire and eight companions set out on a journey to" +
                                    " destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron."),

                    new Film("Harry Potter and the Sourcerer's Stone",
                            LocalDate.of(2001, 1, 1),
                            "An orphaned boy enrolls in a school of wizardry, where he learns the truth about" +
                                    " himself, his family and the terrible evil that haunts the magical world."),

                    new Film("The Matrix",
                            LocalDate.of(1999, 3, 24),
                            "When a beautiful stranger leads computer hacker Neo to a forbidding underworld," +
                                    " he discovers the shocking truth--the life he knows is the elaborate deception of" +
                                    " an evil cyber-intelligence."),

                    new Film("Forrest Gump",
                            LocalDate.of(1994, 6, 23),
                            "The presidencies of Kennedy and Johnson, the Vietnam War," +
                                    " the Watergate scandal and other historical events unfold from " +
                                    "the perspective of an Alabama man with an IQ of 75, whose only " +
                                    "desire is to be reunited with his childhood sweetheart."),

                    new Film("The Lion King",
                            LocalDate.of(1994, 6, 12),
                            "In Africa, the lion cub Simba is the pride and joy of his parents King Mufasa and " +
                                    "Queen Sarabi. Mufasa prepares Simba to be the next king of the jungle." +
                                    " However, the naive Simba believes in his envious uncle Scar that wants to" +
                                    " kill Mufasa and Simba to become the next king.")
            ));
        };
    }

}
