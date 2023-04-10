import { View, Text, SafeAreaView, StyleSheet, Platform, KeyboardAvoidingView, ScrollView, Pressable, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import VMOCustomHeader from '../../Components/VMOCustomHeader'
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import NavigationString from '../../routes/NavigationString';
import RNPickerSelect from 'react-native-picker-select';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { FetchSingleQuoteAPI, UpdateQuoteAPI } from '../../api';
import { ShowErrorMessage, ShowSuccessMessage } from '../../../../component';
import { Colors } from '../../Constant/Colors';
import fonts from '../../../../assects/fonts';
import { windowHeight, windowWidth } from '../../utils/Dimension';
import FormInput from '../../Components/FormInput';
import QuoteMaterial from '../NewQuotation/QuoteMaterial';
import CustomButton from '../../Components/CustomButton';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import Spinner from '../../Components/Spinner';



const QuotationDetail = () => {
  const { quotationId } = useSelector(state => state.quotationDetail);

  const { orderId } = useSelector(state => state.JobDetails);
  const [quotes, setQuotes] = useState();
  const [estimateMaterial, setEstimateMaterial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [labourDays, setLabourDays] = useState(quotes?.labour_days);
  const [labourCost, setLabourCost] = useState();
  const [discountVal, setDiscountVal] = useState(null);
  const [showDisType, setshowDisType] = useState(quotes?.discount_type);
  const [materialDetail, setMaterialDetail] = useState([]);
  const [remark, setRemark] = useState();
  const [quotesMaterial, setQuotesMaterial] = useState();
  const [discountType, setDiscountType] = useState();
  const [showQuotationDetail, setShowQuotationDetail] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [totalPrice, setTotalPrice] = useState();
  // Price Calculation State 
  const [checkedIndicate, setcheckedIndicate] = useState(true);

  const scrollViewRef = useRef();
  const navigation = useNavigation();


  const DISCOUNT_TYPES = [
    { label: 'Amount', value: 'Amount', key: 'Amount' },
    { label: "Percentage", value: "Percentage", key: 'Percentage' },
  ];



  useEffect(() => {
    ShowSpecificQuotation()
  }, [estimateMaterial])

  // useEffect(() => {
  //   console.log('Here');
  // }, [])


  const fillDetailSection = () => {
    scrollViewRef.current.scrollToEnd({ animated: true })
    // console.log("True");
  }

  const ShowSpecificQuotation = async () => {

    // console.log(quotationId, "<-----");

    let data = {
      customer_quote_id: quotationId,
    }
    FetchSingleQuoteAPI(data).then((res) => {
      console.log("API Parse QUOTE ----------->", res?.data?.customer_quotes);
      let isMounted = true;
      let CQ = res?.data?.customer_quotes;
      const mat = CQ.quote_materials;
      console.log("Only  Material ----------->", JSON.parse(mat));

      setQuotes(res?.data?.customer_quotes)
      setShowQuotationDetail(true);
      setMaterialDetail(JSON.parse(mat));
      if (loading === true) {
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
            is_selected: item.is_selected,
            remark: item.remark,
          }
          newdata.push(obj)
          setLoading(false);
        })
        setEstimateMaterial(newdata)
      }
      return res;
    }).catch(err => { return err; });

  };


  // Update Material 


  // Updating the selection Value 
  const newQuoteAdd = (index, bool_val) => {
    // console.log(`The Index is ${index} and the value is ${bool_val}`);
    const arr = [...estimateMaterial];
    const obj = arr[index];
    obj.is_selected = bool_val;
    arr.splice(index, 1, obj);
    setEstimateMaterial(arr);

  }


  // Updating the Remark Value 
  const addRemarkinObj = (productRemark, index) => {
    const arr = [...estimateMaterial];
    const obj = arr[index];
    obj.remark = productRemark;
    arr.splice(index, 1, obj);
    setEstimateMaterial(arr);
  }



  const updateQuotation = async () => {
    setLoading(true);
    const LABOUR_COST = labourCost == undefined ? quotes?.labour_price : labourCost == undefined ? 0 : labourCost;
    const LABOUR_DAYS = labourDays == undefined ? quotes?.labour_days : labourDays == undefined ? 0 : labourDays;
    const DISCOUNT_TYPE = discountType == undefined ? quotes?.discount_type : discountType ;
    const DISCOUNT_AMOUNT = discountVal === null ? quotes.discount_amount : discountVal;
    const DISCOUNT = discountVal === null ? quotes.discount : discountVal;
    const REMARK = remark == undefined ? quotes.remark : remark;

    let date = moment(quotes.date).format('YYYY-MM-DD')
    const DATE = startDate === null ? date : startDate;
    let priceInclude = estimateMaterial.filter(item => item.is_selected === true);

    const sum = priceInclude.reduce((a, b) => a + (b["amount"] || 0), 0)


    const PRICE = (LABOUR_COST * LABOUR_DAYS) + sum;

    console.log(PRICE, "no Discount");

    let TOTAL_PRICE = null;

    if (DISCOUNT_TYPE === "Percentage") {

      const AMOUNT_PERCENTAGE = (PRICE / 100) * DISCOUNT_AMOUNT;
      console.log(AMOUNT_PERCENTAGE, "AMOUNT OF THE PERCETAGE");

      TOTAL_PRICE = PRICE - AMOUNT_PERCENTAGE;
      console.log(TOTAL_PRICE, "TOTAL PRICE");
    } else {
      TOTAL_PRICE = PRICE - DISCOUNT_AMOUNT;
      console.log(TOTAL_PRICE, "TOTAL PRICE");
    }


    let data = {
      order_id: orderId,
      customer_quote_id: quotes.id,
      labour_days: LABOUR_DAYS,
      labour_price: LABOUR_COST,
      discount_type: DISCOUNT_TYPE,
      discount_amount: parseInt(DISCOUNT_AMOUNT),
      discount: DISCOUNT,
      date: DATE,
      price: TOTAL_PRICE,
      remark: REMARK,
      quote_materials: estimateMaterial,
    }

    console.log("DISCOUNT_TYPE", data);
    console.log("estimateMaterial", estimateMaterial);

    if (LABOUR_DAYS == undefined || LABOUR_COST == undefined || DISCOUNT_TYPE == undefined || DISCOUNT_AMOUNT == undefined || DATE == undefined || TOTAL_PRICE == undefined || REMARK == undefined || estimateMaterial == undefined) {
      ShowErrorMessage("Please Fill all the detail")
      return -1
    } else {

      let data = {
        order_id: orderId,
        customer_quote_id: quotes.id,
        labour_days: LABOUR_DAYS,
        labour_price: LABOUR_COST,
        discount_type: DISCOUNT_TYPE,
        discount_amount: parseInt(DISCOUNT_AMOUNT),
        discount: DISCOUNT,
        date: DATE,
        price: TOTAL_PRICE,
        remark: REMARK,
        quote_materials: estimateMaterial,
      }

      console.log("DISCOUNT_TYPE", data);
      //API Calling
      UpdateQuoteAPI(data).then((res) => {
        console.log(res, "RES UPDATE");
        console.log(res?.data, "RES UPDATE");
        ShowSuccessMessage("Updated")
        navigation.navigate(NavigationString.QUATATION_LIST)
        setLoading(false);
        return res;
      }).catch(err => { return err; setLoading(false); });
    }
  };


  const DynamicPrice = () => {

    const LABOUR_COST = labourCost == undefined ? quotes?.labour_price : labourCost == undefined ? 0 : labourCost;
    const LABOUR_DAYS = labourDays == undefined ? quotes?.labour_days : labourDays == undefined ? 0 : labourDays;
    const DISCOUNT_TYPE = discountType == undefined ? quotes?.discount_type : discountType;
    const DISCOUNT_AMOUNT = discountVal === null ? quotes?.discount_amount : discountVal;
    console.log(DISCOUNT_TYPE, "DISCOUNT_TYPE HERE");

    let priceInclude = estimateMaterial.filter(item => item.is_selected === true);
    // console.log(priceInclude, "Filter is this at current time");

    const sum = priceInclude.reduce((a, b) => a + (b["amount"] || 0), 0)

    if (LABOUR_COST == undefined || LABOUR_DAYS == undefined) {
      return setTotalPrice(quotes?.price)
    }

    const PRICE = (LABOUR_COST * LABOUR_DAYS) + sum;

    console.log(labourCost, " labourCost");
    console.log(labourDays, " labourDays");
    console.log(quotes?.labour_days, " quotes?.labour_days");
    console.log(quotes?.labour_days, " quotes?.labour_days");
    console.log(LABOUR_DAYS, "LABOUR_DAYS");
    console.log(LABOUR_COST, "LABOUR_COST");
    console.log(PRICE, "PRICE");


    let TOTAL_PRICE = null;

    if (DISCOUNT_TYPE == "Percentage") {

      const AMOUNT_PERCENTAGE = (PRICE / 100) * DISCOUNT_AMOUNT;

      TOTAL_PRICE = PRICE - AMOUNT_PERCENTAGE;
    } else {
      TOTAL_PRICE = PRICE - DISCOUNT_AMOUNT;
    }

    setTotalPrice(TOTAL_PRICE)
  }



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


  //Date Picker

  const showStartDatePicker = () => {
    setDatePickerVisibility(true);
    setStartDate(null)
  };


  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showVal = () => {
    console.log(discountType)
  };

  const handelStartPicker = (date) => {
    console.log("A date has been picked: ", date);
    showSuccess(`A date has been picked:${date} `)
    hideDatePicker();
    setStartDate(moment(date).format('YYYY-MM-DD'))
  };


  return (
    <>
      <SafeAreaView style={styles.NewQuoteWrapper} >
        <VMOCustomHeader title={`Quotation #${quotationId}`} backIcon />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
          style={styles.container}
        >
          {loading === true ? <Spinner style={{ height: windowHeight }} /> :
            <ScrollView keyboardShouldPersistTaps="handled" style={styles.scrollViewStyle} ref={scrollViewRef} onContentSizeChange={() => fillDetailSection}>
              <View style={styles.NewQuoteView} >
                {estimateMaterial.map((item, key) => {
                  return (
                    <>
                      <QuoteMaterial item={item} index={key}
                        reciveTheindexVal={newQuoteAdd}
                        setcheckedIndicate={setcheckedIndicate}
                        checkedIndicate={checkedIndicate}
                        reciveTheremarkAndIndex={addRemarkinObj}
                      />
                    </>
                  )
                })
                }
              </View>
              <View style={styles.bottomView} >
                <Text style={styles.TextHeading} >Fill in other details</Text>
                <Pressable style={{ backgroundColor: '#FFFFFF' }} onPress={showStartDatePicker}>
                  <Text style={styles.TextColor} >Service Start Date</Text>
                  <FormInput
                    style={{ margin: 0 }}
                    editable={false}
                    iconType="calendar"
                    changedText={text => setStartDate(text)}
                    // InputSubject="Service Start Date"
                    autoCapitalize="none"
                    autoCorrect={false}
                    headingTextColor={'#000'}
                    fontsize={16}
                  >
                    {startDate === null ? (moment(new Date()).format('YYYY-MM-DD')) : startDate}
                  </FormInput>
                </Pressable>

                {/* <Pressable onPress={() => { showVal() }} >
                  <Text>Nick</Text>
                </Pressable> */}


                {/* <Text style={styles.TextColor} >Labour Days</Text>
                <TextInput
                  style={styles.TextInputStyles}
                  placeholder="Enter the number"
                  onChangeText={text => setLabourDays(text)}
                  keyboardType='numeric'
                > {labourDays !== undefined ? labourDays : quotes?.labour_days}
                </TextInput> */}

                <Text style={styles.TextColor} >Labour Days</Text>
                <TextInput
                  style={styles.TextInputStyles}
                  placeholder="Enter the number"
                  onChangeText={text => setLabourDays(text)}
                  keyboardType='numeric'
                >{labourDays !== undefined ? labourDays : quotes?.labour_days}
                </TextInput>


                <Text style={styles.TextColor} >Labour Cost</Text>
                <TextInput
                  style={styles.TextInputStyles}
                  placeholder="Enter the number"
                  onChangeText={text => setLabourCost(text)}
                  keyboardType='numeric'
                >{labourCost == null ? quotes?.labour_price : labourCost}
                </TextInput>

                {/* <Text style={styles.TextColor} >Labour Cost</Text>
                <TextInput
                  style={styles.TextInputStyles}
                  placeholder="Enter the number"
                  onChangeText={text => setLabourCost(text)}
                  autoCorrect={false}
                  keyboardType='numeric'
                  // editable={!disableEdit}
                  autoCapitalize="none"
                > {labourCost == null ? quotes?.labour_price : labourCost}
                </TextInput>
                 */}


                <Text style={styles.TextColor} >Discount Type</Text>
                <RNPickerSelect
                  style={pickerSelectStyles}
                  value={discountType == undefined ? quotes?.discount_type : discountType}
                  // value={discountType == null ? quotes?.discount_type : discountType }
                  // value={"Amount"}
                  onValueChange={(itemVal) => {
                    setDiscountType(itemVal); console.log(itemVal)
                  }}
                  useNativeAndroidPickerStyle={false}
                  items={DISCOUNT_TYPES}
                />

                <Text style={styles.TextColor} >Discount</Text>
                <TextInput
                  style={styles.TextInputStyles}
                  placeholder="Enter the number"
                  onChangeText={text => setDiscountVal(text)}
                  keyboardType='numeric'
                >{discountVal === null ? quotes?.discount_amount : discountVal}
                </TextInput>


                {/* <Text style={styles.TextColor} >Discount</Text>
                <TextInput
                  style={styles.TextInputStyles}
                  placeholder="Enter the number"
                  onChangeText={text => setDiscountVal(text)}
                  autoCorrect={false}
                  keyboardType='numeric'
                  // editable={!disableEdit}
                  autoCapitalize="none"
                > {discountVal === null ? quotes?.discount_amount : discountVal}
                </TextInput> */}

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
                    >{quotes?.remark}
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
                      backgroundColor="#fff">{quotes?.remark}
                    </TextInput>
                }

                <View style={styles.Priceview} >
                  <Text style={styles.TotalAmount} >Total Quote Amount </Text>
                  <Text style={styles.amountVal} >SGD {totalPrice == null ? quotes?.price : totalPrice}</Text>
                </View>
                <CustomButton title={"Save"} onPress={updateQuotation} style={{ width: "100%", marginBottom: 20 }} />
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
        onConfirm={handelStartPicker}
        onCancel={hideDatePicker}
      />
    </>
  )
}

export default QuotationDetail


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