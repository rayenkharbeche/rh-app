package com.csi.rh_project.auth.services;

import com.csi.rh_project.AdministrativeRequest.model.RequestAdministrative;
import com.csi.rh_project.RequestAuthorisation.model.RequestAuthorisation;
import com.csi.rh_project.RequestEquipment.model.RequestEquipment;
import com.csi.rh_project.RequestLeave.model.RequestLeave;
import com.csi.rh_project.auth.models.Mail;
import com.csi.rh_project.auth.models.User;

import com.csi.rh_project.setup.model.MailTemplate;
import com.csi.rh_project.setup.repository.MailTemplateRepository;
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

import java.text.SimpleDateFormat;
import java.util.Objects;
import java.util.Scanner;


@Service
public class EmailServiceImpl implements EmailService {
    /*@Autowired
    private Configuration freemarkerConfig;*/

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private SpringTemplateEngine templateEngine;

    @Autowired
    private MailTemplateRepository mailTemplateRepository;


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
    public void sendEmailFromMailTemplate(User usertoSend, User user, String mailTemplate, String reference) {

        MimeMessage message = emailSender.createMimeMessage();
        System.out.println(reference);
        // Read the HTML template into a String variable

        try {
            //message.setText(mail.getTemplate());
            message.setFrom(new InternetAddress("csi.international2010@gmail.com"));
            message.setRecipients(MimeMessage.RecipientType.TO, usertoSend.getEmail());
            File myFile = new File("src/main/resources/templates/" +mailTemplate);

            System.out.println("Attempting to read from file in: "+myFile.getCanonicalPath());
            Scanner input = new Scanner(myFile);
            String data = "";
            data = input.nextLine();
            System.out.println(data);
            //data = data.replace("${template}", user.getFirstname());
            data = data.replace("${NameSendTo}", usertoSend.getFirstname() + usertoSend.getLastName());
            MailTemplate mail = mailTemplateRepository.findByReference(reference);
            if (mail != null) {

                String mailtemplate = mail.getTemplate();
                mailtemplate = mailtemplate.replace("${user}", user.getFirstname() + user.getLastName());
                data = data.replace("${template}", mailtemplate);
                message.setSubject(mail.getSubject());

            }else{
                MailTemplate mailCreated = initialiseValue(reference);
                message.setSubject(mailCreated.getSubject());
                String mailtemplate = mailCreated.getTemplate();
                mailtemplate = mailtemplate.replace("${user}", user.getFirstname() + user.getLastName());
                data = data.replace("${template}", mailtemplate);
            }


            System.out.println(data);

            message.setContent(data, "text/html; charset=utf-8");



        } catch (IOException | MessagingException e) {
            throw new RuntimeException(e);
        }


        emailSender.send(message);


    }

