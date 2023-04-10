import { View, Text, StatusBar, StyleSheet, SafeAreaView, FlatList, Pressable, ImageBackground, Image, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState, useRef } from 'react';
import VMOCustomHeader from '../../Components/VMOCustomHeader'
import Images from '../../assets/Images';
import fonts from '../../../../assects/fonts';
import { Colors } from '../../Constant/Colors';
import { useSelector, useDispatch } from 'react-redux';
import RBSheet from "react-native-raw-bottom-sheet";

import CustomButton from '../../Components/CustomButton';
import { DeleteEstimateAPI, FetchEstimateMaterailAPI } from '../../api';
import { ShowErrorMessage, ShowSuccessMessage } from '../../../../component';
import { windowHeight, windowWidth } from '../../utils/Dimension';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from '../../Components/BottomSheet';
import { TrashIcon } from '../../assets/Icons';
import DropDown from '../NewOrder/DropDown';
import RNPickerSelect from 'react-native-picker-select';
import NewMateraial from './NewMateraial';
import UpdateMaterial from './UpdateMaterial';
import Spinner from '../../Components/Spinner';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";




const EstimateMaterial = (props) => {
    const { orderId } = useSelector(state => state.JobDetails);

    const [estimateMaterial, setEstimateMaterial] = useState();
    const [estimateProduct, setEstimateProduct] = useState();
    const [indexVal, setIndex] = useState();
    const [itemVal, setItemVal] = useState();
    const [loading, setloading] = useState(true);


    const refRBSheet = useRef();
    const NewMaterialSheet = useRef();
    const EditMaterialSheet = useRef();

    const LoadData = async (data) => {
        setloading(true)
        FetchEstimateMaterailAPI(data).then((res) => {
            console.log(res?.data, "ALL THE ESTIMATE");
            setEstimateMaterial(res?.data?.materials)
            setEstimateProduct(res?.data?.products)
            setloading(false)
            return res;
        }).catch(err => { return err; });

    };

    useEffect(() => {
        LoadData({
            order_id: orderId,
        });
    }, []);


    const alertOnPress = (val) => {
        Alert.alert('Delete Item', 'Choose an option', [
            { text: 'Delete', onPress: () => deleteThis(indexVal) },
            { text: 'Cancel', onPress: () => { } },
        ]);
    }
    const deleteThis = (indexVal) => {

        let data = {
            order_id: orderId,
            index: indexVal,
        }
        DeleteEstimateAPI(data).then((res) => {
            setEstimateMaterial(res?.data?.materials)
            ShowSuccessMessage("Deleted Successfully")
            return res;
        }).catch(err => { return err; });

    }


    const indexSet = (indexVal, item) => {
        setIndex(indexVal)
        setItemVal(item)
        refRBSheet.current.open()

    }




    const renderItem = ({ item, index }) => (
        <Pressable style={styles.FuelCardAreaNNT} onPress={() => indexSet(index, item)} >
            <ImageBackground
                source={item.status == 1 ? Images.darkGreen : Images.yellowBack}
                style={[styles.UpperCardArea, { backgroundColor: props.ScreenName == "Job Details" ? '#FFA600' : props.ScreenName == "Timeline" ? "#2672AB" : null, }]} >
                {props?.ProductImage ?
                    <View style={styles.EngineImageView} >
                        <Image style={styles.EngineImage} source={{ uri: props.ProductImage }} />
                        <Text style={styles.CardHeading} >{item.product_name}</Text>
                    </View>
                    :
                    <View style={styles.EngineImageView} >
                        <Text style={styles.CardHeading} >{item.product_name}</Text>
                    </View>
                }
            </ImageBackground>
            <View style={styles.CardWrapper} >
                <View style={styles.JobDetails}>
                    <View style={styles.JobDate}>
                        <View style={styles.StartDate}>
                            <View style={styles.UpperText}>
                                <Text style={styles.cardTextGrey}>Status</Text>
                                <Text style={[styles.StatusText, { color: item.status == 1 ? '#27AE60' : '#F0A500', }]} >{item.status == 1 ? "Approved" : "Pending approval"}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.threeItem} >
                    <View style={styles.JobDetails}>
                        <View style={styles.JobDate}>
                            <View style={styles.UpperText}>
                                <Text style={styles.cardTextGrey}>Unit Price</Text>
                                <Text style={styles.cardTextBlack}>${item.price}</Text>
                            </View>
                        </View>
                        <View style={styles.JobDate}>
                            <View style={styles.UpperText}>
                                <Text style={styles.cardTextGrey}>Quantity</Text>
                                <Text style={styles.CenterCardTextBlack} >{item?.quantity}</Text>
                            </View>
                        </View>
                        <View style={styles.JobDate}>
                            <View style={styles.UpperText}>
                                <Text style={styles.cardTextGrey}>Amount</Text>
                                <Text style={styles.cardTextBlack}>${item.amount}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            <RBSheet
                ref={refRBSheet}
                height={windowHeight / 4}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(32, 32, 32, 0.5)'
                    },
                    draggableIcon: {
                        backgroundColor: "#DADCE5",
                        width: 100,
                    },
                    container: {
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                    }

                }}
            >
                <BottomSheet Heading={item.product_name} CloseIT={() => refRBSheet.current.close()} children={
                    <>
                        <View style={styles.TrashView} >
                            <Pressable style={styles.TileView} onPress={() => alertOnPress()} >
                                <View style={styles.IconArea} >
                                    <TrashIcon width={windowWidth / 20} height={windowHeight / 20} />
                                </View>
                                <Text style={styles.TileText} >Delete</Text>
                            </Pressable>
                            <Pressable style={styles.TileView} onPress={() => EditMaterialSheet.current.open()} >
                                <View style={styles.IconArea} >
                                    <MaterialIcon name="circle-edit-outline" size={25} color={Colors.primary_Blue} />
                                </View>
                                <Text style={styles.TileText} >Update</Text>
                            </Pressable>
                        </View>
                    </>
                }
                />
            </RBSheet>

            <RBSheet
                ref={EditMaterialSheet}
                height={windowHeight / 1.7}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(32, 32, 32, 0.5)'
                    },
                    draggableIcon: {
                        backgroundColor: "#DADCE5",
                        width: 100,
                    },
                    container: {
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                    }

                }}
            >
                <BottomSheet Heading={"Edit Material"} CloseIT={() => EditMaterialSheet.current.close()} children={
                    <UpdateMaterial item={itemVal} DropDownData={estimateProduct}
                        closeIt={() => EditMaterialSheet.current.close()}
                        closeOtherSheet={() => refRBSheet.current.close()}
                        indexOfItem={indexVal}
                        renderAddedMaterial={setEstimateMaterial}

                    />
                }
                />
            </RBSheet>

        </Pressable>
    );



    return (
        <SafeAreaView style={styles.MaterialWrapper} >
            <StatusBar barStyle="dark-content" backgroundColor="#155B9F" translucent={false} />
            <VMOCustomHeader title={"Materials"} backIcon />
            {loading == true ?
                <SkeletonPlaceholder>
                    <ScrollView style={styles.ShadowStyle} >
                        <View style={styles.ThirdShadow} />
                        <View style={styles.ThirdShadow} />
                        <View style={styles.ThirdShadow} />
                        <View style={styles.ThirdShadow} />
                        <View style={styles.ThirdShadow} />
                    </ScrollView>
                </SkeletonPlaceholder> :
                <View style={{ flex: 1, paddingBottom: '5%', }} >
                    <FlatList
                        // data={estimateMaterial}
                        data={estimateMaterial}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        ListFooterComponentStyle={{ height: 10 }}
                        ListFooterComponent={<View></View>}
                    />
                    <CustomButton title={"Add new material"} onPress={() => { NewMaterialSheet.current.open() }} />
                </View>
            }
            <RBSheet
                ref={NewMaterialSheet}
                height={windowHeight / 1.6}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(32, 32, 32, 0.5)'
                    },
                    draggableIcon: {
                        backgroundColor: "#DADCE5",
                        width: 100,
                    },
                    container: {
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                    }
                }}
            >
                <BottomSheet Heading={"Add new Material"} CloseIT={() => NewMaterialSheet.current.close()} children={
                    <NewMateraial closeIt={() => NewMaterialSheet.current.close()}
                        renderAddedMaterial={setEstimateMaterial}
                        DropDownData={estimateProduct}
                    />
                }
                />
            </RBSheet>
        </SafeAreaView>

    )
}

