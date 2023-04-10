import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../Constant/Colors'
import VMOCustomHeader from '../../Components/VMOCustomHeader'
import JobsDetailCard from '../../Components/Cards/JobsDetailCard'
import { windowHeight, windowWidth } from '../../utils/Dimension'
import fonts from '../../../../assects/fonts'
import { styles } from '../NewOrder/NewOrder'
import SurveyorCard from '../../Components/Cards/SurveyorCard'
import CustomSearch from '../../Components/CustomSeach'
import CustomButton from '../../Components/CustomButton'
import { AllInsuranceCompanyAPI, AllSurveyorAPI } from '../../api'
import Spinner from '../../Components/Spinner'
import InsuranceCard from '../../Components/Cards/InsuranceCard'
import NavigationString from '../../routes/NavigationString'
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { newInsuranceCreated, newSurveyorCreated } from '../../../../redux/actions/Insurance'
import SwipeSurveyorTabs from './SwipeSurveyorTabs'


const categoryList = ['Surveyors', 'Insurance '];

const Surveyor = () => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState();
  const [dataItem, setdataItem] = useState();
  const [AllSurveyor, setAllSurveyor] = useState();
  const [deleteSur, setdeleteSur] = useState(false);
  const [deleteVal, setdeleteVal] = useState(false);
  const [AllInsaurance, setAllInsaurance] = useState();
  const [loading, setloading] = useState(false);
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { isNewInsuranceCompany, isNewSurveyorCompany } = useSelector(state => state.InsuranceDetail);


  const isFocused = useIsFocused();

  const Surveyor = (data) => {
    AllSurveyorAPI(data).then((res) => { console.log(res?.data?.all_surveyors?.data ,"DATA"); setloading(true); setAllSurveyor(res?.data?.all_surveyors?.data); setloading(false); }).catch(err => { setloading(false); return err; });
  }

  const Insurance = (data) => {
    AllInsuranceCompanyAPI(data).then((res) => { setloading(true); setAllInsaurance(res.data?.all_insurance_companies); setloading(false); }).catch(err => { setloading(false); return err; });
  }

  const SecondInsurance = (data) => {
    AllInsuranceCompanyAPI(data).then((res) => { setloading(true); setdataItem(res.data?.all_insurance_companies); setloading(false); }).catch(err => { setloading(false); return err; });
  }

  const SecondSurveyor = (data) => {
    AllSurveyorAPI(data).then((res) => { setloading(true); setdataItem(res?.data?.all_surveyors?.data); setloading(false); }).catch(err => { setloading(false); return err; });
  }


  // useEffect(() => {
  //   setloading(true)
  //   Surveyor({})
  //   Insurance({})
  // }, [])

  // useEffect(() => {
  //   showActiveData(0)
  // }, [AllSurveyor])

  // useEffect(() => {
  //   if (deleteVal === true) {
  //     setloading(true)
  //     SecondInsurance({})
  //     setSelectedCategoryIndex(1)
  //     setdataItem(AllInsaurance)
  //     setdeleteVal(false)
  //     console.log("DEL");
  //   } else return
  // }, [deleteVal === true])

  // useEffect(() => {
  //   if (isNewInsuranceCompany === true) {
  //     setloading(true)
  //     SecondInsurance({})
  //     setSelectedCategoryIndex(1)
  //     dispatch(newInsuranceCreated(false))
  //   } else return
  // }, [isNewInsuranceCompany === true])

  // useEffect(() => {
  //   if (isNewSurveyorCompany === true) {
  //     setloading(true)
  //     SecondSurveyor({})
  //     setSelectedCategoryIndex(0)
  //     dispatch(newSurveyorCreated(false))
  //   } else return
  // }, [isNewSurveyorCompany === true])


  // const showActiveData = (index) => {
  //   setSelectedCategoryIndex(index)
  //   console.log(index, "THIS ONE IS INEDX");
  //   if (index === 0) {
  //     setdataItem(AllSurveyor)
  //   } else if (index === 1) {
  //     setdataItem(AllInsaurance)
  //   }
  // }

  return (
    <SafeAreaView style={style.JobsWrapper} >
      <VMOCustomHeader title={"Surveyor details"} backIcon />
      <View style={style.jobContentWrapper} >
        <SwipeSurveyorTabs />
        {/* <View style={style.JobCategoryWrapper}>
          <View style={style.OnlyPading} >
            <View style={style.categoryListContainer}>
              {categoryList.map((category, index) => (
                <Pressable
                  style={style.PressableStyle}
                  key={index}
                  onPress={() => showActiveData(index)}>
                  <View
                    style={[
                      style.midlleView,
                      index == selectedCategoryIndex && style.activemidlleView,
                    ]}
                  >
                    <Text
                      style={[
                        style.categoryListText,
                        index == selectedCategoryIndex && style.activeCategoryListText,
                      ]}
                    >
                      {category}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
            <CustomSearch />
          </View>

          {loading === true ? <Spinner style={{ height: '100%' }} />
            :
            <FlatList
              data={dataItem}
              keyExtractor={(e, index) => index.toString()}
              renderItem={selectedCategoryIndex === 0 ? renderItem : renderInsuranceItem}
            />
          }
        </View> */}
        {/* {selectedCategoryIndex === 0 ?
          <CustomButton title={"Add new surveyors"} onPress={() => { navigation.navigate(NavigationString.NEW_SURVEYOR) }} />
          :
          <CustomButton title={"Add insurance company"} onPress={() => { navigation.navigate(NavigationString.NEW_INSAURANCE) }} />
        } */}
      </View>
    </SafeAreaView>)
}

export default Surveyor


const style = StyleSheet.create({
  JobsWrapper: {
    flex: 1,
    backgroundColor: Colors.Pure_White,
  },
  jobContentWrapper: {
    flex: 1,
    paddingBottom: 20,
    // paddingVertical: 20,
    // paddingHorizontal: 20,
  },
  OnlyPading: {
    paddingHorizontal: "2%",
  },
  JobCategoryWrapper: {
    flex: 1,
  },
  categoryListContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    width: "100%",
    backgroundColor: "#FFFFFF",
    // backgroundColor: "red",
    // height: "8%",
    height: windowHeight / 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  PressableStyle: {
    width: '50%',
    height: '100%',
    alignSelf: 'center',
    textAlign: 'center',
  },
  categoryListText: {
    borderRadius: 5,
    // width: "100%",
    // alignItems: 'center',
    // justifyContent: 'center',
    fontSize: 15,
    fontFamily: fonts.PoppinsRegular,
    textAlign: 'center',
    alignSelf: 'center',
    color: "#8C8C8C",

  },
  activeCategoryListText: {
    borderRadius: 5,
    // width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
    fontFamily: fonts.PoppinsRegular,
    textAlign: 'center',
    color: "#FFFFFF",
  },
  midlleView: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
    paddingHorizontal: " 7%",
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  activemidlleView: {
    height: "100%",
    width: "100%",
    backgroundColor: "#004A7F",
    borderRadius: 10,
    padding: "3%",
    paddingHorizontal: " 7%",
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'column',
    paddingVertical: 10,
  },
  categoryListView: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: windowWidth / 3.1,
    borderRadius: 5,
  },
  activeCategoryListView: {
    height: '100%',
    backgroundColor: "#004A7F",
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 5,
  },
})