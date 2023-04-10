import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import RNPickerSelect from 'react-native-picker-select';
import CustomButton from '../../Components/CustomButton';
import { useSelector, useDispatch } from 'react-redux';
import { ShowErrorMessage, ShowSuccessMessage } from '../../../../component';
import { AddNewEstimateAPI, EstimateQtyAPI, UpdateNewEstimateAPI } from '../../api';
import Spinner from '../../Components/Spinner';
import { windowHeight } from '../../utils/Dimension';
import { ShowTopErrorMessage } from '../../Components/FlashMessage';


const UpdateMaterial = (props) => {
    const [product, setProduct] = useState(product == "" || product == undefined ? props.item.product_name == "" ? "" : props.item.product_name : product)
    const [type, setType] = useState(type == "" || type == undefined ? props.item.material_type == "" ? "" : props.item.material_type : type)
    const [ProductNameData, setProductNameData] = useState("")
    const [price, setPrice] = useState()
    const [sellingPrice, setSellingPrice] = useState("")
    // const [quantity, setQuantity] = useState()
    const [quantity, setQuantity] = useState(quantity == "" || quantity == undefined ? props.item.quantity == "" ? "" : props.item.quantity : quantity)
    const [addingInProcess, setAddingInProcess] = useState(false)
    const [Loading, setLoading] = useState(false)
    const [PrdductID, setPrdductID] = useState(false)
    const [addObjData, setAddObjData] = useState({
        type: "",
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
    const { orderId } = useSelector(state => state.JobDetails);
    const { homeData } = useSelector(state => state.homeDetails);


    const MATERIAL_LABOUR = [{ label: 'Material', value: 'Material', key: "0" }, { label: 'Labour', value: 'Labour', key: "1" }];


    const tapfForLog = async () => {
        ProductDropDownData && setProductNameData(ProductDropDownData.map(
            item => ({ label: item.product_name, value: item.product_name, key: item.category_id })
        ))
    }


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
        tapfForLog();
        console.log("ITEMS", props.item);
    }, []);

    useEffect(() => {
        setpriceFunc();
    }, [product]);



    const CheckQTY = () => {
        setLoading(true)
        // console.log(product, "PRODUCT ID VALUE")
        console.log(quantity, "quantity ID VALUE")
        if (quantity == undefined || quantity == "" || quantity == 0 || PrdductID == undefined) {
            setLoading(false)
            return ShowTopErrorMessage("Please fill all the feilds")
        } else {
            let data = {
                product_id: parseInt(PrdductID),
                quantity: parseInt(quantity)
            }

            // console.log(data, "CHECK QTY");

            EstimateQtyAPI(data).then((res) => {
                console.log(res?.data, "Response for Update");
                if (res?.data?.success == true) {
                    setLoading(false)
                    props?.closeIt()
                    props?.closeOtherSheet()
                    return AddEstimateMaterial()
                } else if (res?.data?.success == false) {
                    let showFinalVal = res?.data?.stock_in_hand - Math.abs(res?.data?.reserved_quantity);
                    if (showFinalVal < 0) {
                        props?.closeIt()
                        props?.closeOtherSheet()
                        return ShowErrorMessage(`${res?.data?.message} Avialbe Quantity 0`)
                    } else {
                        props?.closeIt()
                        props?.closeOtherSheet()
                        return ShowErrorMessage(`${res?.data?.message} Avialbe Quantity ${showFinalVal}`)
                    }
                }
            }).catch(err => { return err; });
        }

    }



    const AddEstimateMaterial = async () => {


        // if (type === "" || product === "") {
        //     ShowErrorMessage("please Fill all the detail")
        // } else {
        setLoading(true)
        if (quantity == null || quantity == undefined) {
            ShowErrorMessage("please fill the quantity detail")
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
            setLoading(true)

            let data = {
                order_id: orderId,
                index: props.indexOfItem,
                new_material: addObjData,
            }
            UpdateNewEstimateAPI(data).then((res) => {
                props.closeIt()
                props.closeOtherSheet()
                setAddingInProcess(true)
                setSellingPrice("")
                setAddObjData({});
                console.log("----------->", res?.data);
                console.log("----------->", res?.data?.materials);
                props.renderAddedMaterial(res?.data?.materials)
                showSuccess("Updated the Material")
                setLoading(false)
                return res;
            }).catch(err => { return err; });


        }
        // }
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
                        value={type == "" || type == undefined ? props?.item?.material_type == "" ? "" : props?.item?.material_type : type}
                    /> */}

                    <Text style={styles.TextColor} >Product Name</Text>
                    <RNPickerSelect
                        useNativeAndroidPickerStyle={false}
                        onValueChange={(value) => setProduct(value)}
                        style={pickerSelectStyles}
                        items={ProductNameData}
                        value={product == "" || product == undefined ? props?.item?.product_name == "" ? "" : props?.item?.product_name : product}
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
                        {/* {price} */}
                        {price == "" || price == undefined ? props?.item?.amount == "" ? "" : props?.item?.amount : price}
                    </TextInput>

                    {/* <Text style={styles.TextColor} >Quantity</Text>
                    <TextInput
                        // style={{ height: 55, backgroundColor: '#fff', fontSize: 16, borderRadius: 5, paddingHorizontal: 10, paddingVertical: 10, marginBottom: 10, color: '#000' }}
                        style={styles.TextInputStyles}
                        placeholder="Enter the number"
                        onChangeText={text => setQuantity(text)}
                        autoCorrect={false}
                        keyboardType='numeric'
                        autoCapitalize="none"
                    > {quantity == undefined ? props?.item?.quantity == "" ? "" : props?.item?.quantity : quantity}
                    </TextInput> */}

                    <Text style={styles.TextColor} >Quantity</Text>
                    <TextInput
                        style={styles.TextInputStyles}
                        placeholder="Enter the number"
                        onChangeText={text => setQuantity(text)}
                        keyboardType='numeric'
                    >{quantity == "" || quantity == undefined ? props?.item?.quantity == "" ? "" : props?.item?.quantity : quantity}
                    </TextInput>


                    <CustomButton onPress={() => CheckQTY()}
                        // disabled={addingInProcess === true ? true : false}
                        style={{ width: '100%' }}
                        title="Update Material" />

                </View>
            }
        </>
    )
}

export default UpdateMaterial




const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 15,
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
        paddingVertical: 10,
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