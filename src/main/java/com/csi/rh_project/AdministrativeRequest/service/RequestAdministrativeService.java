package com.csi.rh_project.AdministrativeRequest.service;

import com.csi.rh_project.AdministrativeRequest.model.RequestAdministrative;
import com.csi.rh_project.AdministrativeRequest.repository.RequestAdministrativeRepository;
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
public class RequestAdministrativeService {
    private final RequestAdministrativeRepository requestAdministrativeRepository;

    public RequestAdministrativeService(RequestAdministrativeRepository requestAdministrativeRepository


    ) {
        this.requestAdministrativeRepository = requestAdministrativeRepository;


    }

    public List<RequestAdministrative> allrequestAdministratives() {
        List<RequestAdministrative> requestAdministratives = new ArrayList<>();

        requestAdministrativeRepository.findAll().forEach(requestAdministratives::add);

        return requestAdministratives;
    }

    public Optional<RequestAdministrative> findById(long id) {

        return requestAdministrativeRepository.findById(id);
    }
    public ResponseEntity<RequestAdministrative> updateRequest(long id, RequestAdministrative requestLeave) {
        Optional<RequestAdministrative> EntityData = requestAdministrativeRepository.findById(id);

        if (EntityData.isPresent()) {
            RequestAdministrative _RequestAdministrative = EntityData.get();
            _RequestAdministrative.setInterneStatus(requestLeave.getInterneStatus());
            _RequestAdministrative.setStatus(requestLeave.getStatus());


            return new ResponseEntity<>(requestAdministrativeRepository.save(_RequestAdministrative), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
