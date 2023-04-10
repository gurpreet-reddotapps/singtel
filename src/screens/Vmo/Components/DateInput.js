import React, { useRef, useState } from 'react'
import { Provider as PaperProvider } from 'react-native-paper';
import RBSheet from "react-native-raw-bottom-sheet";
import { View, StyleSheet, Text, Pressable, Image, ToastAndroid } from 'react-native';
import fonts from '../../../assects/fonts';
import Images from '../assets/Images';
import BottomSheet from './BottomSheet';
import FeIcon from 'react-native-vector-icons/Feather'
import moment from 'moment'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Calender } from '../assets/Icons';
import { Checkbox } from 'react-native-paper';
import { ShowErrorMessage } from '../../../component';
import { Colors } from '../Constant/Colors';




const DateInput = (props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDateEndPickerVisible, setDateEndPickerVisibility] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [checked, setChecked] = useState();

  const refRBSheet = useRef();

  const START_DATE = moment(startDate).format('YYYY-MM-DD')
  const END_DATE = moment(endDate).format('YYYY-MM-DD')


  const showStartDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const showEndaDatePicker = () => {
    setDateEndPickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };


  const handelStartPicker = (date) => {
    setStartDate(date)
    hideDatePicker();
    setDatePickerVisibility(false)

  };

  const handelEndPicker = (date) => {
    const enddate = date;
    setEndDate(enddate)
    setDateEndPickerVisibility(false)
    hideDatePicker();
  };

  const getLastWeek = () => {
    setChecked('first')
    let StartWeekDate = moment().subtract(1, 'weeks').startOf('isoWeek').format('YYYY-MM-DD')
    let EndWeekDate = moment().subtract(1, 'weeks').endOf('isoWeek').format('YYYY-MM-DD')
    props.DashBoardData({
      start_date: StartWeekDate,
      end_date: EndWeekDate,
    })
    refRBSheet.current.close()
  }

  const getLastMonth = () => {
    setChecked('second')
    let StartMonthDate = moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD')
    let EndMonthDate = moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
    props.DashBoardData({
      start_date: StartMonthDate,
      end_date: EndMonthDate,
    })
    refRBSheet.current.close()
  }

  const getLastYear = () => {
    setChecked('third')
    let StartYearDate = moment().subtract(1, 'year').startOf('year').format('YYYY-MM-DD')
    let EndYearDate = moment().subtract(1, 'year').endOf('year').format('YYYY-MM-DD')
    props.DashBoardData({
      start_date: StartYearDate,
      end_date: EndYearDate,
    })
    refRBSheet.current.close()
  }

  const sendSelectedDate = () => {
    let isValid = moment(END_DATE).isAfter(START_DATE)
    if (isValid === true) {
      props.DashBoardData({
        start_date: START_DATE,
        end_date: END_DATE,
      })
      refRBSheet.current.close()
    } else {
      ToastAndroid.show(`Please Enter a correct date`, ToastAndroid.SHORT);
      ShowErrorMessage("Please Enter a last date")
    }

  }





  return (
    <Pressable onPress={() => { refRBSheet.current.open() }} style={styles.DateTouchable} >
      <Text style={styles.DateText} >{moment(props.START_DATE_PL).format('DD-MMM')} - {moment(props.END_DATE_PL).format('DD-MMM')}</Text>
      <Image source={Images.calendarImg} />
      <RBSheet
        ref={refRBSheet}
        height={350}
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
        <BottomSheet Heading={"Sort By Date"} CloseIT={() => refRBSheet.current.close()} children={
          <>
            <View style={styles.BottomPopUp}>
              <View>
                {/* <Text style={styles.FilterText} >Filter by</Text> */}
                <View style={styles.RadioStyle} >
                  <View style={styles.RadioGroupStyle} >
                    <Checkbox.Android
                      color="#155B9F"
                      uncheckedColor="#155B9F"
                      value="first"
                      status={checked === 'first' ? 'checked' : 'unchecked'}
                      onPress={() => getLastWeek()}
                    />
                    <Text style={styles.RadioText} >Last Week</Text>
                  </View>
                  <View style={styles.RadioGroupStyle} >
                    <Checkbox.Android
                      color="#155B9F"
                      uncheckedColor="#155B9F"
                      value="second"
                      status={checked === 'second' ? 'checked' : 'unchecked'}
                      onPress={() => getLastMonth()}
                    />
                    <Text style={styles.RadioText} >Last Month</Text>
                  </View>
                  <View style={styles.RadioGroupStyle} >
                    <Checkbox.Android
                      color="#155B9F"
                      uncheckedColor="#155B9F"
                      value="third"
                      status={checked === 'third' ? 'checked' : 'unchecked'}
                      onPress={() => getLastYear()}
                    />
                    <Text style={styles.RadioText} >Last Year</Text>
                  </View>
                </View>
              </View>


              <View style={styles.SelectCustomDate}>
                <Text style={styles.DateHeadingText} >Select a Custom Date</Text>
                <View style={styles.CustomDatePicker}>
                  <Pressable style={styles.CustomDateTouchable} activeOpacity={0.5} onPress={showStartDatePicker}>
                    <Text style={styles.DateText}>{START_DATE}</Text>
                    <Calender width={20} height={20} />
                  </Pressable>
                  <Pressable style={styles.CustomDateTouchable} onPress={showEndaDatePicker} >
                    <Text style={styles.DateText}>{END_DATE}</Text>
                    <Calender width={20} height={20} />
                  </Pressable>
                </View>
              </View>

            </View>
            <View style={styles.BSWrapper} >
              <Pressable style={styles.BSButtonWhite} onPress={() => refRBSheet.current.close()} bgcolor={'#F5F5F5'} >
                <Text style={styles.BSText} >Cancel</Text>
              </Pressable>
              <Pressable style={[styles.BSButton, { backgroundColor: "#155B9F", }]} onPress={sendSelectedDate} activeOpacity={0.5} >
                <Text style={[styles.BSButtonBlue, { color: "#FFFFFF" }]}>Apply filters</Text>
              </Pressable>
            </View>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handelStartPicker}
              onCancel={hideDatePicker}
            />
            <DateTimePickerModal
              isVisible={isDateEndPickerVisible}
              mode="date"
              onConfirm={handelEndPicker}
              onCancel={hideDatePicker}
            />
          </>

        }
        />
      </RBSheet>
    </Pressable>
  )
}

