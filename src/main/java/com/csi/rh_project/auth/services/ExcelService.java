package com.csi.rh_project.auth.services;


import com.csi.rh_project.AdministrativeRequest.model.RequestAdministrative;
import com.csi.rh_project.auth.helper.ExcelHelper;
import com.csi.rh_project.auth.models.User;
import com.csi.rh_project.auth.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ExcelService {
  @Autowired
  UserRepository repository;

  public void save(MultipartFile file) {
    try {
      System.out.println("3");
      System.out.println(file.getInputStream());

      List<User> tutorials = ExcelHelper.excelToTutorials(file.getInputStream());
      System.out.println("4");

      System.out.println(tutorials);

      repository.saveAll(tutorials);
    } catch (IOException e) {
      throw new RuntimeException("fail to store excel data: " + e.getMessage());
    }
  }

  public ByteArrayInputStream load() {
    List<User> users = new ArrayList<User>();

    repository.findAll().forEach(users::add);

    ByteArrayInputStream in = ExcelHelper.tutorialsToExcel(users);
    return in;
  }

  public List<User> getAllTutorials() {
    List<User> users = new ArrayList<User>();

    repository.findAll().forEach(users::add);


    return users;
  }
}
