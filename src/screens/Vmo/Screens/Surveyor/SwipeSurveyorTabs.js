import { View, Text, StyleSheet, FlatList, Pressable, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import TabViewComponent from '../../Components/TabViewComponent'
import { colors } from '../../../../assects/colors'
import { windowHeight, windowWidth } from '../../utils/Dimension'
import fonts from '../../../../assects/fonts'
import Spinner from '../../Components/Spinner';
import JobCardAdmin from '../../Components/Cards/JobCardAdmin';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { newInsuranceCreated, newSurveyorCreated } from '../../../../redux/actions/Insurance'
import NavigationString from '../../routes/NavigationString'
import InsuranceCard from '../../Components/Cards/InsuranceCard'
import { AllInsuranceCompanyAPI, AllSurveyorAPI } from '../../api'
import CustomButton from '../../Components/CustomButton'
import SurveyorCard from '../../Components/Cards/SurveyorCard'
import ImagePath from '../../Constant/ImagePath'
import AdminJobCard from '../../Components/Cards/AdminJobCard'
import AdminHomeSearch from '../AdminHome/AdminSearch'
import InsuranceSearch from './InsuranceSearch'


const SwipeSurveyorTabs = () => {
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



    const Surveyor = (data) => {
        AllSurveyorAPI(data).then((res) => { console.log(res?.data?.all_surveyors?.data); setloading(true); setAllSurveyor(res?.data?.all_surveyors?.data); setloading(false); }).catch(err => { setloading(false); return err; });
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


    useFocusEffect(
        React.useCallback(() => {
            setloading(true)
            Surveyor({})
            Insurance({})
        }, [])
    );


    useEffect(() => {
        setloading(true)
        Surveyor({})
        Insurance({})
    }, [])

    useEffect(() => {
        showActiveData(0)
    }, [AllSurveyor])

    useEffect(() => {
        if (deleteVal === true) {
            setloading(true)
            SecondInsurance({})
            setSelectedCategoryIndex(1)
            setdataItem(AllInsaurance)
            setdeleteVal(false)
            console.log("DEL");
        } else return
    }, [deleteVal === true])

    useEffect(() => {
        if (isNewInsuranceCompany === true) {
            setloading(true)
            SecondInsurance({})
            setSelectedCategoryIndex(1)
            dispatch(newInsuranceCreated(false))
        } else return
    }, [isNewInsuranceCompany === true])

    useEffect(() => {
        if (isNewSurveyorCompany === true) {
            setloading(true)
            SecondSurveyor({})
            setSelectedCategoryIndex(0)
            dispatch(newSurveyorCreated(false))
        } else return
    }, [isNewSurveyorCompany === true])


    const showActiveData = (index) => {
        setSelectedCategoryIndex(index)
        console.log(index, "THIS ONE IS INEDX");
        if (index === 0) {
            setdataItem(AllSurveyor)
        } else if (index === 1) {
            setdataItem(AllInsaurance)
        }
    }


    const emptySearch = () => {
        setloading(true)
        Surveyor({})
        Insurance({})
    }


    const propData = {
        setAllSurveyor,
        setAllInsaurance,
        setloading,
    }

    const renderItem = ({ item, index }) => {
        return (
            <View key={index} style={styles.itemContainer}>
                <View>
                    <SurveyorCard setdeleteSur={setdeleteSur} Surveyor={Surveyor} data={item} />
                </View>
            </View>
        );
    };

    const renderInsuranceItem = ({ item, index }) => {
        return (
            <View key={index} style={styles.itemContainer}>
                <View>
                    <InsuranceCard setdeleteVal={setdeleteVal} Insurance={Insurance} data={item} />
                </View>
            </View>
        );
    };

    const EmptyItem = ({ item, index }) => {
        return (
            <View style={styles.imageBackgroundWrapper} >
                <View style={styles.ImageWrap} >
                    <ImageBackground source={ImagePath.home_gif} style={styles.ImageBackgroundStyle} height={windowHeight}  >
                    </ImageBackground>
                </View>
            </View>
        );
    };



    const [TabData] = useState([{ key: "surveyor", title: "Surveyors", data: "0", color: colors.progressColor },
    { key: "insurance", title: "Insurance", data: "0", color: colors.blue },
    ])


    const SurveyorsView = () => {
        return (
            <>
                <FlatList
                    data={AllSurveyor}
                    keyExtractor={(e, index) => index.toString()}
                    renderItem={renderItem}
                    ListEmptyComponent={EmptyItem}
                />
                <CustomButton title={"Add new surveyors"} onPress={() => { navigation.navigate(NavigationString.NEW_SURVEYOR) }} style={{ width: "95%" }} />
            </>
        )
    }

    const InsuranceView = () => {
        return (
            <>
                <FlatList
                    data={AllInsaurance}
                    keyExtractor={(e, index) => index.toString()}
                    renderItem={renderInsuranceItem}
                    ListEmptyComponent={EmptyItem}
                />
                <CustomButton title={"Add insurance company"} onPress={() => { navigation.navigate(NavigationString.NEW_INSAURANCE) }} />
            </>
        )
    }

    const renderTabBar = (data) => {
        return (
            <View style={{ backgroundColor: "#FFFFFF", marginTop: 15, paddingHorizontal: 10, width: windowWidth / 1, elevation: 1, alignSelf: "center", borderRadius: 20 }} >
                <FlatList showsHorizontalScrollIndicator={false} horizontal data={data.navigationState.routes} renderItem={({ item, index }) => {
                    return (
                        <Pressable onPress={() => data.jumpTo(item.key)} style={{
                            width: windowWidth / 2, height: windowWidth / 8, backgroundColor: data.navigationState.index == index ? "#155B9F" : "#FFFFFF",
                            borderTopLeftRadius: (data.navigationState.index != 2) && data.navigationState.index == index ? 5 : 0,
                            borderBottomLeftRadius: (data.navigationState.index != 2) && data.navigationState.index == index ? 5 : 0,
                            borderTopRightRadius: (data.navigationState.index != 1) && data.navigationState.index == index ? 5 : 0,
                            borderBottomRightRadius: (data.navigationState.index != 1) && data.navigationState.index == index ? 5 : 0,
                            alignItems: "center",
                            justifyContent: "center",
                        }} >
                            {console.log("Index", data.navigationState.index)}
                            <Text style={{ color: data.navigationState.index == index ? "#FFFFFF" : "#212529", fontFamily: fonts.PoppinsRegular }} >{item.title}</Text>
                        </Pressable>
                    )
                }} />
            </View>
        )
    }


    return (
        <View style={styles.container} >
            <InsuranceSearch {...propData} emptySearch={emptySearch} Customwidth={"95%"} />
            {loading === true ? <Spinner style={{ height: '100%' }} />
                :
                <TabViewComponent
                    Screens={{ surveyor: SurveyorsView, insurance: InsuranceView }}
                    renderTabBar={renderTabBar}
                    TabRoutes={TabData} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    itemContainer: {
        flexDirection: 'column',
        paddingVertical: 10,
    },
    imageBackgroundWrapper: {
        flex: 1,
        width: windowWidth,
        height: "50%",
        // zIndex: 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'center',
        top: 10,
        // margin: '5%',
    },
    ImageWrap: {
        width: windowWidth,
        height: windowHeight / 2,
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'center',
    },
    ImageBackgroundStyle: {
        height: '85%',
        width: '85%',
        position: 'absolute',
        bottom: 10,
        alignSelf: 'flex-end'
    },

})


export default SwipeSurveyorTabs