package com.csi.rh_project.auth.services;

import com.csi.rh_project.RequestLeave.repository.RequestLeaveRepository;
import com.csi.rh_project.RequestLeave.service.RequestLeaveService;
import com.csi.rh_project.auth.dtos.UpdateUserDto;
import com.csi.rh_project.auth.models.Role;
import com.csi.rh_project.auth.models.User;
import com.csi.rh_project.auth.repositories.RoleRepository;
import com.csi.rh_project.auth.repositories.UserRepository;
import com.csi.rh_project.setup.model.Equipment;
import com.csi.rh_project.setup.model.Team;
import com.csi.rh_project.setup.repository.EquipmentRepository;
import com.csi.rh_project.setup.repository.TeamRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final EquipmentRepository equipmentRepository;

    private final RoleRepository roleRepository;
    private final RequestLeaveRepository requestLeaveRepository;

    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       RoleRepository roleRepository,
                       EquipmentRepository equipmentRepository,
                       PasswordEncoder passwordEncoder,
                       RequestLeaveRepository requestLeaveRepository

    ) {
        this.equipmentRepository = equipmentRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.requestLeaveRepository = requestLeaveRepository;
    }

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();

        userRepository.findAll().forEach(users::add);

        return users;
    }

    public Optional<User> findById(Integer id) {

        return userRepository.findById(id);
    }

    public ResponseEntity<User> updateUser(Integer id, UpdateUserDto user) {

        Optional<User> UserData = userRepository.findById(id);

        if (UserData.isPresent()) {
            System.out.println(user);

            System.out.println(user.isActif());
            User _User = UserData.get();

            if (!user.isActif()){
                System.out.println("est");

                _User.setActif(false);

            } else {
                System.out.println(user.getSuperior());
                _User.setSuperior(user.getSuperior());

                _User.setEmail(user.getEmail());
                _User.setFirstName(user.getFirstname());
                _User.setLastName(user.getLastname());
                _User.setImage(user.getImage());
                _User.setBirthdayDate(user.getBirthdayDate());
                _User.setContractStartDate(user.getContractStartDate());
                _User.setLeaveCredit(user.getLeaveCredit());
                _User.setRttCredit(user.getRttCredit());
                _User.setActif(true);
                //_User.setDepartment(user.getDepartment());
                _User.setPoste(user.getPoste());
                _User.setEntity(user.getEntity());
                _User.setChildNumber(user.getChildNumber());
                _User.setFamilySituation(user.getFamilySituation());
                _User.setContractType(user.getContractType());
                _User.setTelephone(user.getTelephone());
                _User.setMatricule(user.getMatricule());
                _User.setAssurance(user.getAssurance());
                _User.setAddress(user.getAddress());


                if ( _User.getTeam() != null
                        && _User.getDepartment() != user.getDepartment()
                ){
                    _User.setDepartment(user.getDepartment());
                    _User.setTeam(null);
                }

                if (_User.getDepartment() == null || _User.getTeam() == null
                ){
                    _User.setDepartment(user.getDepartment());
                }
            }

            return new ResponseEntity<>(userRepository.save(_User), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<User> updateUser(Integer id, User user) {

        Optional<User> UserData = userRepository.findById(id);
        /*System.out.println(user.getRemoteDayNbr());

        System.out.println(id);


        userRepository.updateRemoteDay(id);
        System.out.println(user.getRemoteDayNbr());
*/
        if (UserData.isPresent()) {
            System.out.println(user);
            User _User = UserData.get();
            System.out.println(user.getRemoteNbr());

            _User.setRemoteNbr(1);
            _User.setContractType("CDD");
            System.out.println(_User.getRemoteNbr());

            return new ResponseEntity<>(userRepository.save(_User), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }
    public ResponseEntity<User> resetInfo(Integer id, UpdateUserDto user) {

        Optional<User> UserData = userRepository.findById(id);

        if (UserData.isPresent()) {
            System.out.println(user);

            System.out.println(user.isActif());
            User _User = UserData.get();


            _User.setSuperior(null);


            /*_User.setContractStartDate(user.getContractStartDate());*/
            _User.setLeaveCredit(0);
            _User.setRttCredit(0);
            _User.setDepartment(null);
            _User.setPoste(null);
            _User.setEntity(user.getEntity());
            _User.setContractType(null);
            _User.setTelephone(null);
            /*_User.setMatricule(null);*/
            _User.setAssurance(false);
            _User.setAddress(null);
            _User.setRemoteNbr(0);


            List<Equipment> equipments = equipmentRepository.findAllByUserId(id);
            if (!equipments.isEmpty()){
                equipmentRepository.deleteAllByUser(_User);

            }

            return new ResponseEntity<>(userRepository.save(_User), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    public User addUser(User user) {

        var _User = new User();
        _User.setEmail(user.getEmail());
        _User.setFirstName(user.getFirstname());
        _User.setLastName(user.getLastName());
        _User.setDepartment(user.getDepartment());
        _User.setPoste(user.getPoste());

        _User.setEntity(user.getEntity());
        _User.setImage(user.getImage());
        _User.setRemoteNbr(0);

        _User.setBirthdayDate(user.getBirthdayDate());
        _User.setContractStartDate(user.getContractStartDate());
        String dt = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss z").format(user.getContractStartDate());
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Calendar c = Calendar.getInstance();
        try {
            c.setTime(sdf.parse(dt));
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

        c.add(Calendar.DATE, 365);  // number of days to add
        dt = sdf.format(c.getTime());
        _User.setContactEndDate(c.getTime());

        _User.setLeaveCredit(user.getLeaveCredit());
        _User.setRttCredit(user.getRttCredit());

        _User.setChildNumber(user.getChildNumber());
        _User.setFamilySituation(user.getFamilySituation());
        _User.setContractType(user.getContractType());
        _User.setTelephone(user.getTelephone());
        _User.setMatricule(user.getMatricule());
        _User.setAssurance(user.getAssurance());
        _User.setAddress(user.getAddress());
        _User.setRole(user.getRole());
        _User.setPassword(passwordEncoder.encode(user.getPassword()));
        _User.setActif(true);
        _User.setSuperior(user.getSuperior());
        return userRepository.save(_User);

    }

    public List<User> allUsersbydepartmentteam(Long departmentId, Long teamId) {
        List<User> users = new ArrayList<>();

        userRepository.findUserByDepartmentAndTeam(departmentId, teamId).forEach(users::add);

        return users;
    }

    public List<User> allUsersbydepartment(Long departmentId) {
        List<User> users = new ArrayList<>();

        userRepository.findUserByDepartment(departmentId).forEach(users::add);

        return users;
    }


    public ResponseEntity<User>  updateTeamlead(Integer id, Team team) {
        userRepository.updateUser(id, team);


        return new ResponseEntity<>(HttpStatus.OK);

    }
    public ResponseEntity<User>  updateTeamleadStatus(Integer id, Team team) {

        Optional<User> UserData = userRepository.findById(id);

        if (UserData.isPresent()) {

            User _User = UserData.get();
            Optional<Role> RoleData = roleRepository.findByRole("teamLead");

            _User.setRole(RoleData.get());



            return new ResponseEntity<>(userRepository.save(_User), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }


    }
    public ResponseEntity<User>  updateManagerStatus(Integer id, Team team) {

        Optional<User> UserData = userRepository.findById(id);

        if (UserData.isPresent()) {

            User _User = UserData.get();
            Optional<Role> RoleData = roleRepository.findByRole("manager");

            _User.setRole(RoleData.get());



            return new ResponseEntity<>(userRepository.save(_User), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }


    }

    public ResponseEntity<User> desafectTeam(Integer id) {

        Optional<User> UserData = userRepository.findById(id);

        if (UserData.isPresent()) {

            User _User = UserData.get();
            _User.setTeam(null);

        return new ResponseEntity<>(userRepository.save(_User), HttpStatus.OK);
    } else {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    }

    public List<User> getUserByTeam(long id) {

       return userRepository.findUserByTeam(id);


    }
    /*public List<User> getteamLeadandManager(long id) {

        return userRepository.findteamLeadandManager(id);



    }*/
    public List<User> getteamLeadandManager(User user) {
        List<User> users = new ArrayList<>();
        users.add(user.getSuperior());
        if(!Objects.equals(user.getSuperior().getRole().getRole(), "manager")) {
            users.add(user.getSuperior().getSuperior());
        }
        return users;



    }

    public List<User> findconsultantbySuperior(long id) {
        System.out.println(id);

        return userRepository.findconsultantbySuperior(id);



    }


    /*public User getteamLead(long id) {

        return userRepository.findteamLead(id);


    }*/


    /*public User getmanager(long id) {

        return userRepository.findmanager(id);


    }*/
    public User getmanager(User superior) {
        if(superior.getRole().getRole() == "manager"){
            return superior;
        } else return superior.getSuperior();
    }
    public Double EmployeeNumber() {
        System.out.println("2");

        return userRepository.EmployeeNumber();


    }
    public int AvailableEmployee() {
        List<User> users = userRepository.Employees();
        System.out.println(users);

        int availableEmployeNumber = 0;
        for (User _user : users) {

            double user = requestLeaveRepository.findLeavesDaystoday(_user.getId());

            if (user == 0){
                availableEmployeNumber =availableEmployeNumber + 1 ;
            }
        }

        return availableEmployeNumber;


    }

    public ResponseEntity<User> addleaveCredit(long id, double leaveCredit) {
        System.out.println(id);
        System.out.println(leaveCredit);

         userRepository.addLeaveCredit(id,leaveCredit);
        return new ResponseEntity<>(HttpStatus.OK);


    }

    public User save(User user) {
        return userRepository.save(user);

    }
}
