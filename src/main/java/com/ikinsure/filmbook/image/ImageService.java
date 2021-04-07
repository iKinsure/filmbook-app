package com.ikinsure.filmbook.image;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.Objects;

@Service
public class ImageService {

    private final ImageRepository repository;

    @Autowired
    public ImageService(ImageRepository repository) {
        this.repository = repository;
    }

    public Image createImage(MultipartFile file) throws IOException {
        String filename = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        Image image = new Image(filename, file.getContentType(), file.getBytes());
        return repository.save(image);
    }

    public Image getImageById(Long id) {
        return repository
                .findById(id)
                .orElseThrow(this::notFoundExc);
    }


    private ResponseStatusException notFoundExc() {
        return new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Unable to find image resource"
        );
    }
}
