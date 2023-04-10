import { View, Text, StatusBar, StyleSheet, SafeAreaView, FlatList, Pressable, ImageBackground, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import VMOCustomHeader from '../../Components/VMOCustomHeader'
import Images from '../../assets/Images';
import fonts from '../../../../assects/fonts';
import { Colors } from '../../Constant/Colors';

import { useIsFocused, useNavigation } from '@react-navigation/native';
import CustomButton from '../../Components/CustomButton';
import QuotationCard from './QuotationCard';
import { useSelector, useDispatch } from 'react-redux';
import { FetchQuotationListAPI } from '../../api';
import Spinner from '../../Components/Spinner';
import { windowHeight } from '../../utils/Dimension';
import NavigationString from '../../routes/NavigationString';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


const Quotations = (props) => {
    const navigation = useNavigation()

    const { orderId } = useSelector(state => state.JobDetails);
    const [customerQuotation, setCustomerQuotation] = useState();
    const [loading, setloading] = useState(false);
    const isFocused = useIsFocused();


    const LoadData = async () => {
        let data = {
            order_id: orderId,
        }
        setloading(true)
        FetchQuotationListAPI(data).then((res) => {
            setloading(false)
            console.log(res?.data);
            setCustomerQuotation(res?.data?.customer_quotes)
            return res;
        }).catch(err => {
            setloading(false);
            return err;
        });
    };

    useEffect(() => {
        LoadData();
    }, []);

    useEffect(() => {
        LoadData()
    }, [isFocused]);



    const renderItem = ({ item, index }) => (
        console.log("HERE")
    );

    return (
        <SafeAreaView style={styles.MaterialWrapper} >
            <StatusBar barStyle="dark-content" backgroundColor="#155B9F" translucent={false} />
            <VMOCustomHeader title={"Quotations"} backIcon />
            {loading == true ?
                <SkeletonPlaceholder>
                    <ScrollView style={styles.ShadowStyle} >
                        <View style={styles.ThirdShadow} />
                        <View style={styles.ThirdShadow} />
                        <View style={styles.ThirdShadow} />
                        <View style={styles.ThirdShadow} />
                        <View style={styles.ThirdShadow} />
                    </ScrollView>
                </SkeletonPlaceholder>
                :
                <View style={styles.QuoteWrapper} >
                    <FlatList
                        data={customerQuotation}
                        // renderItem={renderItem}
                        renderItem={
                            ({ item, index }) => (
                                <QuotationCard item={item} loadData={LoadData} />
                            )
                        }
                        keyExtractor={(item, index) => index.toString()}
                        ListFooterComponentStyle={{ height: 10 }}
                        ListFooterComponent={<View></View>}
                    />

                    <CustomButton title={"Add new quote"} onPress={() => { navigation.navigate(NavigationString.NEW_QUOTATION) }} style={{ width: '95%', marginBottom: '5%', }} />
                </View>
            }
        </SafeAreaView>

    )
}

export default Quotations



const styles = StyleSheet.create({
    MaterialWrapper: {
        flex: 1,
    },
    UpperCardArea: {
        backgroundColor: '#FFA600',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '5%',
        paddingVertical: '4%',
    },
    QuoteWrapper: {
        width: '100%',
        alignSelf: 'center',
        flex: 1,
    },
    CardHeading: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: fonts.PoppinsSemiBold,
        color: Colors.Pure_White,
    },
    FuelCardAreaNNT: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        margin: 15,
        overflow: "hidden",
        shadowColor: '#777777',
        shadowOpacity: 0.5,
        elevation: 8,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 50,
        shadowOpacity: 0.25,
    },
    MarginPaddingView: {
        paddingHorizontal: 10,
    },
    EngineImageView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    EngineImage: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    JobDetails: {
        flexDirection: 'row',
        width: "100%",
        justifyContent: "space-between",
        padding: 5,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingVertical: '2%',
        paddingHorizontal: '5%',
    },
    JobDate: {
        justifyContent: "space-between",
    },
    StartDate: {
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    UpperText: {
        padding: 5,
    },
    cardTextGrey: {
        fontSize: 12,
        lineHeight: 16,
        color: '#777',
        fontWeight: '400',
        fontFamily: fonts.PoppinsRegular,
    },
    cardTextBlack: {
        fontSize: 14,
        lineHeight: 16,
        fontFamily: fonts.PoppinsMedium,
        color: '#000',
        marginVertical: 8,
    },
    CenterCardTextBlack: {
        fontSize: 14,
        lineHeight: 16,
        justifyContent: "center",
        fontFamily: fonts.PoppinsMedium,
        textAlign: 'center',
        color: '#000',

    },
    FuelCardText: {
        fontSize: 13,
        lineHeight: 20,
        fontFamily: fonts.PoppinsMedium,
        color: '#000',
    },
    StatusText: {
        fontSize: 14,
        lineHeight: 20,
        fontFamily: fonts.PoppinsMedium,
        lineHeight: 25,
    },
    ShadowStyle: {
        // alignItems: "center",
        width: '90%',
        alignSelf: 'center',
        height: windowHeight,
        paddingHorizontal: 5,
    },
    ThirdShadow: {
        width: '100%',
        marginTop: 20,
        marginBottom: 20,
        marginRight: 20,
        justifyContent: 'flex-end',
        height: 140,
        borderRadius: 10,
    },
})