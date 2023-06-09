package com.dekko.controller;

import com.dekko.config.JwtUtil;
import com.dekko.entity.UserDtl;
import com.dekko.model.AuthRequest;
import com.dekko.model.AuthResponse;
import com.dekko.notification.NotificationService;
import com.dekko.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/**
 * @Author Abdul Alim
 * @Since 6/8/2023
 */
@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;
    @Autowired
    private NotificationService notificationService;

    @PostMapping("/login")
    public AuthResponse generateToken(@RequestBody AuthRequest authRequest) throws Exception {

        Optional<UserDtl> userOpt = userService.getByEmail(authRequest.getEmail());
        if(userOpt.isEmpty()){
            return new AuthResponse(null, "invalid username/password");
        }
        UserDtl user = userOpt.get();
        try {

            if(!user.isAccountNonLocked()){
                if(!userService.unlockWhenTimeExpired(user)){
                    throw new Exception("Your account has been locked due to 3 failed attempts. It will be unlocked after 24 hours.");
                }
            }
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
            );
            userService.resetFailedAttempts(authRequest.getEmail());
        } catch (Exception ex) {
            AuthResponse res = new AuthResponse();
            if(!user.isAccountNonLocked()){
                res.setMessage("Your account has been locked due to 3 failed attempts. It will be unlocked after 24 hours.");
                return res;
            }else if (user.isAccountNonLocked()) {
                if (user.getFailedAttempt() < UserService.MAX_FAILED_ATTEMPTS-1) {
                    user = userService.increaseFailedAttempts(user);
                    res.setMessage("invalid username/password");
                    return res;
                } else {
                    userService.lock(user);
                    res.setMessage("Your account has been locked due to 3 failed attempts. It will be unlocked after 24 hours.");
                    return res;
                }
            } else if (userService.unlockWhenTimeExpired(user)){
                res.setMessage("Your account has been unlocked. Please try to login again.");
                return res;
            } else {
                res.setMessage("invalid username/password");
                return res;
            }
        }
        notificationService.sendNotification("/topic/type", user.getType());
        return jwtUtil.generateToken(authRequest.getEmail(), user.getType());
    }
}