package com.csi.rh_project;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAccessor;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import com.csi.rh_project.AdministrativeRequest.model.RequestAdministrative;
import com.csi.rh_project.AdministrativeRequest.service.RequestAdministrativeService;
import com.csi.rh_project.RequestLeave.model.RequestLeave;
import com.csi.rh_project.RequestLeave.repository.RequestLeaveRepository;
import com.csi.rh_project.RequestLeave.service.RequestLeaveService;
import com.csi.rh_project.auth.models.User;
import com.csi.rh_project.auth.services.EmailService;
import com.csi.rh_project.auth.services.ImageService;
import com.csi.rh_project.auth.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduledTasks {
    private final UserService userService;
    private final RequestLeaveService requestLeaveService;
    private final RequestAdministrativeService requestAdministrativeService;

    private final EmailService emailService;

    public ScheduledTasks(UserService userService,
                          RequestLeaveService requestLeaveService,
                          EmailService emailService,
                          RequestAdministrativeService requestAdministrativeService
    ) {

        this.userService = userService;
        this.requestLeaveService = requestLeaveService;
        this.emailService = emailService;
        this.requestAdministrativeService = requestAdministrativeService;


    }

    private static final Logger log = LoggerFactory.getLogger(ScheduledTasks.class);

    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

    @Scheduled(cron = "@daily")
    public void reportCurrentTime() {
        List<RequestLeave> requestLeaves;
        Date today = new Date();
        System.out.println("test");

        requestLeaves = requestLeaveService.allrequestLeaves();


        for (RequestLeave requestLeave : requestLeaves) {

            long diff_status = today.getTime() - requestLeave.getUpdateDate().getTime();
            float diff_status_res = (diff_status / (1000 * 60 * 60 * 24));
            /*Notification mail if Request not traited within 24 hours */

            if (Objects.equals(requestLeave.getInterneStatus(), "ongoing") && (diff_status_res > 24)) {
                //String subject = "Request Leave Created ";
                String subject = "Demande de congé Crée";
                User user = userService.getmanager(requestLeave.getUserId().getSuperior());
                //emailService.sendEmailFromTemplateWithUserInfo(user, requestLeave.getUserId(), "email-template.txt", subject, "Leave Request");
                String mail_template= "template-mail-create-request-leave.txt";
                emailService.sendEmailRequestLeaveWithData(user,requestLeave, subject, mail_template);


            }
            /*Update Leave credit in instance*/
            if (Objects.equals(requestLeave.getLeaveType(), "annualLeave")
                    && Objects.equals(requestLeave.getStatus(), "validated")
                    && Objects.equals(requestLeave.getInterneStatus(), "ongoing")) {
                long leaveDays = requestLeave.getEndDate().getTime() - requestLeave.getStartDate().getTime();
                float leaveDays_res = (leaveDays / (1000 * 60 * 60 * 24));
                /*verif solde congé*/
                if (requestLeave.getUserId().getLeaveCredit() >= leaveDays_res ) {
                    userService.addleaveCredit(requestLeave.getUserId().getId(), requestLeave.getUserId().getLeaveCredit() - leaveDays_res);
                    //String subject = "Request Leave Validated ";
                    //emailService.sendEmailFromTemplate(requestLeave.getUserId(), "email-template_2.txt", subject, "Leave Request");
                    String subject = "Demande de congé Crée";
                    String mail_template= "template-mail-create-request-leave.txt";

                    emailService.sendEmailRequestLeaveWithData(requestLeave.getUserId(),requestLeave, subject, mail_template);

                }{
                    //String subject = "Request Leave Declined ";
                    //emailService.sendEmailFromTemplate(requestLeave.getUserId(), "email-template_2.txt", subject, "Leave Request");
                    String subject = "Demande de congé decliné";
                    String mail_template= "template-mail-declined-request-leave.txt";
                    emailService.sendEmailRequestLeaveWithData(requestLeave.getUserId(),requestLeave, subject, mail_template);

                }
            }


            /*Notification mail and leave credit decrement if medical certificate not attached or RH reject request after checking attached file */
            if (Objects.equals(requestLeave.getLeaveType(), "sickLeave")
                    && (Objects.equals(requestLeave.getStatus(), "validated") && Objects.equals(requestLeave.getFileDB(), null))
                    || (Objects.equals(requestLeave.getStatus(), "rejected") && !Objects.equals(requestLeave.getFileDB(), null)  )) {

                System.out.println(requestLeave);
                long leaveDays = requestLeave.getEndDate().getTime() - requestLeave.getStartDate().getTime();
                float leaveDays_res = (leaveDays / (1000 * 60 * 60 * 24));
                long diff = today.getTime() - requestLeave.getEndDate().getTime();
                System.out.println(today.getTime());
                System.out.println(requestLeave.getEndDate().getTime());

                float diff_res = (diff / (1000 * 60 * 60 * 24));
                System.out.println(diff_res);

                if ((diff_res) > 7) {
                    userService.addleaveCredit(requestLeave.getUserId().getId(), requestLeave.getUserId().getLeaveCredit() - leaveDays_res);
                    requestLeave.setLeaveType("annualLeave");
                    requestLeaveService.updateRequest(requestLeave.getId(), requestLeave);
                    String subject = "Status de la demande modifié ";
                    //emailService.sendEmailFromTemplate(requestLeave.getUserId(), "email-template_2.txt", subject, "Leave Request");
                    String mail_template= "template-mail-status-request-leave.txt";
                    emailService.sendEmailRequestLeaveWithData(requestLeave.getUserId(),requestLeave, subject, mail_template);
                }
            }

        }
    }

    @Scheduled(cron = "0 0 0 1 1/1 *")
    public void addLeaveCredit() {

        List<User> users = userService.allUsers();
        for (User _user : users) {

            userService.addleaveCredit(_user.getId(), _user.getLeaveCredit() + 1.8);
        }

    }
    @Scheduled(cron = "@monthly")
    public void remoteDayrefresh() {

        List<User> users = userService.allUsers();
        for (User _user : users) {
            _user.setRemoteNbr(0);
            userService.updateUser(_user.getId(), _user);
        }

    }


    @Scheduled(cron = "@daily")
    public void notifEndContrat() {
        Date today = new Date();

        List<User> users = userService.allUsers();
        for (User _user : users) {
            long diff = _user.getContactEndDate().getTime() - today.getTime();
            long diffyear = _user.getContactEndDate().getTime() - _user.getContractStartDate().getTime();

            float diff_res = (diff / (1000 * 60 * 60 * 24));
            float diffyear_res = (diffyear / (1000 * 60 * 60 * 24));

            List<User> _users = null;
            _users = userService.getteamLeadandManager(_user);

            /*Notification End of Contract CIVP*/
            if (Objects.equals(_user.getContractType(), "CIVP") && (diffyear_res == 365) && (diff_res == 30)) {
                /*Send mail CIVP 1*/
                String subject = "Notification fin de Contract CIVP ";
                if (!_users.isEmpty()) {
                    for (User user : _users) {
                        //emailService.sendEmailFromTemplateWithUserInfo(user, _user, "email-template.txt", subject, "Leave Request");
                        String mail_template= "template-mail-status-contract.txt";
                        emailService.sendEmailWithData(user,_user, subject, mail_template);
                    }
                }


            }
            /*Notification End of Contract CIVP 2*/
            if (Objects.equals(_user.getContractType(), "CIVP") && (diffyear_res > 365) && (diff_res == 10)) {
                /*Send mail CIVP 2*/
                String subject = "Notification fin de Contract CIVP 2 ";

                if (!_users.isEmpty()) {
                    for (User user : _users) {
                        String mail_template= "template-mail-status-contract.txt";
                        emailService.sendEmailWithData(user,_user, subject, mail_template);
                        //emailService.sendEmailFromTemplateWithUserInfo(user, _user, "email-template.txt", subject, "Leave Request");

                    }
                }

            }
            /*Notification End of Contract Test Period Or End contract CDD*/
            if ((Objects.equals(_user.getContractType(), "CDI") || Objects.equals(_user.getContractType(), "CDD")) && diff_res == 10) {
                /*Send mail Periode test */
                String subject = "Notification fin de Contract Test Period";
                if (!_users.isEmpty()) {
                    for (User user : _users) {
                        String mail_template= "template-mail-status-contract.txt";
                        emailService.sendEmailWithData(user,_user, subject, mail_template);
                        //emailService.sendEmailFromTemplateWithUserInfo(user, _user, "email-template.txt", subject, "Leave Request");

                    }
                }
            }

        }
    }

    /*Administrative Request has not been traited since 3 Days*/
    @Scheduled(cron = "@daily")
    public void relanceTraitment() {
        Date today = new Date();

        List<RequestAdministrative> requestAdministrativeq;


        requestAdministrativeq = requestAdministrativeService.allrequestAdministratives();


        for (RequestAdministrative requestAdministrative : requestAdministrativeq) {
            long diff = today.getTime() - requestAdministrative.getCreatedAt().getTime();

            float diff_res = (diff / (1000 * 60 * 60 * 24));
            User _user = userService.getmanager(requestAdministrative.getUserId().getSuperior());
            String subject = "Demande administrative non traité depuis 3 Jours ";

            if( (Objects.equals(requestAdministrative.getStatus(), "ongoing")
                    || Objects.equals(requestAdministrative.getStatus(), "open"))
                    && (diff_res > 3 ) )
            {
                String mail_template= "template-mail-notification-request-administrative.txt";
                //emailService.sendEmailFromTemplateWithUserInfo(_user, requestAdministrative.getUserId(), "email-template.txt", subject, "Administrative Request");
                emailService.sendEmailRequestAdminwithData(_user, requestAdministrative, subject, mail_template);

            }
        }
    }

}








