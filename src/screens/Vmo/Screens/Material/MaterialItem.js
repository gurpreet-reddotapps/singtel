import { View, Text, StatusBar, StyleSheet, SafeAreaView, FlatList, Pressable, ImageBackground, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import Images from '../../assets/Images';
import fonts from '../../../../assects/fonts';
import { Colors } from '../../Constant/Colors';
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux';
import InputModal from './InputModal';
import { Checkbox } from 'react-native-paper';



const MaterialItem = (props) => {
  const [statusVal, setStatusVal] = useState()
  const [checked, setChecked] = useState(false);
  const [disableEdit, setdisableEdit] = useState(false);
  const [selectAllData, setSelectAllData] = useState([]);
  const { materialStatus } = useSelector(state => state.MateralDetail);
  const { homeData } = useSelector(state => state.homeDetails);
  const { user } = useSelector(state => state.userDetails);
  const { jobDetail } = useSelector(state => state.JobDetails);


  const CollectedDate = moment(props?.item?.collected_on).format('YY-MM-DD')


  const RequestedDate = moment(props?.item?.requested_on).format('YY-MM-DD')

  let checkStatus = () => {
    console.log("This run");
    console.log(props?.item?.product_id, "It is the Product ID");
    if (props?.item?.quantity_collected === props?.item?.quantity_requested) {
      console.log(props?.item?.quantity_requested);
      setStatusVal("Collected")
    } else if (props?.item?.quantity_requested > props?.item?.quantity_collected && props?.item?.quantity_collected !== 0) {
      setStatusVal("Partially Collected")
    } else {
      setStatusVal("To Collect")
    }
  }

  const loadAndCheck = () => {
    props.refreshData()
  }

  useEffect(() => {
    if (jobDetail?.job_type === 3) {
        if (jobDetail.job_status == 1) {
            return setdisableEdit(true)
        } else {
            return setdisableEdit(false)
        }
    } else if ((user?.user?.role === 0 || user?.user?.role === 4) && jobDetail.job_status == 1) {
        if (jobDetail.job_status == 1) {
            return setdisableEdit(true)
        } else {
            return setdisableEdit(false)
        }
    } else if (jobDetail?.job_type === 2 && jobDetail.job_status == 1) {
        setdisableEdit(true)
    } else if (user?.user?.id == jobDetail?.mechanic_id) {
        if (jobDetail.job_status == 1) {
            console.log("UNDER PRIMARY ");
            return setdisableEdit(true)
        } else {
            console.log("UNDER Secondry");
            return setdisableEdit(false)
        }
    }else if(jobDetail?.job_type == 1 && user?.user?.id !== jobDetail?.mechanic_id){
        setdisableEdit(true)
    }
}, [])


//   useEffect(() => {
//     if (user?.user?.role === 3) {
//         if (jobDetail.job_status == 1) {
//             return setdisableEdit(true)
//         } else {
//             return setdisableEdit(false)
//         }
//     } else if ((user?.user?.role === 0 || user?.user?.role === 4) && jobDetail.job_status == 1) {
//         if (jobDetail.job_status == 1) {
//             return setdisableEdit(true)
//         } else {
//             return setdisableEdit(false)
//         }
//     } else if (user?.user?.role === 2 && jobDetail.job_status == 1) {
//         setdisableEdit(true)
//     } else if (user?.user?.role == 1 && user?.user?.id == jobDetail?.mechanic_id) {
//         if (jobDetail.job_status == 1) {
//             console.log("UNDER PRIMARY ");
//             return setdisableEdit(true)
//         } else {
//             console.log("UNDER Secondry");
//             return setdisableEdit(false)
//         }
//     }else if(user?.user?.role == 1 && user?.user?.id !== jobDetail?.mechanic_id){
//         setdisableEdit(true)
//     }
// }, [])


  useEffect(() => {
    if (user?.user?.role === 2) {
      setdisableEdit(true)
    }
  }, [])


  const howRun = () => {
    console.log("Not RUNED STILL Successfully");
    checkStatus();
    console.log("RUNED Successfully");
  }

  const handelBulkCollect = (val) => {
    setChecked(!checked)

    props?.BulkObject(val)
  }

  useEffect(() => {
    if (props.updatedMaterialData) {
      checkStatus();
    }
  }, [props.updatedMaterialData])



  return (
    <Pressable style={styles.FuelCardAreaNNT} >
      <ImageBackground
        source={statusVal == "To Collect" ? Images.redback : statusVal == "Collected" ? Images.gre : statusVal == "Partially Collected" ? Images.yellowBack : Images.yellowBack}
        style={[styles.UpperCardArea, { backgroundColor: statusVal == "To Collect" ? "#FF6161" : statusVal == "Collected" ? "#22AF63" : statusVal == "Partially Collected" ? "#FFA600" : "#FFA600" }]} >
        {props?.item?.product_image ?
          <View style={styles.EngineImageView} >
            <Image style={styles.EngineImage} source={{ uri: props?.item?.product_image }} />
            <Text style={styles.CardHeading} >{props?.item?.product_name}</Text>
          </View>
          :
          <View style={styles.EngineImageView} >
            <Text style={styles.CardHeading} >{props?.item?.product_name}</Text>
          </View>
        }
        {/* {statusVal == "Collected" ? null :
          Platform.OS === 'ios' ?
            <View style={styles.CheckBoxView}>
              <Checkbox.Android
                status={checked == true ? 'checked' : 'unchecked'}
                color="#FFFFFF"
                onPress={() => handelBulkCollect(props?.item)}
              />
            </View>
            :
            <Checkbox.Android
              status={checked == true ? 'checked' : 'unchecked'}
              color="#FFFFFF"
              onPress={() => handelBulkCollect(props?.item)}
            />
        } */}
      </ImageBackground>
      <View style={styles.totalPadding} >
        <View style={styles.JobDetails}>
          <View style={styles.JobDate}>
            <View style={styles.StartDate}>
              <View styles={styles.UpperText}>
                <Text style={styles.cardTextGrey}>Status</Text>
                <Text style={[styles.StatusText, { color: statusVal == "To Collect" ? "#FF6161" : statusVal == "Collected" ? "#22AF63" : statusVal == "Partially Collected" ? "#FFA600" : "#FFA600" }]} >{statusVal}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.twoItem} >
          <View style={styles.ItemStyle} >
            <Text style={styles.cardTextGrey}>Material requested on</Text>
            <Text style={styles.cardTextBlack} >{RequestedDate}</Text>
          </View>
          <View style={styles.ItemStyle} >
            <Text style={styles.cardTextGrey}>Material collect on</Text>
            <Text style={styles.cardTextBlack} >{CollectedDate}</Text>
          </View>
        </View>
        <View style={styles.twoItem} >
          <View style={styles.ItemStyle} >
            <Text style={styles.cardTextGrey}>Quantity Requested</Text>
            <Text style={styles.cardTextBlack} >{props?.item?.quantity_requested}</Text>
          </View>
          <View style={styles.ItemStyle} >
            <Text style={styles.cardTextGrey}>Quantity Collected</Text>
            <Text style={styles.cardTextBlack} >{props?.item?.quantity_collected}</Text>
          </View>
        </View>
        <View style={[styles.BottomLine]}></View>
        {disableEdit === true ?
          null :
          <InputModal
            statusCollect={statusVal}
            PRODUCT_ID={props?.item?.product_id}
            updateStatus={loadAndCheck}
            updateButton={checkStatus}
            checkStatus={howRun}
            request_quantity={props?.item?.quantity_requested}
            collected_quantity={props?.item?.quantity_collected}
          />
        }

      </View>


    </Pressable>

  )
}

export default MaterialItem


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
    width: '70%',
  },
  CheckBoxView: {
    width: '20%',
  },
  EngineImage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 30,
    height: 30,
    marginRight: 10,
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