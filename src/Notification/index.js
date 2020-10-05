import React,{useEffect} from 'react';
import {Alert} from 'react-native';
import {localNotificationService} from "../Service/LocalNotificationService";
import {fcmService} from "../Service/FCMService";

const Notification = (props) => {
    useEffect(() => {
        const onRegister = (token) => {
            console.log('[Notification] onRegister', token)
        };
        const onNotification = (notify) => {
            const options = {
                soundName: 'default',
                playSound: true
            };
            localNotificationService.showNotification(
                0,
                notify.title,
                notify.body,
                notify,
                options
            )
        };
        const onOpenNotification = (notify) => {
            console.log('[Notification] onOpenNotification', notify)
        };
        fcmService.registerAppWithFCM();
        fcmService.register(onRegister, onNotification, onOpenNotification);
        localNotificationService.configure(onOpenNotification);

        return () => {
            fcmService.unRegister();
            localNotificationService.unregister();
        }
    }, []);
    return null
};


export default Notification;
