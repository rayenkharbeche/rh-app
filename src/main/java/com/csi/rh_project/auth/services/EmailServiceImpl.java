package com.csi.rh_project.auth.services;

import com.csi.rh_project.auth.models.Mail;
import com.csi.rh_project.auth.models.User;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import org.thymeleaf.context.Context;

import org.thymeleaf.spring6.SpringTemplateEngine;

import java.nio.charset.StandardCharsets;


import java.io.*;

import java.util.Scanner;


@Service
public class EmailServiceImpl implements EmailService {
    /*@Autowired
    private Configuration freemarkerConfig;*/

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private SpringTemplateEngine templateEngine;


    public void sendEmail(String to, String subject, String body) {
        System.out.println("Mail");

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("csi.international2010@gmail.com");
        message.setTo(to);
        message.setText(body);
        message.setSubject(subject);
        emailSender.send(message);
        System.out.println("Mail Send...");
    }

    @Override
    public void sendEmailFromTemplate(User user, String mailTemplate , String Subject) {

        MimeMessage message = emailSender.createMimeMessage();

        // Read the HTML template into a String variable

        try {
            message.setFrom(new InternetAddress("csi.international2010@gmail.com"));
            message.setRecipients(MimeMessage.RecipientType.TO, user.getEmail());
            message.setSubject(Subject);
            File myFile = new File("src/main/resources/templates/" +mailTemplate);

            System.out.println("Attempting to read from file in: "+myFile.getCanonicalPath());

            Scanner input = new Scanner(myFile);
            String data = "";
            data = input.nextLine();
            System.out.println(data);

            data = data.replace("${firstName}", user.getFirstname());
            data = data.replace("${lastName}", user.getLastName());
            System.out.println(data);

            message.setContent(data, "text/html; charset=utf-8");



        } catch (IOException | MessagingException e) {
            throw new RuntimeException(e);
        }


        emailSender.send(message);


    }
    public void sendEmail(Mail mail) {
        try {
            System.out.println(mail);

            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message,
                    MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    StandardCharsets.UTF_8.name());

            Context context = new Context();
            context.setVariables(mail.getModel());
            String html = templateEngine.process("email-template", context);

            helper.setTo(mail.getTo());
            helper.setText(html, true);
            helper.setSubject(mail.getSubject());
            helper.setFrom(mail.getFrom());
            emailSender.send(message);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }


}
