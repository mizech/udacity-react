import { AsyncStorage } from "react-native";
import { Notifications, Permissions } from "expo";

const NOTIFICATION_KEY = "notification";

const clearLocalNotifications = () => {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
            .then(Notifications.cancelAllScheduledNotificationsAsync());
}

const createNotification = () => {
    return {
        title: "Time to learn!",
        body: "It is 4 o'clock and you haven't taken a quiz yet.",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: "high",
            sticky: false,
            vibrate: true
        }
    }
}

const setLocalNotification = () => {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then((sData) => {
            return JSON.parse(sData);
        })
        .then((oData) => {
            if (oData === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({status}) => {
                        if (status === "granted") {
                            Notifications.cancelAllScheduledNotificationsAsync();

                            let tomorrow = new Date();

                            tomorrow.setDate(tomorrow.getDate() + 1);
                            tomorrow.setHours(16);
                            tomorrow.setMinutes(0);

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: "day"
                                }
                            );

                            AsyncStorage.setItem(
                                NOTIFICATION_KEY,
                                JSON.stringify(true));
                        }
                    })
            }
        })
}

export { NOTIFICATION_KEY, clearLocalNotifications, createNotification, setLocalNotification };