export default EstimateMaterial


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 15,
        paddingHorizontal: 10,
        // borderWidth: 1,
        borderRadius: 10,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        backgroundColor: '#fff',
        borderColor: 'rgba(0, 110, 233, 0.2)',
        borderWidth: 1,
        marginBottom: 20,
        shadowColor: 'rgba(0, 110, 233, 0.02)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 8,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 20,
        shadowOpacity: 0.25,


    },

    inputAndroid: {
        fontSize: 14,
        paddingVertical: 0,
        paddingHorizontal: 10,
        borderColor: 'rgba(0, 110, 233, 0.2)',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#fff',
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        marginBottom: 0,
        shadowColor: 'rgba(0, 110, 233, 0.02)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 8,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 20,
        shadowOpacity: 0.25,
        height: 45,
        width: "90%"

    },
});



const styles = StyleSheet.create({
    MaterialWrapper: {
        flex: 1,
    },
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
        fontFamily: fonts.PoppinsRegular,
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
        lineHeight: 20,
        fontFamily: fonts.PoppinsMedium,
        lineHeight: 25,
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
    ShadowStyle: {
        // alignItems: "center",
        width: '90%',
        alignSelf: 'center',
        height: windowHeight,
        paddingHorizontal: 5,
    },
    ThirdShadow: {
        width: '100%',
        marginTop: 20,
        marginBottom: 20,
        marginRight: 20,
        justifyContent: 'flex-end',
        height: 140,
        borderRadius: 10,
    },
})