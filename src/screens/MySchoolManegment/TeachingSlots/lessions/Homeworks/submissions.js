import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Text, View, Image, Pressable } from 'react-native';
import { getSubmittedHomeworkByHomeworkId } from '../../../../../api';
import { colors } from '../../../../../assects/colors';
import fonts from '../../../../../assects/fonts';
import Images from '../../../../../assects/Images';
import { iosOpacity, width } from '../../../../../assects/strings';
import { ButtonComponent } from '../../../../../component';
import routes from '../../../../../routes/routes';
import { AddIconPurpleIcon, BorderDashedIcon, GuitarIcon } from '../../../assects/icons';
import { TaskImages } from '../../../assects/images';

function Submissions({ navigation, route }) {
    const dateStripRef = useRef();
    const [allDate, setAllDate] = useState(new Date())
    const [HomeworkId, setHomeworkId] = useState(route?.params?.id)
    const [submissionData, setSubmissionData] = useState([])

    const submitData = [
        { title: "Jane Cooper", status: "#122", image: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg", data: "img" },
        { title: "John Smith", status: "#124", image: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg", data: "mp3" },
        { title: "Jane Cooper", status: "#125", image: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg", data: "text" },
        { title: "John Smith", status: "#126", image: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg", data: "img" },

    ]


    const homeworkData = [
        {
            title: "Homework 1",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ipsumLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ",
            pending: "02",
            submit: "04"
        },
        {
            title: "Homework 2",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ipsumLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ",
            pending: "02",
            submit: "04"
        },
        {
            title: "Homework 3",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ipsumLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ",
            pending: "02",
            submit: "04"
        }

    ]
    useEffect(()=>{
        getSubmittedHomeworkByHomeworkId(HomeworkId).then((res)=>{
            if(res?.data?.success){
                setSubmissionData(res?.data?.result)
            }
            else{

            }
        })
    },[])

    function ListEmptyComponent() {
        return (
            <View style={{ width: width, height: width, alignItems: "center", justifyContent: "center" }} >
                <Image style={{ width: width, height: width / 3, resizeMode: "contain" }} source={Images.emptyData} />
                <Text style={{fontFamily:fonts.PoppinsMedium,color:colors.primaryColor}} >No Submission found</Text>

            </View>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: colors.white }} >
            <FlatList
                ListEmptyComponent={ListEmptyComponent}
                data={[]}
                renderItem={({ item, index }) => {

                    return (
                        <View style={[{ width: width / 1.10, minHeight: width / 5, alignSelf: "center", borderRadius: 10, backgroundColor: colors.white, elevation: 2, marginVertical: width / 20, paddingVertical: 20, maxHeight: width, justifyContent: "space-between", paddingHorizontal: 10 }, iosOpacity]} >
                            <View style={{ flexDirection: "row", alignItems: "center" }} >
                                <Image style={{ width: width / 8, height: width / 8, borderRadius: 100 }} source={{ uri: item.image }} />
                                <View style={{ paddingLeft: 15 }} >
                                    <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.B212529 }} >{item.title}</Text>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: width / 1.50 }} >
                                        <Text style={{ fontFamily: fonts.PoppinsLight, color: colors.D6D6D, fontSize: 12 }} >{item.status}</Text>
                                        <Text style={{ fontFamily: fonts.PoppinsLight, color: colors.D6D6D, fontSize: 12 }} >{item.status}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ marginTop: width / 10 }} >
                                {item.data == "img" ?
                                    <View style={{ flexDirection: "row" }} >
                                        <Image style={{ width: width / 2.5, height: width / 3.5, borderRadius: 10, borderWidth: 5, borderColor: "#EFEFF0", marginRight: 10 }} source={{ uri: item.image }} />
                                        <Image style={{ width: width / 2.5, height: width / 3.5, borderRadius: 10, borderWidth: 5, borderColor: "#EFEFF0", marginRight: 10 }} source={{ uri: item.image }} />
                                    </View> :
                                    item.data == "mp3" ?
                                        <Image style={{ width: width / 1.2, height: width / 7, resizeMode: "contain", marginRight: 10 }} source={TaskImages.wave} />
                                        :
                                        <Text style={{ fontFamily: fonts.PoppinsRegular, color: colors.D6D6D, fontSize: 12, paddingHorizontal: 10 }} >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ipsumLorem ipsum dolor sit Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ipsumLorem ipsum dolor sit </Text>
                                }
                            </View>
                            <Pressable onPress={() => navigation.navigate(routes.addHomeworkFeedback)} style={{ flexDirection: "row", marginTop: 20 }} >
                                <AddIconPurpleIcon width={width / 20} height={width / 20} />
                                <Text style={{ fontFamily: fonts.PoppinsMedium, color: "#5768FA", fontSize: 12, marginLeft: 10 }} >{"Add your Feedback"}</Text>
                            </Pressable>
                        </View>
                    )

                }} />
        </View>
    )
}
export default Submissions;