import React, { useEffect, useState } from 'react'
import { Text, View, NativeModules, StatusBar, Platform, ToastAndroid, Alert } from 'react-native'
import WebView from 'react-native-webview'
import { generatePaySlip } from '../../api'
import { colors } from '../../assects/colors'
import { BASE_URL, width } from '../../assects/strings'
import { LoaderComponet, ShowSuccessMessage } from '../../component'
import CustomHeader from '../../component/CustomHeader'
import Pdf from 'react-native-pdf';
import { ArrowDownIcon } from '../../assects/Icons'
import Icon from 'react-native-vector-icons/Ionicons'
import RNFetchBlob from "react-native-blob-util";
import CameraRoll from "@react-native-community/cameraroll";
function WebViewScreen({ navigation, route }) {
    const [isLoading, setLoading] = useState(false);

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
                ShowSuccessMessage("Image Downloaded Successfully.")
            });
        }
        else{
                var date = new Date();
                const { config, fs } = RNFetchBlob;
                            RNFetchBlob
                    .config({
                        fileCache: true,
                        appendExt: ".pdf",
                        path:fs.dirs.DocumentDir + "/image_" + Math.floor(date.getTime()
                        + date.getSeconds() / 2) + ".pdf"
                        //get the file's extension from the URL it's coming from and append to the file name that RNFectchBlob will create locally
                    })
                    .fetch('GET', route?.params?.url) //GET request to URL which has your file
                    .then((res) => {
                        console.log("ugyjgjhghjghjggh",res.path())
                    //var 'file' is the temp object which contains all data from our file
                        CameraRoll.save("file://"+res.path(),{type:"auto"})
                .then(Alert.alert("Done!", "Your file has been saved."))
                console.log("vgfhgvhjvhghjgjhgjhgjhgjhgjhgjh","file://"+res.path())
                    })

            //   CameraRoll.save("test",{type:"auto",album:route?.params?.url}).then((res)=>{
            //     console.log("bhjghjghjgh",res)
            //   })
            //   ShowSuccessMessage("Image Downloaded Successfully.")
        }
    }


    function getExtention(filename) {
        return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) :
            undefined;
    }


    return (
        <View style={{ flex: 1 }} >
            <CustomHeader
                title={"Salary slip"}
                backIcon
                RightIcon={<Icon name='download' size={25} color={colors.white} />}
                onRightIconPress={() => downloadImage()}
            />
            
           <Pdf
                trustAllCerts={false}

                onError={(error) => { console.log(error); }}
                style={{ flex: 1, backgroundColor: colors.white }}
                source={{ uri: route?.params?.url }}
            />
                {/* :
                <WebView
                    // fadeInDuration={250.0}
                    style={{ flex: 1 }}
                    onLoadStart={() => setLoading(true)}
                    onLoadEnd={() => setLoading(false)}
                    source={{ uri: route?.params?.url }}

                />
            } */}

            <LoaderComponet visible={isLoading} />
        </View>
    )
}
export default WebViewScreen;