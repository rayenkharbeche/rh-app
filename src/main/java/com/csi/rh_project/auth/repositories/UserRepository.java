package com.csi.rh_project.auth.repositories;

import com.csi.rh_project.auth.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends /*JpaRepository<User, Long> {*/
    CrudRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    User findUserByEmail(String email);

    User findByToken(String token);
}
