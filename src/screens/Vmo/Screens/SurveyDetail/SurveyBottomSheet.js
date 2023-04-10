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
import { DeleteCustomerQuoteAPI, DeleteSurveyReportAPI, PDF_Link } from '../../api'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { ShowSuccessMessage } from '../../../../component'
import { setQuotatioId } from '../../../../redux/actions/Quotation'
import NavigationString from '../../routes/NavigationString'
import ApproveSurveyDetail from './ApproveSurveyDetail'



const SurveyBottomSheet = (props) => {
    const [deleted, setDeleted] = useState(false);
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const refRBSheet = useRef();

    const onPressHandler = async () => {
        navigation.navigate(NavigationString.EDIT_SURVEY_DETAIL, { item : props?.item})
    }

    const aprroveQuotation = async () => {
        navigation.navigate(NavigationString.APPROVE_SURVEY_DETAIL, { surveyorID: props?.id })
    }

    const alertOnPress = (val) => {
        Alert.alert('Delete Item', 'Choose an option', [
            { text: 'Delete', onPress: () => sendIdForDeltion(val) },
            { text: 'Cancel', onPress: () => { } },
        ]);
    }


    const sendIdForDeltion = async (surveyID) => {
        console.log("Delete this", surveyID);


        let data = {
            survey_id: surveyID,
        }
        DeleteSurveyReportAPI(data).then((res) => {
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
            {props?.item?.status === 0 ?
                <View style={styles.TrashView} >
                    <Pressable style={styles.TileView} onPress={() => aprroveQuotation()} >
                        <View style={styles.IconArea} >
                            <ApproveIcon width={windowWidth / 20} height={windowHeight / 20} />
                        </View>
                        <Text style={styles.TileText} >Approve</Text>
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
                <View style={styles.TrashView} >
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
            }
        </>
    )
}

export default SurveyBottomSheet


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