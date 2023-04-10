import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { windowHeight, windowWidth } from '../../utils/Dimension';
import { Colors } from '../../Constant/Colors'
import Images from '../../assets/Images'
import fonts from '../../../../assects/fonts';
import { Checkbox } from 'react-native-paper';

const LeftTyres = ({ leftTyreVal }) => {
    const [ticked, setticked] = useState(false);


    const RenderTyre = (props) => {
        return (
            <View style={styles.SingleTyreWrapper} >
                <View style={styles.tyreImage} activeOpacity={0.6} >
                    <ImageBackground
                        source={Images.TruckTyreNine}
                        style={styles.tyreImage}
                        resizeMode="contain">
                        <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={styles.tyreText} >{props.TyreName}</Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.TyreCheck} >
                    <Checkbox
                        status={ticked ? 'checked' : 'unchecked'}
                        color="#155B9F"
                        uncheckedColor="#155B9F"
                        onPress={() => {
                            setticked(!ticked);
                        }}
                    />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.TyreWrapper} >
            <View style={styles.TyreView} >
                <View style={styles.TyyreHeading} >
                    <Text style={{ fontSize: 18, fontFamily: fonts.PoppinsSemiBold }} >Left Tyre</Text>
                </View>
                <View style={styles.singleTyreView} >
                    <RenderTyre TyreName={'F1'} />
                </View>
                <View style={styles.singleTyreView} >
                    <RenderTyre TyreName={'L1'} />
                    <RenderTyre TyreName={'L2'} />
                </View>
                <View style={styles.singleTyreView} >
                    <RenderTyre TyreName={'L3'} />
                    <RenderTyre TyreName={'L4'} />
                </View>
                <View style={styles.singleTyreView} >
                    <RenderTyre TyreName={'L5'} />
                    <RenderTyre TyreName={'L6'} />
                </View>
                <View style={styles.singleTyreView} >
                    <RenderTyre TyreName={'L7'} />
                    <RenderTyre TyreName={'L8'} />
                </View>
            </View>
            <View style={styles.TyreView} >
                <View style={styles.TyyreHeading} >
                    <Text style={{ fontSize: 18, fontFamily: fonts.PoppinsSemiBold }} >Right Tyre</Text>
                </View>
                <View style={styles.singleTyreViewFirst} >
                    <RenderTyre TyreName={'F2'} />
                </View>
                <View style={styles.singleTyreView} >
                    <RenderTyre TyreName={'R1'} />
                    <RenderTyre TyreName={'R2'} />
                </View>
                <View style={styles.singleTyreView} >
                    <RenderTyre TyreName={'R3'} />
                    <RenderTyre TyreName={'R4'} />
                </View>
                <View style={styles.singleTyreView} >
                    <RenderTyre TyreName={'R5'} />
                    <RenderTyre TyreName={'R6'} />
                </View>
                <View style={styles.singleTyreView} >
                    <RenderTyre TyreName={'R7'} />
                    <RenderTyre TyreName={'R8'} />
                </View>
            </View>
        </View>

    )
}

export default LeftTyres



const styles = StyleSheet.create({
    TyreWrapper: {
        flexDirection: 'row'
    },
    tyreImage: {
        justifyContent: "center",
        alignSelf: 'center',
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        zIndex: 6,
        // borderColor: "red",
        // borderWidth: 1,
        // borderRadius: 100,
        // backgroundColor: 'red',
        // textAlign: 'center',
        // flex: 1,
        // transform: [{ rotate: '-90deg' }],
    },
    TyreView: {
        height: windowHeight / 1.2,
        width: '50%',
        borderWidth: 1,
        borderColor: 'rgba(0, 110, 233, 0.2)',
    },
    TyreCheck: {
        borderRadius: 50,
        zIndex: 7,
        position: 'absolute',
        top: '-10%',
        right: '-10%',
        borderColor: "#3333",
        borderWidth: 5,
    },
    TyyreHeading: {
        height: '15%',
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        alignContent: 'center',
    },
    SingleTyreWrapper: {
        height: '100%',
        width: '50%',
        justifyContent: 'space-between',
        textAlign: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        // borderWidth: 5,
        // borderColor: "yellow",
        // flexDirection: 'row',
        // width: '100%',
        // height: '20%'
    },
    singleTyreViewFirst: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        height: '16%'
    },
    singleTyreView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '16%',
        // backgroundColor: 'pink',
    },
    tyreTextView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    tyreText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        borderRadius: 50,
        padding: 10,
        backgroundColor: Colors.primary_Blue,
    },
});

