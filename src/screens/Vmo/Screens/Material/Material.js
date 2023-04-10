import { View, Text, StatusBar, StyleSheet, SafeAreaView, FlatList, Pressable, ImageBackground, Image } from 'react-native'
import React, { useEffect, useState, useRef } from 'react';
import VMOCustomHeader from '../../Components/VMOCustomHeader'
import Images from '../../assets/Images';
import fonts from '../../../../assects/fonts';
import { Colors } from '../../Constant/Colors';
import MaterialItem from './MaterialItem';
import { BulkMaterialAPI, GetMaterialAPI } from '../../api';
import { useSelector, useDispatch } from 'react-redux';
import { setMaterialDetail } from '../../../../redux/actions/Material';
import Spinner from '../../Components/Spinner';
import { windowHeight } from '../../utils/Dimension';
import CustomButton from '../../Components/CustomButton';


const Material = (props) => {
    const { materialStatus } = useSelector(state => state.MateralDetail);
    const { orderId } = useSelector(state => state.JobDetails);
    const { homeData } = useSelector(state => state.homeDetails);
    const [materialData, setMaterialData] = useState();
    const [loading, setloading] = useState(false);
    const [selectedItem, setSelectedItem] = useState([]);
    const [totalQuantityToCollect, setTotalQuantityToCollect] = useState([]);
    const [bulkMaterial, setBulkMaterial] = useState(false);
    const [allCollect, setAllCollect] = useState(false);
    const [allCollectData, setAllCollectData] = useState();
    const [selectAllData, setSelectAllData] = useState([]);
    const dispatch = useDispatch();


    const LoadData = async () => {
        console.log('Load dtaa chala');
        setloading(true)
        let data = { order_id: orderId }

        GetMaterialAPI(data).then((res) => {
            console.log(res?.data, "Get Material API");
            const DATA = res?.data?.materials;
            setMaterialData(DATA);
            console.log(res?.data?.materials, 'THIS IS THE MATERIAL API NAME');
            DATA.map(obj => {
                dispatch(setMaterialDetail(obj));
            });
            setloading(false)
            return res?.data;
        }).catch(err => { return err; });
    };

    useEffect(() => {
        LoadData();
    }, []);

    const BulkObject = (val) => {

        if (selectAllData.some(item => item.product_id === val?.product_id)) {
            console.log("INSIDE IF");
            const newListItem = selectAllData?.filter(Item => Item?.product_id !== val?.product_id);
            console.log(newListItem, "FILTERD CAR DATA");
            setSelectAllData(newListItem);
            console.log(selectAllData, "selectedItem");
        }
        else {
            console.log("INSIDE ELSE");
            let itemData = {
                product_id: val?.product_id,
                quantity_collection_request: val.quantity_requested - val.quantity_collected,
            }
            setSelectAllData([...selectAllData, itemData]);
            console.log(selectAllData, "selectedItem");
        }
    }

    const tapForLog = () => {
        console.log(selectAllData, "SHOW THE DATA");
        console.log(selectAllData.length, "length");
        setSelectAllData([])
        console.log(selectAllData.length, "length");
    }

    const CollectAll = () => {
        let data = {
            order_id: orderId,
            product_ids: selectAllData
        }
        BulkMaterialAPI(data).then((res) => {
            console.log(res, "Total Response");
            console.log(res?.data, "Data");
            if (res?.data?.success == true) {
                setSelectAllData([])
                LoadData()
            }
        }).catch(err => { return err; });

    }


    const renderItem = ({ item, index }) => (
        <MaterialItem item={item} updatedMaterialData={materialData} refreshData={LoadData} BulkObject={BulkObject}
        />
    );

    return (
        <SafeAreaView style={styles.MaterialWrapper} >
            <StatusBar barStyle="dark-content" backgroundColor="#155B9F" translucent={false} />
            <VMOCustomHeader title={"Materials"} backIcon />
            {loading === true ? <Spinner style={{ height: windowHeight }} />
                :
                <>
                    <View style={{ marginBottom: 80 }} >
                        <FlatList
                            data={materialData}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            ListFooterComponentStyle={{ height: 10 }}
                            ListFooterComponent={<View style={{ marginBottom: 50 }} ></View>}
                        />
                    </View>
                    {selectAllData.length === 0 ?
                        null :
                        <CustomButton title={"Collect All"} onPress={() => { CollectAll() }} style={{ flex: 1, width: '90%', bottom: 20, position: 'absolute' }} />
                    }
                    {/* <CustomButton title={"Collect All"} onPress={() => { tapForLog() }} style={{ flex: 1, width: '90%', bottom: 20, position: 'absolute' }} /> */}
                </>
            }

        </SafeAreaView>
    )
}

export default Material

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
    CardHeading: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: fonts.PoppinsSemiBold,
        color: Colors.Pure_White,
    },
    totalPadding: {
        paddingHorizontal: '5%',
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
        // padding: 5,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingVertical: '2%',
        // paddingHorizontal: '5%',
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
        fontFamily: fonts.PoppinsRegular,
    },
    cardTextBlack: {
        fontSize: 14,
        lineHeight: 22,
        fontFamily: fonts.PoppinsMedium,
        color: '#000',
        marginVertical: 8,
        // paddingVertical: 5,
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
    BottomLine: {
        borderBottomColor: "rgba(38, 114, 171, 0.2)",
        borderBottomWidth: 0.5,
        alignSelf: 'center',
        width: '85%',
    },
    twoItem: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 5,
    },
    ItemStyle: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: '50%',
    },
    twoItemButton: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
    },
    ItemStyleButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        paddingVertical: 10,
    },
    DownCTAText: {
        fontSize: 16,
        lineHeight: 20,
        fontFamily: fonts.PoppinsSemiBold,
        color: '#155B9F',
        marginVertical: 8,
    },
    DownCTATextRed: {
        fontSize: 16,
        lineHeight: 20,
        fontFamily: fonts.PoppinsSemiBold,
        color: '#AE282E',
        marginVertical: 8,
    },
})