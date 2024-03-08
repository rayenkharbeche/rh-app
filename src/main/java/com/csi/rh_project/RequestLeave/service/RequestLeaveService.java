package com.csi.rh_project.RequestLeave.service;

import com.csi.rh_project.RequestLeave.model.RequestLeave;
import com.csi.rh_project.RequestLeave.repository.RequestLeaveRepository;
import com.csi.rh_project.auth.dtos.UpdateUserDto;
import com.csi.rh_project.auth.models.Role;
import com.csi.rh_project.auth.models.User;
import com.csi.rh_project.auth.repositories.RoleRepository;
import com.csi.rh_project.auth.repositories.UserRepository;
import com.csi.rh_project.auth.services.UserService;
import com.csi.rh_project.setup.model.Team;
import com.csi.rh_project.setup.repository.TeamRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.*;

@Service
public class RequestLeaveService {
    private final RequestLeaveRepository requestLeaveRepository;
    private final UserService userService;


    public RequestLeaveService(RequestLeaveRepository requestLeaveRepository,
                               UserService userService


    ) {
        this.requestLeaveRepository = requestLeaveRepository;
        this.userService = userService;


    }

    public List<RequestLeave> allrequestLeaves() {
        List<RequestLeave> requestLeaves = new ArrayList<>();

        requestLeaveRepository.findAll().forEach(requestLeaves::add);

        return requestLeaves;
    }

