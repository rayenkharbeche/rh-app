package com.csi.rh_project;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Objects;

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
    private final EmailService emailService;

    public ScheduledTasks(UserService userService,
                          RequestLeaveService requestLeaveService,
                          EmailService emailService
    ) {

        this.userService = userService;
        this.requestLeaveService = requestLeaveService;
        this.emailService = emailService;

    }
    private static final Logger log = LoggerFactory.getLogger(ScheduledTasks.class);

    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

    @Scheduled(cron = "@daily")
    public void reportCurrentTime() {
        List<RequestLeave> requestLeaves ;
        Date today = new Date();
        System.out.println("test");

        requestLeaves = requestLeaveService.allrequestLeaves();


        for (RequestLeave requestLeave : requestLeaves) {
            if (Objects.equals(requestLeave.getLeaveType(), "sickLeave") && Objects.equals(requestLeave.getStatus(), "validated") && Objects.equals(requestLeave.getFileDB(), null) )     {
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
                    requestLeaveService.updateRequest(requestLeave.getId(),requestLeave);
                    String subject = "Request Leave Status ";
                    emailService.sendEmailFromTemplate(requestLeave.getUserId(), "email-template_2.txt" , subject,"Leave Request");

                }
            }

        }
    }
    @Scheduled(cron="0 0 0 1 1/1 *")
    public void addLeaveCredit() {

        List<User> users = userService.allUsers();
        for (User _user : users) {

            userService.addleaveCredit(_user.getId(), _user.getLeaveCredit() + 1.8);
        }

    }
}
