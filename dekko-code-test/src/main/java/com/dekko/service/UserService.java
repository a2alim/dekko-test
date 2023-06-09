package com.dekko.service;

import com.dekko.entity.UserDtl;
import com.dekko.model.UserRequest;
import com.dekko.notification.NotificationService;
import com.dekko.notification.Notifications;
import com.dekko.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * @Author Abdul Alim
 * @Since 6/7/2023
 */
@Service
public class UserService {
    public static final int MAX_FAILED_ATTEMPTS = 30;
    private static final long LOCK_TIME_DURATION = 24 * 60 * 60 * 1000; // 24 hours
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private NotificationService notificationService;
    private static final ModelMapper mapper = new ModelMapper();

    public UserDtl create(UserRequest payload) {
        if(Objects.isNull(payload)) throw new RuntimeException("User should not be empty!!");
        UserDtl user = new UserDtl();
        mapper.map(payload, user);
        user.setPassword(encoder.encode(user.getPassword()));
        UserDtl saveUser = userRepo.save(user);
        if(saveUser != null){
            Notifications notifications = new Notifications(saveUser.getFirstName() +" is created.", 1);
            notificationService.sendNotification("/topic/notification", notifications);
        }
        return saveUser;
    }

    public List<UserDtl> getAll() {
        return userRepo.findAll();
    }

    public UserDtl get(Long id) {
        if(Objects.isNull(id)) throw new RuntimeException("Id should not be empty!!");
        return userRepo.findById(id).orElseThrow(()-> new RuntimeException("User not found with id : "+id));
    }

    public Optional<UserDtl> getByEmail(String email) {
         return userRepo.findByEmail(email);
    }

    public UserDtl update(UserRequest payload) {
        if(Objects.isNull(payload)) throw new RuntimeException("User should not be empty!!");
        UserDtl user = userRepo.findById(payload.getId()).orElseThrow(()-> new RuntimeException("User not found with id : "+payload.getId()));
        mapper.map(payload, user);
        return userRepo.save(user);
    }

    public UserDtl delete(Long id) {
        UserDtl user = userRepo.findById(id).orElseThrow(()-> new RuntimeException("User not found with id : "+id));
        userRepo.delete(user);
        return user;
    }

    public UserDtl updateFailedAttempts(int failAttempts, String email){
        UserDtl user = userRepo.findByEmail(email).get();
        user.setFailedAttempt(failAttempts);
        return userRepo.save(user);
    }

    public UserDtl increaseFailedAttempts(UserDtl user) {
        int newFailAttempts = user.getFailedAttempt() + 1;
        return updateFailedAttempts(newFailAttempts, user.getEmail());
    }

    public UserDtl resetFailedAttempts(String email) {
        return updateFailedAttempts(0, email);
    }

    public void lock(UserDtl user) {
        user.setAccountNonLocked(false);
        user.setLockTime(new Date());
        userRepo.save(user);
    }

    public boolean unlockWhenTimeExpired(UserDtl user) {
        long lockTimeInMillis = user.getLockTime()!= null ? user.getLockTime().getTime() : System.currentTimeMillis();
        long currentTimeInMillis = System.currentTimeMillis();
        if (lockTimeInMillis + LOCK_TIME_DURATION < currentTimeInMillis) {
            user.setAccountNonLocked(true);
            user.setLockTime(null);
            user.setFailedAttempt(0);
            userRepo.save(user);
            return true;
        }
        return false;
    }

}
