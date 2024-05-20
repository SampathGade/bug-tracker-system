package com.example.bugtrackersystem.services.Authentication;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
//import org.springframework.security.crypto.password.PasswordEncoder;
import java.time.LocalDateTime;
import java.util.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.example.bugtrackersystem.entity.Session;
import com.example.bugtrackersystem.entity.User;
import com.example.bugtrackersystem.repository.UserRepository;
import com.example.bugtrackersystem.services.EmailSender.EmailSender;

@Service
public class AuthenticationService {

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailSender emailService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public boolean checkCredentials(String email, String password) {
        User user = userRepository.findByEmailAndStatus(email, "Onboarded");
        if (user != null && ((passwordEncoder.matches(password,user.getPassword()))
                ||password.equals(user.getPassword())) && ("Onboarded".equalsIgnoreCase(user.getStatus()))) {
            logger.info("Credentials are valid for email: {}", email);
            return true;
        }
        logger.warn("Invalid login attempt for email: {}", email);
        return false;
    }

    public User checkSession(String email, String ip) {
        Date date = new Date();
        User user = userRepository.findBySessionIpAndSessionValidUpToAndEmail(ip, date, email);
        if(user != null) {
            return user;
        }
        return null;
    }
    public void createSession(String email, String ip) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return;
        }

        List<Session> sessions = user.getSessions();
        if (sessions == null) {
            sessions = new ArrayList<>();
        }

        Session existingSession = null;
        for (Session s : sessions) {
            if (Objects.equals(s.getIp(), ip)) {
                existingSession = s;
                break;
            }
        }

        if (existingSession != null) {
            Calendar calendar = Calendar.getInstance();
            calendar.add(Calendar.HOUR, 24);
            existingSession.setValidUpTo(calendar.getTime());
        } else {
            Session newSession = new Session();
            newSession.setIp(ip);

            Calendar calendar = Calendar.getInstance();
            calendar.add(Calendar.HOUR, 24);
            newSession.setValidUpTo(calendar.getTime());

            sessions.add(newSession);
        }
        user.setSessions(sessions);
        userRepository.save(user);
    }

    public void generateAndSendOtp(String email) {
        User user = userRepository.findByEmail(email);
        if( user == null) {
            user = new User();
            user.setEmail(email);
        }
        String otp = String.valueOf(new Random().nextInt(900000) + 100000);
        user.setOtp(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(10));
        userRepository.save(user);
        emailService.sendOtpEmail(email, otp);
        logger.info("OTP generated and sent to email: {}", email);
    }

    public User validateOtp(String email, String otp, String ip) {
        User user = userRepository.findByEmail(email);
        if (user != null && otp.equals(user.getOtp()) && user.getOtpExpiry().isAfter(LocalDateTime.now())) {
            user.setOtp(null);
            if(ip != null) {
                List<Session> sessions = user.getSessions();
                if (sessions == null) {
                    sessions = new ArrayList<>();
                }
                Session existingSession = null;
                for (Session s : sessions) {
                    if (Objects.equals(s.getIp(), ip)) {
                        existingSession = s;
                        break;
                    }
                }
                if (existingSession != null) {
                    existingSession.setOtpValidated(true);
                }
                user.setSessions(sessions);
            }
            userRepository.save(user);
            logger.info("OTP validated for email: {}", email);
            return user;
        }
        logger.warn("Invalid OTP attempt for email: {}", email);
        return null;
    }

    public boolean isDuplicateUser(String email) {
        User user = userRepository.findByEmailAndStatus(email, "Onboarded") ;
        return user != null;
        //need to write logic to send the request Email to admin
    }

    public void createUser(String email, String password, String role, String firstName, String lastName) {
        User user = userRepository.findByEmail(email);
        user.setEmail(email);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);
        user.setStatus("Pending");
        userRepository.save(user);
    }

    public void resetPassword(String email , String password) {
        User user = userRepository.findByEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
    }
;
    public List<User> getOnboardingPendingUsers() {
        return userRepository.findByStatus("Pending");
    }

    public void updateRequestStatus(String email, String role, String projectManager, String status) {
        User user = userRepository.findByEmail(email);
        user.setRole(role);
        user.setProjectManager(projectManager);
        if ("accepted".equalsIgnoreCase(status)){
           user.setStatus("Onboarded");
           userRepository.save(user);
           // need to send Email here as well
        } else {
            userRepository.delete(user);
        }
    }

}

