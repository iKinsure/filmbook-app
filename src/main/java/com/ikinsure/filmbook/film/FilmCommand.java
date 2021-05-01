package com.ikinsure.filmbook.film;

import javax.validation.constraints.Past;
import javax.validation.constraints.Size;
import java.time.LocalDate;

/**
 * DTO class
 */
public class FilmCommand {

    private Long id;
    @Size(min = 1, max = 128)
    private String title;
    @Past
    private LocalDate releaseDate;
    @Size(min = 64)
    private String description;
    private Long imageId;

    public FilmCommand() {

    }

    public FilmCommand(Long id, String title, LocalDate releaseDate, String description, Long imageId) {
        this.id = id;
        this.title = title;
        this.releaseDate = releaseDate;
        this.description = description;
        this.imageId = imageId;
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

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getImageId() {
        return imageId;
    }

    public void setImageId(Long imageId) {
        this.imageId = imageId;
    }
}
