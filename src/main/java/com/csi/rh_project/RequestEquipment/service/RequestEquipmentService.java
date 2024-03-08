package com.csi.rh_project.RequestEquipment.service;

import com.csi.rh_project.RequestEquipment.Dto.RequestEquipmentDto;
import com.csi.rh_project.RequestEquipment.model.RequestEquipment;
import com.csi.rh_project.RequestEquipment.repository.RequestEquipmentRepository;
import com.csi.rh_project.auth.models.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
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


    public List<RequestEquipment> requests = new ArrayList<RequestEquipment>();
    public List<RequestEquipment> getRequestEquipmentByUserId(User user) {
        List<RequestEquipment> requestEquipments = new ArrayList<>();
        requestEquipmentRepository.findRequestEquipmentByUserId(user).forEach(requests::add);


        return requestEquipments;
    }

    public RequestEquipment createRequestEquipment(RequestEquipment request){

        RequestEquipment _Request = requestEquipmentRepository

                //.save(new RequestEquipment(request.getUserId(), request.getType(), request.getStatus()));
                .save(new RequestEquipment(request.getUserId(), request.getType(), request.getEquipmentName(), request.getStatus()));
       return _Request;

    }
    public void deleteById(long user_id){
        requestEquipmentRepository.deleteById(user_id);

    }
    public void deleteAll(){
        requestEquipmentRepository.deleteAll();

    }
    public ResponseEntity<RequestEquipment> updateRequestEquipment(long id,RequestEquipment request) {
        Optional<RequestEquipment> EquipmentData = findById(id);
        if (EquipmentData.isPresent()) {
            RequestEquipment _RequestEquipment = EquipmentData.get();

            _RequestEquipment.setUserId(request.getUserId());
            _RequestEquipment.setType(request.getType());
            _RequestEquipment.setStatus(request.getStatus());

            _RequestEquipment.setEquipmentRef(request.getEquipmentRef());
            return new ResponseEntity<>(requestEquipmentRepository.save(_RequestEquipment), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }


    public RequestEquipment save(RequestEquipment request ){


        return  requestEquipmentRepository.save(request);

    }
    public List<RequestEquipment> getAllRequestvalidationById(User _User ){
        List<RequestEquipment> requests = new ArrayList<RequestEquipment>();

        if (Objects.equals(_User.getRole().getRole(), "Director")) {
            requests.addAll(requestEquipmentRepository.findRequestAdministrativestypeDirector());

        } else {

            requests.addAll(requestEquipmentRepository.findRequestAdministrativestypeNothardware());
        }

        return requests;
    }

}
