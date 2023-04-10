import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { windowHeight, windowWidth } from '../utils/Dimension';

const FormButton = ({ buttonTitle, ...rest }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} {...rest}>
      <Text style={styles.buttonText} {...rest}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    height: windowHeight / 15,
    backgroundColor: '#004A7F',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    // shadowColor: 'rgba(46, 229, 157, 0.4  )',
    // shadowOpacity: 1.5,
    // elevation: 8,
    // shadowRadius: 20 ,
    // shadowOffset : { width: 1, height: 13},
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
    // fontFamily: 'DMSans-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});