    public Optional<RequestLeave> findById(long id) {

        return requestLeaveRepository.findById(id);
    }
    public ResponseEntity<RequestLeave> updateRequest(long id, RequestLeave requestLeave) {
        Optional<RequestLeave> EntityData = requestLeaveRepository.findById(id);

        if (EntityData.isPresent()) {
            RequestLeave _RequestLeave = EntityData.get();
            _RequestLeave.setStartDate(requestLeave.getStartDate());
            _RequestLeave.setEndDate(requestLeave.getEndDate());
            _RequestLeave.setLeaveType(requestLeave.getLeaveType());
            _RequestLeave.setInterneStatus(requestLeave.getInterneStatus());
            _RequestLeave.setStatus(requestLeave.getStatus());

            _RequestLeave.setFileDB(requestLeave.getFileDB());

            return new ResponseEntity<>(requestLeaveRepository.save(_RequestLeave), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    public List<Double> requestLeavebytypebymonth(long user_id, String type) {
        List<Double> requestsdays = new ArrayList<Double>();
        Double requestsday = null;
        if (user_id != 0 ) {
            for (var i = 1; i < 12; i++) {


                requestsday = requestLeaveRepository.findLeavesDaysBymonthbyid(user_id, i, type);
                if (requestsday == null) {
                    requestsday = 0.0;
                }
                System.out.println(requestsday);

                requestsdays.add(requestsday);
            }
        }else {
            for (var i = 1; i < 12; i++) {

                requestsday = requestLeaveRepository.findLeavesDaysBymonth( i, type);
                if (requestsday == null) {
                    requestsday = 0.0;
                }
                System.out.println(requestsday);

                requestsdays.add(requestsday);
            }

        }

        return requestsdays;

    }
    public List<RequestLeave> getAllRequestsByEmployeeId(User user){

        List<RequestLeave> requests = new ArrayList<RequestLeave>();
        requestLeaveRepository.findRequestLeavesByUserId(user).forEach(requests::add);

        return requests;
    }


    public List<RequestLeave> getRequestLeavesManager() {
        List<RequestLeave> requests = new ArrayList<RequestLeave>();

        requestLeaveRepository.findRequestLeavesManager().forEach(requests::add);
        return requests;
    }

    public List<RequestLeave> getRequestLeavesofConsultant(User _User){
        List<RequestLeave> requests = new ArrayList<RequestLeave>();
        requestLeaveRepository.findRequestLeavesByConsultants(_User.getId()).forEach(requests::add);

        return requests;
    }




    public void deleteById(long user_id){
        requestLeaveRepository.deleteById(user_id);

    }
    public void deleteAll(){
        requestLeaveRepository.deleteAll();

    }

    public RequestLeave createRequest(RequestLeave request){
        RequestLeave _Request = requestLeaveRepository

                .save(new RequestLeave(request.getUserId(), request.getLeaveType(), request.getUpdateDate(),
                        request.getLeaveDays(), request.getStatus(),request.getInterneStatus(), request.getStartDate(), request.getEndDate()));

        return _Request;
    }
    public RequestLeave updateStatus(  RequestLeave _RequestLeave , RequestLeave requestLeave) {
        //Optional<RequestLeave> EntityData = findById(id);
        _RequestLeave.setStatus(requestLeave.getStatus());
        //_RequestLeave.setUpdateDate(new Date());

        _RequestLeave.setInterneStatus(requestLeave.getInterneStatus());
        return requestLeaveRepository.save(_RequestLeave);

    }


    public List<RequestLeave> getSickLeaveById(User user) {
        List<RequestLeave> requests = new ArrayList<RequestLeave>();



            if (Objects.equals(user.getRole().getRole(), "Rh")){
                requests = requestLeaveRepository.findSickLeaves();


            }
            else {
                requests = requestLeaveRepository.findSickLeavesById(user.getId());


            }
            return requests;
    }

    public List<RequestLeave> getRequestLeavesValidated() {
        List<RequestLeave> requests = new ArrayList<RequestLeave>();
        requests = requestLeaveRepository.findrequestLeavesValidated();
        return requests;
    }
    public Double getSickLeavesDaysById(User user) {
        return requestLeaveRepository.findSickLeavesDaysById(user.getId());
    }
    public List<RequestLeave> getAllCanceledRequestsByTeam(User _User) {
        List<RequestLeave> requests = new ArrayList<RequestLeave>();
        List<User> users;
        List<User> usersTl;
        List<RequestLeave> requestsTL = new ArrayList<RequestLeave>();

        if (Objects.equals(_User.getRole().getRole(), "director")){

            requests = requestLeaveRepository.findRequestLeavesCanceledByManagersOnly(_User.getId());

        } else {
            //users = userService.getUserByTeam(_User.getTeam().getId());
            users = userService.findconsultantbySuperior(_User.getId());
            System.out.println(users);

            for (User user : users) {
                if (Objects.equals(_User.getRole().getRole(), "teamLead")) {
                    requests =  requestLeaveRepository.findRequestLeavesCanceledByConsultants(user.getId());

                } else {
                    usersTl = userService.findconsultantbySuperior(user.getId());

                    for (User _user : usersTl) {
                        requestsTL = requestLeaveRepository.findRequestLeavesCanceledByConsultants(user.getId());

                    }
                    requests = requestLeaveRepository.findRequestLeavesCanceledByConsultants(user.getId());


                    requests.addAll(requestsTL);
                }
                System.out.println(requests);

            }
        }
        return requests;
    }

    public List<Double> LeaverequestBystatus(User user) {
        Double requestsday = null;
        List<Double> requestsdays = new ArrayList<Double>();

        List<String> statusList = Arrays.asList("open", "ongoing", "validated", "inactive");
        if (Objects.equals(user.getRole().getRole(), "admin") || Objects.equals(user.getRole().getRole(), "director")) {

            for (var status : statusList) {

                requestsday = requestLeaveRepository.findLeavesDaysBstatus(status);
                if (requestsday == null) {
                    requestsday = 0.0;
                }
                System.out.println(requestsday);

                requestsdays.add(requestsday);
            }
        }else {
            for (var status : statusList) {

                requestsday = requestLeaveRepository.findLeavesDaysBstatusbyid(user.getId(), status);
                if (requestsday == null) {
                    requestsday = 0.0;
                }
                System.out.println(requestsday);

                requestsdays.add(requestsday);
            }
        }        return requestsdays;
    }


}