export default DateInput


const styles = StyleSheet.create({
  DateTouchable: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    padding: '3%',
    width: '95%',
    marginVertical: '5%',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 20,
    shadowOpacity: 0.25,

  },
  DateText: {
    color: '#777',
    fontFamily: fonts.PoppinsMedium,
    fontSize: 16,
    lineHeight: 19,
    color: "#212529",
  },
  BottomPopUp: {
    flex: 1,
    color: "#000",
    padding: 5,
    fontSize: 15,
    fontFamily: fonts.PoppinsMedium,
    marginHorizontal: 20,
    marginTop: 15,
  },
  RowItem: {
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  SelectCustomDate: {
    paddingVertical: 15,
  },
  FilterText: {
    fontSize: 20,
    color: "#000",
    // fontFamily: 'DMSans-Bold',
    paddingLeft: 10,
  },
  PopUpHeading: {
    fontSize: 16,
    color: "#000",
    // fontFamily: 'DMSans-Medium',
    paddingLeft: 10,
  },
  RadioStyle: {
    flexWrap: "wrap",
    alignItems: "center",
    width: "100%",
    padding: 1,
    flexDirection: "row",
  },
  RadioStyleColumn: {
    flexWrap: "wrap",
    alignItems: "center",
    width: "100%",
    padding: 5,
    flexDirection: "column",
  },
  PopUpBottomLine: {
    minWidth: "100%",
    backgroundColor: "#ddd",
    padding: 1,
  },
  RadioGroupStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  RadioText: {
    color: "#000",
    // fontFamily: 'DMSans-Regular',
    padding: 5,
  },
  CustomDatePicker: {
    flexDirection: "row",
  },
  DateHeadingText: {
    color: "#000",
    // fontFamily: 'DMSans-Bold',
    fontSize: 16,
  },
  CustomDateTouchable: {
    backgroundColor: "#F5F5F5",
    flexDirection: "row",
    padding: 10,
    width: "45%",
    margin: 10,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 2,
  },
  BSWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  BSButtonWhite: {
    backgroundColor: "#FFFFFF",
    // paddingVertical: 15,
    // paddingHorizontal: 70,
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    margin: 10,
    borderRadius: 10,
    borderColor: "#155B9F",
    borderWidth: 1,
  },
  BSButton: {
    width: '40%',
    alignItems: 'center',
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    // paddingHorizontal: 50,
    margin: 10,
    borderRadius: 10,
  },
  BSText: {
    color: "#155B9F",
    fontFamily: fonts.PoppinsMedium,
    fontSize: 16,
    lineHeight: 27,
  },
  BSButtonBlue: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: 16,
    lineHeight: 27,
  },

})
