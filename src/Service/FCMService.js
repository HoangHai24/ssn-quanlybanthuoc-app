import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';

class FCMService {
    register = (onRegister, onNotification, onOpenNotification) => {
        this.checkPermission(onRegister);
        this.createNotificationListeners(onRegister, onNotification, onOpenNotification);
    };
    registerAppWithFCM = async () => {
        if (Platform.OS === 'ios'){
            // await messaging().registerDeviceForRemoteMessages();
            await messaging().setAutoInitEnabled(true);
        }
    };
    checkPermission = (onRegister) => {
        messaging().hasPermission()
            .then(enabled => {
                if (enabled){
                    this.getToken(onRegister)
                }
                else {
                    this.requestPermission(onRegister)
                }
            })
            .catch(error => {
                console.log('[FCMService] permission rejected', error)
            })
    };
    getToken = (onRegister) => {
        messaging().getToken()
            .then(fcmToken => {
                if (fcmToken){
                    onRegister(fcmToken)
                }
                else{
                    console.log('[FCMService] User does not have a device token')
                }
            })
            .catch(error => {
                console.log('[FCMService] getToken rejected: ', error);
            })
    }
    requestPermission = (onRegister) => {
        messaging().requestPermission()
            .then(() => {
                this.getToken(onRegister)
            })
            .catch(error => {
                console.log('[FCMService] Request Permission rejected', error)
            })
    }
    deleteToken = () => {
        messaging().deleteToken()
            .catch(error => {
                console.log('[FCMService] Delete token error', error)
            })
    }
    createNotificationListeners = (onRegister, onNotification, onOpenNotification) => {
        // when the application is running, but in the background
        messaging()
            .onNotificationOpenedApp(remoteMessage => {
                // console.log('[FCMService] onNotificationOpenedApp Notification caused app to open');
                if (remoteMessage){
                    // const notification = remoteMessage.notification;
                    // onOpenNotification(notification)
                    if (Platform.OS === 'ios'){
                        onOpenNotification(remoteMessage.data);
                    }
                    else onOpenNotification(remoteMessage);                }
            });
        // when the application is opened from a quit state.
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                // console.log('[FCMService] getInitialNotification Notification caused app to open', remoteMessage);
                if (remoteMessage!=null){
                    // const notification = remoteMessage.notification;
                    if (Platform.OS === 'ios'){
                        onOpenNotification(remoteMessage.data);
                    }
                    else onOpenNotification(remoteMessage);

                    // AsyncStorage.removeItem('last_notify');
                    //this.removeDelivereNotification(notification.notificationId)
                }
            });
        // foreground state messages
        this.messageListener = messaging().onMessage(async remoteMessage => {
            // console.log('[FCMService] A new FCM message arrived', remoteMessage);
            // if (remoteMessage){
            //     let notification = null;
            //     if (Platform === 'ios'){
            //         notification = remoteMessage.data.notification
            //     }
            //     else{
            //         notification = remoteMessage.notification;
            //     }
            //     onNotification(remoteMessage.data)
            //     // onNotification(remoteMessage.data)
            // }
        });
        // triggered when have new token
        messaging().onTokenRefresh(fcmToken => {
            // console.log('[FCMService] New token refresh', fcmToken);
            onRegister(fcmToken);
        })
    }
    unRegister = () => {
        this.messageListener();
    }

}
export const fcmService = new FCMService();
