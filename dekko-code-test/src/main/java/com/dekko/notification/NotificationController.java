package com.dekko.notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.MessagingException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/notify")
    public String getNotification() throws MessagingException {
        notificationService.sendNotification("/topic/notification", "Test payload for notification");
        return "Notifications successfully sent to Angular !";
    }
}
