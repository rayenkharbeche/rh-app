package com.csi.rh_project.RequestLeave.service;

import com.csi.rh_project.RequestLeave.model.RequestLeave;
import com.csi.rh_project.RequestLeave.repository.RequestLeaveRepository;
import com.csi.rh_project.auth.dtos.UpdateUserDto;
import com.csi.rh_project.auth.models.Role;
import com.csi.rh_project.auth.models.User;
import com.csi.rh_project.auth.repositories.RoleRepository;
import com.csi.rh_project.auth.repositories.UserRepository;
import com.csi.rh_project.setup.model.Team;
import com.csi.rh_project.setup.repository.TeamRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RequestLeaveService {
    private final RequestLeaveRepository requestLeaveRepository;

    public RequestLeaveService(RequestLeaveRepository requestLeaveRepository


    ) {
        this.requestLeaveRepository = requestLeaveRepository;


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

}
