import { View, Text, StatusBar, StyleSheet, SafeAreaView, FlatList, Pressable, ImageBackground, Image, Alert, Platform } from 'react-native'
import React, { useState, useRef } from 'react'
import fonts from '../../../../assects/fonts'
import { Colors } from '../../Constant/Colors'
import Images from '../../assets/Images'
import { Checkbox } from 'react-native-paper';
import RBSheet from "react-native-raw-bottom-sheet";
import BottomSheet from '../../Components/BottomSheet'
import RemarkBottomSheet from './RemarkBottomSheet'
import { TextInput } from 'react-native-gesture-handler'


const QuoteMaterial = (props) => {
    const [checked, setChecked] = useState(props?.item?.is_selected);
    const refRBSheet = useRef();

    const alertOnPress = () => {
        Alert.alert('Edit the remark', 'Choose an option', [
            { text: 'Edit Remark', onPress: () => { refRBSheet.current.open() } },
            { text: 'Cancel', onPress: () => { } },
        ]);
    }

    const sendIdWithCheck = async (val) => {
        console.log("Material Item ID :-", val);
        setChecked(!checked);
        props.reciveTheindexVal(val, !checked)
        props.setcheckedIndicate(!props.checkedIndicate)
    }

    const reamrkwithId = async (remarkVal) => {
        console.log("Material Item Remark in the center :-", remarkVal);
        console.log("Material Item Remark in the center :-", props.index);
        props.reciveTheremarkAndIndex(remarkVal, props.index)
    }
    return (
        <>
            <Pressable style={styles.FuelCardAreaNNT}  >
                <ImageBackground
                    source={Images.darkBlue}
                    style={[styles.UpperCardArea, { backgroundColor: '#2672AB' }]} >
                    {props?.item?.product_image ?
                        <View style={styles.EngineImageView} >
                            <Image style={styles.EngineImage} source={{ uri: props?.item?.product_image }} />
                            <Text style={styles.CardHeading} >{props?.item?.product_name}</Text>
                        </View>
                        :
                        <View style={styles.EngineImageView} >
                            <Text style={styles.CardHeading} >{props?.item?.product_name}</Text>
                        </View>
                    }
                    {Platform.OS === 'ios' ?

                        <View style={styles.CheckBoxView}>
                            <Checkbox.Android
                                status={checked == true ? 'checked' : 'unchecked'}
                                color="#FFFFFF"
                                onPress={() => sendIdWithCheck(props.index)}
                            />
                        </View>
                        :
                        <Checkbox.Android
                            status={checked == true ? 'checked' : 'unchecked'}
                            color="#FFFFFF"
                            onPress={() => sendIdWithCheck(props.index)}
                        />
                    }
                </ImageBackground>
                <View style={styles.CardWrapper} >
                    <View style={styles.JobDetails}>
                        <View style={styles.JobDate}>
                            <View style={styles.StartDate}>
                                <View style={styles.UpperText}>
                                    <Text style={styles.cardTextGrey}>Remark</Text>
                                    <Pressable onPress={() => alertOnPress()} >
                                        <TextInput  placeholderTextColor="rgba(33, 37, 41, 0.6)" placeholder='Enter Remark' editable={false} style={[styles.StatusText, { color: '#F0A500' }]} >{props?.item?.remark}</TextInput>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.threeItem} >
                        <View style={styles.JobDetails}>
                            <View style={styles.JobDate}>
                                <View style={styles.UpperText}>
                                    <Text style={styles.cardTextGrey}>Unit Price</Text>
                                    <Text style={styles.cardTextBlack}>${props?.item?.price}</Text>
                                </View>
                            </View>
                            <View style={styles.JobDate}>
                                <View style={styles.UpperText}>
                                    <Text style={styles.cardTextGrey}>Quantity</Text>
                                    <Text style={styles.CenterCardTextBlack} >{props?.item?.quantity}</Text>
                                </View>
                            </View>
                            <View style={styles.JobDate}>
                                <View style={styles.UpperText}>
                                    <Text style={styles.cardTextGrey}>Amount</Text>
                                    <Text style={styles.cardTextBlack}>${props?.item?.amount}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Pressable>
            <RBSheet
                ref={refRBSheet}
                height={400}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(32, 32, 32, 0.5)'

                    },
                    draggableIcon: {
                        backgroundColor: "#DADCE5",
                        width: 100,
                    }
                }}
            >
                <BottomSheet
                    Heading={props?.item?.product_name}
                    children={
                        <>
                            <RemarkBottomSheet CloseIT={() => refRBSheet.current.close()}
                                reamrkwithId={reamrkwithId} />
                        </>
                    }
                />
            </RBSheet>
        </>
    )
}

