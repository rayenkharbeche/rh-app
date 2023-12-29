package com.csi.rh_project.auth.controllers;

import com.csi.rh_project.auth.dtos.LoginUserDto;
import com.csi.rh_project.auth.dtos.RegisterUserDto;
import com.csi.rh_project.auth.dtos.TokenUserDto;
import com.csi.rh_project.auth.models.Mail;
import com.csi.rh_project.auth.models.Role;
import com.csi.rh_project.auth.models.User;
import com.csi.rh_project.auth.responses.LoginResponse;
import com.csi.rh_project.auth.services.AuthenticationService;
import com.csi.rh_project.auth.services.JwtService;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;

import jakarta.servlet.http.HttpServletRequest;

@RequestMapping("/auth")
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AuthenticationController {
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody RegisterUserDto registerUserDto) {


        User registeredUser = authenticationService.signup(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);
        User user = authenticationService.findByEmail(loginUserDto.getEmail());
        System.out.println(user);
        System.out.println(user.getRole().getRole());
        System.out.println(user.getEmail());

        LoginResponse loginResponse = new LoginResponse().setToken(jwtToken).setExpiresIn(jwtService.getExpirationTime()).setRole(user.getRole().getRole()).setId(user.getId());
        authenticationService.updateToken(jwtToken,loginUserDto.getEmail());
        System.out.println(loginResponse);

        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/forgot-password")
    public String forgotPassword(@RequestBody LoginUserDto loginUserDto) {
System.out.println(loginUserDto);

        String response = authenticationService.forgotPassword(loginUserDto.getEmail());

        if (!response.startsWith("Invalid")) {
            response = "http://localhost:8080/reset-password?token=" + response;
        }
        return response;
    }

    @PutMapping("/reset-password")
    public String resetPassword(@RequestBody TokenUserDto tokenUserDto) {

        return authenticationService.resetPassword(tokenUserDto.getToken(), tokenUserDto.getPassword());
    }

}