    @Override
    public void sendEmailRequestLeaveWithData(User usertoSend,RequestLeave requestLeave,String subject,String mailTemplate){
        MimeMessage message = emailSender.createMimeMessage();
        // Read the HTML template into a String variable
        try {

            message.setFrom(new InternetAddress("csi.international2010@gmail.com"));
            message.setRecipients(MimeMessage.RecipientType.TO, usertoSend.getEmail());
            File myFile = new File("src/main/resources/templates/" +mailTemplate);

            System.out.println("Attempting to read from file in: "+myFile.getCanonicalPath());
            Scanner input = new Scanner(myFile);
            String data = "";
            data = input.nextLine();
            System.out.println(requestLeave.getUserId());
            if(Objects.equals(requestLeave.getUserId().getRole().getRole(), "consultant")){
                data = data.replace("${consultant}", requestLeave.getUserId().getFirstname() + requestLeave.getUserId().getSuperior().getLastName());
                data = data.replace("${teamlead}", requestLeave.getUserId().getSuperior().getFirstname() + requestLeave.getUserId().getSuperior().getLastName());
                data = data.replace("${manager}", requestLeave.getUserId().getSuperior().getSuperior().getFirstname() + requestLeave.getUserId().getSuperior().getSuperior().getLastName());

            }else if(Objects.equals(requestLeave.getUserId().getRole().getRole(), "teamLead")){
                data = data.replace("${consultant}", requestLeave.getUserId().getFirstname() + requestLeave.getUserId().getLastName());
                data = data.replace("${manager}", requestLeave.getUserId().getSuperior().getFirstname() + requestLeave.getUserId().getSuperior().getLastName());

            } else if(Objects.equals(requestLeave.getUserId().getRole().getRole(), "manager")){
                data = data.replace("${director}", requestLeave.getUserId().getSuperior().getFirstname() + requestLeave.getUserId().getSuperior().getLastName());
            }
            data = data.replace("${NameSendTo}", usertoSend.getFirstname() + usertoSend.getLastName());
            data = data.replace("${leaveType}",translateTypeFR(requestLeave.getLeaveType()));
            data = data.replace("${leaveDays}",Long.toString(requestLeave.getLeaveDays()));
            data = data.replace("${RequestStartDate}", requestLeave.getStartDate().toString());
            data = data.replace("${RequestEndDate}", requestLeave.getEndDate().toString());

            message.setSubject(subject);


            System.out.println(data);

            message.setContent(data, "text/html; charset=utf-8");



        } catch (IOException | MessagingException e) {
            throw new RuntimeException(e);
        }


        emailSender.send(message);

    }

    @Override
    public void sendEmailWithData(User usertoSend,User user,String subject,String mailTemplate){
        MimeMessage message = emailSender.createMimeMessage();
        // Read the HTML template into a String variable
        try {

            message.setFrom(new InternetAddress("csi.international2010@gmail.com"));
            message.setRecipients(MimeMessage.RecipientType.TO, usertoSend.getEmail());
            File myFile = new File("src/main/resources/templates/" +mailTemplate);

            System.out.println("Attempting to read from file in: "+myFile.getCanonicalPath());
            Scanner input = new Scanner(myFile);
            String data = "";
            data = input.nextLine();
            if(Objects.equals(user.getRole().getRole(), "consultant")){
                data = data.replace("${consultant}", user.getFirstname() + user.getSuperior().getLastName());
                data = data.replace("${teamlead}", user.getSuperior().getFirstname() + user.getSuperior().getLastName());
                data = data.replace("${manager}", user.getSuperior().getSuperior().getFirstname() + user.getSuperior().getSuperior().getLastName());

            }else if(Objects.equals(user.getRole().getRole(), "teamLead")){
                data = data.replace("${consultant}", user.getFirstname() + user.getLastName());
                data = data.replace("${manager}", user.getSuperior().getFirstname() + user.getSuperior().getLastName());

            } else if(Objects.equals(user.getRole().getRole(), "manager")){
                data = data.replace("${director}", user.getSuperior().getFirstname() + user.getSuperior().getLastName());
            }
            data = data.replace("${NameSendTo}", usertoSend.getFirstname() + usertoSend.getLastName());

            message.setSubject(subject);


            System.out.println(data);

            message.setContent(data, "text/html; charset=utf-8");



        } catch (IOException | MessagingException e) {
            throw new RuntimeException(e);
        }


        emailSender.send(message);

    }

