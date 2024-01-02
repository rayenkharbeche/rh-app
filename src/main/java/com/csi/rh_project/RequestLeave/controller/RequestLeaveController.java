package com.csi.rh_project.RequestLeave.controller;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.csi.rh_project.RequestLeave.model.RequestLeave;
import com.csi.rh_project.RequestLeave.repository.RequestLeaveRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class RequestLeaveController {
    @Autowired
    RequestLeaveRepository requestRepository;

    @GetMapping("/RequestLeave")
    public ResponseEntity<List<RequestLeave>> getAllRequestsByEmployeeId(@RequestParam(required = false) long employee_id) {
        try {
            List<RequestLeave> requests = new ArrayList<RequestLeave>();
            System.out.println("test");
            requestRepository.findByByEmployeeId(employee_id).forEach(requests::add);

            if (requests.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(requests, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/RequestLeave/{id}")
    public ResponseEntity<RequestLeave> getEntityById(@PathVariable("id") long user_id) {
        Optional<RequestLeave> EntityData = requestRepository.findById(user_id);
        System.out.println("test");
        if (EntityData.isPresent()) {
            System.out.println(EntityData+"another test         **********************************************");
            return new ResponseEntity<>(EntityData.get(), HttpStatus.OK);
        } else {
            System.out.println("another test 698745        **********************************************");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/RequestLeave")
    public ResponseEntity<RequestLeave> createEntity(@RequestBody RequestLeave request) {
        try {
            System.out.println(request.getUserId());
            RequestLeave _Request = requestRepository

                    .save(new RequestLeave(request.getUserId(), request.getLeaveType(), request.getUpdateDate(),
                            request.getLeaveBalance(), request.getStatutDemande()));
            System.out.println(_Request);
            return new ResponseEntity<>(_Request, HttpStatus.CREATED);

        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}