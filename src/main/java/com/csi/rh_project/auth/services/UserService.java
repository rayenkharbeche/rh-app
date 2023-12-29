package com.csi.rh_project.auth.services;

import com.csi.rh_project.auth.models.Role;
import com.csi.rh_project.auth.models.User;
import com.csi.rh_project.auth.repositories.RoleRepository;
import com.csi.rh_project.auth.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public UserService(UserRepository userRepository,RoleRepository roleRepository
    ) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;

    }

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();

        userRepository.findAll().forEach(users::add);

        return users;
    }
    public Optional<User> findById(Integer id) {

        return userRepository.findById(id);
    }

    public ResponseEntity<User>  save(Integer id,User user) {
        Optional<User> UserData = userRepository.findById(id);

        if (UserData.isPresent()) {

            User _User = UserData.get();
            _User.setEmail(user.getEmail());
            _User.setFirstName(user.getFirstname());
            _User.setLastName(user.getLastName());
            _User.setDepartment(user.getDepartment());
            _User.setPoste(user.getPoste());
            _User.setEntity(user.getEntity());
            _User.setImage(user.getImage());
            _User.setLastName(user.getLastName());

            return new ResponseEntity<>(userRepository.save(_User), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


}
