import React, { useRef, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { colors } from '../../../../../../../assects/colors';
import fonts from '../../../../../../../assects/fonts';
import { iosOpacity, width } from '../../../../../../../assects/strings';
import { ButtonComponent } from '../../../../../../../component';
import routes from '../../../../../../../routes/routes';
import { BorderDashedIcon, GuitarIcon } from '../../../../../assects/icons';

function OngoingAttendance({ navigation, route }) {
    const dateStripRef = useRef();
    const [allDate, setAllDate] = useState(new Date())
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


 




    return (
        <View style={{ flex: 1, backgroundColor: colors.white }} >
            <FlatList 

            data={homeworkData} 
            renderItem={({ item, index }) => {
                return (
                    <View style={[{ width: width / 1.10, height: width / 2, padding: 15, elevation: 1, backgroundColor: colors.white, marginVertical: 10, alignSelf: "center", borderRadius: 10 }, iosOpacity]} >
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }} >
                            <GuitarIcon width={width / 18} height={width / 15} />
                            <Text style={{ fontFamily: fonts.PoppinsSemiBold, marginLeft: 10 }} >{item.title}</Text>
                        </View>
                        <Text style={{ fontFamily: fonts.PoppinsLight, fontSize: 12, color: colors.D6D6D, marginTop: 5 }} >{item.desc}</Text>
                        <BorderDashedIcon width={width / 1.20} height={width / 20} />
                        <View style={{ flexDirection: "row" }} >
                            <View  >
                                <Text style={{ fontFamily: fonts.PoppinsRegular, fontSize: 11, color: colors.transBlack }} >Pending</Text>
                                <Text style={{ fontFamily: fonts.PoppinsSemiBold, fontSize: 12, color: colors.yellow }} >{item.pending}</Text>
                            </View>
                            <View  >
                                <Text style={{ fontFamily: fonts.PoppinsRegular, fontSize: 11, color: colors.transBlack }} >Submit</Text>
                                <Text style={{ fontFamily: fonts.PoppinsSemiBold, fontSize: 12, color: colors.darkGreen }} >{item.submit}</Text>
                            </View>
                        </View>
                    </View>
                )

            }} />
        </View>
    )
}
export default OngoingAttendance;