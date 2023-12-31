package com.csi.rh_project.auth.services;

import com.csi.rh_project.auth.models.Image;
import com.csi.rh_project.auth.models.User;
import com.csi.rh_project.auth.repositories.ImageRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ImageService {
    private final ImageRepository imageRepository;

    public ImageService(ImageRepository imageRepository
    ) {
        this.imageRepository = imageRepository;

    }

    public List<Image> allimages() {
        List<Image> images = new ArrayList<>();

        imageRepository.findAll().forEach(images::add);

        return images;
    }
    public Image findById(Long id) {
        Optional<Image> imageOptional = imageRepository.findById(id);

        Image image = imageOptional.get();
        return image;
    }




}
