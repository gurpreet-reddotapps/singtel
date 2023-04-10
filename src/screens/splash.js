import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import { colors } from '../assects/colors';
import { BigfootLogoIcon, SplashImageIcon } from '../assects/Icons';
import { width, height } from '../assects/strings';
import translate_strings from '../translator/translate_strings';
import SplashIO from '../assects/Icons/onBoard1.svg';
import fonts from '../assects/fonts';
import routes from '../routes/routes';
import Images from '../assects/Images';
import DeviceInfo from 'react-native-device-info';


const SplashScreen = ({ navigation }) => {
    const [lang, setLang] = useState('sp');
    const [accType, setAccType] = useState("customer");
    const [visible, setVisible] = useState(false);


    return (
        <View style={styles.container} >
            <View style={{ flex: 1 ,alignItems:"center",justifyContent:"center"}} >
                <Image style={{ width: width / 2, height: width / 2, resizeMode: "contain" }} source={Images.logo} />

            </View>
            <Text style={{ color: colors.white,marginBottom:10,fontFamily:fonts.PoppinsMedium,fontSize:13}} ><Text  >App Version :</Text>  {DeviceInfo.getVersion()+" ("+DeviceInfo.getBuildNumber()+")"}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "center" ,backgroundColor:colors.white},
    imageView: { width: width / 1.10, height: width, resizeMode: "contain" },
    bottomLogo: { marginBottom: -width / 3, alignItems: "center" },
    bottomText: { fontFamily: fonts.PoppinsMedium, fontSize: 16, color: colors.black }

})
export default SplashScreen;