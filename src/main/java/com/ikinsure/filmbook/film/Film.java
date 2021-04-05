package com.ikinsure.filmbook.film;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Objects;

@Entity(name = "Film")
@Table(name = "film")
public class Film {

    @Id
    @SequenceGenerator(name = "film_sequence", sequenceName = "film_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "film_sequence")
    @Column(name = "id", updatable = false)
    private Long id;

    @Column(name = "title", nullable = false, columnDefinition = "TEXT")
    private String title;

    @Column(name = "release_date", nullable = false, columnDefinition = "DATE")
    private LocalDate releaseDate;

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;

    public Film() {

    }

    public Film(String title, LocalDate releaseDate, String description) {
        this.title = title;
        this.releaseDate = releaseDate;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Film film = (Film) o;
        return Objects.equals(id, film.id) && Objects.equals(title, film.title) && Objects.equals(releaseDate, film.releaseDate) && Objects.equals(description, film.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, releaseDate, description);
    }

    @Override
    public String toString() {
        return "Film{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", releaseDate=" + releaseDate +
                ", description='" + description + '\'' +
                '}';
    }
}
