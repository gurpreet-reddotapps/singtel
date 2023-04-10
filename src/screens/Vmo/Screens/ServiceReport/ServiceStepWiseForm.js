import React, {
    useState, useEffect, useRef
} from 'react'
import {
    View, Text, StyleSheet, TextInput, ImageBackground, TouchableOpacity, ScrollView, SafeAreaView, Pressable
} from 'react-native'

import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
import AntIcon from 'react-native-vector-icons/AntDesign'
import LeftTyres from './LeftTyres';
import fonts from '../../../../assects/fonts';
import { ShowSuccessMessage, ShowErrorMessage } from '../../../../component';
import FormButton from '../../Components/FormButton';
import { colors } from '../../../../assects/colors';
import CustomCheckBox from '../../Components/CheckBox';
import { Colors } from '../../Constant/Colors';
import Spinner from '../../Components/Spinner';
import FormInput from '../../Components/FormInput';
import { windowHeight, windowWidth } from '../../utils/Dimension';
import VMOCustomHeader from '../../Components/VMOCustomHeader';
import { Checkbox } from 'react-native-paper';
import Images from '../../assets/Images'
import TyreCheckBox from './TyreCheckBox';
import { setStepFourDataInRedux, setStepOneDataInRedux, setStepThreeDataInRedux, setStepTwoDataInRedux } from '../../../../redux/actions/ServiceReport';
import { SaveServiceReportAPI } from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { height } from '../../../../assects/strings';



