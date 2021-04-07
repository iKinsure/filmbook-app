package com.ikinsure.filmbook.image;

import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
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

    @PostMapping("")
    public ResponseEntity<?> upload(@RequestParam MultipartFile file) throws IOException {
        Image image = service.upload(file);
        HashMap<String, String> map = new HashMap<>();
        String id = String.valueOf(image.getId());
        map.put("id", id);
        map.put("name", image.getName());
        map.put("type", image.getType());
        map.put("imageUrl", "/api/images/" + id);
        return ResponseEntity.ok(map);
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable Long id) {
        Image image = service.getImageById(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + image.getName() + "\"")
                .body(image.getData());
    }

    @DeleteMapping("/{id}")
    public void deleteImage(@PathVariable Long id) {
        service.deleteImageById(id);
    }

}
