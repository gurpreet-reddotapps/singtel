import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/Feather';
import fonts from '../../../assects/fonts';
import { Colors } from '../Constant/Colors';
import { windowHeight, windowWidth } from '../utils/Dimension';


// onChangeText={changedText}
const FormInput = ({ style, newHeading, InputSubject, newHeadingColor, labelValue, placeholderText, iconType, changedText, isPassword, headingTextColor, fontsize, ...rest }) => {
  return (
    <>
      {newHeading ?
        <Text style={[styles.TextColor, { color: newHeadingColor ? newHeadingColor : Colors.primary_Color }]} >{newHeading}</Text>
        :
        <Text style={[styles.Subjectstyle, { color: headingTextColor, fontSize: fontsize }]} >{InputSubject} </Text>
      }
      <View style={[styles.inputContainer, style]}>
        {
          iconType ?
            <View style={styles.iconStyle}>
              <AntDesign name={iconType} size={20} color="#666" />
            </View>

            :
            null
        }
        <TextInput
          value={labelValue}
          onChangeText={changedText}
          style={styles.input}
          numberOfLines={1}
          placeholder={placeholderText}
          placeholderTextColor="#666"
          {...rest}
        />
      </View>
    </>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height: windowHeight / 15,
    borderColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: 'rgba(0, 110, 233, 0.2)',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: 'rgba(0, 110, 233, 0.02)',
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 25,
    shadowOpacity: 0.25,
  },
  Subjectstyle: {
    color: '#000',
    fontSize: 16,
  },
  TextColor: {
    fontSize: 14,
    paddingVertical: 10,
    color: Colors.primary_Color,
    fontFamily: fonts.PoppinsMedium,
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    width: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
    // fontFamily: 'DM Sans',
    color: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
});
