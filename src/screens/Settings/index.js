import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { colors } from '../../assects/colors';
import fonts from '../../assects/fonts';
import { BriefcaseIcon, CardCalendarIcon, DollorIcon, DoubleBedIcon, LeavesIcon, VmoLogoIcon } from '../../assects/Icons';
import Images from '../../assects/Images';
import { width } from '../../assects/strings';
import CustomHeader from '../../component/CustomHeader';
import routes from '../../routes/routes';
const Settings = ({ navigation }) => {
    const dispatch = useDispatch();
    const mapRef = useRef(null);
    const [checkOutStatus, SetCheckoutStatus] = useState("checkIn")
    
    const [latLng, setLatlng] = useState({ latitude: "22.80071206988097", longitude: "75.90179447125287" })
    const time = moment().subtract(1, 'days').format('hh:mm A')
    const timeWithDay = moment().format('ddd DD MMM YYYY')




    const cardArray = [{ id: "0", title: "Leave Approvals", icon: CardCalendarIcon, progress: "", image: Images.dashboard_cardYellow, request: "10" },
    { id: "1", title: "Job Applicants", icon: BriefcaseIcon, progress: "", image: Images.dashboard_cardGreen, request: "10" },
    { id: "2", title: "Job Applicants", icon: BriefcaseIcon, progress: "", image: Images.dashboard_cardYellow, request: "10" },
    { id: "2", title: "Job Applicants", icon: BriefcaseIcon, progress: "", image: Images.dashboard_cardGreen, request: "10" },

    ]


    const cardArray1 = [{ id: "0", title: "My Leaves", icon: LeavesIcon, progress: "", image: Images.dashboard_cardYellow, request: "10", onPress: () => navigation.navigate(routes.leaveManegmentStack) },
    { id: "1", title: "Dormitory", icon: DoubleBedIcon, progress: "", image: Images.dashboard_cardGreen, request: "10", onPress: () => navigation.navigate(routes.leaveManegmentStack) },
    { id: "2", title: "Payroll", icon: DollorIcon, progress: "", image: Images.dashboard_cardYellow, request: "10", onPress: () => navigation.navigate(routes.leaveManegmentStack) },
    { id: "2", title: "VMO", icon: VmoLogoIcon, progress: "", image: Images.dashboard_cardGreen, request: "10", onPress: () => navigation.navigate(routes.vmoStack) },
    ]



   

    return (
        <SafeAreaView style={{flex:1,alignItems:"center",justifyContent:'center'}} >
            <CustomHeader title={"Settings"} />
            <View style={{flex:1,alignItems:"center",justifyContent:"center"}} >
                <Text style={{color:colors.B212529,fontFamily:fonts.PoppinsBold}} >Under Development</Text>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
    imageView: { width: width / 2, height: width / 2 }
})
export default Settings;