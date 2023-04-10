import React, { useRef, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { addRemarkOnTrial } from '../../../api';
import { colors } from '../../../assects/colors';
import fonts from '../../../assects/fonts';
import { width } from '../../../assects/strings';
import { ButtonComponent, LoaderComponet } from '../../../component';
import { MultiplyIcon } from '../assects/icons';

function TrialsRemark({ navigation, route }) {
    const dateStripRef = useRef();
    const [allDate, setAllDate] = useState(new Date())
    const [remark, setRemark] = useState("")
    const [loading, setLoading] = useState(false)




    function AddRemarkOnTrial() {
        const data = {
            remark: remark,
            status: "completed"
        }
        console.log("ASDKJSDKJ",)
        setLoading(true)
        addRemarkOnTrial(route.params?.id, data).then((res) => {
            setLoading(false)
            console.log("SDL:KJSDKJSLKDJSKD", res.data)
            navigation.goBack();
        })
    }
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-end", paddingBottom: width / 10, backgroundColor: colors.transBlack60 }} >
            <View style={{ width: width / 1.15, height: width, backgroundColor: colors.white, borderRadius: 10 }} >
                <Pressable onPress={() => navigation.goBack()} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 12 }}  >
                    <Text style={{ fontFamily: fonts.PoppinsMedium, fontSize: 16, color: colors.B212529 }} ></Text>
                    <Text style={{ fontFamily: fonts.PoppinsSemiBold, fontSize: 16, color: colors.B212529 }} >Remarks</Text>
                    <MultiplyIcon width={width / 25} height={width / 25} />
                </Pressable>

                <TextInput
                    placeholder='Type here...'
                    multiline
                    value={remark}
                    onChangeText={(text) => setRemark(text)}
                    placeholderTextColor={colors.placeHolderTextColor}
                    style={{ flex: 1, textAlign: "left", textAlignVertical: "top", color: colors.B212529, padding: 15, margin: 10, borderRadius: 10, borderWidth: 1, borderColor: colors.CB7B7B733 }} />
                <ButtonComponent onPress={() => AddRemarkOnTrial()} title={"Save"} bgColor={colors.primaryColor} style={{ width: width / 1.30, alignSelf: "center" }} />
            </View>
            <LoaderComponet visible={loading} />
        </View>
    )
}
export default TrialsRemark;