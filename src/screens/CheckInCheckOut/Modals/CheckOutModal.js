import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { colors } from '../../../assects/colors';
import fonts from '../../../assects/fonts';
import { ClockBadgeCheckOutIcon } from '../../../assects/Icons';
import { height, width } from '../../../assects/strings';
import MapComponent from './MapComponent';
import Slider from '../../../component/SliderComponent';

function CheckOutModal({ navigation, visible ,latLng , currentRegion ,onEndReachedCheckOut,onClose,locationName}) {
    const dispatch = useDispatch();

    return (
        <Modal animationType="slide" visible={visible} transparent={true} >
                <View onPress={onClose}  style={{ flex: 1, alignItems: "center", justifyContent: "flex-end", paddingBottom: 20, backgroundColor: '#00000099' }} >
                    <TouchableOpacity onPress={onClose} style={{flex:1,width:width}} >

                    </TouchableOpacity>
                    <View style={{ borderRadius: 10, overflow: "hidden" }} >
                        <View style={{ alignSelf: "center",marginTop:height/2.25,  position: "absolute", zIndex: 10 }} >
                            <Slider
                                childrenContainer={{ backgroundColor: colors.C4C4C4 }}
                                isLeftToRight={false}
                                onEndReached={onEndReachedCheckOut}
                                isOpacityChangeOnSlide={false}
                                containerStyle={{
                                    width: width / 1.20, height: width / 6.25, justifyContent: "center", paddingHorizontal: 6, backgroundColor: colors.primaryColor, borderRadius: 100, borderWidth: 1, borderColor: colors.white
                                }}
                                thumbElement={
                                    <View style={{ width: width / 8, height: width / 8, alignItems: "center", justifyContent: "center", backgroundColor: colors.white, borderColor: colors.primaryColor, borderWidth: 1, borderRadius: 100 }} >
                                        <ClockBadgeCheckOutIcon width={width / 10} height={width / 10} />
                                    </View>
                                }
                            >
                                <View style={{ flexDirection: "row" }} >
                                    {/* <Text style={{ color: colors.white, fontFamily: fonts.PoppinsMedium, backgroundColor: colors.primaryColor, paddingRight: 10 }} >{'08:00:00'}</Text> */}
                                    <Text style={{ color: colors.white, fontFamily: fonts.PoppinsMedium, backgroundColor: colors.primaryColor, paddingRight: 25 }} >{'Slide to Clock Out'}</Text>
                                </View>
                            </Slider>
                        </View>
                        {latLng ?  <MapComponent locationName={locationName} latLng={latLng} currentRegion={currentRegion} /> : null}
                    </View>
                </View>
            </Modal>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
    imageView: { width: width / 2, height: width / 2 },
    modalContainer: { flex: 1, alignItems: "center", justifyContent: "flex-end", paddingBottom: 20, backgroundColor: '#00000099' },
    dataContainer: { width: width / 1.10, height: width / 4, marginBottom: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", backgroundColor: colors.white, borderRadius: 10 },
    text: { fontFamily: fonts.PoppinsRegular, color: colors.black }
})
export default CheckOutModal;