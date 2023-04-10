import { View, Text, SafeAreaView, StyleSheet, StatusBar, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import VMOCustomHeader from '../../Components/VMOCustomHeader'
import { Colors } from '../../Constant/Colors'
import CustomSearch from '../../Components/CustomSeach'
import Spinner from '../../Components/Spinner'
import { windowHeight } from '../../utils/Dimension'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { AdminGetOrderDetailAPI } from '../../api'
import CustomButton from '../../Components/CustomButton'
import { useSelector } from 'react-redux'
import ServiceReportCard from '../../Components/Cards/ServiceReportCard'
import NavigationString from '../../routes/NavigationString'

const SurveyDetail = () => {
    const [surveyDetail, setsurveyDetail] = useState();
    const [loading, setloading] = useState(false);
    const { orderId, jobDetail } = useSelector(state => state.JobDetails);
    const [disableEdit, setdisableEdit] = useState(false);
    const { homeData } = useSelector(state => state.homeDetails);
    const { user } = useSelector(state => state.userDetails);

    const navigation = useNavigation()
    const isFocused = useIsFocused();

    const LoadData = async () => {
        let data = {
            order_id: orderId,
        }
        setloading(true)
        AdminGetOrderDetailAPI(data).then((res) => {
            setloading(false)
            console.log(res?.data?.survey_reports, "SURVEYOR REPORT");
            setsurveyDetail(res?.data?.survey_reports)
            console.log(surveyDetail, "surveyDetail");
            return res;
        }).catch(err => {
            setloading(false);
            return err;
        });
    };

    useEffect(() => {
        LoadData();
    }, []);

    useEffect(() => {
        LoadData()
    }, [isFocused]);

    // ?Just Cheked The VS GIT 


    useEffect(() => {
        if (user?.user?.role === 3) {
            if (jobDetail.job_status == 1) {
                return setdisableEdit(true)
            } else {
                return setdisableEdit(false)
            }
        } else if ((user?.user?.role === 0 || user?.user?.role === 4) && jobDetail.job_status == 1) {
            if (jobDetail.job_status == 1) {
                return setdisableEdit(true)
            } else {
                return setdisableEdit(false)
            }
        } else if (user?.user?.role === 2 && jobDetail.job_status == 1) {
            setdisableEdit(true)
        } else if (user?.user?.role == 1) {
            if (jobDetail.job_status == 1) {
                return setdisableEdit(true)
            } else {
                return setdisableEdit(false)
            }
        }
    }, [])



    const renderItem = ({ item, index }) => (
        <>
            <ServiceReportCard item={item} loadData={LoadData} disableEdit={disableEdit} />
        </>
    );


    return (
        <SafeAreaView style={styles.SurveyDetail} >
            <StatusBar barStyle="dark-content" backgroundColor="#155B9F" translucent={false} />
            <VMOCustomHeader title={"Survey details"} backIcon />
            {loading == true ? <Spinner style={{ height: windowHeight }} /> :
                <View style={styles.QuoteWrapper} >
                    <CustomSearch />
                    <FlatList
                        data={surveyDetail}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        ListFooterComponentStyle={{ height: 10 }}
                        ListFooterComponent={<View></View>}
                    />
                    {
                        disableEdit == true ?
                            null
                            :
                            <CustomButton title={"Add new report"} onPress={() => { navigation.navigate(NavigationString.NEW_SURVEY_DETAIL) }} style={{ width: '95%', marginBottom: '5%', }} />
                    }
                </View>
            }
        </SafeAreaView>
    )
}

export default SurveyDetail


const styles = StyleSheet.create({
    SurveyDetail: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    QuoteWrapper: {
        width: '100%',
        alignSelf: 'center',
        flex: 1,
        paddingHorizontal: 10,
    },

})