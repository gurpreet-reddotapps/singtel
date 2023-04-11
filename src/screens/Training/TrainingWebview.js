import React, { useEffect, useRef, useState } from 'react'
import { Text, View, NativeModules, StatusBar, Platform, ToastAndroid } from 'react-native'
import WebView from 'react-native-webview'
import { generatePaySlip } from '../../api'
import { colors } from '../../assects/colors'
import { BASE_URL, width } from '../../assects/strings'
import { LoaderComponet } from '../../component'
import CustomHeader from '../../component/CustomHeader'
import Pdf from 'react-native-pdf';
import { ArrowDownIcon } from '../../assects/Icons'
import Icon from 'react-native-vector-icons/Ionicons'
import RNFetchBlob from "react-native-blob-util";
import { useSelector } from 'react-redux'

function TrainingWebview({ navigation, route }) {
    const [isLoading, setLoading] = useState(false);
    const { user, is_checked_in } = useSelector(state => state.userDetails);

    const webViewRef = useRef();

    function downloadImage() {
        if (Platform.OS == "android") {
            var date = new Date();
            var image_URL = route?.params?.url;
            var ext = getExtention(image_URL);
            ext = "." + ext[0];
            const { config, fs } = RNFetchBlob;
            let PictureDir = fs.dirs.PictureDir
            let options = {
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    path: PictureDir + "/image_" + Math.floor(date.getTime()
                        + date.getSeconds() / 2) + ext,
                    description: 'Image'
                },
            }
            config(options).fetch('GET', image_URL).then((res) => {
                ToastAndroid.show("Image Downloaded Successfully.", ToastAndroid.LONG);
            });
        }
        else {

        }
    }
    function getExtention(filename) {
        return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) :
            undefined;
    }



console.log("SHJKS",`https://mobile-training-singtel.reddotapps.com.sg?token=`+user?.token?.token+"&user_id="+user?.user?.id)
  

    return (
        <View style={{ flex: 1 }} >
            <CustomHeader
                title={"Training"}
                backIcon
            />
            <WebView
             
                fadeInDuration={250.0}
                style={{ flex: 1 }}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
                source={{
                  uri: `https://mobile-training-singtel.reddotapps.com.sg?token=`+user?.token?.token+"&user_id="+user?.user?.id
                }}

                // source={{ uri: "https://training-internal-cmpl.reddotapps.com.sg" }}
            />


            <LoaderComponet visible={isLoading} />
        </View>
    )
}
export default TrainingWebview;