    @Override
    public void sendEmailRequestAuthwithData(User usertoSend, RequestAuthorisation requestAuthorisation, String subject, String mailTemplate){
        MimeMessage message = emailSender.createMimeMessage();
        // Read the HTML template into a String variable
        try {

            message.setFrom(new InternetAddress("csi.international2010@gmail.com"));
            message.setRecipients(MimeMessage.RecipientType.TO, usertoSend.getEmail());
            File myFile = new File("src/main/resources/templates/" +mailTemplate);

            System.out.println("Attempting to read from file in: "+myFile.getCanonicalPath());
            Scanner input = new Scanner(myFile);
            String data = "";
            data = input.nextLine();
            System.out.println(requestAuthorisation.getUserId());
            if(Objects.equals(requestAuthorisation.getUserId().getRole().getRole(), "consultant")){
                data = data.replace("${consultant}", requestAuthorisation.getUserId().getFirstname() + requestAuthorisation.getUserId().getSuperior().getLastName());
                data = data.replace("${teamlead}", requestAuthorisation.getUserId().getSuperior().getFirstname() + requestAuthorisation.getUserId().getSuperior().getLastName());
                data = data.replace("${manager}", requestAuthorisation.getUserId().getSuperior().getSuperior().getFirstname() + requestAuthorisation.getUserId().getSuperior().getSuperior().getLastName());

            }else if(Objects.equals(requestAuthorisation.getUserId().getRole().getRole(), "teamLead")){
                data = data.replace("${consultant}", requestAuthorisation.getUserId().getFirstname() + requestAuthorisation.getUserId().getSuperior().getLastName());
                data = data.replace("${manager}", requestAuthorisation.getUserId().getSuperior().getFirstname() + requestAuthorisation.getUserId().getSuperior().getLastName());

            } else if(Objects.equals(requestAuthorisation.getUserId().getRole().getRole(), "manager")){
                data = data.replace("${director}", requestAuthorisation.getUserId().getSuperior().getFirstname() + requestAuthorisation.getUserId().getSuperior().getLastName());
            }

                data = data.replace("${NameSendTo}", usertoSend.getFirstname() + usertoSend.getLastName());
                data = data.replace("${type}",translateTypeFR(requestAuthorisation.getType()));

            if (requestAuthorisation.getAuthorisationEndDate() != null ){
                data = data.replace("${RequestStartDate}","du " +  requestAuthorisation.getAuthorisationStartDate().toString());
                data = data.replace("${RequestEndDate}", "au " + requestAuthorisation.getAuthorisationEndDate().toString());
                data = data.replace("${RemoteDays}",Long.toString(requestAuthorisation.getRemoteDays()));

            }
            else {
                data = data.replace("${RequestEndDate}", "");
                data = data.replace("${RemoteDays}","");

            }
            message.setSubject(subject);


            System.out.println(data);

            message.setContent(data, "text/html; charset=utf-8");



        } catch (IOException | MessagingException e) {
            throw new RuntimeException(e);
        }


        emailSender.send(message);

    }
    @Override
    public void sendEmailRequestAdminwithData(User usertoSend, RequestAdministrative requestAdministrative, String subject, String mailTemplate){
        MimeMessage message = emailSender.createMimeMessage();
        // Read the HTML template into a String variable
        try {

            message.setFrom(new InternetAddress("csi.international2010@gmail.com"));
            message.setRecipients(MimeMessage.RecipientType.TO, usertoSend.getEmail());
            File myFile = new File("src/main/resources/templates/" +mailTemplate);

            System.out.println("Attempting to read from file in: "+myFile.getCanonicalPath());
            Scanner input = new Scanner(myFile);
            String data = "";
            data = input.nextLine();
            System.out.println(requestAdministrative.getUserId());
            if(Objects.equals(requestAdministrative.getUserId().getRole().getRole(), "consultant")){
                data = data.replace("${consultant}", requestAdministrative.getUserId().getFirstname() + requestAdministrative.getUserId().getSuperior().getLastName());
                data = data.replace("${teamlead}", requestAdministrative.getUserId().getSuperior().getFirstname() + requestAdministrative.getUserId().getSuperior().getLastName());
                data = data.replace("${manager}", requestAdministrative.getUserId().getSuperior().getSuperior().getFirstname() + requestAdministrative.getUserId().getSuperior().getSuperior().getLastName());

            }else if(Objects.equals(requestAdministrative.getUserId().getRole().getRole(), "teamLead")){
                data = data.replace("${manager}", requestAdministrative.getUserId().getSuperior().getFirstname() + requestAdministrative.getUserId().getSuperior().getLastName());

            } else if(Objects.equals(requestAdministrative.getUserId().getRole().getRole(), "manager")){
                data = data.replace("${director}", requestAdministrative.getUserId().getSuperior().getFirstname() + requestAdministrative.getUserId().getSuperior().getLastName());
            }

            data = data.replace("${NameSendTo}", usertoSend.getFirstname() + usertoSend.getLastName());
            data = data.replace("${type}",translateTypeFR(requestAdministrative.getType()));


            data = data.replace("${createdAt}", requestAdministrative.getCreatedAt().toString());
            data = data.replace("${updatedAt}", requestAdministrative.getUpdatedAt().toString());

            message.setSubject(subject);


            System.out.println(data);

            message.setContent(data, "text/html; charset=utf-8");



        } catch (IOException | MessagingException e) {
            throw new RuntimeException(e);
        }


        emailSender.send(message);

    }

