package com.csi.rh_project.auth.services;

import com.csi.rh_project.auth.models.Mail;

public interface EmailService {
    void send(Mail mail);
     void sendEmail(String to, String subject, String body);

    }
