import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, ImageBackground, Pressable, StyleSheet, Text, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { colors } from '../../assects/colors';
import fonts from '../../assects/fonts';
import Images from '../../assects/Images';
import { width } from '../../assects/strings';
import CustomHeader from '../../component/CustomHeader';
import TabViewComponent from '../../component/TabViewComponent';
import { RecruitmentImages } from './assects/images';
import DOMParser from 'react-native-html-parser';
const parser = new DOMParser.DOMParser();
// import Signature from 'react-native-signature-panel';
const JobDetails = ({ navigation,route }) => {
    const dispatch = useDispatch();
    const array = ["#F0A500", "#EB4747", "#155F7F", "#155F7F"]
    const [TabData] = useState([{ key: "myjobs", title: "My Jobs", data: "0", color: colors.progressColor },
    { key: "openjobs", title: "Open Jobs", data: "0", color: colors.blue },

    ])

    const jobDetails = route.params.item

    const LeaveData = [
        { title: "Company Name", data: "12345" },
        { title: "Department", data: jobDetails.department },
        { title: "Job Title", data: jobDetails.title },
        // { title: "Occupation", data: jobDetails.occupation },
        { title: "Job Description", data: parser.parseFromString( jobDetails.description, 'text/html')?.lastChild?.firstChild?.data },
    ]


    const skillrequired = ["traffic laws", "maintenance", "problem-solving"]

    const keyinformation = [
        { title: "Job Post Duration", data:jobDetails.job_post_duration },
        { title: "No. of Vacancies", data:jobDetails.no_of_vacancies },
        // { title: "Job Function", data: "" },
        { title: "Position Level", data: jobDetails.position_level },
        { title: "Minimum Years of Experience", data: jobDetails.years_of_experience },
        { title: "Employment Type", data: jobDetails.employment_type },
        { title: "Minimum Qualification Level", data: jobDetails.minimum_qualification },
        { title: "Field Of Study", data: jobDetails.field_of_study },
        // { title: "Monthly Salary Range", data: "SGD "+jobDetails.monthly_salary_range_min+"-"+jobDetails.monthly_salary_range_max },
    ]

    const workplacedetails = [
        { title: "Work Place Address", data:jobDetails.workplace_address },
        { title: "Block/House No", data: jobDetails.h_no },
        { title: "Street No", data:jobDetails.street_number },
        // { title: "Level No", data: jobDetails.level_no},
        { title: "Unit No", data: jobDetails.unit_no },
        { title: "Postal Code", data: jobDetails.postal_code },


    ]

    function BorderView() {
        return (
            <View style={{ width: width, height: 1, backgroundColor: colors.primaryColor, opacity: 0.2, marginVertical: 10 }} />
        )
    }

    return (
        <View style={styles.container} >
            <CustomHeader backIcon title={"Job Details"} />
           

            <FlatList 
            ListHeaderComponent={
                <>
                 <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 15, marginVertical: 10 }} >
                <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsBold, fontSize: 16 }} >Job Description</Text>
                <Text style={{ color: "#AE282E", fontFamily: fonts.PoppinsRegular, fontSize: 12 }} >Closes in {jobDetails.closes_at} days</Text>

            </View>
            {LeaveData.map((data, index) => {
                if (index != 4)
                    return (
                        <View  >
                            <View style={{ width: width, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 12, paddingHorizontal: 15 }} >
                                <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.B212529, fontSize: 13 }} >{data.title}</Text>
                                <Text style={{ fontFamily: fonts.PoppinsRegular, color: colors.primaryColor, fontSize: 15 }} >{data.data}</Text>
                            </View>

                        </View>
                    )
                else {
                    return (
                            <View style={{ width: width, flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", paddingVertical: 12, paddingHorizontal: 15 }} >
                                <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.B212529, fontSize: 13 }} >{data.title}</Text>
                                <Text style={{ fontFamily: fonts.PoppinsRegular, color: colors.B212529, fontSize: 12 }} >{data.data}</Text>
                            </View>
                    )
                }
            })}

            <BorderView />



            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 15, marginVertical: 10 }} >
                <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsBold, fontSize: 16 }} >Skills required</Text>
            </View>
                </>
            }
            
            style={{marginBottom:15}} 
            numColumns={3} 
            data={skillrequired} 
            renderItem={({item,index})=>{
                return(
                    <View style={{minWidth:width/6,maxWidth:width/2,height:20,marginHorizontal:5,paddingHorizontal:5,borderRadius:2,backgroundColor:colors.transPrimayColor,alignItems:"center",justifyContent:"center"}} >
                        <Text style={{color:colors.black,fontFamily:fonts.PoppinsRegular,fontSize:12}} >{item}</Text>

                    </View>
                )
            }} 
            
            ListFooterComponent={
                <>
                 <BorderView />

<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 15, marginVertical: 10 }} >
    <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsBold, fontSize: 16 }} >Key Information</Text>
</View>


{keyinformation.map((data, index) => {
    return (
        <View  >
            <View style={{ width: width, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 12, paddingHorizontal: 15 }} >
                <Text style={{ fontFamily: fonts.PoppinsMedium, color:  colors.B212529, fontSize: 13 }} >{data.title}</Text>
                <Text style={{ fontFamily: fonts.PoppinsRegular, color: colors.primaryColor, fontSize: 15 }} >{data.data}</Text>
            </View>

        </View>
    )
})}
<BorderView />

<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 15, marginVertical: 10 }} >
    <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsBold, fontSize: 16 }} >Work Place Details</Text>
</View>


{workplacedetails.map((data, index) => {
    return (
        <View  >
            <View style={{ width: width, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 12, paddingHorizontal: 15 }} >
                <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.B212529 }} >{data.title}</Text>
                <Text style={{ fontFamily: fonts.PoppinsRegular, color: colors.primaryColor, fontSize: 16 }} >{data.data}</Text>
            </View>

        </View>
    )

})}


{/* <FlatList data={LeaveData} renderItem={({ item, index }) => {
   
}} /> */}


{/* <FlatList data={LeaveData} renderItem={({ item, index }) => {
    if (index != 4)
        return (
            <View >
                <View style={{ width: width, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 12, paddingHorizontal: 15 }} >
                    <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.B212529 }} >{item.title}</Text>
                    <Text style={{ fontFamily: fonts.PoppinsRegular, color: colors.primaryColor, fontSize: 16 }} >{item.data}</Text>
                </View>

            </View>
        )
    else {
        return (
            <View  >
                <View style={{ width: width, flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", paddingVertical: 12, paddingHorizontal: 15 }} >
                    <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.B212529 }} >{item.title}</Text>
                    <Text style={{ fontFamily: fonts.PoppinsRegular, color: colors.B212529, fontSize: 13 }} >{item.data}</Text>
                </View>
            </View>
        )
    }
}} /> */}

                </>
            }
            />


           

        </View>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
    imageView: { width: width / 2, height: width / 2 }
})
export default JobDetails;