import { View, Text, SafeAreaView, StyleSheet, Image, Pressable, FlatList } from 'react-native'
import React, { useState } from 'react'
import VMOCustomHeader from '../../Components/VMOCustomHeader'
import { Colors } from '../../Constant/Colors'
import Images from '../../assets/Images'
import { windowHeight, windowWidth } from '../../utils/Dimension'
import EnIcon from 'react-native-vector-icons/Entypo';
import fonts from '../../../../assects/fonts'
import { useNavigation } from '@react-navigation/native'
import NavigationString from '../../routes/NavigationString'
import CustomButton from '../../Components/CustomButton'
import { setLogOut } from '../../../../redux/actions/users'
import { useDispatch } from 'react-redux';
import { PrivacySVG, ProfileSVG, SettingChatSVG, SettingSupportSVG, TermSVG, UploadCloud } from '../../assets/Icons'



const Settings = () => {

  const navigation = useNavigation()

  const TileData = [{ icon: ProfileSVG, tileTittle: "My Profile", screen: NavigationString.PROFILE_SCREEN },
  { icon: SettingChatSVG, tileTittle: "My Chats", screen: NavigationString.MY_CHATS },
  { icon: TermSVG, tileTittle: "Terms & Conditions", screen: NavigationString.TERMSCONDITION_SCREEN },
  { icon: PrivacySVG, tileTittle: "Privacy Policy", screen: NavigationString.TERMSCONDITION_SCREEN },
  { icon: SettingSupportSVG, tileTittle: "Support", screen: NavigationString.SUPPORT_SCREEN },
  ]


  return (
    <SafeAreaView style={styles.SettingsWrapper} >
      <VMOCustomHeader title={"Settings"} />
      <View style={styles.settingsContentWrapper} >
        <View style={styles.logoWrapper} >
          <Image source={Images.logo} />
        </View>
        <FlatList
          data={TileData}
          renderItem={({ item, index }) => {
            return (
              <Pressable style={styles.tilesWrapper} onPress={() => navigation.navigate(item.screen)} >
                <View style={styles.tileStyle} >
                  <View style={styles.tileIcon} >
                    <item.icon width={30} height={30} />
                  </View>
                  <Text style={styles.TileHeading} >{item.tileTittle}</Text>
                  <EnIcon name='chevron-right' size={20} color="#505050" style={styles.ArrowIcon} />
                </View>
              </Pressable>
            )
          }
          }
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  )
}

export default Settings


const styles = StyleSheet.create({
  SettingsWrapper: {
    flex: 1,
    backgroundColor: Colors.Pure_White,
  },
  settingsContentWrapper: {
    flex: 1,
    paddingHorizontal: '3%',
  },
  logoWrapper: {
    width: '100%',
    height: windowHeight / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tilesWrapper: {
    width: '100%',
    paddingHorizontal: '2%',
    paddingVertical: '2%',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 20,
    shadowOpacity: 0.25,
  },
  tileStyle: {
    backgroundColor: ' rgba(21, 91, 159, 0.06)',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '2%',
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
  },
  tileIcon: {
    backgroundColor: 'rgba(21, 91, 159, 0.15)',
    padding: 15,
    borderRadius: 10,
    alignSelf: 'center',
  },
  TileHeading: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: '2%',
    marginHorizontal: '5%',
    lineHeight: 24,
    fontFamily: fonts.PoppinsSemiBold,
    color: "#212529",

  },
  ArrowIcon: {
    padding: 15,
    borderRadius: 10,
    alignSelf: 'center',
  },
})