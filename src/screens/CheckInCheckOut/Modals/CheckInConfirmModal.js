import moment from 'moment';
import React from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../../assects/colors';
import fonts from '../../../assects/fonts';
import { CheckingreenIcon, CheckoutredIcon, ClockBadgeCheckmarkIcon, ClockBadgeCheckOutIcon, SuccessIcon } from '../../../assects/Icons';
import { height, width } from '../../../assects/strings';
function CheckInConfirmModal({ navigation, visible, onClose, homeData }) {
    const dispatch = useDispatch();
    // const { homeData } = useSelector(state =>state.homeDetails);
    const time = moment().subtract(1, 'days').format('hh:mm A')
    const checkinTime = moment(homeData?.check_in_details?.check_in_time).format("HH:mm") == "Invalid date" ? "-" : moment(homeData?.check_in_details?.check_in_time).format("HH:mm")
    const checkoutTime = moment(homeData?.check_in_details?.check_out_time).format("HH:mm") == "Invalid date" ? "-" : moment(homeData?.check_in_details?.check_out_time).format("HH:mm")
    
    return (
        <Modal visible={visible} transparent={true} >
            <Pressable style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#00000099" }} >
                <View style={{ width: width / 1.20, height: height / 3,flexDirection:"column",justifyContent:"space-between",paddingBottom:20, alignItems: "center", backgroundColor: colors.white, elevation: 5, borderRadius: 15 }} >

                    <SuccessIcon width={width / 3.5} height={width / 3.5} />

                    <View style={{alignItems:"center"}} >
                        <Text style={styles.text} >{!homeData?.is_checked_in != true ? "Your Check in confirmed" : "Your Check out confirmed"}</Text>
                        <Text style={{ fontFamily: fonts.PoppinsMedium, fontSize: 14, color: colors.B212529,marginTop:20 }} >{!homeData?.is_checked_in != true ? "Have a good working day!!" : "Take a good rest!"}</Text>
                    </View>


                    <View style={{ width: width, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }} >
                        <View style={{ flexDirection: "row", alignItems: "flex-start" }} >
                            <View style={{ marginTop: 5 }} >
                                <CheckingreenIcon width={10} height={10} />
                            </View>
                            <View style={{ marginLeft: 10 }} >
                                <Text style={{ color: colors.transBlack, fontSize: 11, fontFamily: fonts.PoppinsMedium }} >Check In</Text>
                                <Text style={{ color: colors.black, fontSize: 12, fontFamily: fonts.PoppinsMedium }} >{checkinTime}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "flex-start" }} >
                            <View style={{ marginTop: 5 }} >
                                <CheckoutredIcon width={10} height={10} />
                            </View>
                            <View style={{ marginLeft: 10 }} >
                                <Text style={{ color: colors.transBlack, fontSize: 11, fontFamily: fonts.PoppinsMedium }} >Check Out</Text>
                                <Text style={{ color: colors.black, fontSize: 12, fontFamily: fonts.PoppinsMedium }} >{checkoutTime}</Text>
                            </View>
                        </View>
                    </View>



                </View>






            </Pressable>
            {/* <TouchableOpacity
                activeOpacity={1}
                onPress={onClose}
                style={styles.modalContainer} >
                <View style={styles.dataContainer} >
                    {homeData?.is_checked_in != true ? <ClockBadgeCheckmarkIcon width={width / 6} height={width / 6} /> : <ClockBadgeCheckOutIcon width={width / 6} height={width / 6} />}
                    <Text style={styles.text} >{homeData?.is_checked_in != true ? "Check-In" : "Check-Out"} Confirmed at {time}.{'\n'}{homeData?.is_checked_in != true ? " Wish you a good day :)" : " Take a good rest :)"}</Text>
                </View>
            </TouchableOpacity> */}
        </Modal>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
    imageView: { width: width / 2, height: width / 2 },
    modalContainer: { flex: 1, alignItems: "center", justifyContent: "flex-end", paddingBottom: 20, backgroundColor: '#00000099' },
    dataContainer: { width: width / 1.10, height: width / 4, marginBottom: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", backgroundColor: colors.white, borderRadius: 10 },
    text: { fontFamily: fonts.PoppinsBold, fontSize: 15, color: colors.black }
})
export default CheckInConfirmModal;