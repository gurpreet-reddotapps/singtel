import Geolocation from '@react-native-community/geolocation';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, ImageBackground, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeDetails } from '../../api';
import { androidPermission } from '../../appPermission/permissions';
import { colors } from '../../assects/colors';
import fonts from '../../assects/fonts';
import { BigfootLogoIcon, BriefcaseIcon, CardCalendarIcon, DollorIcon, DoubleBedIcon, LeavesIcon, MenuIcon, VmoLogoIcon } from '../../assects/Icons';
import Images from '../../assects/Images';
import { width } from '../../assects/strings';
import Crop from '../../component/CircleImageCropper/crop';
import { GetLocationApi } from '../../component/GetLocation';
import { setHomeData } from '../../redux/actions/Home';
import { saveUserCurrentRegion,saveUserLatLng } from '../../redux/actions/userLocation';
// import Crop from 'react-native-avatar-crop';


import routes from '../../routes/routes';
const Test = ({ navigation }) => {
   
    return (
        <SafeAreaView style={{ flex: 1 }} >
             <Crop
                        source={{ uri: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg" }}
                        width={width/2}
                        height={width/2}
                        backgroundColor={"#ffffff"}
                        opacity={0}

                        cropShape="circle"
                        // resizeMode='contain'
                        cropArea={{ width: width / 2, height: width / 2 }}
                        onCrop={cropCallback => (crop = cropCallback)}
                    />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
    imageView: { width: width / 2, height: width / 2 }
})
export default Test;