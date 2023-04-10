import { View, Text, StyleSheet, Platform, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../Constant/Colors'
import fonts from '../../../../assects/fonts'
import CustomButton from '../../Components/CustomButton'

const RemarkBottomSheet = (props) => {
    const [productRemark, setProductRemark] = useState()

    const sendRemark = (remark) => {
        console.log(remark);
        props.reamrkwithId(remark)
        props.CloseIT()
    }
    return (
        <>

            <View style={styles.EditReamrkWrapper} >
                <Text style={styles.TextColor} >Enter remark here</Text>
                {
                    Platform.OS === 'ios' ?
                        <TextInput
                            style={styles.iOSTextInput}
                            editable={true}
                            multiline={true}
                            numberOfLines={5} s
                            placeholderTextColor="#979797"
                            placeholder="Write in brief about accessories,warning lights on etc."
                            onChangeText={(remark) => setProductRemark(remark)}
                            backgroundColor="#fff"
                        >
                            {/* {productRemark} */}
                        </TextInput>
                        :
                        <TextInput
                            editable={true}
                            multiline={true}
                            style={styles.TextInputStyles}
                            numberOfLines={15}
                            placeholderTextColor="#979797"
                            placeholder="Write in brief about accessories,warning lights on etc."
                            onChangeText={(remark) => setProductRemark(remark)}
                            backgroundColor="#fff">
                            {/* {productRemark} */}
                        </TextInput>
                }

            <CustomButton title={"Add Remarks"} onPress={() => sendRemark(productRemark)} style={{ width: '100%' }} />
            </View>
        </>
    )
}

export default RemarkBottomSheet


const styles = StyleSheet.create({
    EditReamrkWrapper: {
        flex: 1,
        padding: '5%',
        height: '100%',
    },
    TextColor: {
        fontSize: 14,
        paddingVertical: 10,
        color: Colors.primary_Color,
        fontFamily: fonts.PoppinsMedium,
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
        height: 100,
        textAlignVertical: 'top',
    },

});



