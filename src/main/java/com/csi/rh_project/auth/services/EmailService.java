package com.csi.rh_project.auth.services;

import com.csi.rh_project.auth.models.Mail;
import com.csi.rh_project.auth.models.User;
import jakarta.mail.MessagingException;

import java.io.UnsupportedEncodingException;
import java.util.Map;

public interface EmailService {
     void sendEmail(String to, String subject, String body);
    void sendEmailFromTemplate(User user, String mailTemplate , String Subject,String request);
    void sendEmail(Mail mail);

    }