    @Override
    public void sendEmailRequestEquipmentwithData(User usertoSend, RequestEquipment requestEquipment, String subject, String mailTemplate){
        MimeMessage message = emailSender.createMimeMessage();
        // Read the HTML template into a String variable
        try {

            message.setFrom(new InternetAddress("csi.international2010@gmail.com"));
            message.setRecipients(MimeMessage.RecipientType.TO, usertoSend.getEmail());
            File myFile = new File("src/main/resources/templates/" +mailTemplate);

            System.out.println("Attempting to read from file in: "+myFile.getCanonicalPath());
            Scanner input = new Scanner(myFile);
            String data = "";
            data = input.nextLine();
            System.out.println(requestEquipment.getUserId());
            if(Objects.equals(requestEquipment.getUserId().getRole().getRole(), "consultant")){
                data = data.replace("${consultant}", requestEquipment.getUserId().getFirstname() + requestEquipment.getUserId().getSuperior().getLastName());
                data = data.replace("${teamlead}", requestEquipment.getUserId().getSuperior().getFirstname() + requestEquipment.getUserId().getSuperior().getLastName());
                data = data.replace("${manager}", requestEquipment.getUserId().getSuperior().getSuperior().getFirstname() + requestEquipment.getUserId().getSuperior().getSuperior().getLastName());

            }else if(Objects.equals(requestEquipment.getUserId().getRole().getRole(), "teamLead")){
                data = data.replace("${manager}", requestEquipment.getUserId().getSuperior().getFirstname() + requestEquipment.getUserId().getSuperior().getLastName());

            } else if(Objects.equals(requestEquipment.getUserId().getRole().getRole(), "manager")){
                data = data.replace("${director}", requestEquipment.getUserId().getSuperior().getFirstname() + requestEquipment.getUserId().getSuperior().getLastName());
            }

            data = data.replace("${NameSendTo}", usertoSend.getFirstname() + usertoSend.getLastName());
            data = data.replace("${leaveType}",translateTypeFR(requestEquipment.getType()));


            data = data.replace("${equipment}", requestEquipment.getEquipmentName().toString());

            message.setSubject(subject);


            System.out.println(data);

            message.setContent(data, "text/html; charset=utf-8");



        } catch (IOException | MessagingException e) {
            throw new RuntimeException(e);
        }


        emailSender.send(message);

    }


