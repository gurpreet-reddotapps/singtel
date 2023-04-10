import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Colors } from '../Constant/Colors';

const Spinner = ({ size = 30, color = Colors.primary_Blue, style }) => {
    return <ActivityIndicator size={size} color={color} style={style} />;
};

export default Spinner;
