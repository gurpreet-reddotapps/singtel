import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import RNPickerSelect from 'react-native-picker-select';
import CustomButton from '../../Components/CustomButton';
import { useSelector, useDispatch } from 'react-redux';
import { ShowErrorMessage, ShowSuccessMessage } from '../../../../component';
import { AddNewEstimateAPI, EstimateQtyAPI } from '../../api';
import Spinner from '../../Components/Spinner';
import { windowHeight } from '../../utils/Dimension';
import { ShowTopErrorMessage } from '../../Components/FlashMessage';

const MATERIAL_LABOUR = [{ label: 'Material', value: 'Material', key: "0" }, { label: 'Labour', value: 'Labour', key: "1" }];

const NewMateraial = (props) => {
    const [product, setProduct] = useState("")
    const [ProductNameData, setProductNameData] = useState("")
    const [type, setType] = useState("")
    const [price, setPrice] = useState()
    const [sellingPrice, setSellingPrice] = useState("")
    const [quantity, setQuantity] = useState()
    const [addingInProcess, setAddingInProcess] = useState(false)
    const [Loading, setLoading] = useState(false)
    const [PrdductID, setPrdductID] = useState(false)
    const [addObjData, setAddObjData] = useState({
        material_type: "",
        product_id: "",
        product_name: "",
        price: "",
        selling_price: "",
        quantity: "",
        amount: "",
        status: "",
        created_by: "",
        time: "",
    })

    const ProductDropDownData = props.DropDownData;
    // console.log('DROP DOWN :', ProductDropDownData);
    // const { orderId } = useSelector(state => state.userReducer);
    const { orderId } = useSelector(state => state.JobDetails);
    const { homeData } = useSelector(state => state.homeDetails);



    const tapfForLog = async () => {
        ProductDropDownData && setProductNameData(ProductDropDownData.map(
            item => ({ label: item.product_name, value: item.product_name, key: item.category_id })
        ))
        // console.log(ProductNameData, "WHAT !!!!");
    }


    useEffect(() => {
        tapfForLog();
    }, []);


    const setpriceFunc = () => {

        ProductDropDownData.map(e => {
            if (product === e.product_name) {
                setPrice(e.price)
                addObjData.product_name = e.product_name;
                addObjData.product_id = e.id;
                setPrdductID(e.id)
            }
        })
    }


    useEffect(() => {
        setpriceFunc();
    }, [product]);


    const CheckQTY = () => {
        setLoading(true)
        if (quantity == undefined || quantity == 0 || PrdductID == undefined) {
            setLoading(false)
            return ShowTopErrorMessage("Please fill all the feilds")
        } else {
            let data = {
                product_id: parseInt(PrdductID),
                quantity: parseInt(quantity)
            }

            // console.log(data, "CHECK QTY");

            EstimateQtyAPI(data).then((res) => {
                console.log(res?.data, "Response");
                if (res?.data?.success == true) {
                    setLoading(false)
                     props?.closeIt()
                    return AddEstimateMaterial()
                } else if (res?.data?.success == false) {
                    let showFinalVal = res?.data?.stock_in_hand - Math.abs(res?.data?.reserved_quantity);
                    if (showFinalVal < 0) {
                        props?.closeIt()
                        return ShowErrorMessage(`${res?.data?.message} Avialbe Quantity 0`)
                    } else {
                        props?.closeIt()
                        return ShowErrorMessage(`${res?.data?.message} Avialbe Quantity ${showFinalVal}`)
                    }
                }
            }).catch(err => { return err; });
        }

    }


    const AddEstimateMaterial = async () => {

        // setLoading(true)
        console.log(type);
        // if (type === "" || product === "") {
        //     ShowErrorMessage("please Fill all the detail")
        // } else {



        if (quantity == null) {
            ShowTopErrorMessage("please fill the quantity detail")
        } else {
            const SELLING_PRICE = sellingPrice === "" ? price : sellingPrice;
            setAddObjData(
                addObjData.material_type = "Material",
                addObjData.price = SELLING_PRICE,
                addObjData.selling_price = SELLING_PRICE,
                addObjData.quantity = parseInt(quantity),
                addObjData.amount = parseInt(quantity) * SELLING_PRICE,
                addObjData.status = 0,
                addObjData.created_by = homeData?.user?.name,
                addObjData.time = new Date(),
            )
            console.log("IT IS THE OBJ DATA", addObjData);

            let data = {
                order_id: orderId,
                new_material: addObjData,
            }


            AddNewEstimateAPI(data).then((res) => {
                props.closeIt()
                console.log("----------->", res?.data?.materials);
                props.renderAddedMaterial(res?.data?.materials)
                ShowSuccessMessage("added the Material")
                setLoading(false)
                return res;
            }).catch(err => { return err; });

            setLoading(false)
            console.log("IT IS THE OBJ DATA", addObjData);
        }
        setSellingPrice("")
        setAddObjData({});
    };


    return (
        <>
            {Loading == true ? <Spinner style={{ height: windowHeight / 2 }} /> :

                <View style={styles.bottomSheetWrapper} >
                    {/* <Text style={styles.TextColor} >Select material</Text>

                    <RNPickerSelect
                        useNativeAndroidPickerStyle={false}
                        onValueChange={(value) => setType(value)}
                        style={pickerSelectStyles}
                        items={MATERIAL_LABOUR}
                    /> */}

                    <Text style={styles.TextColor} >Product Name</Text>
                    <RNPickerSelect
                        useNativeAndroidPickerStyle={false}
                        onValueChange={(value) => { setProduct(value); console.log(value) }}
                        style={pickerSelectStyles}
                        items={ProductNameData}
                    />
                    <Text style={styles.TextColor} >Price</Text>
                    <TextInput
                        // style={{ height: 55, backgroundColor: '#fff', fontSize: 16, borderRadius: 5, paddingHorizontal: 10, paddingVertical: 10, color: '#000' }}
                        style={styles.TextInputStyles}
                        placeholder="Enter the number"
                        onChangeText={text => setSellingPrice(text)}
                        autoCorrect={false}
                        keyboardType='numeric'
                        autoCapitalize="none"
                    >
                        {price}
                    </TextInput>

                    <Text style={styles.TextColor} >Quantity</Text>
                    <TextInput
                        // style={{ height: 55, backgroundColor: '#fff', fontSize: 16, borderRadius: 5, paddingHorizontal: 10, paddingVertical: 10, marginBottom: 10, color: '#000' }}
                        style={styles.TextInputStyles}
                        placeholder="Enter the number"
                        onChangeText={text => setQuantity(text)}
                        autoCorrect={false}
                        // keyboardType="email-address"
                        keyboardType='numeric'
                        autoCapitalize="none"
                    >
                        {quantity}
                    </TextInput>
                    {
                        addingInProcess === true ?
                            <CustomButton onPress={() => CheckQTY()}
                                style={{ width: '100%', marginTop: 5, }}
                                // disabled={true}
                                // disabled={addingInProcess === true ? true 1}
                                title="Add new material" />
                            :

                            <CustomButton onPress={() => CheckQTY()}
                                style={{ width: '100%', marginTop: 10, }}
                                title="Add new material" />
                    }

                </View>
            }
        </>
    )
}

export default NewMateraial




const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 10,
        // borderWidth: 1,
        borderRadius: 10,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        backgroundColor: '#fff',
        borderColor: 'rgba(0, 110, 233, 0.2)',
        borderWidth: 1,
        marginBottom: 20,
        shadowColor: 'rgba(0, 110, 233, 0.02)',
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

    inputAndroid: {
        fontSize: 14,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderColor: 'rgba(0, 110, 233, 0.2)',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#fff',
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        marginBottom: 15,
        shadowColor: 'rgba(0, 110, 233, 0.02)',
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
});


const styles = StyleSheet.create({
    bottomSheetWrapper: {
        width: '100%',
        height: '100%',
        padding: '5%',
        // backgroundColor: 'red',
    },
    TextColor: {
        fontSize: 15,
        paddingVertical: 5,
        color: "#000",
    },
    TextInputStyles: {
        height: 50,
        backgroundColor: '#fff',
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 15,
        color: '#000',
        borderColor: 'rgba(0, 110, 233, 0.2)',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: 'rgba(0, 110, 233, 0.02)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 8,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 20,
        shadowOpacity: 0.25,

    }
});