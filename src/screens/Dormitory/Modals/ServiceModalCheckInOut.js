import moment from 'moment';
import React from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../../assects/colors';
import fonts from '../../../assects/fonts';
import { ClockBadgeCheckmarkIcon, ClockBadgeCheckOutIcon } from '../../../assects/Icons';
import { width } from '../../../assects/strings';
import { SuccessIcon } from '../assects/icons';
function ServiceModalCheckInOut({ navigation, visible, onClose, homeData, title }) {
    const dispatch = useDispatch();
    // const { homeData } = useSelector(state =>state.homeDetails);
    const time = moment().subtract(1, 'days').format('hh:mm A')

    return (
        <Modal visible={visible} transparent={true} >
            <TouchableOpacity
                activeOpacity={1}
                onPress={onClose}
                style={styles.modalContainer} >
                <View style={styles.dataContainer} >
                    <View style={{ marginTop: 5,marginLeft:10 }} >
                        <SuccessIcon width={width / 12} height={width / 12} />
                    </View>
                    <Text style={styles.text} >{title}</Text>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
    imageView: { width: width / 2, height: width / 2 },
    modalContainer: { flex: 1, alignItems: "center", justifyContent: "flex-end", paddingBottom: 20, backgroundColor: '#00000099' },
    dataContainer: { width: width / 1.10, height: width / 4, marginBottom: 10, flexDirection: "row", alignItems: "center", justifyContent: "flex-start", backgroundColor: colors.white, borderRadius: 10 },
    text: { fontFamily: fonts.PoppinsRegular, color: colors.black, width: width / 1.30,marginLeft:10 }
})

export default ServiceModalCheckInOut;