package com.csi.rh_project.auth.services;

import com.csi.rh_project.auth.dtos.LoginUserDto;
import com.csi.rh_project.auth.dtos.RegisterUserDto;
import com.csi.rh_project.auth.models.Mail;
import com.csi.rh_project.auth.models.Role;
import com.csi.rh_project.auth.models.User;
import com.csi.rh_project.auth.repositories.RoleRepository;
import com.csi.rh_project.auth.repositories.UserRepository;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;


@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private static final long EXPIRE_TOKEN_AFTER_MINUTES = 30;

    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    private final EmailService emailService;

    public AuthenticationService(
        UserRepository userRepository,
        AuthenticationManager authenticationManager,
        PasswordEncoder passwordEncoder,
        RoleRepository roleRepository,
        EmailService emailService
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.emailService = emailService;

        this.passwordEncoder = passwordEncoder;
    }
    public Role GenerateRole() {

            Role role = new Role();
            role.setRole("admin");

        return roleRepository.save(role);
    }
    public User signup(RegisterUserDto input) {
        Optional<Role> role = findById(1);



        var user = new User()
                .setFirstName(input.getFirstname())
                .setLastName(input.getLastname())
                .setEmail(input.getEmail())
                .setPassword(passwordEncoder.encode(input.getPassword()))
                .setRole(role.get())
                ;
        System.out.println(user);

        return userRepository.save(user);

    }
    public User updateToken(String token,String email ) {
        System.out.println(token);
        Optional<User> userOptional = userRepository.findByEmail(email);
        System.out.println(userOptional.get());

        User user = userOptional.get();
        user.setToken(token);
        user.setTokenCreationDate(LocalDateTime.now());




        return userRepository.save(user);

    }

    public User authenticate(LoginUserDto input) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                input.getEmail(),
                input.getPassword()
            )
        );
        System.out.println(input.getEmail());

        System.out.println(userRepository.findByEmail(input.getEmail()));

        return userRepository.findByEmail(input.getEmail()).orElseThrow();
    }

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();

        userRepository.findAll().forEach(users::add);

        return users;
    }
    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public void updatePassword(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public String forgotPassword(String email) {

        Optional<User> userOptional = userRepository.findByEmail(email);

        if (!userOptional.isPresent()) {
            return "Invalid email id.";
        }

        User user = userOptional.get();

        String token = generateToken();
        user.setToken(token);
        user.setTokenCreationDate(LocalDateTime.now());
        if (user == null){
            return "forgot-password";
        }
        user = userRepository.save(user);
        if (user != null) {

            Mail mail = new Mail();
            mail.setFrom("csi.international2010@gmail.com");
            mail.setTo(user.getEmail());
            mail.setSubject("Password reset request");

            Map<String, Object> model = new HashMap<>();
            model.put("token", token);
            model.put("user", user);
            System.out.println(user);

            model.put("signature", "https://csi_internationale.com");
            String url = "http://localhost:4200/#/reset/" + token;
            model.put("resetUrl", url);
            mail.setModel(model);

            emailService.sendEmail(mail);
        }


        return user.getToken();
    }

    public String resetPassword(String token, String password) {
        System.out.println(token);
        System.out.println(password);

        Optional<User> userOptional = Optional
                .ofNullable(userRepository.findByToken(token));


        if (!userOptional.isPresent()) {

            return "Invalid token.";

        }



        LocalDateTime tokenCreationDate = userOptional.get().getTokenCreationDate();

        if (isTokenExpired(tokenCreationDate)) {
            return "Token expired.";

        }

        User user = userOptional.get();
        user.setPassword(passwordEncoder.encode(password));
        user.setToken(null);
        user.setTokenCreationDate(null);

        userRepository.save(user);

        return "Your password successfully updated.";
    }

    /**
     * Generate unique token. You may add multiple parameters to create a strong
     * token.
     *
     * @return unique token
     */
    private String generateToken() {
        StringBuilder token = new StringBuilder();

        return token.append(UUID.randomUUID().toString())
                .append(UUID.randomUUID().toString()).toString();
    }

    /**
     * Check whether the created token expired or not.
     *
     * @param tokenCreationDate
     * @return true or false
     */
    private boolean isTokenExpired(final LocalDateTime tokenCreationDate) {

        LocalDateTime now = LocalDateTime.now();
        Duration diff = Duration.between(tokenCreationDate, now);

        return diff.toMinutes() >= EXPIRE_TOKEN_AFTER_MINUTES;
    }
    public Optional<Role> findById(long id) {
        return roleRepository.findById(id);

    }

}