    public MailTemplate initialiseValue(String reference){
        String subject = "";
        String template = "";

        switch (reference) {
            case "RequestLeaveCreated" ->  {
                subject = "Request Leave Created" ;
                template = "RequestLeaveCreated" ;

            }
            case "RequestLeaveCanceled" -> {
                subject = "RequestLeaveCanceled" ;
                template = "RequestLeaveCreated" ;

            }
            case "RequestLeaveValidated" -> System.out.println("Three");
            case "RequestLeaveDeclined" -> System.out.println("Four");
            case "RequestLeaveValidatedByTeamlead" -> System.out.println("Five");
            case "RequestAuthCreated" -> System.out.println("One");
            case "RequestAuthCanceled" -> System.out.println("Two");
            case "RequestAuthValidated" -> System.out.println("Three");
            case "RequestAuthDeclined" -> System.out.println("Four");
            case "RequestAuthValidatedByTeamlead" -> System.out.println("Five");
            case "RequestAdministrativeCreated" -> System.out.println("One");
            case "RequestEquipmentCreated" -> System.out.println("Two");
            case "RequestNottraited" -> System.out.println("Three");
            case "UpdateLeaveCreditInInstance" -> System.out.println("Four");
            case "SickLeaveRejectedAfterVerification" -> System.out.println("Five");
            case "EndOfContractCIVP1" -> System.out.println("Two");
            case "EndOfContractCIVP2" -> System.out.println("Three");
            case "EndOfContractTestPeriod" -> System.out.println("Four");
            case "RelanceAdministrativeRequest" -> System.out.println("Five");

            default -> System.out.println("Wrong input provided");
        }
        MailTemplate mail = new MailTemplate(reference,subject,template,"active");
        return mail;
    }
    @Override
    public void sendEmailFromTemplate(User user, String mailTemplate , String Subject,String Request ) {

        MimeMessage message = emailSender.createMimeMessage();

        // Read the HTML template into a String variable

        try {
            message.setFrom(new InternetAddress("csi.international2010@gmail.com"));
            message.setRecipients(MimeMessage.RecipientType.TO, user.getEmail());
            message.setSubject(Subject);
            File myFile = new File("src/main/resources/templates/" +mailTemplate);

            System.out.println("Attempting to read from file in: "+myFile.getCanonicalPath());
            mailTemplateRepository.findByReference(Request);
            Scanner input = new Scanner(myFile);
            String data = "";
            data = input.nextLine();
            System.out.println(data);
            //data = data.replace("${template}", user.getFirstname());

            data = data.replace("${firstName}", user.getFirstname());
            data = data.replace("${lastName}", user.getLastName());
            data = data.replace("${request}", Request);

            System.out.println(data);

            message.setContent(data, "text/html; charset=utf-8");



        } catch (IOException | MessagingException e) {
            throw new RuntimeException(e);
        }


        emailSender.send(message);


    }
    @Override
    public void sendEmailFromTemplateWithUserInfo(User sender,User user, String mailTemplate , String Subject,String Request ) {

        MimeMessage message = emailSender.createMimeMessage();

        // Read the HTML template into a String variable

        try {
            message.setFrom(new InternetAddress("csi.international2010@gmail.com"));
            message.setRecipients(MimeMessage.RecipientType.TO, sender.getEmail());
            message.setSubject(Subject);
            File myFile = new File("src/main/resources/templates/" +mailTemplate);

            System.out.println("Attempting to read from file in: "+myFile.getCanonicalPath());

            Scanner input = new Scanner(myFile);
            String data = "";
            data = input.nextLine();
            System.out.println(data);

            data = data.replace("${firstName}", sender.getFirstname());
            data = data.replace("${lastName}", sender.getLastName());
            data = data.replace("${userLastName}", user.getLastName());
            data = data.replace("${userFirstName}", user.getFirstname());
            String dt = new SimpleDateFormat("yyyy-MM-dd").format(user.getContractStartDate());
            data = data.replace("${userEndContract}", dt);


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

    public String translateTypeFR(String type){

        switch (type) {
            case "sickLeave" -> {
                return "congé maladie";
            }
            case "annualLeave" -> {
                return "congé annuel";
            }
            case "unpaidLeave" -> {
                return "congé non payé";
            }
            case "rttLeave" -> {
                return "congé RTT";
            }
            case "specialLeave" ->{
                return "congé spéciale";

            }
            case "exitpermit" -> {
                return "Authorisation de sortie";
            }
            case "homeoffice" ->{
                return "Télétravail";
            }


            default -> {
                return type;
            }
        }

    }
}
