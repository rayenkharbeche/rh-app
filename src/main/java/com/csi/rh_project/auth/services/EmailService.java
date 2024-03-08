package com.csi.rh_project.auth.services;

import com.csi.rh_project.AdministrativeRequest.model.RequestAdministrative;
import com.csi.rh_project.RequestAuthorisation.model.RequestAuthorisation;
import com.csi.rh_project.RequestEquipment.model.RequestEquipment;
import com.csi.rh_project.RequestLeave.model.RequestLeave;
import com.csi.rh_project.auth.models.Mail;
import com.csi.rh_project.auth.models.User;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Map;
import java.util.Objects;
import java.util.Scanner;

public interface EmailService {
     void sendEmail(String to, String subject, String body);


    void sendEmailFromMailTemplate(User usertoSend, User user, String mailTemplate, String Request);
    void sendEmailRequestLeaveWithData(User usertoSend,RequestLeave request, String subject,String mailTemplate);
    void sendEmailRequestAuthwithData(User usertoSend, RequestAuthorisation requestAuthorisation, String subject, String mailTemplate);
    void sendEmailRequestAdminwithData(User usertoSend, RequestAdministrative requestAdministrative, String subject, String mailTemplate);
    void sendEmailRequestEquipmentwithData(User usertoSend, RequestEquipment requestEquipment, String subject, String mailTemplate);
    void sendEmailWithData(User usertoSend,User user, String subject, String mailTemplate);
    void sendEmailFromTemplate(User user, String mailTemplate , String Subject, String request);
    void sendEmail(Mail mail);
    void sendEmailFromTemplateWithUserInfo(User sender,User user, String mailTemplate , String Subject,String request);



}
