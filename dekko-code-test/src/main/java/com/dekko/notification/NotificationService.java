package com.dekko.notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

/**
 * @Author Abdul Alim
 * @Since 6/9/2023
 */
@Service
public class NotificationService {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    public void sendNotification(String topicSuffix, Object payload){
        simpMessagingTemplate.convertAndSend("/topic/"+topicSuffix, payload);
    }

    public void sendNotificationToUser(String user, String topicSuffix, Object payload){
        simpMessagingTemplate.convertAndSendToUser(user,"/topic/"+topicSuffix, payload);
    }
}
