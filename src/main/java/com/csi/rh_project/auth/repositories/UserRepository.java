package com.csi.rh_project.auth.repositories;

import com.csi.rh_project.auth.models.User;
import com.csi.rh_project.setup.model.Team;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends /*JpaRepository<User, Long> {*/
    CrudRepository<User, Integer> {


    Optional<User> findByEmail(String email);
    User findUserByEmail(String email);

    User findByToken(String token);


    @Query(value = "SELECT u from User u WHERE u.department.id = :departmentId AND u.team.id = :teamId")
    List<User> findUserByDepartmentAndTeam(@Param("departmentId") long departmentId,
                                     @Param("teamId") long teamId);




    @Query(value = "SELECT u from User u WHERE u.department.id = :departmentId ")
    List<User> findUserByDepartment(@Param("departmentId") long departmentId);

    @Query(value = "SELECT u from User u WHERE u.team.id = :teamId ")
    List<User> findUserByTeam(@Param("teamId") long teamId);
    @Query(value = "SELECT u from User u WHERE u.team.id = :teamId and u.role.role in ('teamLead', 'manager') ")
    List<User>  findteamLeadandManager(@Param("teamId") long teamId);

    @Query(value = "SELECT u from User u WHERE u.superior.id = :superiorId  ")
    List<User>  findconsultantbySuperior(@Param("superiorId") long superiorId);


    @Query(value = "SELECT u from User u WHERE u.team.id = :teamId and u.role.role = 'teamLead' ")
    User findteamLead(@Param("teamId") long teamId);

    @Query(value = "SELECT u from User u WHERE u.team.id = :teamId and u.role.role = 'manager' ")
    User findmanager(@Param("teamId") long teamId);

    @Query(value = "SELECT count(u) from User u where u.actif = true ")
    Double EmployeeNumber();
    @Query(value = "SELECT u from User u where u.actif = true ")
    List<User> Employees();
    @Transactional
    @Modifying
    @Query("UPDATE User u SET u.team = :team  WHERE u.id = :userId")
    void updateUser(@Param("userId") int userId, @Param("team") Team team);


    @Transactional
    @Modifying
    @Query("UPDATE User u SET u.leaveCredit = :leaveCredit  WHERE u.id = :userId")
    void addLeaveCredit(@Param("userId") long userId, @Param("leaveCredit") double leaveCredit);


    @Transactional
    @Modifying
    @Query("UPDATE User u SET u.remoteNbr = 2  WHERE u.id = :userId")
    void updateRemoteDay(@Param("userId") long userId);

    @Query(value = "SELECT u from User u WHERE u.token = :token ")
    User findUserByToken(@Param("token") String token);
}
