package com.csi.rh_project.RequestEquipment.service;

import com.csi.rh_project.RequestEquipment.model.RequestEquipment;
import com.csi.rh_project.RequestEquipment.repository.RequestEquipmentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RequestEquipmentService {
    private final RequestEquipmentRepository requestEquipmentRepository;

    public RequestEquipmentService(RequestEquipmentRepository requestEquipmentRepository


    ) {
        this.requestEquipmentRepository = requestEquipmentRepository;


    }

    public List<RequestEquipment> allRequestEquipment() {
        List<RequestEquipment> requestEquipments = new ArrayList<>();

        requestEquipmentRepository.findAll().forEach(requestEquipments::add);

        return requestEquipments;
    }

    public Optional<RequestEquipment> findById(long id) {

        return requestEquipmentRepository.findById(id);
    }
    public ResponseEntity<RequestEquipment> updateRequest(long id, RequestEquipment requestLeave) {
        Optional<RequestEquipment> EntityData = requestEquipmentRepository.findById(id);

        if (EntityData.isPresent()) {
            RequestEquipment _RequestEquipment = EntityData.get();
            _RequestEquipment.setType(requestLeave.getType());
            _RequestEquipment.setUserId(requestLeave.getUserId());
            _RequestEquipment.setStatus(requestLeave.getStatus());


            return new ResponseEntity<>(requestEquipmentRepository.save(_RequestEquipment), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