const ServicceStepWiseForm = (props) => {
    const [page, setPage] = useState(1);
    const [active, setActive] = useState(1);
    const [loacalLoading, setloacalLoading] = useState(false);
    const [disableEdit, setdisableEdit] = useState(props?.disableEdit);
    const { orderId, jobDetail } = useSelector(state => state.JobDetails);
    const { homeData } = useSelector(state => state.homeDetails);
    const { user } = useSelector(state => state.userDetails);

    const [checked, setChecked] = useState(false);
    const [ShowReamrkInput, setShowReamrkInput] = useState(false);
    const [LengthOfRemark, setLengthOfRemark] = useState([0])
    const [reamrkIndex, setreamrkIndex] = useState(props?.ServiceInfo?.additional_repairs);
    const [fetchedIndex, setfetchedIndex] = useState();
    const { pageOneDataValue, pageTwoDataValue, pageThreeDataValue, pageFourDataValue } = useSelector(state => state.ServiceDetail);


    const navigation = useNavigation();
    const dispatch = useDispatch()
    const scrollViewRef = useRef();

    const fillDetailSection = () => {
        scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true })
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
        } else if (jobDetail?.job_type == 1 && user?.user?.id !== jobDetail?.mechanic_id) {
            setdisableEdit(true)
        }
    }, [])

    const goNext = async () => {
        if (page === 4) {
            //  FinalDataSave()
            return;
        }
        setPage(page => page + 1);
        if (page === 1) {
            setActive(active + 1);
            // childRef.current.localRun()
        } else if (page === 2) {
            setActive(active + 1);
            // childTwoRef.current.saveDataTwoInRedux()
        } else if (page === 3) {
            setActive(active + 1);
        } else if (page === 4) {
            setActive(active + 4);
        }
    };

    const goToStepOne = () => {
        if (page === 2) {
            setPage(page => page - 1);
            setActive(active - 1);
        } else {
            return;
        }
    };

    const goToStepTwo = () => {
        if (page === 3) {
            setPage(page => page - 1);
            setActive(active - 1);
        } else {
            return;
        }
    };

    const goToStepThree = () => {
        if (page === 4) {
            setPage(page => page - 1);
            setActive(active - 1);
        } else {
            return;
        }
    };



    //Component Of Step Wise

    const InteriorCheckIn = () => {



        const finalSubmit = async () => {


            let data = {
                order_id: orderId,
                odometer: pageOneDataValue?.OdoMeter,
                checked: pageOneDataValue?.CheckedVal,
                replacement: pageOneDataValue?.Replacement,
                top_up: pageOneDataValue?.TopUp,
                adjustment: pageOneDataValue?.Adjustment,
                leakage: pageOneDataValue?.Leakage,
                fuel_guage: pageOneDataValue?.fuelGuage,
                engine_oil: pageTwoDataValue?.EngineOil,
                transmission_oil: pageTwoDataValue?.TransmissionOil,
                rear_axle_oil: pageTwoDataValue?.RearAxleOil,
                power_steering_oil: pageTwoDataValue?.PowerSteeringOil,
                brake_fluid: pageTwoDataValue?.BrakeFluid,
                clutch_fluid: pageTwoDataValue?.ClutchFluid,
                greasing_all_points: pageTwoDataValue?.GreasingAllPoints,
                oil_filter: pageTwoDataValue?.OilFilter,
                fuel_filter: pageTwoDataValue?.FuelFilter,
                air_filter: pageTwoDataValue?.AirFilter,
                tm_filter: pageTwoDataValue?.TMFilter,
                battery_water: pageTwoDataValue?.BatteryWater,
                radiator_coolant: pageTwoDataValue?.RadiatorCoolant,
                water_separator: pageTwoDataValue?.WaterSeperator,
                all_light_signal: pageTwoDataValue?.AlllightSignal,
                num_plate_light: pageTwoDataValue?.NumPlateLight,
                horn: pageTwoDataValue?.Horn,
                reverse_light: pageTwoDataValue?.ReverseLight,
                mud_guard_fender: pageTwoDataValue?.MudGuardFender,
                flaps: pageTwoDataValue?.Flaps,
                clutch: pageTwoDataValue?.Clutch,
                tyre_wear_alignment: pageTwoDataValue?.TyreWearAlignment,
                clutch_replacement: pageTwoDataValue?.ClutchReplacement,
                battery_replacement: pageTwoDataValue?.BatteryReplacement,
                brakes_replacement: pageTwoDataValue?.BrakesReplacement,
                fan_belt: pageTwoDataValue?.FanBelt,
                valve_clearence: pageTwoDataValue?.ValveClearence,
                fuel_pump: pageTwoDataValue?.FuelPump,
                fuel_injector: pageTwoDataValue?.FuelInjector,
                exhaust_brake: pageTwoDataValue?.ExhaustBrake,
                compressor_12v_24v: pageThreeDataValue?.Compressor12v24v,
                air_cond_belt: pageThreeDataValue?.AirCondBelt,
                compressor_brackets: pageThreeDataValue?.CompressorBrackets,
                tempreture_guage: pageThreeDataValue?.TempretureGuage,
                condenser_coil: pageThreeDataValue?.CondenserCoil,
                condsr_fan_mtr_12v_24v: pageThreeDataValue?.CondsrFanMtr,
                blower_mtr_12v_24v: pageThreeDataValue?.BlowerMtr,
                idler_pulley_blush_brg: pageThreeDataValue?.IdlerPulley,
                resistor: pageThreeDataValue?.Resistor,
                suction_hose_58: pageThreeDataValue?.SuctionHose,
                discharge_hose: pageThreeDataValue?.DischargeHose,
                ai_pipe_38: pageThreeDataValue?.AIPipe,
                pressure_switch: pageThreeDataValue?.PressureSwitch,
                thermostat_sensor: pageThreeDataValue?.ThermostatSensor,
                relay_12v_24v: pageThreeDataValue?.Relay,
                evaporator_coil_unit: pageThreeDataValue?.EvaporatorCoil,
                exp_valve_blk_eqz: pageThreeDataValue?.ExpValve,
                receiver_drier: pageThreeDataValue?.ReceiverDrier,
                vacuum_refil_oil: pageThreeDataValue?.VacuumRefilOil,
                refill_gas_r134a_r404_r22: pageThreeDataValue?.RefillgasR134a,
                general_service_ac_freezer: pageThreeDataValue?.GeneralserviceAC,
                expansion_valve: pageThreeDataValue?.ExpansionValve,
                copssor_clutch_coil_12_24v: pageThreeDataValue?.CopssorClutchCoil,
                chemical_clean_coil_condsr: pageThreeDataValue?.ChemicalCleanCoil,
                top_up_compressor_oil_new: pageThreeDataValue?.TopupCompressorOil,
                cabin_air_filter: pageThreeDataValue?.CabinAirFilter,
                general_electrical_check: pageThreeDataValue?.GeneralElectricalCheck,
                tempreture_reading: pageThreeDataValue?.TempretureReading,
                additional_repairs: pageThreeDataValue?.reamrkTextArray,
                l1: left1,
                l2: left2,
                l3: left3,
                l4: left4,
                l5: left5,
                l6: left6,
                l7: left7,
                l8: left8,
                r1: Right1,
                r2: Right2,
                r3: Right3,
                r4: Right4,
                r5: Right5,
                r6: Right6,
                r7: Right7,
                r8: Right8,
                f1: First1,
                f2: First2
            }

            SaveServiceReportAPI(data).then(async (res) => {
                console.log(res, "This is the response after saving the Total service report");
                console.log(res.data, "This is the response after saving the Total service report");
                if (res?.data?.success === true) {
                    ShowSuccessMessage("The Check In Data Was Saved")
                    try {
                        await AsyncStorage.setItem(`Service_report_${orderId}`, true.toString())
                    } catch (e) {
                        console.log(e);
                    }
                    navigation.goBack()
                } else {
                    ShowErrorMessage("Check In Data was not Saved")
                }
                return res?.data;
            }).catch(err => { return err; });
            setloacalLoading(false)


            props.ServiceData()

        }





        //Page 1 Logic 
        // const [OdoMeter, setOdoMeter] = useState(pageOneDataValue?.OdoMeter == undefined ? props?.ServiceInfo?.odometer : pageOneDataValue?.OdoMeter)
        const [OdoMeter, setOdoMeter] = useState(pageOneDataValue?.OdoMeter !== undefined ? pageOneDataValue?.OdoMeter : props?.ServiceInfo?.odometer)
        const [CheckedVal, setCheckedVal] = useState(pageOneDataValue?.CheckedVal == undefined ? props?.ServiceInfo?.checked : pageOneDataValue?.CheckedVal)
        const [Replacement, setReplacement] = useState(pageOneDataValue?.Replacement !== undefined ? pageOneDataValue?.Replacement : props?.ServiceInfo?.replacement)
        const [TopUp, setTopUp] = useState(pageOneDataValue?.TopUp !== undefined ? pageOneDataValue?.TopUp : props?.ServiceInfo?.top_up)
        const [Adjustment, setAdjustment] = useState(pageOneDataValue?.Adjustment !== undefined ? pageOneDataValue?.Adjustment : props?.ServiceInfo?.adjustment)
        const [Leakage, setLeakage] = useState(pageOneDataValue?.Leakage !== undefined ? pageOneDataValue?.Leakage : props?.ServiceInfo?.leakage)
        const [fuelGuage, setfuelGuage] = useState(pageOneDataValue?.fuelGuage !== undefined ? pageOneDataValue?.fuelGuage : props?.ServiceInfo?.fuel_guage)

        let objectForOne = {
            OdoMeter, CheckedVal, Replacement, TopUp, Adjustment, Leakage, fuelGuage
        }

        const SaveInterior = () => {
            if (
                OdoMeter == "" || fuelGuage == ""
            ) {

                return ShowErrorMessage("PLease Enter the Odometer And Fuel gauze Reading")
            } else {
                console.log(objectForOne, "objectForOne")
                dispatch(setStepOneDataInRedux(objectForOne))
                goNext()
            }
        }


        //Page 2 Logic
        const [EngineOil, setEngineOil] = useState(pageTwoDataValue?.EngineOil !== undefined ? pageTwoDataValue?.EngineOil : props?.ServiceInfo?.engine_oil)
        const [TransmissionOil, setTransmissionOil] = useState(pageTwoDataValue?.TransmissionOil !== undefined ? pageTwoDataValue?.TransmissionOil : props?.ServiceInfo?.transmission_oil)
        const [RearAxleOil, setRearAxleOil] = useState(pageTwoDataValue?.RearAxleOil !== undefined ? pageTwoDataValue?.RearAxleOil : props?.ServiceInfo?.rear_axle_oil)
        const [PowerSteeringOil, setPowerSteeringOil] = useState(pageTwoDataValue?.PowerSteeringOil !== undefined ? pageTwoDataValue?.PowerSteeringOil : props?.ServiceInfo?.power_steering_oil)
        const [BrakeFluid, setBrakeFluid] = useState(pageTwoDataValue?.BrakeFluid !== undefined ? pageTwoDataValue?.BrakeFluid : props?.ServiceInfo?.brake_fluid)
        const [ClutchFluid, setClutchFluid] = useState(pageTwoDataValue?.ClutchFluid !== undefined ? pageTwoDataValue?.ClutchFluid : props?.ServiceInfo?.clutch_fluid)
        const [GreasingAllPoints, setGreasingAllPoints] = useState(pageTwoDataValue?.GreasingAllPoints !== undefined ? pageTwoDataValue?.GreasingAllPoints : props?.ServiceInfo?.greasing_all_points)
        const [OilFilter, setOilFilter] = useState(pageTwoDataValue?.OilFilter !== undefined ? pageTwoDataValue?.OilFilter : props?.ServiceInfo?.oil_filter)
        const [FuelFilter, setFuelFilter] = useState(pageTwoDataValue?.FuelFilter !== undefined ? pageTwoDataValue?.FuelFilter : props?.ServiceInfo?.fuel_filter)
        const [AirFilter, setAirFilter] = useState(pageTwoDataValue?.AirFilter !== undefined ? pageTwoDataValue?.AirFilter : props?.ServiceInfo?.air_filter)
        const [TMFilter, setTMFilter] = useState(pageTwoDataValue?.TMFilter !== undefined ? pageTwoDataValue?.TMFilter : props?.ServiceInfo?.tm_filter)
        const [BatteryWater, setBatteryWater] = useState(pageTwoDataValue?.BatteryWater !== undefined ? pageTwoDataValue?.BatteryWater : props?.ServiceInfo?.battery_water)
        const [RadiatorCoolant, setRadiatorCoolant] = useState(pageTwoDataValue?.RadiatorCoolant !== undefined ? pageTwoDataValue?.RadiatorCoolant : props?.ServiceInfo?.radiator_coolant)
        const [WaterSeperator, setWaterSeperator] = useState(pageTwoDataValue?.WaterSeperator !== undefined ? pageTwoDataValue?.WaterSeperator : props?.ServiceInfo?.water_separator)
        const [AlllightSignal, setAlllightSignal] = useState(pageTwoDataValue?.AlllightSignal !== undefined ? pageTwoDataValue?.AlllightSignal : props?.ServiceInfo?.all_light_signal)
        const [NumPlateLight, setNumPlateLight] = useState(pageTwoDataValue?.NumPlateLight !== undefined ? pageTwoDataValue?.NumPlateLight : props?.ServiceInfo?.num_plate_light)
        const [Horn, setHorn] = useState(pageTwoDataValue?.Horn !== undefined ? pageTwoDataValue?.Horn : props?.ServiceInfo?.horn)
        const [ReverseLight, setReverseLight] = useState(pageTwoDataValue?.ReverseLight !== undefined ? pageTwoDataValue?.ReverseLight : props?.ServiceInfo?.reverse_light)
        const [MudGuardFender, setMudGuardFender] = useState(pageTwoDataValue?.MudGuardFender !== undefined ? pageTwoDataValue?.MudGuardFender : props?.ServiceInfo?.mud_guard_fender)
        const [Flaps, setFlaps] = useState(pageTwoDataValue?.Flaps !== undefined ? pageTwoDataValue?.Flaps : props?.ServiceInfo?.flaps)
        const [Clutch, setClutch] = useState(pageTwoDataValue?.Clutch !== undefined ? pageTwoDataValue?.Clutch : props?.ServiceInfo?.clutch)
        const [TyreWearAlignment, setTyreWearAlignment] = useState(pageTwoDataValue?.TyreWearAlignment !== undefined ? pageTwoDataValue?.TyreWearAlignment : props?.ServiceInfo?.tyre_wear_alignment)
        const [ClutchReplacement, setClutchReplacement] = useState(pageTwoDataValue?.ClutchReplacement !== undefined ? pageTwoDataValue?.ClutchReplacement : props?.ServiceInfo?.clutch_replacement)
        const [BatteryReplacement, setBatteryReplacement] = useState(pageTwoDataValue?.BatteryReplacement !== undefined ? pageTwoDataValue?.BatteryReplacement : props?.ServiceInfo?.battery_replacement)
        const [BrakesReplacement, setBrakesReplacement] = useState(pageTwoDataValue?.BrakesReplacement !== undefined ? pageTwoDataValue?.BrakesReplacement : props?.ServiceInfo?.brakes_replacement)
        const [FanBelt, setFanBelt] = useState(pageTwoDataValue?.FanBelt !== undefined ? pageTwoDataValue?.FanBelt : props?.ServiceInfo?.fan_belt)
        const [ValveClearence, setValveClearence] = useState(pageTwoDataValue?.ValveClearence !== undefined ? pageTwoDataValue?.ValveClearence : props?.ServiceInfo?.valve_clearence)
        const [FuelPump, setFuelPump] = useState(pageTwoDataValue?.FuelPump !== undefined ? pageTwoDataValue?.FuelPump : props?.ServiceInfo?.fuel_pump)
        const [FuelInjector, setFuelInjector] = useState(pageTwoDataValue?.FuelInjector !== undefined ? pageTwoDataValue?.FuelInjector : props?.ServiceInfo?.fuel_injector)
        const [ExhaustBrake, setExhaustBrake] = useState(pageTwoDataValue?.ExhaustBrake !== undefined ? pageTwoDataValue?.ExhaustBrake : props?.ServiceInfo?.exhaust_brake)

        let objectForTwo = {
            EngineOil,
            TransmissionOil,
            RearAxleOil,
            PowerSteeringOil,
            BrakeFluid,
            ClutchFluid,
            GreasingAllPoints,
            OilFilter,
            FuelFilter,
            AirFilter,
            TMFilter,
            BatteryWater,
            RadiatorCoolant,
            WaterSeperator,
            AlllightSignal,
            NumPlateLight,
            Horn,
            ReverseLight,
            MudGuardFender,
            Flaps,
            Clutch,
            TyreWearAlignment,
            ClutchReplacement,
            BatteryReplacement,
            BrakesReplacement,
            FanBelt,
            ValveClearence,
            FuelPump,
            FuelInjector,
            ExhaustBrake,
        }

        const SaveStepTwo = () => {
            console.log(objectForTwo, "objectForTwo")
            dispatch(setStepTwoDataInRedux(objectForTwo))
            goNext()
        }



        //Page 3 Logic
        const [Compressor12v24v, setCompressor12v24v] = useState(pageThreeDataValue?.Compressor12v24v !== undefined ? pageThreeDataValue?.Compressor12v24v : props?.ServiceInfo?.compressor_12v_24v)
        const [AirCondBelt, setAirCondBelt] = useState(pageThreeDataValue?.AirCondBelt !== undefined ? pageThreeDataValue?.AirCondBelt : props?.ServiceInfo?.air_cond_belt)
        const [CompressorBrackets, setCompressorBrackets] = useState(pageThreeDataValue?.CompressorBrackets !== undefined ? pageThreeDataValue?.CompressorBrackets : props?.ServiceInfo?.compressor_brackets)
        const [TempretureGuage, setTempretureGuage] = useState(pageThreeDataValue?.TempretureGuage !== undefined ? pageThreeDataValue?.TempretureGuage : props?.ServiceInfo?.tempreture_guage)
        const [CondenserCoil, setCondenserCoil] = useState(pageThreeDataValue?.CondenserCoil !== undefined ? pageThreeDataValue?.CondenserCoil : props?.ServiceInfo?.condenser_coil)
        const [CondsrFanMtr, setCondsrFanMtr] = useState(pageThreeDataValue?.CondsrFanMtr !== undefined ? pageThreeDataValue?.CondsrFanMtr : props?.ServiceInfo?.condsr_fan_mtr_12v_24v)
        const [BlowerMtr, setBlowerMtr] = useState(pageThreeDataValue?.BlowerMtr !== undefined ? pageThreeDataValue?.BlowerMtr : props?.ServiceInfo?.blower_mtr_12v_24v)
        const [IdlerPulley, setIdlerPulley] = useState(pageThreeDataValue?.IdlerPulley !== undefined ? pageThreeDataValue?.IdlerPulley : props?.ServiceInfo?.idler_pulley_blush_brg)
        const [Resistor, setResistor] = useState(pageThreeDataValue?.Resistor !== undefined ? pageThreeDataValue?.Resistor : props?.ServiceInfo?.resistor)
        const [SuctionHose, setSuctionHose] = useState(pageThreeDataValue?.SuctionHose !== undefined ? pageThreeDataValue?.SuctionHose : props?.ServiceInfo?.suction_hose_58)
        const [DischargeHose, setDischargeHose] = useState(pageThreeDataValue?.DischargeHose !== undefined ? pageThreeDataValue?.DischargeHose : props?.ServiceInfo?.discharge_hose)
        const [AIPipe, setAIPipe] = useState(pageThreeDataValue?.AIPipe !== undefined ? pageThreeDataValue?.AIPipe : props?.ServiceInfo?.ai_pipe_38)
        const [PressureSwitch, setPressureSwitch] = useState(pageThreeDataValue?.PressureSwitch !== undefined ? pageThreeDataValue?.PressureSwitch : props?.ServiceInfo?.pressure_switch)
        const [ThermostatSensor, setThermostatSensor] = useState(pageThreeDataValue?.ThermostatSensor !== undefined ? pageThreeDataValue?.ThermostatSensor : props?.ServiceInfo?.thermostat_sensor)
        const [Relay, setRelay] = useState(pageThreeDataValue?.Relay !== undefined ? pageThreeDataValue?.Relay : props?.ServiceInfo?.relay_12v_24v)
        const [EvaporatorCoil, setEvaporatorCoil] = useState(pageThreeDataValue?.EvaporatorCoil !== undefined ? pageThreeDataValue?.EvaporatorCoil : props?.ServiceInfo?.evaporator_coil_unit)
        const [ExpValve, setExpValve] = useState(pageThreeDataValue?.ExpValve !== undefined ? pageThreeDataValue?.ExpValve : props?.ServiceInfo?.exp_valve_blk_eqz)
        const [ReceiverDrier, setReceiverDrier] = useState(pageThreeDataValue?.ReceiverDrier !== undefined ? pageThreeDataValue?.ReceiverDrier : props?.ServiceInfo?.receiver_drier)
        const [VacuumRefilOil, setVacuumRefilOil] = useState(pageThreeDataValue?.VacuumRefilOil !== undefined ? pageThreeDataValue?.VacuumRefilOil : props?.ServiceInfo?.vacuum_refil_oil)
        const [RefillgasR134a, setRefillgasR134a] = useState(pageThreeDataValue?.RefillgasR134a !== undefined ? pageThreeDataValue?.RefillgasR134a : props?.ServiceInfo?.refill_gas_r134a_r404_r22)
        const [GeneralserviceAC, setGeneralserviceAC] = useState(pageThreeDataValue?.GeneralserviceAC !== undefined ? pageThreeDataValue?.GeneralserviceAC : props?.ServiceInfo?.general_service_ac_freezer)
        const [ExpansionValve, setExpansionValve] = useState(pageThreeDataValue?.ExpansionValve !== undefined ? pageThreeDataValue?.ExpansionValve : props?.ServiceInfo?.expansion_valve)
        const [CopssorClutchCoil, setCopssorClutchCoil] = useState(pageThreeDataValue?.CopssorClutchCoil !== undefined ? pageThreeDataValue?.CopssorClutchCoil : props?.ServiceInfo?.copssor_clutch_coil_12_24v)
        const [ChemicalCleanCoil, setChemicalCleanCoil] = useState(pageThreeDataValue?.ChemicalCleanCoil !== undefined ? pageThreeDataValue?.ChemicalCleanCoil : props?.ServiceInfo?.chemical_clean_coil_condsr)
        const [TopupCompressorOil, setTopupCompressorOil] = useState(pageThreeDataValue?.TopupCompressorOil !== undefined ? pageThreeDataValue?.TopupCompressorOil : props?.ServiceInfo?.top_up_compressor_oil_new)
        const [CabinAirFilter, setCabinAirFilter] = useState(pageThreeDataValue?.CabinAirFilter !== undefined ? pageThreeDataValue?.CabinAirFilter : props?.ServiceInfo?.cabin_air_filter)
        const [GeneralElectricalCheck, setGeneralElectricalCheck] = useState(pageThreeDataValue?.GeneralElectricalCheck !== undefined ? pageThreeDataValue?.GeneralElectricalCheck : props?.ServiceInfo?.general_electrical_check)
        const [TempretureReading, setTempretureReading] = useState(pageThreeDataValue?.TempretureReading !== undefined ? pageThreeDataValue?.TempretureReading : props?.ServiceInfo?.tempreture_reading)
        const [reamrkTextArray, setreamrkTextArray] = useState(pageThreeDataValue?.reamrkTextArray !== undefined ? pageThreeDataValue?.reamrkTextArray : props?.ServiceInfo?.additional_repairs)


        let objectForThree = {
            Compressor12v24v,
            AirCondBelt,
            CompressorBrackets,
            TempretureGuage,
            CondenserCoil,
            CondsrFanMtr,
            BlowerMtr,
            IdlerPulley,
            Resistor,
            SuctionHose,
            DischargeHose,
            AIPipe,
            PressureSwitch,
            ThermostatSensor,
            Relay,
            EvaporatorCoil,
            ExpValve,
            ReceiverDrier,
            VacuumRefilOil,
            RefillgasR134a,
            GeneralserviceAC,
            ExpansionValve,
            CopssorClutchCoil,
            ChemicalCleanCoil,
            TopupCompressorOil,
            CabinAirFilter,
            GeneralElectricalCheck,
            TempretureReading,
            reamrkTextArray,
        }

        const SaveStepThree = () => {
            if (TempretureReading == "") {
                return ShowErrorMessage("PLease Enter the Temprature Value")
            } else {
                console.log(objectForThree, "objectForThree")
                dispatch(setStepThreeDataInRedux(objectForThree))
                goNext()
            }
        }



        const addReamrk = () => {
            let emptyData = "";
            console.log(reamrkTextArray, "reamrkTextArray");
            setreamrkTextArray(oldArray => [...oldArray, emptyData])
            // setShowReamrkInput(true)
            // if (ShowReamrkInput === true) {
            // }
        }
        // const addReamrk = () => {
        //     setShowReamrkInput(true)
        //     if (ShowReamrkInput === true) {
        //         setreamrkIndex(reamrkIndex + 1)
        //         setLengthOfRemark(oldArray => [...oldArray, reamrkIndex])
        //     }
        // }

        const removeRemark = (i) => {
            let newArray = [...LengthOfRemark]
            newArray.splice(i, 1)
            setLengthOfRemark(newArray)
        }



        const remarkTextFunction = (text, index) => {
            console.log(index, "INDEX ALLTIME")
            console.log(text, "TEXT ALLTIME")
            reamrkTextArray.map((item, ind) => {
                if (index == ind) {
                    item = text;
                    reamrkTextArray[ind] = text;
                    console.log(item, "ITEM MAP")
                    console.log(ind, "INDEX MAP")
                }
            })
            console.log(reamrkTextArray, "reamrkTextArray");

        }



        //Page 4 Logic 


        const [ticked, setticked] = useState(false);


        const [left1, setleft1] = useState(pageFourDataValue?.left1 !== undefined ? pageFourDataValue?.left1 : props?.ServiceInfo?.l1)
        const [left2, setleft2] = useState(pageFourDataValue?.left2 !== undefined ? pageFourDataValue?.left2 : props?.ServiceInfo?.l2)
        const [left3, setleft3] = useState(pageFourDataValue?.left3 !== undefined ? pageFourDataValue?.left3 : props?.ServiceInfo?.l3)
        const [left4, setleft4] = useState(pageFourDataValue?.left4 !== undefined ? pageFourDataValue?.left4 : props?.ServiceInfo?.l4)
        const [left5, setleft5] = useState(pageFourDataValue?.left5 !== undefined ? pageFourDataValue?.left5 : props?.ServiceInfo?.l5)
        const [left6, setleft6] = useState(pageFourDataValue?.left6 !== undefined ? pageFourDataValue?.left6 : props?.ServiceInfo?.l6)
        const [left7, setleft7] = useState(pageFourDataValue?.left7 !== undefined ? pageFourDataValue?.left7 : props?.ServiceInfo?.l7)
        const [left8, setleft8] = useState(pageFourDataValue?.left8 !== undefined ? pageFourDataValue?.left8 : props?.ServiceInfo?.l8)

        const [Right1, setRight1] = useState(pageFourDataValue?.Right1 !== undefined ? pageFourDataValue?.Right1 : props?.ServiceInfo?.r1)
        const [Right2, setRight2] = useState(pageFourDataValue?.Right2 !== undefined ? pageFourDataValue?.Right2 : props?.ServiceInfo?.r2)
        const [Right3, setRight3] = useState(pageFourDataValue?.Right3 !== undefined ? pageFourDataValue?.Right3 : props?.ServiceInfo?.r3)
        const [Right4, setRight4] = useState(pageFourDataValue?.Right4 !== undefined ? pageFourDataValue?.Right4 : props?.ServiceInfo?.r4)
        const [Right5, setRight5] = useState(pageFourDataValue?.Right5 !== undefined ? pageFourDataValue?.Right5 : props?.ServiceInfo?.r5)
        const [Right6, setRight6] = useState(pageFourDataValue?.Right6 !== undefined ? pageFourDataValue?.Right6 : props?.ServiceInfo?.r6)
        const [Right7, setRight7] = useState(pageFourDataValue?.Right7 !== undefined ? pageFourDataValue?.Right7 : props?.ServiceInfo?.r7)
        const [Right8, setRight8] = useState(pageFourDataValue?.Right8 !== undefined ? pageFourDataValue?.Right8 : props?.ServiceInfo?.r8)

        const [First1, setFirst1] = useState(pageFourDataValue?.First1 !== undefined ? pageFourDataValue?.First1 : props?.ServiceInfo?.f1)
        const [First2, setFirst2] = useState(pageFourDataValue?.First2 !== undefined ? pageFourDataValue?.First2 : props?.ServiceInfo?.f2)

        const FUEL_GUAGE = [{ label: '1/2', value: '1/2', key: "1/2" },
        { label: '1/4', value: '1/4', key: "1/4" },
        { label: '3/4', value: '3/4', key: "3/4" },
        { label: 'FULL', value: 'FULL', key: "FULL" },
        ]

        let objectForFour = {
            First1,
            First2,
            left1,
            left2,
            left3,
            left4,
            left5,
            left6,
            left7,
            left8,
            Right1,
            Right2,
            Right3,
            Right4,
            Right5,
            Right6,
            Right7,
            Right8,
        }

        const SaveStepFour = () => {
            console.log(objectForFour, "objectForFour")
            dispatch(setStepFourDataInRedux(objectForFour))
            setloacalLoading(true)
            setTimeout(() => {
                finalSubmit()
            }, 5000);
            goNext()
        }




        const TapForLog = () => {
            console.log(pageOneDataValue?.fuelGuage, 'pageOneDataValue?.setfuelGuage');
            console.log(props?.ServiceInfo?.fuel_guage, 'props?.ServiceInfo?.fuel_guage');
        }


        const showVal = () => {
            console.log(OdoMeter, "OdoMeter")
        }

        return (
            <>
                {page === 1 ?
                    <>

                        <Text style={styles.TextColor} >Odometer</Text>
                        <TextInput
                            style={styles.TextInputStyles}
                            placeholder="Enter the number"
                            onChangeText={text => setOdoMeter(text)}
                            autoCorrect={false}
                            keyboardType='numeric'
                            editable={!disableEdit}
                            autoCapitalize="none"
                        >
                            {pageOneDataValue?.OdoMeter !== undefined ? pageOneDataValue?.OdoMeter : props?.ServiceInfo?.odometer}
                        </TextInput>

                        <CustomCheckBox HeadingName={"Checked"} stateFunction={setCheckedVal} Value={pageOneDataValue?.CheckedVal !== undefined ? pageOneDataValue?.CheckedVal : props?.ServiceInfo?.checked} />
                        <CustomCheckBox HeadingName={"Replacement"} stateFunction={setReplacement} Value={pageOneDataValue?.Replacement !== undefined ? pageOneDataValue?.Replacement : props?.ServiceInfo?.replacement} />
                        <CustomCheckBox HeadingName={"Top Up"} stateFunction={setTopUp} Value={pageOneDataValue?.TopUp !== undefined ? pageOneDataValue?.TopUp : props?.ServiceInfo?.top_up} />
                        <CustomCheckBox HeadingName={"Adjustment"} stateFunction={setAdjustment} Value={pageOneDataValue?.Adjustment !== undefined ? pageOneDataValue?.Adjustment : props?.ServiceInfo?.adjustment} />
                        <CustomCheckBox HeadingName={"Leakage"} stateFunction={setLeakage} Value={pageOneDataValue?.Leakage !== undefined ? pageOneDataValue?.Leakage : props?.ServiceInfo?.leakage} />

                        <Text style={styles.TextColor} >Fuel Guage</Text>
                        <RNPickerSelect
                            useNativeAndroidPickerStyle={false}
                            itemKey={pageOneDataValue?.fuelGuage !== undefined ? pageOneDataValue?.fuelGuage : props?.ServiceInfo?.fuel_guage}
                            // value={pageOneDataValue?.setfuelGuage ? pageOneDataValue?.setfuelGuage : props?.ServiceInfo?.fuel_guage}
                            onValueChange={(value, index) => { setfuelGuage(value); console.log(value, 'LOG') }}
                            disabled={disableEdit}
                            style={pickerSelectStyles}
                            items={FUEL_GUAGE}
                        />

                        {
                            disableEdit == true ?
                                <FormButton buttonTitle="NEXT" onPress={() => { goNext(); fillDetailSection() }} />
                                :
                                <FormButton buttonTitle="NEXT" onPress={() => { SaveInterior(); fillDetailSection() }} />
                        }
                    </>
                    : page == 2 ?
                        <>

                            <CustomCheckBox HeadingName={"Engine Oil"} stateFunction={setEngineOil} Value={pageTwoDataValue?.EngineOil !== undefined ? pageTwoDataValue?.EngineOil : props?.ServiceInfo?.engine_oil} />
                            <CustomCheckBox HeadingName={"Transmission Oil"} stateFunction={setTransmissionOil} Value={pageTwoDataValue?.TransmissionOil !== undefined ? pageTwoDataValue?.TransmissionOil : props?.ServiceInfo?.transmission_oil} />
                            <CustomCheckBox HeadingName={"Rear Axle Oil"} stateFunction={setRearAxleOil} Value={pageTwoDataValue?.RearAxleOil !== undefined ? pageTwoDataValue?.RearAxleOil : props?.ServiceInfo?.rear_axle_oil} />
                            <CustomCheckBox HeadingName={"Power Steering Oil"} stateFunction={setPowerSteeringOil} Value={pageTwoDataValue?.PowerSteeringOil !== undefined ? pageTwoDataValue?.PowerSteeringOil : props?.ServiceInfo?.power_steering_oil} />
                            <CustomCheckBox HeadingName={"Brake Fluid"} stateFunction={setBrakeFluid} Value={pageTwoDataValue?.BrakeFluid !== undefined ? pageTwoDataValue?.BrakeFluid : props?.ServiceInfo?.brake_fluid} />
                            <CustomCheckBox HeadingName={"Clutch Fluid"} stateFunction={setClutchFluid} Value={pageTwoDataValue?.ClutchFluid !== undefined ? pageTwoDataValue?.ClutchFluid : props?.ServiceInfo?.clutch_fluid} />
                            <CustomCheckBox HeadingName={"Greasing All Points"} stateFunction={setGreasingAllPoints} Value={pageTwoDataValue?.GreasingAllPoints !== undefined ? pageTwoDataValue?.GreasingAllPoints : props?.ServiceInfo?.greasing_all_points} />
                            <CustomCheckBox HeadingName={"Oil Filter"} stateFunction={setOilFilter} Value={pageTwoDataValue?.OilFilter !== undefined ? pageTwoDataValue?.OilFilter : props?.ServiceInfo?.oil_filter} />
                            <CustomCheckBox HeadingName={"Fuel Filter"} stateFunction={setFuelFilter} Value={pageTwoDataValue?.FuelFilter !== undefined ? pageTwoDataValue?.FuelFilter : props?.ServiceInfo?.fuel_filter} />
                            <CustomCheckBox HeadingName={"Air Filter"} stateFunction={setAirFilter} Value={pageTwoDataValue?.AirFilter !== undefined ? pageTwoDataValue?.AirFilter : props?.ServiceInfo?.air_filter} />
                            <CustomCheckBox HeadingName={"T/M Filter"} stateFunction={setTMFilter} Value={pageTwoDataValue?.TMFilter !== undefined ? pageTwoDataValue?.TMFilter : props?.ServiceInfo?.tm_filter} />
                            <CustomCheckBox HeadingName={"Battery Water"} stateFunction={setBatteryWater} Value={pageTwoDataValue?.BatteryWater !== undefined ? pageTwoDataValue?.BatteryWater : props?.ServiceInfo?.battery_water} />
                            <CustomCheckBox HeadingName={"Radiator Coolant"} stateFunction={setRadiatorCoolant} Value={pageTwoDataValue?.RadiatorCoolant !== undefined ? pageTwoDataValue?.RadiatorCoolant : props?.ServiceInfo?.radiator_coolant} />
                            <CustomCheckBox HeadingName={"Water Seperator"} stateFunction={setWaterSeperator} Value={pageTwoDataValue?.WaterSeperator !== undefined ? pageTwoDataValue?.WaterSeperator : props?.ServiceInfo?.water_separator} />
                            <CustomCheckBox HeadingName={"All light/Signal"} stateFunction={setAlllightSignal} Value={pageTwoDataValue?.AlllightSignal !== undefined ? pageTwoDataValue?.AlllightSignal : props?.ServiceInfo?.all_light_signal} />
                            <CustomCheckBox HeadingName={"Num Plate / Light"} stateFunction={setNumPlateLight} Value={pageTwoDataValue?.NumPlateLight !== undefined ? pageTwoDataValue?.NumPlateLight : props?.ServiceInfo?.num_plate_light} />
                            <CustomCheckBox HeadingName={"Horn"} stateFunction={setHorn} Value={pageTwoDataValue?.Horn !== undefined ? pageTwoDataValue?.Horn : props?.ServiceInfo?.horn} />
                            <CustomCheckBox HeadingName={"Reverse Light"} stateFunction={setReverseLight} Value={pageTwoDataValue?.ReverseLight !== undefined ? pageTwoDataValue?.ReverseLight : props?.ServiceInfo?.reverse_light} />
                            <CustomCheckBox HeadingName={"Mud Guard/Fender"} stateFunction={setMudGuardFender} Value={pageTwoDataValue?.MudGuardFender !== undefined ? pageTwoDataValue?.MudGuardFender : props?.ServiceInfo?.mud_guard_fender} />
                            <CustomCheckBox HeadingName={"Flaps"} stateFunction={setFlaps} Value={pageTwoDataValue?.Flaps !== undefined ? pageTwoDataValue?.Flaps : props?.ServiceInfo?.flaps} />
                            <CustomCheckBox HeadingName={"Clutch"} stateFunction={setClutch} Value={pageTwoDataValue?.Clutch !== undefined ? pageTwoDataValue?.Clutch : props?.ServiceInfo?.clutch} />
                            <CustomCheckBox HeadingName={"Tyre Wear/Alignment"} stateFunction={setTyreWearAlignment} Value={pageTwoDataValue?.TyreWearAlignment !== undefined ? pageTwoDataValue?.TyreWearAlignment : props?.ServiceInfo?.tyre_wear_alignment} />
                            <CustomCheckBox HeadingName={"Clutch Replacement"} stateFunction={setClutchReplacement} Value={pageTwoDataValue?.ClutchReplacement !== undefined ? pageTwoDataValue?.ClutchReplacement : props?.ServiceInfo?.clutch_replacement} />
                            <CustomCheckBox HeadingName={"Battery Replacement"} stateFunction={setBatteryReplacement} Value={pageTwoDataValue?.BatteryReplacement !== undefined ? pageTwoDataValue?.BatteryReplacement : props?.ServiceInfo?.battery_replacement} />
                            <CustomCheckBox HeadingName={"Brakes Replacement"} stateFunction={setBrakesReplacement} Value={pageTwoDataValue?.BrakesReplacement !== undefined ? pageTwoDataValue?.BrakesReplacement : props?.ServiceInfo?.brakes_replacement} />
                            <CustomCheckBox HeadingName={"Fan Belt"} stateFunction={setFanBelt} Value={pageTwoDataValue?.FanBelt !== undefined ? pageTwoDataValue?.FanBelt : props?.ServiceInfo?.fan_belt} />
                            <CustomCheckBox HeadingName={"Valve Clearence"} stateFunction={setValveClearence} Value={pageTwoDataValue?.ValveClearence !== undefined ? pageTwoDataValue?.ValveClearence : props?.ServiceInfo?.valve_clearence} />
                            <CustomCheckBox HeadingName={"Fuel Pump"} stateFunction={setFuelPump} Value={pageTwoDataValue?.FuelPump !== undefined ? pageTwoDataValue?.FuelPump : props?.ServiceInfo?.fuel_pump} />
                            <CustomCheckBox HeadingName={"Fuel Injector"} stateFunction={setFuelInjector} Value={pageTwoDataValue?.FuelInjector !== undefined ? pageTwoDataValue?.FuelInjector : props?.ServiceInfo?.fuel_injector} />
                            <CustomCheckBox HeadingName={"Exhaust Brake"} stateFunction={setExhaustBrake} Value={pageTwoDataValue?.ExhaustBrake !== undefined ? pageTwoDataValue?.ExhaustBrake : props?.ServiceInfo?.exhaust_brake} />
                            {
                                disableEdit == true ?
                                    <FormButton buttonTitle="NEXT" onPress={() => { goNext(); fillDetailSection() }} />
                                    :
                                    <FormButton buttonTitle="NEXT" onPress={() => { SaveStepTwo(); fillDetailSection() }} />
                            }
                        </>
                        : page == 3 ?
                            <>

                                <CustomCheckBox HeadingName={"Compressor(12v/24v)"} stateFunction={setCompressor12v24v} Value={pageThreeDataValue?.Compressor12v24v !== undefined ? pageThreeDataValue?.Compressor12v24v : props?.ServiceInfo?.compressor_12v_24v} />
                                <CustomCheckBox HeadingName={"Air-Cond Belt"} stateFunction={setAirCondBelt} Value={pageThreeDataValue?.AirCondBelt == undefined ? props?.ServiceInfo?.air_cond_belt : pageThreeDataValue?.AirCondBelt} />
                                <CustomCheckBox HeadingName={"Compressor Brackets"} stateFunction={setCompressorBrackets} Value={pageThreeDataValue?.CompressorBrackets !== undefined ? pageThreeDataValue?.CompressorBrackets : props?.ServiceInfo?.compressor_brackets} />
                                <CustomCheckBox HeadingName={"Tempreture Guage"} stateFunction={setTempretureGuage} Value={pageThreeDataValue?.TempretureGuage !== undefined ? pageThreeDataValue?.TempretureGuage : props?.ServiceInfo?.tempreture_guage} />
                                <CustomCheckBox HeadingName={"Condenser Coil"} stateFunction={setCondenserCoil} Value={pageThreeDataValue?.CondenserCoil !== undefined ? pageThreeDataValue?.CondenserCoil : props?.ServiceInfo?.condenser_coil} />
                                <CustomCheckBox HeadingName={"Condsr Fan Mtr (12v/24v)"} stateFunction={setCondsrFanMtr} Value={pageThreeDataValue?.CondsrFanMtr !== undefined ? pageThreeDataValue?.CondsrFanMtr : props?.ServiceInfo?.condsr_fan_mtr_12v_24v} />
                                <CustomCheckBox HeadingName={"Blower Mtr (12v/24v)"} stateFunction={setBlowerMtr} Value={pageThreeDataValue?.BlowerMtr !== undefined ? pageThreeDataValue?.BlowerMtr : props?.ServiceInfo?.blower_mtr_12v_24v} />
                                <CustomCheckBox HeadingName={"Idler Pulley w/blush Brg"} stateFunction={setIdlerPulley} Value={pageThreeDataValue?.IdlerPulley !== undefined ? pageThreeDataValue?.IdlerPulley : props?.ServiceInfo?.idler_pulley_blush_brg} />
                                <CustomCheckBox HeadingName={"Resistor"} stateFunction={setResistor} Value={pageThreeDataValue?.Resistor !== undefined ? pageThreeDataValue?.Resistor : props?.ServiceInfo?.resistor} />
                                <CustomCheckBox HeadingName={'Suction Hose 5/8"'} stateFunction={setSuctionHose} Value={pageThreeDataValue?.SuctionHose !== undefined ? pageThreeDataValue?.SuctionHose : props?.ServiceInfo?.suction_hose_58} />
                                <CustomCheckBox HeadingName={"Discharge Hose"} stateFunction={setDischargeHose} Value={pageThreeDataValue?.DischargeHose !== undefined ? pageThreeDataValue?.DischargeHose : props?.ServiceInfo?.discharge_hose} />
                                <CustomCheckBox HeadingName={'AI Pipe 3/8"'} stateFunction={setAIPipe} Value={pageThreeDataValue?.AIPipe !== undefined ? pageThreeDataValue?.AIPipe : props?.ServiceInfo?.ai_pipe_38} />
                                <CustomCheckBox HeadingName={"Pressure Switch"} stateFunction={setPressureSwitch} Value={pageThreeDataValue?.PressureSwitch !== undefined ? pageThreeDataValue?.PressureSwitch : props?.ServiceInfo?.pressure_switch} />
                                <CustomCheckBox HeadingName={"Thermostat Sensor"} stateFunction={setThermostatSensor} Value={pageThreeDataValue?.ThermostatSensor !== undefined ? pageThreeDataValue?.ThermostatSensor : props?.ServiceInfo?.thermostat_sensor} />
                                <CustomCheckBox HeadingName={"Relay (12v/24v)"} stateFunction={setRelay} Value={pageThreeDataValue?.Relay !== undefined ? pageThreeDataValue?.Relay : props?.ServiceInfo?.relay_12v_24v} />
                                <CustomCheckBox HeadingName={"Evaporator Coil/Unit"} stateFunction={setEvaporatorCoil} Value={pageThreeDataValue?.EvaporatorCoil !== undefined ? pageThreeDataValue?.EvaporatorCoil : props?.ServiceInfo?.evaporator_coil_unit} />
                                <CustomCheckBox HeadingName={"Exp Valve/Blk/Eqz"} stateFunction={setExpValve} Value={pageThreeDataValue?.ExpValve !== undefined ? pageThreeDataValue?.ExpValve : props?.ServiceInfo?.exp_valve_blk_eqz} />
                                <CustomCheckBox HeadingName={"Receiver Drier"} stateFunction={setReceiverDrier} Value={pageThreeDataValue?.ReceiverDrier !== undefined ? pageThreeDataValue?.ReceiverDrier : props?.ServiceInfo?.receiver_drier} />
                                <CustomCheckBox HeadingName={"Vacuum&Refil Oil"} stateFunction={setVacuumRefilOil} Value={pageThreeDataValue?.VacuumRefilOil !== undefined ? pageThreeDataValue?.VacuumRefilOil : props?.ServiceInfo?.vacuum_refil_oil} />
                                <CustomCheckBox HeadingName={"Refill gas R134a/R404/R22"} stateFunction={setRefillgasR134a} Value={pageThreeDataValue?.RefillgasR134a !== undefined ? pageThreeDataValue?.RefillgasR134a : props?.ServiceInfo?.refill_gas_r134a_r404_r22} />
                                <CustomCheckBox HeadingName={"General service AC/Freezer"} stateFunction={setGeneralserviceAC} Value={pageThreeDataValue?.GeneralserviceAC !== undefined ? pageThreeDataValue?.GeneralserviceAC : props?.ServiceInfo?.general_service_ac_freezer} />
                                <CustomCheckBox HeadingName={"Expansion Valve"} stateFunction={setExpansionValve} Value={pageThreeDataValue?.ExpansionValve !== undefined ? pageThreeDataValue?.ExpansionValve : props?.ServiceInfo?.expansion_valve} />
                                <CustomCheckBox HeadingName={"Copssor Clutch Coil (12/24v)"} stateFunction={setCopssorClutchCoil} Value={pageThreeDataValue?.CopssorClutchCoil !== undefined ? pageThreeDataValue?.CopssorClutchCoil : props?.ServiceInfo?.copssor_clutch_coil_12_24v} />
                                <CustomCheckBox HeadingName={"Chemical Clean Coil/Condsr"} stateFunction={setChemicalCleanCoil} Value={pageThreeDataValue?.ChemicalCleanCoil !== undefined ? pageThreeDataValue?.ChemicalCleanCoil : props?.ServiceInfo?.chemical_clean_coil_condsr} />
                                <CustomCheckBox HeadingName={"Top up Compressor Oil New"} stateFunction={setTopupCompressorOil} Value={pageThreeDataValue?.TopupCompressorOil !== undefined ? pageThreeDataValue?.TopupCompressorOil : props?.ServiceInfo?.top_up_compressor_oil_new} />
                                <CustomCheckBox HeadingName={"Cabin Air Filter"} stateFunction={setCabinAirFilter} Value={pageThreeDataValue?.CabinAirFilter !== undefined ? pageThreeDataValue?.CabinAirFilter : props?.ServiceInfo?.cabin_air_filter} />
                                <CustomCheckBox HeadingName={"General Electrical Check"} stateFunction={setGeneralElectricalCheck} Value={pageThreeDataValue?.GeneralElectricalCheck !== undefined ? pageThreeDataValue?.GeneralElectricalCheck : props?.ServiceInfo?.general_electrical_check} />
                                <Text style={styles.TextColor} >Tempreture Reading</Text>
                                <TextInput
                                    style={styles.TextInputStyles}
                                    placeholder="Manual Key In~  °c"
                                    onChangeText={text => setTempretureReading(text)}
                                    autoCorrect={false}
                                    keyboardType='numeric'
                                    editable={!disableEdit}
                                    autoCapitalize="none"
                                >
                                    {pageOneDataValue?.TempretureReading !== undefined ? pageOneDataValue?.TempretureReading : props?.ServiceInfo?.tempreture_reading}
                                </TextInput>

                                <View style={styles.addRemark} >
                                    <Text style={styles.BLueHeading} >Additional Parts / Repairs</Text>
                                    <TouchableOpacity activeOpacity={0.7} onPress={() => addReamrk()} >
                                        <AntIcon name='plussquareo' size={20} color={Colors.primary_Blue} />
                                    </TouchableOpacity>
                                </View>
                                {reamrkTextArray?.map((item, index) => (
                                    <View style={styles.reamrkView} key={index} >
                                        <View style={styles.remarkIndex} >
                                            <FormInput
                                                InputSubject="ID"
                                                // placeholderText="Enter the number"
                                                keyboardType="email-address"
                                                autoCapitalize="none"
                                                backgroundColor="transparent"
                                                headingTextColor={'#000'}
                                                autoCorrect={false}>
                                                {index + 1}
                                            </FormInput>
                                        </View>
                                        <View style={styles.ramrkInput} >
                                            <FormInput
                                                changedText={text => remarkTextFunction(text, index)}
                                                InputSubject="Remarks"
                                                editable={!disableEdit}
                                                maxLength={60}
                                                placeholderText="Enter the number"
                                                keyboardType="email-address"
                                                autoCapitalize="none"
                                                headingTextColor={'#000'}
                                                autoCorrect={false}>
                                                {item}
                                            </FormInput>
                                        </View>
                                        <TouchableOpacity activeOpacity={0.7} style={styles.deleteIcon} onPress={() => removeRemark(index)} >
                                            <AntIcon name='closesquareo' size={20} color={Colors.primary_Red} />
                                        </TouchableOpacity>
                                    </View>
                                ))
                                }
                                {/* {ShowReamrkInput === true ?
                                    LengthOfRemark?.map((item, index) => (
                                        <View style={styles.reamrkView} key={item} >
                                            <View style={styles.remarkIndex} >
                                                <FormInput
                                                    InputSubject="ID"
                                                    editable={false}
                                                    // placeholderText="Enter the number"
                                                    keyboardType="email-address"
                                                    autoCapitalize="none"
                                                    backgroundColor="transparent"
                                                    headingTextColor={'#000'}
                                                    autoCorrect={false}>
                                                    {index + 1}
                                                </FormInput>
                                            </View>
                                            <View style={styles.ramrkInput} >
                                                <FormInput
                                                    changedText={text => remarkTextFunction(text, index)}
                                                    InputSubject="Remarks"
                                                    placeholderText="Enter the number"
                                                    keyboardType="email-address"
                                                    autoCapitalize="none"
                                                    editable={!disableEdit}
                                                    headingTextColor={'#000'}
                                                    autoCorrect={false}>

                                                </FormInput>
                                            </View>
                                            <TouchableOpacity activeOpacity={0.7} style={styles.deleteIcon} onPress={() => removeRemark(index)} >
                                                <AntIcon name='closesquareo' size={20} color={Colors.primary_Red} />
                                            </TouchableOpacity>
                                        </View>
                                    ))

                                    : null
                                } */}
                                {
                                    disableEdit == true ?
                                        <FormButton buttonTitle="NEXT" onPress={() => { goNext(); fillDetailSection() }} />
                                        :
                                        <FormButton buttonTitle="NEXT" onPress={() => { SaveStepThree(); fillDetailSection() }} />
                                }
                            </>
                            : page == 4 ?
                                <>
                                    {/* <LeftTyres leftTyreVal={true} /> */}
                                    <View style={styles.TyreWrapper} >
                                        <View style={styles.TyreView} >
                                            <View style={styles.TyyreHeading} >
                                                <Text style={{ fontSize: 18, fontFamily: fonts.PoppinsSemiBold, color: "#000" }} >Left Tyre</Text>
                                            </View>
                                            <View style={styles.singleTyreView} >
                                                <TyreCheckBox TyreName={'F1'} stateFunction={setFirst1} Value={pageFourDataValue?.First1 !== undefined ? pageFourDataValue?.First1 : props?.ServiceInfo?.f1} />
                                            </View>
                                            <View style={styles.singleTyreView} >
                                                <TyreCheckBox TyreName={'L1'} stateFunction={setleft1} Value={pageFourDataValue?.left1 !== undefined ? pageFourDataValue?.left1 : props?.ServiceInfo?.l1} />
                                                <TyreCheckBox TyreName={'L2'} stateFunction={setleft2} Value={pageFourDataValue?.left2 !== undefined ? pageFourDataValue?.left2 : props?.ServiceInfo?.l2} />
                                            </View>
                                            <View style={styles.singleTyreView} >
                                                <TyreCheckBox TyreName={'L3'} stateFunction={setleft3} Value={pageFourDataValue?.left3 !== undefined ? pageFourDataValue?.left3 : props?.ServiceInfo?.l3} />
                                                <TyreCheckBox TyreName={'L4'} stateFunction={setleft4} Value={pageFourDataValue?.left4 !== undefined ? pageFourDataValue?.left4 : props?.ServiceInfo?.l4} />
                                            </View>
                                            <View style={styles.singleTyreView} >
                                                <TyreCheckBox TyreName={'L5'} stateFunction={setleft5} Value={pageFourDataValue?.left5 !== undefined ? pageFourDataValue?.left5 : props?.ServiceInfo?.l5} />
                                                <TyreCheckBox TyreName={'L6'} stateFunction={setleft6} Value={pageFourDataValue?.left6 !== undefined ? pageFourDataValue?.left6 : props?.ServiceInfo?.l6} />
                                            </View>
                                            <View style={styles.singleTyreView} >
                                                <TyreCheckBox TyreName={'L7'} stateFunction={setleft7} Value={pageFourDataValue?.left7 !== undefined ? pageFourDataValue?.left7 : props?.ServiceInfo?.l7} />
                                                <TyreCheckBox TyreName={'L8'} stateFunction={setleft8} Value={pageFourDataValue?.left8 !== undefined ? pageFourDataValue?.left8 : props?.ServiceInfo?.l8} />
                                            </View>
                                        </View>
                                        <View style={styles.TyreView} >
                                            <View style={styles.TyyreHeading} >
                                                <Text style={{ fontSize: 18, fontFamily: fonts.PoppinsSemiBold, color: "#000" }} >Right Tyre</Text>
                                            </View>
                                            <View style={styles.singleTyreView} >
                                                <TyreCheckBox TyreName={'F2'} stateFunction={setFirst2} Value={pageFourDataValue?.First2 !== undefined ? pageFourDataValue?.First2 : props?.ServiceInfo?.f2} />
                                            </View>
                                            <View style={styles.singleTyreView} >
                                                <TyreCheckBox TyreName={'R1'} stateFunction={setRight1} Value={pageFourDataValue?.Right1 !== undefined ? pageFourDataValue?.Right1 : props?.ServiceInfo?.r1} />
                                                <TyreCheckBox TyreName={'R2'} stateFunction={setRight2} Value={pageFourDataValue?.Right2 !== undefined ? pageFourDataValue?.Right2 : props?.ServiceInfo?.r2} />
                                            </View>
                                            <View style={styles.singleTyreView} >
                                                <TyreCheckBox TyreName={'R3'} stateFunction={setRight3} Value={pageFourDataValue?.Right3 !== undefined ? pageFourDataValue?.Right3 : props?.ServiceInfo?.r3} />
                                                <TyreCheckBox TyreName={'R4'} stateFunction={setRight4} Value={pageFourDataValue?.Right4 !== undefined ? pageFourDataValue?.Right4 : props?.ServiceInfo?.r4} />
                                            </View>
                                            <View style={styles.singleTyreView} >
                                                <TyreCheckBox TyreName={'R5'} stateFunction={setRight5} Value={pageFourDataValue?.Right5 !== undefined ? pageFourDataValue?.Right5 : props?.ServiceInfo?.r5} />
                                                <TyreCheckBox TyreName={'R6'} stateFunction={setRight6} Value={pageFourDataValue?.Right6 !== undefined ? pageFourDataValue?.Right6 : props?.ServiceInfo?.r6} />
                                            </View>
                                            <View style={styles.singleTyreView} >
                                                <TyreCheckBox TyreName={'R7'} stateFunction={setRight7} Value={pageFourDataValue?.Right7 !== undefined ? pageFourDataValue?.Right7 : props?.ServiceInfo?.r7} />
                                                <TyreCheckBox TyreName={'R8'} stateFunction={setRight8} Value={pageFourDataValue?.Right8 !== undefined ? pageFourDataValue?.Right8 : props?.ServiceInfo?.r8} />
                                            </View>
                                        </View>
                                    </View>

                                    {
                                        disableEdit == true ?
                                            <FormButton buttonTitle="BACK" onPress={() => navigation.goBack()} />
                                            :
                                            <FormButton buttonTitle="SUBMIT" onPress={() => SaveStepFour()} />
                                    }
                                </>
                                : null}
            </>
        )
    }



    return (
        <SafeAreaView style={styles.NewOrderStyle} >
            {/* <VMOCustomHeader title={"Accidental claim ID #21"} backIcon /> */}
            <View>
                <View style={styles.StepWiseWrapper} >
                    {loacalLoading === true ? <Spinner style={{ height: windowHeight }} /> :

                        <View style={styles.StepProgressWrap} >
                            <View style={styles.ProgressLine}>
                                <View style={styles.StepLine}>
                                    <View style={[styles.StepLineOne,
                                    { backgroundColor: active > 1 ? Colors.primary_Blue : "#C1C1C1" }
                                    ]}></View>
                                    <View style={[styles.StepLineTwo,
                                    { backgroundColor: active > 2 ? Colors.primary_Blue : "#C1C1C1" }
                                    ]}></View>
                                    <View style={[styles.StepLineThree,
                                    { backgroundColor: active > 3 ? Colors.primary_Blue : "#C1C1C1" }

                                    ]}></View>
                                </View>

                                {active === 1 ? (
                                    <View style={styles.StepNameAndCircle} >
                                        <View style={styles.StepCircleTouchActive} onPress={goToStepOne}>
                                            <View style={styles.UpperCircle} >
                                                <IonIcon name="ios-checkmark-sharp" size={25} style={{ fontWeight: 'bold' }} color={'#fff'} />
                                            </View>
                                        </View>
                                        <Text style={styles.StepTextActive} >STEP 1</Text>
                                    </View>
                                ) : (

                                    <View style={styles.StepNameAndCircle} >
                                        <Pressable style={[styles.StepCircleTouch, { backgroundColor: active > 1 ? Colors.primary_Blue : "#C1C1C1" }]} onPress={goToStepOne}>
                                            <IonIcon name="ios-checkmark-sharp" size={25} style={{ fontWeight: 'bold' }} color={'#fff'} />
                                        </Pressable>
                                        <Text style={styles.StepText} >STEP 1</Text>
                                    </View>
                                )}
                                {active === 2 ? (
                                    <View style={styles.StepNameAndCircle} >
                                        <View style={styles.StepCircleTouchActive} onPress={goToStepTwo}>
                                            <View style={styles.UpperCircle}>
                                                <IonIcon name="ios-checkmark-sharp" size={25} style={{ fontWeight: 'bold' }} color={'#fff'} />
                                            </View>
                                        </View>
                                        <Text style={styles.StepTextActive} >STEP 2</Text>
                                    </View>
                                ) : (
                                    <View style={styles.StepNameAndCircle} >
                                        <Pressable style={[styles.StepCircleTouch, { backgroundColor: active > 1 ? Colors.primary_Blue : "#C1C1C1" }]} onPress={goToStepTwo}>
                                            <IonIcon name="ios-checkmark-sharp" size={25} style={{ fontWeight: 'bold' }} color={'#fff'} />
                                        </Pressable>
                                        <Text style={styles.StepText} >STEP 2</Text>
                                    </View>
                                )}
                                {active === 3 ? (
                                    <View style={styles.StepNameAndCircle} >
                                        <View style={styles.StepCircleTouchActive} onPress={goToStepThree}>
                                            <View style={styles.UpperCircle} >
                                                <IonIcon name="ios-checkmark-sharp" size={25} style={{ fontWeight: 'bold' }} color={'#fff'} />
                                            </View>
                                        </View>
                                        <Text style={styles.StepTextActive} >STEP 3</Text>
                                    </View>
                                ) : (
                                    <View style={styles.StepNameAndCircle} >
                                        <Pressable style={[styles.StepCircleTouch, { backgroundColor: active > 2 ? Colors.primary_Blue : "#C1C1C1" }]} onPress={goToStepThree}>
                                            <IonIcon name="ios-checkmark-sharp" size={25} style={{ fontWeight: 'bold' }} color={'#fff'} />
                                        </Pressable>
                                        <Text style={styles.StepText} >STEP 3</Text>
                                    </View>
                                )}
                                {active === 4 ? (
                                    <View style={styles.StepNameAndCircle} >
                                        <View style={styles.StepCircleTouchActive} >
                                            <View style={styles.UpperCircle} >
                                                <IonIcon name="ios-checkmark-sharp" size={25} style={{ fontWeight: 'bold' }} color={'#fff'} />
                                            </View>
                                        </View>
                                        <Text style={styles.StepTextActive} >STEP 4</Text>
                                    </View>
                                ) : (
                                    <View style={styles.StepNameAndCircle} >
                                        <View style={[styles.StepCircleTouch, { backgroundColor: active > 3 ? Colors.primary_Blue : "#C1C1C1" }]} >
                                            <IonIcon name="ios-checkmark-sharp" size={25} style={{ fontWeight: 'bold' }} color={'#fff'} />
                                        </View>
                                        <Text style={styles.StepText} >STEP 4</Text>
                                    </View>
                                )}
                            </View>

                        </View>
                    }
                    <View  >
                        <ScrollView keyboardShouldPersistTaps="handled" style={{ height: "70%", marginBottom: 20, paddingBottom: 20 }} ref={scrollViewRef} onContentSizeChange={() => fillDetailSection}>

                            <View style={styles.StepContentView}>
                                <View style={styles.PageContent} >
                                    {page === 1 &&
                                        <InteriorCheckIn />
                                    }
                                    {page === 2 &&
                                        <InteriorCheckIn />
                                    }
                                    {page === 3 &&
                                        <InteriorCheckIn />
                                    }
                                    {page === 4 &&
                                        <InteriorCheckIn />
                                    }
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default ServicceStepWiseForm



const styles = StyleSheet.create({
    TextColor: {
        fontSize: 16,
        marginBottom: 5,
        color: colors.black,
    },
    TextInputStyle: {
        height: 50,
        backgroundColor: '#fff',
        fontSize: 18,
        borderRadius: 5,
        color: '#000',
        marginVertical: 10,
    },
    reamrkView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    remarkIndex: {
        // backgroundColor: 'pink',
        marginHorizontal: "2%",
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    ramrkInput: {
        flex: 12,
        marginHorizontal: "2%",
        // backgroundColor: 'green',
    },
    deleteIcon: {
        marginHorizontal: "2%",
    },
    BLueHeading: {
        color: Colors.primary_Blue,
        fontSize: 18,
        marginVertical: "4%",
    },
    addRemark: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    image: {
        // flex: 1,
        justifyContent: "center",
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        // transform: [{ rotate: '-90deg' }],
    },
    touchableLeftRight: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tyreImage: {
        // flex: 1,
        justifyContent: "center",
        alignSelf: 'center',
        textAlign: 'center',
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        // transform: [{ rotate: '-90deg' }],
    },
    TyreView: {
        height: windowHeight,
        // height:'100%',
        width: '100%',
    },
    SingleTyreWrapper: {
        height: '100%',
        width: '50%',
        // flexDirection: 'row',
        justifyContent: 'space-between',
        textAlign: 'center',
        alignItems: 'center',
        // width: '100%',
        // height: '20%'
    },
    singleTyreView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '20%',
        backgroundColor: 'red',
    },
    tyreTextView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    tyreText: {
        color: Colors.primary_Blue,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    NewOrderStyle: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    newOrderWrapper: {
        flex: 1,
    },
    scrollPadding: {
        paddingHorizontal: "5%",
    },
    downShow: {
        paddingBottom: "20%",
    },
    BLueHeading: {
        color: Colors.primary_Color,
        fontSize: 16,
        lineHeight: 24,
        marginVertical: "4%",
        fontFamily: fonts.PoppinsSemiBold,
        paddingVertical: 10,
    },
    TouchableDate: {
        backgroundColor: "#ffffff",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
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

    },
    textCal: {
        color: "#000",
        paddingHorizontal: 10,
        fontSize: 18,
    },
    addRemark: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    reamrkView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // backgroundColor: 'red',
    },
    remarkIndex: {
        // backgroundColor: 'pink',
        marginHorizontal: "2%",
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    ramrkInput: {
        flex: 12,
        marginHorizontal: "2%",
        // backgroundColor: 'green',
    },
    deleteIcon: {
        marginHorizontal: "2%",
    },
    imageCircleNew: {
        height: windowHeight / 2,
        width: windowWidth,
        borderRadius: 50,
    },
    TextColor: {
        fontSize: 14,
        paddingVertical: 10,
        color: Colors.primary_Color,
        fontFamily: fonts.PoppinsMedium,
        textAlign: "center",
        justifyContent: "center",
        alignItems: 'center',
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
    },
    StepWiseWrapper: {
        marginBottom: 10,
        height: "100%",
        height: windowHeight,
    },
    StepProgressWrap: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: "center",
        height: '15%',
        height: windowHeight / 7,
        alignItems: "center",
    },
    ProgressLine: {
        flexDirection: "row",
        height: "100%",
        width: '85%',
        justifyContent: "space-between",
        alignSelf: "center",
        alignItems: "center",
        top: 0,
    },
    // StepLine: {
    //     backgroundColor: "#000",
    //     height: "2%",
    //     margin: 2,
    //     justifyContent: "center",
    //     alignSelf: "center",
    //     alignItems: "center",
    //     position: "absolute",
    //     /* left: 90%, */
    //     width: "95%",
    //     top: "45%",
    //     // content: '',
    // },
    StepLine: {
        backgroundColor: "#000",
        height: "2%",
        margin: 2,
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        position: "absolute",
        /* left: 90%, */
        width: "95%",
        top: "45%",
        // content: '',
    },
    StepLineOne: {
        backgroundColor: "red",
        height: "100%",
        margin: 2,
        justifyContent: "flex-start",
        alignSelf: "flex-start",
        alignItems: "center",
        position: "absolute",
        width: "33%",
        // top: '100%',
        zIndex: 5,
    },
    StepLineTwo: {
        backgroundColor: "green",
        height: "100%",
        margin: 2,
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        position: "absolute",
        width: "33%",
        zIndex: 5,
    },
    StepLineThree: {
        backgroundColor: "purple",
        height: "100%",
        margin: 2,
        justifyContent: "center",
        alignSelf: "flex-end",
        alignItems: "center",
        position: "absolute",
        width: "33%",
        zIndex: 5,
    },
    StepLineFour: {
        backgroundColor: "yellow",
        height: "100%",
        margin: 2,
        justifyContent: "center",
        alignSelf: "flex-end",
        alignItems: "center",
        position: "absolute",
        width: "25%",
        zIndex: 5,
    },
    StepNameAndCircle: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        alignSelf: "center",
        // width:"25%", 
        height: "100%",
    },
    StepCircleTouchActive: {
        backgroundColor: "#AE282E",
        width: 40,
        height: 40,
        borderRadius: 40,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginBottom: "5%",
        borderColor: '#FFF',
        borderWidth: 3,
    },
    UpperCircle: {
        // backgroundColor: "transparent",
        width: 45,
        height: 45,
        borderRadius: 30,
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        borderColor: '#AE282E',
        borderWidth: 3,

    },
    StepTextActive: {
        position: "absolute",
        color: "#AE282E",
        fontSize: 16,
        width: "250%",
        alignSelf: "center",
        bottom: 0,
        textAlign: "center",
        marginTop: 10,
    },
    StepText: {
        color: "#004A7F",
        position: "absolute",
        fontSize: 16,
        width: "250%",
        alignSelf: 'center',
        bottom: 0,
        textAlign: 'center',
    },
    StepCircleTouch: {
        backgroundColor: "#004A7F",
        width: 40,
        height: 40,
        borderRadius: 40,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginBottom: '5%',
    },
    StepContentView: {
        height: "100%",
        paddingBottom: '15%',
        paddingHorizontal: '5%'
        // padding: 0 5% 15% 5%,
    },
    PageContent: {
        maxHeight: "100%",
    },
    TextColor: {
        fontSize: 14,
        paddingVertical: 10,
        color: Colors.primary_Color,
        fontFamily: fonts.PoppinsMedium,
    },
    AddNew: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center",
        width: '50%',
        borderWidth: 1,
        borderColor: 'rgba(0, 110, 233, 0.2)',
        borderRadius: 10,
    },
    //Tyree Styline

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
        justifyContent: 'space-around',
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
