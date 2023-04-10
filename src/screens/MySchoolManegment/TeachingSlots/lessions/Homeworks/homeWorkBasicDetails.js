import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getHomeWorkDetail } from '../../../../../api';
import { colors } from '../../../../../assects/colors';
import fonts from '../../../../../assects/fonts';
import { width } from '../../../../../assects/strings';
import { GuitarIcon } from '../../../assects/icons';


function HomeWorkBasicDetails({ navigation, route }) {
    const dateStripRef = useRef();
    const [allDate, setAllDate] = useState(new Date())
    const [HomeworkId, setHomeworkId] = useState(route?.params?.id)
    const [HomeworkDetails, setHomeworkDetails] = useState({})


    const teachingSlots = [
        { title: "Jane Cooper", status: "#122", image: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg" },
        { title: "John Smith", status: "#124", image: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg" },
        { title: "Jane Cooper", status: "#125", image: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg" },
        { title: "John Smith", status: "#126", image: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg" },

    ]
    useEffect(() => {
        getHomeWorkDetail(HomeworkId).then((res) => {
            setHomeworkDetails(res.data?.result)
        })
    }, [])








    return (
        <View style={{ flex: 1, backgroundColor: colors.white }} >
            <View style={{ width: width / 1.15, marginTop: width / 20, alignSelf: "center" }} >
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }} >
                    <GuitarIcon width={width / 18} height={width / 15} />
                    <Text style={{ fontFamily: fonts.PoppinsSemiBold, marginLeft: 10 }} >{HomeworkDetails?.title}</Text>
                </View>
                <Text style={{ fontFamily: fonts.PoppinsLight, fontSize: 12, color: colors.D6D6D, marginTop: 5 }} >{HomeworkDetails?.desc}</Text>
                <View style={{ width: width / 2, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: width / 20 }} >
                    <View  >
                        <Text style={{ fontFamily: fonts.PoppinsRegular, fontSize: 11, color: colors.transBlack }} >Created By</Text>
                        <Text style={{ fontFamily: fonts.PoppinsSemiBold, fontSize: 12, color: colors.lightGreen1 }} >{HomeworkDetails?.created_by}</Text>
                    </View>
                    <View  >
                        <Text style={{ fontFamily: fonts.PoppinsRegular, fontSize: 11, color: colors.transBlack }} >Created On</Text>
                        <Text style={{ fontFamily: fonts.PoppinsSemiBold, fontSize: 12, color: colors.lightGreen1 }} >{moment(HomeworkDetails?.created_at).format("DD MMM, YYYY")}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}
export default HomeWorkBasicDetails;