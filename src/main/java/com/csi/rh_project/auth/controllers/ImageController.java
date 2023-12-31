package com.csi.rh_project.auth.controllers;

import com.csi.rh_project.auth.models.Image;
import com.csi.rh_project.auth.repositories.ImageRepository;
import com.csi.rh_project.auth.responses.ImageUploadResponse;
import com.csi.rh_project.auth.util.ImageUtility;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ImageController {

    @Autowired
    ImageRepository imageRepository;

    @PostMapping("/upload/image")
    public ResponseEntity<ImageUploadResponse> uplaodImage(@RequestParam("image") MultipartFile file)
            throws IOException {
        Image image = new Image();
image.setName(file.getOriginalFilename());

        if(!imageRepository.exists(Example.of(image))) {

            imageRepository.save(Image.builder()
                    .name(file.getOriginalFilename())
                    .type(file.getContentType())
                    .image(ImageUtility.compressImage(file.getBytes()))
                    .build());
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ImageUploadResponse("Image uploaded successfully: " +
                        file.getOriginalFilename()));
    }

    @GetMapping(path = {"/get/image/info/{name}"})
    public Image getImageDetails(@PathVariable("name") String name) throws IOException {

        final Optional<Image> dbImage = imageRepository.findByName(name);
        System.out.println(dbImage);
        return Image.builder()
                .id(dbImage.get().getId())
                .name(dbImage.get().getName())
                .type(dbImage.get().getType())
                .image(ImageUtility.decompressImage(dbImage.get().getImage()))
                .build();
    }

    @GetMapping(path = {"/get/image/{name}"})
    public ResponseEntity<byte[]> getImage(@PathVariable("name") String name) throws IOException {

        final Optional<Image> dbImage = imageRepository.findByName(name);

        return ResponseEntity
                .ok()
                .contentType(MediaType.valueOf(dbImage.get().getType()))
                .body(ImageUtility.decompressImage(dbImage.get().getImage()));
    }

    @GetMapping(path = {"/get/{id}"})
    public Image getImageById(@PathVariable("id") Long id) throws IOException {

        final Optional<Image> dbImage = imageRepository.findById(id);

        return Image.builder()
                .name(dbImage.get().getName())
                .type(dbImage.get().getType())
                .image(ImageUtility.decompressImage(dbImage.get().getImage()))
                .id(dbImage.get().getId())
                .build();
    }
}