import { View, Text, Pressable, StyleSheet, Linking, Alert } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import FeIcon from 'react-native-vector-icons/Feather'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import AntIcon from 'react-native-vector-icons/AntDesign'
import BottomSheet from '../../Components/BottomSheet'
import { ApproveIcon, EditIcon, PDFIcon, TrashIcon } from '../../assets/Icons'
import { Colors } from '../../Constant/Colors';
import { windowHeight, windowWidth } from '../../utils/Dimension';
import fonts from '../../../../assects/fonts';
import RBSheet from "react-native-raw-bottom-sheet";
import { DeleteCustomerQuoteAPI, PDF_Link } from '../../api'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { ShowSuccessMessage } from '../../../../component'
import ApproveQuotation from './ApproveQuotation'
import { setQuotatioId } from '../../../../redux/actions/Quotation'
import NavigationString from '../../routes/NavigationString'



const QuoatationBottomSheet = (props) => {
    const [deleted, setDeleted] = useState(false);
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const refRBSheet = useRef();

    const onPressHandler = async () => {
        console.log('Show the Individual Page', props?.id);
        dispatch(setQuotatioId(props?.id))
        if (props?.id !== null) {
            props.closeIt()
            navigation.navigate(NavigationString.QUATATION_DETAIL)
        }
        else {
            showError("No More data found!")
        }
    }

    const aprroveQuotation = async () => {
        // console.log('Approve the Quotation');
        refRBSheet.current.open()
    }

    const openPDF = async () => {
        let data = {
            customer_quote_id: props?.id
        }

        PDF_Link(data).then((res) => {
            console.log(res?.data?.url, "Here is the PDF RESPONSE");
            Linking.openURL(res?.data?.url).catch((err) => {
                console.log(err)
            });

        })

    }

    const alertOnPress = (val) => {
        Alert.alert('Delete Item', 'Choose an option', [
            { text: 'Delete', onPress: () => sendIdForDeltion(val) },
            { text: 'Cancel', onPress: () => { } },
        ]);
    }


    const sendIdForDeltion = async (quoteID) => {
        console.log("Delete this", quoteID);


        let data = {
            customer_quote_id: quoteID,
        }

        DeleteCustomerQuoteAPI(data).then((res) => {
            props.closeIt();
            console.log(res?.data);
            setDeleted(true);
            props.loadData();
            ShowSuccessMessage("Deleted Successfully")
            return res;
        }).catch(err => { return err; });

    }

    useEffect(() => {
        setDeleted(false);
        console.log("useEffect Runed of bottom sheet for delete");
    }, [deleted]);


    return (
        <>
            {props.statusVal == "Pending" ?
                <View style={styles.TrashView} >
                    <Pressable style={styles.TileView} onPress={() => aprroveQuotation()} >
                        <View style={styles.IconArea} >
                            {/* <FeIcon name="check-square" size={25} color={Colors.primary_Blue} /> */}
                            <ApproveIcon width={windowWidth / 20} height={windowHeight / 20} />
                        </View>
                        <Text style={styles.TileText} >Approve</Text>
                    </Pressable>
                    <Pressable style={styles.TileView} onPress={openPDF} >
                        <View style={styles.IconArea} >
                            <PDFIcon width={windowWidth / 20} height={windowHeight / 20} />
                        </View>
                        <Text style={styles.TileText} >View In PDF</Text>
                    </Pressable>
                    <Pressable style={styles.TileView} onPress={() => onPressHandler()} >
                        <View style={styles.IconArea} >
                            <EditIcon width={windowWidth / 20} height={windowHeight / 20} />
                        </View>
                        <Text style={styles.TileText} >Edit</Text>
                    </Pressable>
                    <Pressable style={styles.TileView} onPress={() => alertOnPress(props?.id)} >
                        <View style={styles.IconArea} >
                            <TrashIcon width={windowWidth / 20} height={windowHeight / 20} />
                        </View>
                        <Text style={styles.TileText} >Delete</Text>
                    </Pressable>
                </View>
                :
                <Pressable style={styles.TileView} onPress={openPDF} >
                    <View style={styles.IconArea} >
                        <PDFIcon width={windowWidth / 20} height={windowHeight / 20} />
                    </View>
                    <Text style={styles.TileText} >View In PDF</Text>
                </Pressable>
            }
            <RBSheet
                ref={refRBSheet}
                height={500}
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
                {/* <ApproveQuotation closeIt={() => refRBSheet.current.close()} closeBackBottomSheet={() => props.closeIt()} refreshListData={props.loadData} QuotationID={props.Quote_Id} /> */}
                <BottomSheet
                    Heading={"Approve Quotation"} CloseIT={() => refRBSheet.current.close()} children={
                        <ApproveQuotation closeIt={() => refRBSheet.current.close()}
                            refreshListData={props.loadData}
                            QuotationID={props?.id}
                        />
                    }
                />
            </RBSheet>
        </>
    )
}

export default QuoatationBottomSheet


const styles = StyleSheet.create({
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
    }
})