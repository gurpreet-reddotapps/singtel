import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import PushNotification, { Importance } from 'react-native-push-notification';
import { useDispatch } from 'react-redux';
import { NotificationPermisionStatus } from '../redux/actions/Notifications';
export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    GetFCMToken();
    if (Platform.OS == "android") {
      createChannelForAndroid()
      // NotificationChannelNames()
    }
  }

}

const createChannelForAndroid = () => {
  PushNotification.createChannel(
    {
      channelId: "channel0", // (required)
      channelName: "Bigfoot", // (required)
      channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
      playSound: true, // (optional) default: true
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );
}

const NotificationChannelNames = () => {
  PushNotification.getChannels(function (channel_ids) {
    console.log("channel_ids", channel_ids); // ['channel_id_1']
  });
}


//  function GetFCMToken() {
const GetFCMToken = async () => {

  let fcmtoken = await AsyncStorage.getItem("fcmtoken")
  console.log(fcmtoken, "OLD FCM TOKEN");
  if (!fcmtoken) {
    try {
      let fcmtoken = await messaging().getToken()
      if (fcmtoken) {
        console.log(fcmtoken, "NEW FCM TOKEN");
        await AsyncStorage.setItem("fcmtoken", fcmtoken)
      }
    } catch (error) {
      console.log(error, "ERROR IN GETTING THE FCM TOKEN");
    }
  }

}




export const NotificationListner = () => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open

  // messaging().onNotificationOpenedApp(remoteMessage => {
  //   console.log(
  //     'Notification caused app to open from background state:',
  //     remoteMessage.notification,
  //   );
  // });

  messaging().onMessage(async remoteMessage => {
    console.log("Notification On Foreground....", remoteMessage);
    PushNotification.localNotification({
      title: remoteMessage.notification.title,
      message: remoteMessage.notification.body, // (required)
      vibration: 300,
      playSound: true, // (optional) default: true
      soundName: "default",
      date: new Date(Date.now()), // in 60 secs
      channelId:remoteMessage.notification.android.channelId
    })
  })


  // Check whether an initial notification is available
  // messaging()
  //   .getInitialNotification()
  //   .then(remoteMessage => {
  //     if (remoteMessage) {
  //       console.log(
  //         'Notification caused app to open from quit state:',
  //         remoteMessage.notification,
  //       );
  //     }
  //   });
}