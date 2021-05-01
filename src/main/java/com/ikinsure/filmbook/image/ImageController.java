package com.ikinsure.filmbook.image;

import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;

@Controller
@RequestMapping("/api/images")
public class ImageController {

    private final ImageService service;

    @Autowired
    public ImageController(ImageService service) {
        this.service = service;
    }

    @PostMapping(value = "", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> upload(@RequestParam MultipartFile file) throws IOException {
        Image image = service.upload(file);
        HashMap<String, String> map = new HashMap<>();
        map.put("imageId", String.valueOf(image.getId()));
        map.put("name", image.getName());
        map.put("type", image.getType());
        return ResponseEntity.ok(map);
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable Long id) {
        Image image = service.getImageById(id);
        String header = "attachment; filename=\"" + image.getName() + "\"";
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, header)
                .body(image.getData());
    }

    @DeleteMapping("/{id}")
    public void deleteImage(@PathVariable Long id) {
        service.deleteImageById(id);
    }

}
