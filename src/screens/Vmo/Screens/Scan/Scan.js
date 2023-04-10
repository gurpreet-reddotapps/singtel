import React, { useState } from 'react'
import { View, Dimensions, Text, Alert } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import * as Animatable from "react-native-animatable";
import { JobDetailAPI, QR_CODE_Api } from '../../api';
import { ShowErrorMessage, ShowSuccessMessage } from '../../../../component';
import { useNavigation } from '@react-navigation/native';
import NavigationString from '../../routes/NavigationString';
import { setJobId, setOrderId } from '../../../../redux/actions/Job';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../Components/Spinner';
import { windowHeight } from '../../utils/Dimension';



const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;


const overlayColor = "rgba(0,0,0,0.5)"; // this gives us a black color with a 50% transparency

const rectDimensions = SCREEN_WIDTH * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = "red";

const scanBarWidth = SCREEN_WIDTH * 0.46; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = "#22ff00";

const iconScanColor = "blue";


const Scan = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [loading, setloading] = useState(false)
  const { homeData } = useSelector(state => state.homeDetails);
  const { user } = useSelector(state => state.userDetails);




  var onSuccess = (e) => {
    // Alert.alert("Order ID", e?.data)
    // console.log(e?.data, "VALUR OF QR");
    setloading(true)
    let data = {
      order_id: e?.data
    }
    QR_CODE_Api(data).then(async (res) => {
      console.log(res?.data, "SERVER REPONSE");
      console.log(res?.data?.message, "SERVER REPONSE");
      if (res?.data?.success == true) {
        await res?.data?.success && dispatch(setJobId(res?.data?.job_id))
        ShowSuccessMessage("Job Found")
        navigation.navigate(NavigationString.JOB_DETAIL_SCREEN)
        setloading(false)
      } else if (res?.data?.success == false) {
        ShowErrorMessage(res?.data?.message)
        navigation.navigate(NavigationString.JOBS_SCREEN)
        setloading(false)
      }
    }).catch(err => { return err; });

  }

  var AdminQRHandler = (e) => {
    // Alert.alert("Order ID", e?.data)
    // console.log(e?.data, "VALUR OF QR");
    setloading(true)
    let data = {
      order_id: e?.data
    }
    dispatch(setOrderId(e?.data))
    if (data !== null) {
      navigation.navigate(NavigationString.ADMIN_JOB_DETAIL)
    }
    else {
      ShowErrorMessage("No More data found!")
    }
    // QR_CODE_Api(data).then(async (res) => {
    //   console.log(res?.data, "SERVER REPONSE");
    //   console.log(res?.data?.message, "SERVER REPONSE");
    //   if (res?.data?.success == true) {
    //     await res?.data?.success && dispatch(setJobId(res?.data?.job_id))
    //     ShowSuccessMessage("Job Found")
    //     navigation.navigate(NavigationString.JOB_DETAIL_SCREEN)
    //     setloading(false)
    //   } else if (res?.data?.success == false) {
    //     ShowErrorMessage(res?.data?.message)
    //     navigation.navigate(NavigationString.JOBS_SCREEN)
    //     setloading(false)
    //   }
    // }).catch(err => { return err; });

  }


  const makeSlideOutTranslation = (translationType, fromValue) => {
    return {
      from: {
        [translationType]: SCREEN_WIDTH * -0.18
      },
      to: {
        [translationType]: fromValue
      }
    };
  }



  return (
    loading === true ? <Spinner style={{ flex: 1, height: windowHeight }} /> :
      <QRCodeScanner
        showMarker
        onRead={e => {  (user?.user?.role === 0 || user?.user?.role === 4) ? AdminQRHandler(e) : onSuccess(e) }}
        cameraStyle={{ height: SCREEN_HEIGHT }}
        customMarker={
          <View style={styles.rectangleContainer}>
            <View style={styles.topOverlay}>
              <Text style={{ fontSize: 30, color: "white" }}>
                SCAN QR
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View style={styles.leftAndRightOverlay} />

              <View style={styles.rectangle}>
                {/* <Icon
              name="ios-qr-scanner"
              size={SCREEN_WIDTH * 0.73}
              color={iconScanColor}
            /> */}
                <Animatable.View
                  style={styles.scanBar}
                  direction="alternate-reverse"
                  iterationCount="infinite"
                  duration={1500}
                  easing="linear"
                  animation={makeSlideOutTranslation(
                    "translateY",
                    SCREEN_WIDTH * -0.54
                  )}
                />
              </View>

              <View style={styles.leftAndRightOverlay} />
            </View>

            <View style={styles.bottomOverlay} />
          </View>
        }
      />
  )
}

export default Scan


const styles = {
  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    borderColor: rectBorderColor,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    justifyContent: "center",
    alignItems: "center",

  },

  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    paddingBottom: SCREEN_WIDTH * 0.25,
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
  },

  scanBar: {
    width: '80%',
    height: 1.5,
    backgroundColor: scanBarColor,
    top: '50%',
  }
};
