import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, SafeAreaView,Modal ,ScrollView} from 'react-native';
import { useDispatch } from 'react-redux';
import { AllCustomerForOrder, assignFcmToken, getHomeDetails, login } from '../../api';
import { colors } from '../../assects/colors';
import fonts from '../../assects/fonts';
import { BigfootLogoIcon, EmailIcon, LockIcon } from '../../assects/Icons';
import { height, width } from '../../assects/strings';
import { ButtonComponent, LoaderComponet, ShowErrorMessage, ShowSuccessMessage } from '../../component';
import CustomButton from '../../component/CustomButton';
import CustomHeader from '../../component/CustomHeader';
import CustomTextInput from '../../component/CustomTextInput';
import { setHomeData, setUserCheckInStatus } from '../../redux/actions/Home';
import { storeUserDetails } from '../../redux/actions/users';

const ContactSupport = ({ navigation, route }) => {
    const [name, setName] = useState("");
    const [ic, setIc] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [explainIssue, setExplainIssue] = useState("");

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

   
    const ContactSupport = () =>{
        if(name && ic && employeeId && phoneNumber && explainIssue){
            setLoading(true)
            setTimeout(()=>{
            setLoading(false)
                ShowSuccessMessage("Thankyou.\nYour message has been received.\nWe will get back to you.")
                navigation.goBack()
            },1000)
        }
        else{
           name==""?setName(null):null
           ic==""?setIc(null):null
           employeeId==""?setEmployeeId(null):null
           phoneNumber==""?setPhoneNumber(null):null
           explainIssue==""?setExplainIssue(null):null
            ShowErrorMessage("All fields are mendotry")
        }
      
    }
    return (
        <View style={styles.container} >
            <CustomHeader backIcon title={"Contact support"} />
           
                    <ScrollView style={{width:width,backgroundColor:colors.white,paddingTop:20}} >
                        <View style={{alignSelf:"center",marginVertical:5}} >
                            <Text style={{color:colors.B212529,fontFamily:fonts.PoppinsRegular}} >Name</Text>
                            <TextInput onChangeText={(text)=> setName(text)} style={{width:width/1.20,paddingLeft:10,height:width/8.5,color:colors.B212529,borderColor:name==null?colors.warningRed:colors.primaryColor,borderWidth:1,borderRadius:10,marginVertical:5}} />
                        </View>
                        <View style={{alignSelf:"center",marginVertical:5}} >
                            <Text style={{color:colors.B212529,fontFamily:fonts.PoppinsRegular}} >Ic</Text>
                            <TextInput onChangeText={(text)=> setIc(text)} style={{width:width/1.20,paddingLeft:10,height:width/8.5,color:colors.B212529,borderColor:ic==null?colors.warningRed:colors.primaryColor,borderWidth:1,borderRadius:10,marginVertical:5}} />
                        </View>

                        <View style={{alignSelf:"center",marginVertical:5}} >
                            <Text style={{color:colors.B212529,fontFamily:fonts.PoppinsRegular}} >Employee Id</Text>
                            <TextInput onChangeText={(text)=> setEmployeeId(text)} style={{width:width/1.20,paddingLeft:10,height:width/8.5,color:colors.B212529,borderColor:employeeId==null?colors.warningRed:colors.primaryColor,borderWidth:1,borderRadius:10,marginVertical:5}} />
                        </View>

                        <View style={{alignSelf:"center",marginVertical:5}} >
                            <Text style={{color:colors.B212529,fontFamily:fonts.PoppinsRegular}} >Phone number</Text>
                            <TextInput onChangeText={(text)=> setPhoneNumber(text)} style={{width:width/1.20,paddingLeft:10,height:width/8.5,color:colors.B212529,borderColor:phoneNumber==null?colors.warningRed:colors.primaryColor,borderWidth:1,borderRadius:10,marginVertical:5}} />
                        </View>
                        <View style={{alignSelf:"center",marginVertical:5}} >
                            <Text style={{color:colors.B212529,fontFamily:fonts.PoppinsRegular}} >Explain your issue</Text>
                            <TextInput multiline onChangeText={(text)=> setExplainIssue(text)} style={{width:width/1.20,paddingLeft:10,height:width/5,textAlign:"left",textAlignVertical:"top",color:colors.B212529,borderColor:explainIssue==null?colors.warningRed:colors.primaryColor,borderWidth:1,borderRadius:10,marginVertical:5}} />
                        </View>
                    </ScrollView>

                    <ButtonComponent onPress={()=> ContactSupport()} title={"Send"} bgColor={colors.primaryColor} style={{width:width/1.20,marginBottom:20}} />
              
            <LoaderComponet visible={loading} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", backgroundColor: colors.white },
    text1: { fontFamily: fonts.PoppinsMedium, color: colors.placeHolderTextColor, fontSize: 16, marginTop: 10 },
    text2: { fontFamily: fonts.PoppinsMedium, color: colors.black, marginTop: width / 10, marginBottom: 20 },
    forgotPassword: { width: width / 1.10, fontFamily: fonts.PoppinsMedium, color: colors.transPrimary60, textAlign: "right", marginBottom: width / 20, fontSize: 10 }
})
export default ContactSupport;