export default QuoteMaterial

const styles = StyleSheet.create({
    UpperCardArea: {
        backgroundColor: '#FFA600',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '5%',
        paddingVertical: '4%',
    },
    CardHeading: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: fonts.PoppinsSemiBold,
        color: Colors.Pure_White,
        lineHeight: 19,
    },
    FuelCardAreaNNT: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        margin: 15,
        overflow: "hidden",
        shadowColor: '#777777',
        shadowOpacity: 0.5,
        elevation: 8,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 50,
        shadowOpacity: 0.25,
    },
    MarginPaddingView: {
        paddingHorizontal: 10,
    },
    EngineImageView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '80%'
    },
    CheckBoxView: {
        width: '20%'
    },
    EngineImage: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    CardWrapper: {
    },
    threeItem: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    JobDetails: {
        flexDirection: 'row',
        width: "100%",
        justifyContent: "space-between",
        alignItems: 'center',
        padding: 5,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingVertical: '2%',
        paddingHorizontal: '5%',
    },
    JobDate: {
        justifyContent: "space-between",
    },
    StartDate: {
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    UpperText: {
        padding: 5,
    },
    cardTextGrey: {
        fontSize: 12,
        lineHeight: 16,
        color: 'rgba(33, 37, 41, 0.6)',
        fontWeight: '400',
        fontFamily: fonts.PoppinsMedium,
    },
    cardTextBlack: {
        fontSize: 14,
        lineHeight: 16,
        fontFamily: fonts.PoppinsMedium,
        color: '#000',
        marginVertical: 8,
    },
    CenterCardTextBlack: {
        fontSize: 14,
        lineHeight: 16,
        justifyContent: "center",
        fontFamily: fonts.PoppinsMedium,
        textAlign: 'center',
        color: '#000',
        marginVertical: 8,

    },
    FuelCardText: {
        fontSize: 13,
        lineHeight: 20,
        fontFamily: fonts.PoppinsMedium,
        color: '#000',

    },
    StatusText: {
        fontSize: 14,
        fontFamily: fonts.PoppinsMedium,
        lineHeight: 20,
        padding: 0,
        minWidth: '50%',
    },
    //Bottomsheet
    RowItem: {
        flexDirection: "row",
        textAlign: "center",
        justifyContent: "space-between",
        padding: 10,
    },
    PopUpHeading: {
        fontSize: 16,
        color: "#000",
        fontFamily: fonts.PoppinsMedium,
        paddingLeft: 10,
    },
    PopUpBottomLine: {
        minWidth: "100%",
        backgroundColor: "#ddd",
        padding: 1,
    },
    TrashView: {
        width: '100%',
        height: '100%',
        padding: '2%',
        // backgroundColor: 'red',
    },
    TileView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'pink',
        paddingVertical: 10,
    },
    TileText: {
        fontSize: 16,
        fontFamily: fonts.PoppinsMedium,
        lineHeight: 19,
        color: "#155B9F",
        paddingHorizontal: 10,
        width: '80%',
    },
    IconArea: {
        width: '15%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 5,
    },
    TextColor: {
        fontSize: 15,
        paddingVertical: 5,
        color: '#000',
    },
})