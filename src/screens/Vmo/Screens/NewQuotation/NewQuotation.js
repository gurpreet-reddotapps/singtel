import { View, Text, SafeAreaView, StyleSheet, Platform, KeyboardAvoidingView, ScrollView, Pressable, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import VMOCustomHeader from '../../Components/VMOCustomHeader'
import QuoteMaterial from './QuoteMaterial'
import fonts from '../../../../assects/fonts'
import FormInput from '../../Components/FormInput'
import { Colors } from '../../Constant/Colors'
import { useSelector, useDispatch } from 'react-redux';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import RNPickerSelect from 'react-native-picker-select';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { FetchEstimateMaterailAPI, NewQuotationAPI } from '../../api';
import { ShowErrorMessage, ShowSuccessMessage } from '../../../../component';
import NavigationString from '../../routes/NavigationString';
import { windowHeight, windowWidth } from '../../utils/Dimension';
import CustomButton from '../../Components/CustomButton';
import Spinner from '../../Components/Spinner';
import { setQuoteApprove } from '../../../../redux/actions/Job';


const NewQuotation = () => {

  const { orderId } = useSelector(state => state.JobDetails);

  const [estimateMaterial, setEstimateMaterial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [labourDays, setLabourDays] = useState(null);
  const [labourCost, setLabourCost] = useState(0);
  const [discountVal, setDiscountVal] = useState(0);
  const [discountType, setDiscountType] = useState(null);
  const [dataArray, setDataArray] = useState([]);
  const [remark, setRemark] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [totalPrice, setTotalPrice] = useState();
  const [checkedIndicate, setcheckedIndicate] = useState(true);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const showStartDatePicker = () => {
    setDatePickerVisibility(true);
    setStartDate(null)
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handelStartPicker = (date) => {
    console.log("A date has been picked: ", date);
    ShowSuccessMessage(`A date has been picked:${date} `)
    hideDatePicker();
    setStartDate(moment(date).format('YYYY-MM-DD'))
  };

  const DISCOUNT_TYPES = [
    { label: 'Amount', value: 'Amount', key: 0 },
    { label: "Percentage", value: "Percentage", key: 1 },
  ];

  const scrollViewRef = useRef();

  const fillDetailSection = () => {
    scrollViewRef.current.scrollToEnd({ animated: true })
    console.log("True");
  }

  const LoadData = async () => {
    let data = {
      order_id: orderId,
    }

    FetchEstimateMaterailAPI(data).then(async (res) => {
      console.log(res?.data?.materials, "HERE IS ESTIMATE MATERAIL !!!!!!!!!!!!");
      const newdata = [];
      await res?.data && res?.data?.materials && res?.data?.materials.map(item => {
        const obj = {
          material_type: item.material_type,
          product_id: item.product_id,
          product_name: item.product_name,
          price: item.price,
          selling_price: item.selling_price,
          quantity: item.quantity,
          amount: item.amount,
          status: item.status,
          created_by: item.created_by,
          time: item.time,
          is_selected: true,
          remark: "",
        }

        newdata.push(obj)

      })
      setEstimateMaterial(newdata)
      console.log('newdata', newdata);
      setLoading(false)

    }).catch(err => { return err; });

  };

  useEffect(() => {
    onlyMaterialPrice()
  }, [loading])

  const onlyMaterialPrice = () => {

    let priceInclude = estimateMaterial.filter(item => item.is_selected === true);

    const sum = priceInclude.reduce((a, b) => a + (b["amount"] || 0), 0)
    console.log(sum, "!!!!!!!!!!!!!!!!!!!!!");
    setTotalPrice(sum)
  }



  const DynamicPrice = () => {

    // const LABOUR_COST = labourCost == undefined ? quotes?.labour_price : labourCost == undefined ? 0 : labourCost;
    // const LABOUR_DAYS = labourDays == undefined ? quotes?.labour_days : labourDays == undefined ? 0 : labourDays;



    let priceInclude = estimateMaterial.filter(item => item.is_selected === true);
    console.log(priceInclude, "Filter is this at current time");

    const sum = priceInclude.reduce((a, b) => a + (b["amount"] || 0), 0)

    console.log(sum, "dynamic");



    const PRICE = (labourCost * labourDays) + sum;

    // const PRICE = (LABOUR_COST * LABOUR_DAYS) + sum;


    let TOTAL_PRICE = null;

    if (discountType === "Percentage") {

      const AMOUNT_PERCENTAGE = (PRICE / 100) * discountVal;
      console.log(AMOUNT_PERCENTAGE, "AMOUNT OF THE PERCETAGE");

      TOTAL_PRICE = PRICE - AMOUNT_PERCENTAGE;
      console.log(TOTAL_PRICE, "TOTAL PRICE");
    } else {
      TOTAL_PRICE = PRICE - discountVal;
      console.log(TOTAL_PRICE, "TOTAL PRICE");
    }

    setTotalPrice(TOTAL_PRICE)

  }

  useEffect(() => {
    LoadData();
  }, []);

  useEffect(() => {
    console.log("Check INdicate");
    DynamicPrice()
  }, [checkedIndicate]);

  useEffect(() => {
    DynamicPrice()
  }, [labourCost]);

  useEffect(() => {
    DynamicPrice()
  }, [labourDays]);

  useEffect(() => {
    DynamicPrice()
  }, [discountVal]);

  useEffect(() => {
    DynamicPrice()
  }, [discountType]);


  const newQuoteAdd = (index, bool_val) => {
    console.log(`The Index is ${index} and the value is ${bool_val}`);
    const arr = [...estimateMaterial];
    const obj = arr[index];
    obj.is_selected = bool_val;
    arr.splice(index, 1, obj);
    setEstimateMaterial(arr);
    console.log(arr, "Arr<--------")
    console.log(obj, "<--------")
    DynamicPrice()
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

const checkLog = () => {
  console.log("is it One Tap");
}


  const NewData = async () => {
    setLoading(true)

    let priceInclude = estimateMaterial.filter(item => item.is_selected === true);

    const sum = priceInclude.reduce((a, b) => a + (b["amount"] || 0), 0)
    
    console.log(priceInclude, "Filter is this");

    console.log(discountType, "IS THE BASE");
    console.log(sum, "tfsyegvhbdn");



    const PRICE = (parseInt(labourCost) * labourDays) + sum;
    console.log(PRICE, "no Discount");

    let TOTAL_PRICE = null;

    if (discountType === "Percentage") {

      const AMOUNT_PERCENTAGE = (PRICE / 100) * discountVal;
      console.log(AMOUNT_PERCENTAGE, "AMOUNT OF THE PERCETAGE");

      TOTAL_PRICE = PRICE - AMOUNT_PERCENTAGE;
      setTotalPrice(TOTAL_PRICE)
      console.log(TOTAL_PRICE, "TOTAL PRICE");
    } else {
      TOTAL_PRICE = PRICE - discountVal;
      setTotalPrice(TOTAL_PRICE)
      console.log(TOTAL_PRICE, "TOTAL PRICE");
    }


    if (labourDays == undefined || labourCost == undefined || discountType == undefined || discountVal == undefined || startDate == undefined || TOTAL_PRICE == undefined || remark == undefined || estimateMaterial == undefined) {
      console.log(TOTAL_PRICE, "TOTAL_PRICE");
      ShowErrorMessage("Please Fill all the detail")
      return -1
    } else {

      // setLoading(true)

      let data = {
        order_id: orderId,
        labour_days: parseInt(labourDays),
        labour_price: parseInt(labourCost),
        discount_type: discountType,
        discount_amount: parseInt(discountVal),
        discount: parseInt(discountVal),
        date: startDate,
        price: TOTAL_PRICE,
        remark: remark,
        quote_materials: estimateMaterial,

      }
      console.log(data, "SHOW IT");
      NewQuotationAPI(data).then((res) => {
        console.log("New Quote Data :", res?.data);
        if (res?.data?.success === true) {
          ShowSuccessMessage("New Quotation Created")
          navigation.navigate(NavigationString.QUATATION_LIST)
          dispatch(setQuoteApprove(true))
          setLoading(false)
        }

      }).catch(err => {
        ShowErrorMessage("New Quotation Not Updated"); setLoading(false); return err;
      });
    }
  };


  return (
    <>
      <SafeAreaView style={styles.NewQuoteWrapper} s >
        <VMOCustomHeader title={"New Quotation"} backIcon />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
          style={styles.container}
        >
          {loading === true ? <Spinner style={{ height: windowHeight }} /> :
            <ScrollView  keyboardShouldPersistTaps="handled" style={styles.scrollViewStyle} ref={scrollViewRef} onContentSizeChange={() => fillDetailSection}>

              <View style={styles.NewQuoteView} >
                {estimateMaterial.map((item, key) => {
                  return (
                    <>
                      <QuoteMaterial item={item} index={key}
                        reciveTheindexVal={newQuoteAdd}
                        checkedIndicate={checkedIndicate}
                        setcheckedIndicate={setcheckedIndicate}
                        reciveTheremarkAndIndex={addRemarkinObj}
                      />
                    </>
                  )
                })
                }
              </View>
              <View style={styles.bottomView} >
                <Text style={styles.TextHeading} >Fill in other details</Text>
                <Pressable style={{ backgroundColor: '#FFFFFF' }} onPress={showStartDatePicker}
                >
                  <FormInput
                    editable={false}
                    iconType="calendar"
                    changedText={text => setStartDate(text)}
                    InputSubject="Service Start Date"
                    autoCapitalize="none"
                    autoCorrect={false}
                    headingTextColor={'#000'}
                    fontsize={16}
                  >
                    {startDate}
                  </FormInput>
                </Pressable>

                <Text style={styles.TextColor} >Labour Days</Text>
                <TextInput
                  style={styles.TextInputStyles}
                  placeholder="Enter the number"
                  onChangeText={text => setLabourDays(text)}
                  autoCorrect={false}
                  keyboardType='numeric'
                  // editable={!disableEdit}
                  autoCapitalize="none"
                >
                </TextInput>

                <Text style={styles.TextColor} >Labour Cost</Text>
                <TextInput
                  style={styles.TextInputStyles}
                  placeholder="Enter the number"
                  onChangeText={text => setLabourCost(text)}
                  autoCorrect={false}
                  keyboardType='numeric'
                  // editable={!disableEdit}
                  autoCapitalize="none"
                >
                </TextInput>

                <Text style={styles.TextColor} >Discount Type</Text>
                <RNPickerSelect
                  useNativeAndroidPickerStyle={false}
                  style={pickerSelectStyles}
                  onValueChange={(itemVal) => {
                    setDiscountType(itemVal)
                  }}
                  items={DISCOUNT_TYPES}
                />
                <Text style={styles.TextColor} >Discount</Text>
                <TextInput
                  style={styles.TextInputStyles}
                  placeholder="Enter the number"
                  onChangeText={text => setDiscountVal(text)}
                  autoCorrect={false}
                  keyboardType='numeric'
                  // editable={!disableEdit}
                  autoCapitalize="none"
                >
                </TextInput>

                <Text style={styles.TextColor} >Reamrk</Text>
                {
                  Platform.OS === 'ios' ?
                    <TextInput
                      style={styles.iOSTextInput}
                      editable={true}
                      multiline={true}
                      numberOfLines={5}
                      placeholderTextColor="#979797"
                      placeholder="Write in brief about accessories,warning lights on etc."
                      onChangeText={(remark) => setRemark(remark)}
                      backgroundColor="#fff"
                    >
                    </TextInput>
                    :
                    <TextInput
                      editable={true}
                      multiline={true}
                      style={[styles.TextInputStyles, { height: windowHeight / 5, textAlignVertical: 'top', }]}
                      numberOfLines={15}
                      placeholderTextColor="#979797"
                      placeholder="Write in brief about accessories,warning lights on etc."
                      onChangeText={(remark) => setRemark(remark)}
                      backgroundColor="#fff">
                    </TextInput>
                }

                <View style={styles.Priceview} >
                  <Text style={styles.TotalAmount} >Total Quote Amount </Text>
                  <Text style={styles.amountVal} >SGD {totalPrice}</Text>
                </View>
                <CustomButton title={"Save"} onPress={NewData} style={{ width: "100%", marginBottom: 20 }} />
              </View>
            </ScrollView>
          }
        </KeyboardAvoidingView>
        {loading === true ? null :
          <TouchableOpacity style={styles.ScrollToEndTouchable} activeOpacity={0.6} onPress={fillDetailSection} >
            <Text style={styles.HoverText} >
              Fill in other details
            </Text>
            <AntIcon name="arrowdown" size={20} color={Colors.Pure_White} />
          </TouchableOpacity>
        }
      </SafeAreaView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        minimumDate={new Date()}
        onConfirm={handelStartPicker}
        onCancel={hideDatePicker}
      />
    </>
  )
}

export default NewQuotation

const styles = StyleSheet.create({
  NewQuoteWrapper: {
    flex: 1,
    backgroundColor: Colors.Pure_White,
  },
  scrollViewStyle: {
    marginBottom: 10,
  },
  NewQuoteView: {
    paddingBottom: '10%',
  },
  bottomView: {
    flex: 1,
    paddingHorizontal: '5%',
    paddingBottom: 50,
  },
  TextHeading: {
    fontSize: 16,
    fontFamily: fonts.PoppinsMedium,
    lineHeight: 25,
  },
  TextHeading: {
    fontSize: 16,
    fontFamily: fonts.PoppinsMedium,
    lineHeight: 25,
  },
  Priceview: {
    height: 100,
    width: '50%',
    paddingVertical: 10,
  },
  TotalAmount: {
    color: 'rgba(33, 37, 41, 0.6)',
    fontFamily: fonts.PoppinsRegular,
    paddingVertical: 5,
    fontSize: 14,
    lineHeight: 21,
  },
  amountVal: {
    color: Colors.primary_Blue,
    fontFamily: fonts.PoppinsMedium,
    fontSize: 14,
    lineHeight: 21,

  },
  HoverText: {
    color: '#FFFFFF',
    fontFamily: fonts.PoppinsMedium,
    fontSize: 14,
  },
  ScrollToEndTouchable: {
    backgroundColor: Colors.primary_Blue,
    borderRadius: 20,
    paddingVertical: 5,
    width: windowWidth / 2,
    paddingHorizontal: 20,
    position: "absolute",
    alignSelf: "center",
    bottom: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: 'center',
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
  },
  iOSTextInput: {
    backgroundColor: "#fff",
    padding: 5,
    width: "100%",
    height: 100,
    color: "#979797",
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    fontSize: 16,
    marginTop: 10,
    shadowOpacity: 0.5,
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 20,
    shadowOpacity: 0.25,
  },

})



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