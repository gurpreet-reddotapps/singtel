import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { colors } from '../../assects/colors';
import { width } from '../../assects/strings';

const SignupScreen = ({ navigation }) => {
    const [email,setEmail] = useState("");

    return (
        <ScrollView showsVerticalScrollIndicator={false}  style={{flex:1,backgroundColor:colors.white}} >
       
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", backgroundColor: colors.primaryColor },
    imageView: { width: width / 2, height: width / 2 }
})
export default SignupScreen;