import { View, Text, SafeAreaView, StyleSheet, Image, ImageBackground, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import VMOCustomHeader from '../../Components/VMOCustomHeader'
import { Colors } from '../../Constant/Colors'
import fonts from '../../../../assects/fonts'

const TermsCondition = () => {
    return (
        <SafeAreaView style={styles.TermsConditionWrapper} >
            <VMOCustomHeader title={"Terms & conditions"} backIcon />
            <View style={styles.TermsConditionContentWrapper} >
                <Text style={styles.TremsText} >Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mauris cursus id convallis maecenas sollicitudin pellentesque nunc. Vel pellentesque enim quam non suspendisse. Accumsan, sem eros hac ut lacus sit imperdiet eu tempus. Turpis facilisis cras aliquet sit ipsum felis, at accumsan. Aliquam mauris consequat sed tortor, blandit sit purus. Nisl volutpat risus, pretium integer. Venenatis, tellus blandit viverra in elementum eleifend imperdiet.
                </Text>
                <Text style={styles.TremsText} >Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mauris cursus id convallis maecenas sollicitudin pellentesque nunc. Vel pellentesque enim quam non suspendisse. Accumsan, sem eros hac ut lacus sit imperdiet eu tempus. Turpis facilisis cras aliquet sit ipsum felis, at accumsan. Aliquam mauris consequat sed tortor, blandit sit purus. Nisl volutpat risus, pretium integer. Venenatis, tellus blandit viverra in elementum eleifend imperdiet.
                </Text>

                <Text style={styles.TremsText} >Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mauris cursus id convallis maecenas sollicitudin pellentesque nunc. Vel pellentesque enim quam non suspendisse. Accumsan, sem eros hac ut lacus sit imperdiet eu tempus. Turpis facilisis cras aliquet sit ipsum felis, </Text>
            </View>
        </SafeAreaView>
    )
}

export default TermsCondition


const styles = StyleSheet.create({
    TermsConditionWrapper: {
        flex: 1,
        backgroundColor: Colors.Pure_White,
    },
    TermsConditionContentWrapper: {
        flex: 1,
        paddingHorizontal: '5%',
        paddingVertical: '5%',
    },
    TremsText: {
        fontSize: 14,
        fontFamily: fonts.PoppinsRegular,
        lineHeight: 21,
        color: '#000',
        paddingBottom: '10%',
    },

})