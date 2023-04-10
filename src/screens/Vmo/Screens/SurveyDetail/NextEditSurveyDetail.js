import { View, Text, SafeAreaView, StatusBar, ScrollView, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import VMOCustomHeader from '../../Components/VMOCustomHeader'
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { windowHeight, windowWidth } from '../../utils/Dimension'
import fonts from '../../../../assects/fonts'
import { Colors } from '../../Constant/Colors'
import { ShowErrorMessage, ShowSuccessMessage } from '../../../../component'
import FeIcon from 'react-native-vector-icons/Feather'
import CustomButton from '../../Components/CustomButton';
import { EditSurveyDetailAPI, FetchEstimateMaterailAPI, NewSurveyDetailAPI } from '../../api';
import QuoteMaterial from '../NewQuotation/QuoteMaterial';
import { useSelector, useDispatch } from 'react-redux';
import SurveyMaterial from './SurveyMaterial';
import Spinner from '../../Components/Spinner';
import { useNavigation } from '@react-navigation/native';
import NavigationString from '../../routes/NavigationString';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';




const NextEditSurveyDetail = (props) => {
    const { orderId } = useSelector(state => state.JobDetails);

    const [arrayForPicker, setarrayForPicker] = useState();
    const [estimateMaterial, setEstimateMaterial] = useState([]);
    const [reamrk, setreamrk] = useState();
    const [ApprovalAmount, setApprovalAmount] = useState([]);
    const [loading, setLoading] = useState(true);
    const [relaod, setrelaod] = useState(false);
    const [materialDetail, setMaterialDetail] = useState([]);
    const [checkedIndicate, setcheckedIndicate] = useState(true);
    const navigation = useNavigation()

    const { SurveyorID,
        surveyorName,
        company,
        conatcNumber,
        startDate,
        ApprovaalType,
        ApprovalLabourDays,
        item,
    } = props?.route?.params

    console.log(item, "SAY MY NAME");


    const LoadData = async () => {
        setLoading(true)
        console.log(item?.report_data, "HERR");
        setMaterialDetail(JSON.parse(item?.report_data));
        const newdata = [];
        materialDetail.map(item => {
            const obj = {
                material_type: item.material_type,
                product_id: item.product_id,
                product_name: item.product_name,
                price: item.price,
                quantity: item.quantity,
                amount: item.amount,
                status: item.status,
                created_by: item.created_by,
                time: item.time,
                is_selected: item?.is_selected,
                approved_cost: item?.approved_cost,
                remark: item?.remark,
            }
            newdata.push(obj)
        })
        setEstimateMaterial(newdata)
        setrelaod(true)
        setLoading(false)
        // relaod()
    }

    useEffect(() => {
        LoadData();
    }, []);


    useEffect(() => {
        if (relaod == true) {
            LoadData()
            setrelaod(false)
        }
    }, [relaod]);


    const newQuoteAdd = (index, bool_val) => {
        console.log(`The Index is ${index} and the value is ${bool_val}`);
        const arr = [...estimateMaterial];
        const obj = arr[index];
        obj.is_selected = bool_val;
        arr.splice(index, 1, obj);
        setEstimateMaterial(arr);
        console.log(arr, "Arr<--------")
        console.log(obj, "<--------")
    }


    // Updating the Remark Value 
    const addRemarkinObj = (productRemark, index) => {
        console.log(`It is the product Reamrk ${productRemark} with the id ${index}`, "<-------- Product Remark");
        const arr = [...estimateMaterial];
        const obj = arr[index];
        obj.remark = productRemark;
        arr.splice(index, 1, obj);
        setEstimateMaterial(arr);
        console.log(arr, "Arr for remark<--------")
        console.log(obj, " for remark<--------")
    }

    // Updating the Remark Value 
    const addApproveAmount = (approveCost, index) => {
        console.log(`It is the product approved Cost ${approveCost} with the id ${index}`, "<-------- Product Approved Amount");
        const arr = [...estimateMaterial];
        const obj = arr[index];
        obj.approved_cost = parseInt(approveCost);
        arr.splice(index, 1, obj);
        setEstimateMaterial(arr);
        console.log(arr, "Arr for amount<--------")
        console.log(obj, " for amount<--------")
    }



    const SaveNewSurveyDetail = () => {

        let priceInclude = estimateMaterial.filter(item => item.is_selected === true);

        const sum = priceInclude.reduce((a, b) => a + (b["amount"] || 0), 0)

        const ApprovalSum = priceInclude.reduce((a, b) => a + (b["approved_cost"] || 0), 0)

        // console.log(priceInclude, "Filter is this");


        console.log(sum, "SUM");
        console.log(ApprovalSum, "ApprovalSum");
        let ESTIMATE_MATERIAL = JSON.stringify(estimateMaterial)
            TOTAL_APPROVAL_AMOUNT = ApprovalAmount == undefined ? sum : ApprovalAmount;

        let data = {
            approval_labour_days: parseInt(ApprovalLabourDays),
            approval_type: ApprovaalType,
            approved_total: parseInt(TOTAL_APPROVAL_AMOUNT),
            order_id: orderId,
            remarks: reamrk,
            report_data: JSON.stringify(estimateMaterial),
            survey_id: item?.id,
            surveyor_id: SurveyorID,
            surveyor_time: startDate,
        }
        console.log(data, "data");


        if (ApprovaalType == "Lum sum") {
            TOTAL_APPROVAL_AMOUNT = ApprovalAmount == undefined ? sum : ApprovalAmount;

            let data = {
                approval_labour_days: parseInt(ApprovalLabourDays),
                approval_type: ApprovaalType,
                approved_total: TOTAL_APPROVAL_AMOUNT,
                order_id: orderId.toString(),
                remarks: reamrk,
                report_data: JSON.stringify(estimateMaterial),
                survey_id: item?.id,
                surveyor_id: SurveyorID,
                surveyor_time: startDate,
            }
            console.log(data, "data");
            EditSurveyDetailAPI(data).then((res) => {
                console.log(res?.data, "RES OF NEW SUREVEY DETAIL");
                if (res?.data?.success == true) {
                    navigation.navigate(NavigationString.SURVEY_DETAIL)
                }
            }).catch(err => { return err; });
            return 1;
        } else if (ApprovaalType == "Item by item") {
            TOTAL_APPROVAL_AMOUNT = ApprovalSum == 0 ? sum : ApprovalSum;
            let data = {
                approval_labour_days: parseInt(ApprovalLabourDays),
                approval_type: ApprovaalType,
                approved_total: TOTAL_APPROVAL_AMOUNT,
                order_id: orderId.toString(),
                remarks: reamrk,
                report_data: JSON.stringify(estimateMaterial),
                survey_id: item?.id,
                surveyor_id: SurveyorID,
                surveyor_time: startDate,
            }
            console.log(data, "data");
            EditSurveyDetailAPI(data).then((res) => {
                console.log(res?.data, "RES OF NEW SUREVEY DETAIL");
                if (res?.data?.success == true) {
                    navigation.navigate(NavigationString.SURVEY_DETAIL)
                }
            }).catch(err => { console.log(err), "IT IS THE ERROR"; return err; });
            return 1;
        }

    }

    return (
        <SafeAreaView style={styles.NewSurveyDetailWrapper} >
            <StatusBar barStyle="dark-content" backgroundColor="#155B9F" translucent={false} />
            <VMOCustomHeader title={"Edit survey report"} backIcon />
            {loading == true ? <Spinner style={{ height: windowHeight }} /> :
                <ScrollView style={styles.NewSurveyDetailContent} >
                    {
                        ApprovaalType == "Lum sum" ?
                            <Text style={styles.TextColor} >Lump sum survey report</Text>
                            :
                            <Text style={styles.TextColor} >Item by Item Survey Report</Text>

                    }
                    {/* 
                    <Pressable onPress={() => LoadData()} >
                        <Text>Show Cards</Text>
                    </Pressable> */}

                    {estimateMaterial.map((item, key) => {
                        return (
                            <>
                                <SurveyMaterial QuoteMaterial item={item} index={key}
                                    reciveTheindexVal={newQuoteAdd}
                                    setcheckedIndicate={setcheckedIndicate}
                                    reciveTheremarkAndIndex={addRemarkinObj}
                                    addApproveAmount={addApproveAmount}
                                    inputAmount={ApprovaalType}
                                    checkedIndicate={checkedIndicate}
                                />
                            </>
                        )
                    })
                    }

                    {ApprovaalType == "Lum sum" ?

                        <View style={styles.ButtonBottom} >
                            <View>

                                <Text style={styles.TextColor} >Approval Cost</Text>
                                <TextInput
                                    style={styles.TextInputStyles}
                                    placeholder="Enter the number"
                                    onChangeText={text => setApprovalAmount(text)}
                                    autoCorrect={false}
                                    keyboardType="numeric"
                                    autoCapitalize="none"
                                // editable={false}
                                >
                                    {item?.approved_total}
                                </TextInput>

                                <Text style={styles.TextColor} >Remarks</Text>
                                <TextInput
                                    style={styles.TextInputStyles}
                                    placeholder="Enter the number"
                                    onChangeText={text => setreamrk(text)}
                                    autoCorrect={false}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                // editable={false}
                                >
                                    {item?.remarks}
                                </TextInput>
                            </View>

                        </View>
                        :
                        null
                    }

                    <CustomButton title={"Next"} onPress={() => SaveNewSurveyDetail()} style={{ width: '100%', marginBottom: 15, }} />

                </ScrollView>
            }
        </SafeAreaView>
    )
}

export default NextEditSurveyDetail



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
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderColor: 'rgba(0, 110, 233, 0.2)',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#fff',
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
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
});



const styles = StyleSheet.create({
    NewSurveyDetailWrapper: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        height: windowHeight,
    },
    NewSurveyDetailContent: {
        paddingHorizontal: 10,
    },
    ButtonBottom: {
        paddingHorizontal: 15,
        justifyContent: 'space-between',
    },
    TextColor: {
        fontSize: 14,
        paddingVertical: 10,
        color: Colors.primary_Color,
        fontFamily: fonts.PoppinsMedium,
    },
    TextInputStyles: {
        height: 50,
        backgroundColor: '#fff',
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 10,
        color: '#000',
        borderColor: 'rgba(0, 110, 233, 0.2)',
        borderWidth: 1,
        borderRadius: 10,
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

    }
})