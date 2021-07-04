package com.ikinsure.filmbook.image;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

@Service
public class ImageService {

    private final ImageRepository repository;
    private static final Set<String> LEGAL_MIMES = Set.of(
            "image/webp",
            "image/png",
            "image/jpeg"
    );

    @Autowired
    public ImageService(ImageRepository repository) {
        this.repository = repository;
    }

    public Image upload(MultipartFile file) throws IOException {
        return repository.save(createImage(file));
    }

    public Image getImageById(Long id) {
        return repository
                .findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Unable to find image resource"));
    }

    public void deleteImageById(Long id) {
        repository.deleteById(id);
    }

    private Image createImage(MultipartFile file) throws IOException {

        if (file == null || file.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_ACCEPTABLE,
                    "File cannot be empty");
        }

        if (!LEGAL_MIMES.contains(file.getContentType())) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_ACCEPTABLE,
                    "File is not legal image");
        }

        // rename and get the file extension
        String[] names = StringUtils
                .cleanPath(Objects.requireNonNull(file.getOriginalFilename()))
                .split("\\.");

        String extension = names[names.length - 1];
        String filename = UUID.randomUUID() + "." + extension;
        return new Image(filename, file.getContentType(), file.getBytes());
    }

}
