import { View, Text, TextInput, StyleSheet, SafeAreaView, Linking, StatusBar, ScrollView, Pressable, TouchableOpacity, Animated } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import VMOCustomHeader from '../../Components/VMOCustomHeader'
import ImageHeader from '../../Components/ImageHeader'
import fonts from '../../../../assects/fonts'
import { Colors } from '../../Constant/Colors'
import moment from 'moment'
import IoIcon from 'react-native-vector-icons/Ionicons';

// import Collapsible from 'react-native-collapsible';
// import Accordion from 'react-native-collapsible/Accordion';
import NavigationCard from '../../Components/Cards/NavigationCard'
import CollapseiveCard from '../../Components/Cards/CollapseiveCard'
import * as Animatable from 'react-native-animatable';
import JobsCard from '../../Components/Cards/JobsCard'
import Timeline from 'react-native-timeline-flatlist';
import Images from '../../assets/Images'
import RenderTimeLine from './RenderTimeLine'
import NavigationString from '../../routes/NavigationString'
import { useSelector, useDispatch } from 'react-redux';
import { EndJobAPI, FetchMechanicAPI, FetchQCAPI, FetchWasherAPI, GenerateJobCardAPI, JobDetailAPI, NotifySuperVisorAPI, StartJobAPI, TimeLineAPI, AcknowledgeAPI, CompletedJobsAPI, RequestReworkAPI, RequestWashingAPI } from '../../api'
import Spinner from '../../Components/Spinner'
import { windowHeight, windowWidth } from '../../utils/Dimension'
import { saveJobDetail, setJobClose, setOrderId, setOrderStatus } from '../../../../redux/actions/Job'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShowErrorMessage, ShowSuccessMessage } from '../../../../component'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import RBSheet from "react-native-raw-bottom-sheet";
import BottomSheet from '../../Components/BottomSheet'
import AssignBottomSheet from './AssignBottomSheet'
import CustomButton from '../../Components/CustomButton'
import { DashLineSVG, GreenTickTocn, PDFIcon, WhitePdfAVG } from '../../assets/Icons'
import { colors } from '../../../../assects/colors'
import FormInput from '../../Components/FormInput'
import { useAnimatedRef } from 'react-native-reanimated'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { ShowTopErrorMessage } from '../../Components/FlashMessage'



const HEADER_MAX_HEIGHT = windowWidth / 1.7;
const HEADER_MIN_HEIGHT = windowWidth / 8;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;


const JobDetail = () => {
  const [loading, setloading] = useState(false)
  const [jobSingleData, setjobSingleData] = useState(false)
  const [TimeLine, setTimeLine] = useState(false)
  const [userType, setuserType] = useState()
  const [currentStatus, setcurrentStatus] = useState()
  const [washerType, setwasherType] = useState()
  const [LocalStatus, setLocalStatus] = useState()
  const [PDFlink, setPDFlink] = useState()
  const [cardVisible, setcardVisible] = useState(false)
  const [IS_JOB_RESTARTED, setIS_JOB_RESTARTED] = useState()
  const [IS_JOB_PAUSE, setIS_JOB_PAUSE] = useState()
  const [IS_JOB_STARTED, setIS_JOB_STARTED] = useState()
  const [IS_QC_JOB_STARTED, setIS_QC_JOB_STARTED] = useState()
  const [IS_QC_JOB_CLOSED, setIS_QC_JOB_CLOSED] = useState()
  const [IS_QC_JOB_RESTARTED, setIS_QC_JOB_RESTARTED] = useState()
  const [IS_QC_JOB_PAUSE, setIS_QC_JOB_PAUSE] = useState()
  const [IS_WASHER_JOB_STARTED, setIS_WASHER_JOB_STARTED] = useState()
  const [IS_WASHER_JOB_RESTARTED, setIS_WASHER_JOB_RESTARTED] = useState()
  const [IS_WASHER_JOB_PAUSE, setIS_WASHER_JOB_PAUSE] = useState()
  const [Action, setAction] = useState(false)
  const [Mec_RES, setMec_RES] = useState()
  const [QC_Res, setQC_Res] = useState()
  const [Washer_Res, setWasher_Res] = useState()
  // const [scrollY, setscrollY] = useState()
  const { jobId, orderId, jobDetail } = useSelector(state => state.JobDetails);
  const { homeData } = useSelector(state => state.homeDetails);
  const { user } = useSelector(state => state.userDetails);


  const dispatch = useDispatch()
  const navigation = useNavigation()
  const refRBSheetMechanic = useRef();
  const refRBSheetRE_Mechanic = useRef();
  const refRBSheetWasher = useRef();
  const refRBSheetQC = useRef();
  const pauseRemarkAdd = useRef();
  const ConfirmationSheet = useRef();
  const ReWorkBottomSheet = useRef();
  const WashingBottomSheet = useRef();
  const aref = useAnimatedRef();

  const formattedStartDate = moment(jobSingleData?.start_date).format('DD/MM/YY')
  const formattedEndDate = moment(jobSingleData?.end_time).format('DD/MM/YY')

  const formattedStartTime = moment(jobSingleData?.start_date).format('h:mm A')
  const formattedEndTime = moment(jobSingleData?.end_time).format('h:mm A')

  const formatedBookingDate = moment(jobSingleData?.booking_date).format('DD-MM-YY')


  const WasherAssignType = (type) => {

    if (type == 1) {
      setwasherType(type)
      refRBSheetMechanic.current.open()
      return 1
    } else if (type == 3) {
      setwasherType(type)
      refRBSheetWasher.current.open()
      return 1
    }

  }

  const ReassignMechanic = (type) => {
    setwasherType(type)
    refRBSheetRE_Mechanic.current.open()
    return 1
  }

  const NotifySV = () => {
    let data = {
      job_id: jobId,
    }
    NotifySuperVisorAPI(data).then((res) => {
      console.log(res?.data, "NOTIFY")
      QCCompletedTheJob(2)
    }).catch(err => { return err; });
  }


  const JobDetailFetch = (data) => {
    setloading(true);
    JobDetailAPI(data).then((res) => {
      if (res?.data?.success === true) {
        console.log(res?.data, "<------");
        setjobSingleData(res?.data)
        setcurrentStatus(res?.data?.current_order_status)
        dispatch(saveJobDetail(res?.data, true))
        dispatch(setOrderId(res?.data?.order_id))
        dispatch(setOrderStatus(res?.data?.current_order_status))
        setloading(false)
        return 1
      } else {
        setloading(true);
        showError('No job Found !');
        setloading(false)
      }
      return res;
    }).catch(err => { setloading(false); return err; });
  }

  useEffect(() => {
    JobDetailFetch({
      job_id: jobId,
    })
  }, [])


  const GetJobStatus = async () => {
    let START = await AsyncStorage.getItem(`job_start_${orderId}`)
    setIS_JOB_STARTED(START)
    let RESTART = await AsyncStorage.getItem(`${jobId}_job_restart_${orderId}`)
    setIS_JOB_RESTARTED(RESTART)
    let END = await AsyncStorage.getItem(`${jobId}_job_pause_${orderId}`)
    setIS_JOB_PAUSE(END)
    let QCSTART = await AsyncStorage.getItem(`QC_job_start_${orderId}`)
    setIS_QC_JOB_STARTED(QCSTART)
    let QCCLOSEDJOB = await AsyncStorage.getItem(`QC_job_closed_${orderId}`)
    setIS_QC_JOB_CLOSED(QCCLOSEDJOB)
    let QCRESTART = await AsyncStorage.getItem(`${jobId}_QC_job_restart_${orderId}`)
    setIS_QC_JOB_RESTARTED(QCRESTART)
    let QCEND = await AsyncStorage.getItem(`${jobId}_QC_job_pause_${orderId}`)
    setIS_QC_JOB_PAUSE(QCEND)
    let WASHERSTART = await AsyncStorage.getItem(`Washer_job_start_${orderId}`)
    setIS_WASHER_JOB_STARTED(WASHERSTART)
    let RESTARTWASHER = await AsyncStorage.getItem(`${jobId}_Washer_job_restart_${orderId}`)
    setIS_WASHER_JOB_RESTARTED(RESTARTWASHER)
    let PAUSEWASHER = await AsyncStorage.getItem(`${jobId}_Washer_job_pause_${orderId}`)
    setIS_WASHER_JOB_PAUSE(PAUSEWASHER)
    AllowAction()
  }


  useEffect(() => {
    GetJobStatus()
  }, [])


  useEffect(() => {
    GetJobStatus()
  }, [IS_JOB_RESTARTED || jobSingleData])

  useEffect(() => {
    GetJobStatus()
    AllowAction()
  }, [IS_QC_JOB_RESTARTED || jobSingleData || IS_WASHER_JOB_RESTARTED])

  useEffect(() => {
    GetJobStatus()
    AllowAction()
  }, [IS_WASHER_JOB_RESTARTED])



  const displayErr = () => {
    ShowErrorMessage("Please Start the Job before performing any action.")
  }

  const displayErrForoCheckout = () => {
    ShowErrorMessage("Check if all mechanic jobs are closed or refresh the page.")
  }

  const AllowAction = async () => {
    let START = jobSingleData?.is_started;
    let RESTART = await AsyncStorage.getItem(`${jobId}_job_restart_${orderId}`)
    setMec_RES(RESTART)
    let QCSTART = await AsyncStorage.getItem(`QC_job_start_${orderId}`)
    let QCRESTART = await AsyncStorage.getItem(`${jobId}_QC_job_restart_${orderId}`)
    let WASHERSTART = await AsyncStorage.getItem(`Washer_job_start_${orderId}`)
    let RESTARTWASHER = await AsyncStorage.getItem(`${jobId}_Washer_job_restart_${orderId}`)

    // console.log(jobSingleData?.is_started, "jobSingleData?.is_started ")
    // console.log(RESTART, "RESTART ")
    // console.log(Mec_RES, "Mec_RES ")
    // console.log(IS_QC_JOB_RESTARTED, "IS_QC_JOB_RESTARTED")
    if (jobSingleData?.job_type === 1) {
      if (START == 1) {
        // console.log("Inside Mechanic True")
        return (IS_JOB_RESTARTED !== "false" || IS_JOB_RESTARTED == null) ?
          setAction(true) : setAction(false)
      } else {
        // console.log("Inside Mechanic false")
        return setAction(false)
      }
    } else if (jobSingleData?.job_type === 3) {
      // console.log("Inside QC ")
      if (START == 1) {
        // console.log("Inside QC True")
        return (IS_QC_JOB_RESTARTED !== "false" || IS_QC_JOB_RESTARTED == null) ?
          setAction(true) : setAction(false)
      } else {
        // console.log("Inside QC false")
        return setAction(false)
      }
    } else if (jobSingleData?.job_type === 2) {
      // console.log("Inside Washer ")
      if (START == 1) {
        // console.log("Inside Washer True ")
        return (IS_WASHER_JOB_RESTARTED !== "false" || IS_WASHER_JOB_RESTARTED == null) ? setAction(true) : setAction(false)
      } else {
        // console.log("Inside Washer false ")
        return setAction(false)
      }
    }
  }

  useEffect(() => {
    AllowAction()
  }, [])

  useEffect(() => {
    JobDetailFetch({
      job_id: jobId,
    })
  }, [currentStatus])


  useEffect(() => {
    SettingTheLocalStatus()
  }, [jobSingleData])


  const TapForLogAndACtion = () => {
    SettingTheLocalStatus()
    GetJobStatus()
    AllowAction()
  }

  // Button FLOW STARED

  const SettingTheLocalStatus = async () => {
    // setloading(true)
    let isJobEnded = await AsyncStorage.getItem(`job_end_${orderId}`)
    // console.log(isInstallerCheckIn, "isInstallerCheckIn VAL");
    // console.log(isServiceReport, "isServiceReport VAL");
    console.log("LOCAL STATUS");
    if (jobSingleData?.is_started == 0 && jobSingleData?.is_acknowledged == 1) {
      console.log("Start Job  Section");
      return setLocalStatus(0)
      // Start Job
    } else if (jobSingleData?.is_started == 1 && jobSingleData?.collectMaterial !== 1 && jobSingleData?.isInstallerCheckIn !== 1) {
      console.log(LocalStatus, "Collect Materail Section");
      return setLocalStatus(1)
      // CheckIn 
    } else if (jobSingleData?.is_started == 1 && jobSingleData?.isInstallerCheckIn !== 1 && jobSingleData?.collectMaterial == 1 && jobSingleData?.isServiceReport !== 1) {
      console.log(LocalStatus, "Check In Report");
      return setLocalStatus(2)
      // Service Report 
    } else if (jobSingleData?.isServiceReport !== 1 && jobSingleData?.isInstallerCheckIn == 1 && jobSingleData?.is_started == 1 && jobSingleData?.isInstallerCheckOut !== 1 && jobSingleData?.collectMaterial == 1) {
      console.log(LocalStatus, "Service Report Section");
      return setLocalStatus(3)
      // Collect Material 
    } else if (
      jobSingleData?.isInstallerCheckOut !== 1 && jobSingleData?.isServiceReport == 1 && jobSingleData?.is_started == 1) {
      console.log(jobSingleData?.isInstallerCheckOut, "Check Out  Section");
      return setLocalStatus(6)
      // Check Out
    } else if (
      jobSingleData?.isInstallerCheckOut == 1 && jobSingleData?.is_started == 1 && jobSingleData?.job_status !== 1) {
      console.log(LocalStatus, "End Job  Section");
      return setLocalStatus(7)
      // End Job
    } else if (
      isJobEnded === "true" && jobSingleData?.isInstallerCheckOut == 1 && jobSingleData?.is_started == 1) {
      return setLocalStatus(8)
      // No assin job
    } else if (
      isJobEnded === "true" && jobSingleData?.isInstallerCheckOut == 1 && jobSingleData?.is_started == 1) {
      return setLocalStatus(9)
    }
    // setloading(false)
  }
  // const SettingTheLocalStatus = async () => {
  //   // setloading(true)
  //   let isJobStared = await AsyncStorage.getItem(`job_start_${orderId}`)
  //   let isInstallerCheckIn = await AsyncStorage.getItem(`check_in_marking_${orderId}`)
  //   let isServiceReport = await AsyncStorage.getItem(`Service_report_${orderId}`)
  //   let isInstallerImages = await AsyncStorage.getItem(`installer_images_${orderId}`)
  //   let isInstallerRemark = await AsyncStorage.getItem(`installer_remarks_${orderId}`)
  //   let isInstallerCheckOut = await AsyncStorage.getItem(`check_out_marking_${orderId}`)
  //   let isJobEnded = await AsyncStorage.getItem(`job_end_${orderId}`)
  //   // console.log(isInstallerCheckIn, "isInstallerCheckIn VAL");
  //   // console.log(isServiceReport, "isServiceReport VAL");
  //   if (jobSingleData?.is_started == 0 && jobSingleData?.is_acknowledged == 1) {
  //     console.log("Start Job  Section");
  //     return setLocalStatus(0)
  //     // Start Job
  //   } else if (jobSingleData?.is_started == 1 && jobSingleData?.isInstallerCheckIn !== 1 && jobSingleData?.isServiceReport !== 1) {
  //     console.log(LocalStatus, "CheckIn  Section");
  //     return setLocalStatus(1)
  //     // CheckIn 
  //   } else if (jobSingleData?.is_started == 1 && jobSingleData?.isServiceReport !== 1 && jobSingleData?.isInstallerCheckIn == 1 && jobSingleData?.collectMaterial !== 1) {
  //     console.log(LocalStatus, "Service Report");
  //     return setLocalStatus(2)
  //     // Service Report 
  //   } else if (jobSingleData?.collectMaterial !== 1 && jobSingleData?.isServiceReport == 1 && jobSingleData?.isInstallerImages !== 1 && jobSingleData?.is_started == 1) {
  //     console.log(LocalStatus, "Collect Material  Section");
  //     return setLocalStatus(3)
  //     // Collect Material 
  //   } else if (
  //     jobSingleData?.isInstallerImages !== 1 && jobSingleData?.collectMaterial == 1 && jobSingleData?.isInstallerRemark !== 1 && jobSingleData?.is_started == 1) {
  //     console.log(LocalStatus, "Installer Images  Section");
  //     return setLocalStatus(4)
  //     // Installer Images
  //   } else if (
  //     jobSingleData?.isInstallerRemark !== 1 && jobSingleData?.isInstallerImages == 1 && jobSingleData?.isInstallerCheckOut !== 1 && jobSingleData?.is_started == 1) {
  //     console.log(LocalStatus, "Installer Remarks  Section");
  //     return setLocalStatus(5)
  //     // Installer Remarks
  //   } else if (
  //     jobSingleData?.isInstallerCheckOut !== 1 && jobSingleData?.isInstallerRemark == 1 && jobSingleData?.is_started == 1) {
  //     console.log(jobSingleData?.isInstallerCheckOut, "Check Out  Section");
  //     return setLocalStatus(6)
  //     // Check Out
  //   } else if (
  //     jobSingleData?.isInstallerCheckOut == 1 && jobSingleData?.is_started == 1 && jobSingleData?.job_status !== 1 ) {
  //     console.log(LocalStatus, "End Job  Section");
  //     return setLocalStatus(7)
  //     // End Job
  //   } else if (
  //     isJobEnded === "true" && jobSingleData?.isInstallerCheckOut == 1 && jobSingleData?.is_started == 1) {
  //     return setLocalStatus(8)
  //     // No assin job
  //   } else if (
  //     isJobEnded === "true" && jobSingleData?.isInstallerCheckOut == 1 && jobSingleData?.is_started == 1) {
  //     return setLocalStatus(9)
  //   }
  //   // setloading(false)
  // }

  const AcknowledgeTheJob = () => {
    let data = {
      job_id: jobId
    }
    AcknowledgeAPI(data).then((res) => {
      console.log(res, "ACK API")
      if (res?.data?.success == true) {
        JobDetailFetch({
          job_id: jobId,
        })
        // SettingTheLocalStatus()
        // AllowAction()
        return 0;
      }
    }).catch(err => { return err; });

  }



  useFocusEffect(
    React.useCallback(() => {
      JobDetailFetch({
        job_id: jobId,
      })
      SettingTheLocalStatus()
      return () => console.log("AFTER");
    }, [])
  );

  useEffect(() => {
    SettingTheLocalStatus()
  }, [])

  useEffect(() => {
    SettingTheLocalStatus()
  }, [jobSingleData])


  const QCCompletedTheJob = async (typeClose) => {
    let closeData = {
      order_id: orderId,
      type: typeClose
    }
    CompletedJobsAPI(closeData).then(async (res) => {
      // console.log(res, "RES ONLY CLOSED THE JOB");
      console.log(res?.data, "CLOSED THE JOB");
      if (res?.data?.success == true) {
        try {
          await AsyncStorage.setItem(`QC_job_closed_${orderId}`, true.toString())
          // SettingTheLocalStatus()
        } catch (e) {
          console.log(e);
        }
        GetJobStatus()
        navigation.goBack()
        dispatch(setJobClose(true));
        // navigation.navigate(NavigationString.HOME_SCREEN);
        return 1;
      }
    }).catch(err => { return err; });
  }


  const startJobMethod = async () => {

    let data = {
      job_id: jobId
    }
    StartJobAPI(data).then(async (res) => {
      console.log(res?.data, "RESPONSE OF START JOB");
      if (res?.data?.success == false) {
        return ShowErrorMessage(res?.data?.message)
      } else if (res?.data?.success == true)
        try {
          await AsyncStorage.setItem(`job_start_${orderId}`, true.toString())
          // SettingTheLocalStatus()
        } catch (e) {
          console.log(e);
        }
      SettingTheLocalStatus()
      AllowAction()
      JobDetailFetch({
        job_id: jobId,
      })
      return ShowSuccessMessage("Job Started")
    })
  }

  const EndJobMethod = async () => {
    console.log("End run");
    let data = {
      job_id: jobId
    }

    CompletedJobsAPI(data).then((res) => {
      console.log(res, "RES ONLY CLOSED THE JOB");
      navigation.goBack()
    }).catch(err => { return err; });


    // let closeData = {
    //   order_id: orderId,
    //   type: 1
    // }
    // // let jobEnd = true;
    // EndJobAPI(data).then(async (res) => {
    //   console.log(res.data, "RESPONSE OF END JOB");

    //   if (res.data.success == false) {
    //     return ShowErrorMessage(res.data?.message)
    //   } else if (res.data.success == true)
    //     try {
    //       await AsyncStorage.setItem(`job_end_${orderId}`, true.toString())
    //     } catch (e) {
    //       console.log(e);
    //     }



    //   CompletedJobsAPI(data).then((res) => {
    //     console.log(res, "RES ONLY CLOSED THE JOB");
    //     navigation.goBack()
    //   }).catch(err => { return err; });

    //   SettingTheLocalStatus()

    //   return ShowSuccessMessage("Job Ended")
    // })
  }


  //Remark

  const AddRemark = () => {
    pauseRemarkAdd.current.open()
  }

  const checkSum = async () => {
    // let JOB_RESTART = await AsyncStorage.getItem(`job_restart_${orderId}`)
    // let JOB_PAUSE = await AsyncStorage.getItem(`job_pause_${orderId}`)

    // console.log(JOB_RESTART,"JOB_RESTART")
    // console.log(JOB_PAUSE, "JOB_PAUSE")
    // console.log(IS_JOB_RESTARTED,"IS_JOB_RESTARTED")
    // console.log(IS_JOB_PAUSE, "IS_JOB_PAUSE")
    // AllowAction()
    // console.log(Action, "Action")
    // console.log(IS_QC_JOB_RESTARTED, "IS_QC_JOB_RESTARTED")
    // console.log(IS_QC_JOB_STARTED, "IS_QC_JOB_STARTED")
    // console.log(IS_QC_JOB_PAUSE, "IS_QC_JOB_PAUSE")
    // console.log(homeData?.user?.role_name, "homeData?.user?.role_name")
    navigation.navigate(NavigationString.HOME_SCREEN);

  }

  const CompleteTheJob = (typeClose) => {
    let closeData = {
      job_id: jobId
    }
    CompletedJobsAPI(closeData).then((res) => {
      // console.log(res, "RES ONLY CLOSED THE JOB");
      console.log(res, "CLOSED THE JOB");
      console.log(res?.data, "CLOSED THE JOB");
      if (res?.data?.success == true) {
        navigation.goBack()
        return 1;
      }
    }).catch(err => { return err; });
  }

  //QC FLOW
  const QCstartJobMethod = async () => {

    let data = {
      job_id: jobId
    }
    StartJobAPI(data).then(async (res) => {
      console.log(res?.data, "RESPONSE OF START JOB");
      if (res?.data?.success == false) {
        return ShowErrorMessage(res?.data?.message)
      } else if (res?.data?.success == true)
        try {
          await AsyncStorage.setItem(`QC_job_start_${orderId}`, true.toString())
          // SettingTheLocalStatus()
        } catch (e) {
          console.log(e);
        }
      JobDetailFetch({
        job_id: jobId,
      })
      GetJobStatus()
      return ShowSuccessMessage("Job Started")
    })
  }


  const DynamicEndJobMethod = async (type) => {
    console.log("End run FOR QC");
    let data = {
      job_id: jobId
    }
    // let jobEnd = true;
    EndJobAPI(data).then(async (res) => {
      console.log(res.data, "RESPONSE OF END JOB");
      if (res.data.success == false) {
        return ShowErrorMessage(res.data?.message)
      } else if (res.data.success == true) {
        let closeData = {
          order_id: orderId,
          type: type
        }

        CompletedJobsAPI(closeData).then((res) => {
          console.log(res, "RES ONLY CLOSED THE JOB");
          navigation.goBack()
        }).catch(err => { return err; });

        SettingTheLocalStatus()

        return ShowSuccessMessage("Job Ended")
      }
    })
  }


  // WASHER FLOW 
  const WasherstartJobMethod = async () => {

    let data = {
      job_id: jobId
    }
    StartJobAPI(data).then(async (res) => {
      console.log(res?.data, "RESPONSE OF START JOB");
      if (res?.data?.success == false) {
        return ShowErrorMessage(res?.data?.message)
      } else if (res?.data?.success == true)
        try {
          await AsyncStorage.setItem(`Washer_job_start_${orderId}`, true.toString())
          // SettingTheLocalStatus()
        } catch (e) {
          console.log(e);
        }
      GetJobStatus()
      JobDetailFetch({
        job_id: jobId,
      })
      return ShowSuccessMessage("Job Started")
    })
  }

  const RenderDetail = () => {
    const [mechanic, setMechanic] = useState()
    const [qcs, setQCS] = useState()
    const [washer, setwasher] = useState()
    const [reamark, setreamark] = useState()
    const [ReworkRemark, setReworkRemark] = useState()



    const RestartJobMethod = async () => {

      console.log("run");
      let data = {
        job_id: jobId
      }
      StartJobAPI(data).then(async (res) => {
        console.log(res?.data, "RESPONSE OF START JOB");
        if (res?.data?.success == false) {
          return ShowErrorMessage(res?.data?.message)
        } else if (res?.data?.success == true)
          try {
            await AsyncStorage.setItem(`${jobId}_job_restart_${orderId}`, true.toString())
            await AsyncStorage.setItem(`${jobId}_job_pause_${orderId}`, false.toString())
          } catch (e) {
            console.log(e);
          }
        GetJobStatus()
        return ShowSuccessMessage("Job started")
      })
    }


    const PauseJobMethod = async () => {
      console.log("End run");
      let data = {
        job_id: jobId,
        remark: reamark
      }
      // let jobEnd = true;
      EndJobAPI(data).then(async (res) => {
        console.log(res.data, "RESPONSE OF END JOB");
        if (res.data.success == false) {
          return ShowErrorMessage(res.data?.message)
        } else if (res.data.success == true)
          try {
            await AsyncStorage.setItem(`${jobId}_job_pause_${orderId}`, true.toString())
            await AsyncStorage.setItem(`${jobId}_job_restart_${orderId}`, false.toString())
          } catch (e) {
            console.log(e);
          }
        GetJobStatus()
        // AllowAction()
        ConfirmationSheet.current.close()
        return ShowSuccessMessage("Job Paused")
      })
    }

    const QCRestartJobMethod = async () => {

      let data = {
        job_id: jobId
      }
      StartJobAPI(data).then(async (res) => {
        if (res?.data?.success == false) {
          return ShowErrorMessage(res?.data?.message)
        } else if (res?.data?.success == true)
          try {
            await AsyncStorage.setItem(`${jobId}_QC_job_restart_${orderId}`, true.toString())
            await AsyncStorage.setItem(`${jobId}_QC_job_pause_${orderId}`, false.toString())
          } catch (e) {
            console.log(e);
          }
        GetJobStatus()
        return ShowSuccessMessage("Job started")
      })
    }


    const QCPauseJobMethod = async () => {
      let data = {
        job_id: jobId,
        remark: reamark
      }
      // let jobEnd = true;
      EndJobAPI(data).then(async (res) => {
        if (res.data.success == false) {
          return ShowErrorMessage(res.data?.message)
        } else if (res.data.success == true)
          try {
            await AsyncStorage.setItem(`${jobId}_QC_job_pause_${orderId}`, true.toString())
            await AsyncStorage.setItem(`${jobId}_QC_job_restart_${orderId}`, false.toString())
          } catch (e) {
            console.log(e);
          }
        GetJobStatus()
        ConfirmationSheet.current.close()
        return ShowSuccessMessage("Job Paused")
      })
    }


    const ReWorkAPI = () => {
      if (ReworkRemark == undefined) {
        ShowTopErrorMessage("Please Enter the Remark")
        return -1
      }
      EndJobMethod()
      let data = {
        order_id: orderId,
        remark: ReworkRemark
      }
      RequestReworkAPI(data).then((res) => {
        console.log(res?.data, "RES OF REQWORK API")
        if (success == true) {
          ReWorkBottomSheet.current.close()
        }
      }).catch(err => { return err; });

      ReWorkBottomSheet.current.close()
      return ShowSuccessMessage("Requested for rework")

    }

    const WasherRequestByQC = () => {
      if (ReworkRemark == undefined) {
        ShowTopErrorMessage("Please Enter the Remark")
        return -1
      }
      EndJobMethod()
      let data = {
        order_id: orderId,
        remark: ReworkRemark
      }
      RequestWashingAPI(data).then((res) => {
        console.log(res?.data, "RES OF REQWORK API")
        if (success == true) {
          WashingBottomSheet.current.close()
        }
      }).catch(err => { return err; });

      WashingBottomSheet.current.close()
      return ShowSuccessMessage("Requested for rework")

    }

    const WasherRestartJobMethod = async () => {

      let data = {
        job_id: jobId
      }
      StartJobAPI(data).then(async (res) => {
        console.log(res?.data, "RESPONSE OF START JOB");
        if (res?.data?.success == false) {
          return ShowErrorMessage(res?.data?.message)
        } else if (res?.data?.success == true)
          try {
            await AsyncStorage.setItem(`${jobId}_Washer_job_restart_${orderId}`, true.toString())
            await AsyncStorage.setItem(`${jobId}_Washer_job_pause_${orderId}`, false.toString())
          } catch (e) {
            console.log(e);
          }
        GetJobStatus()
        return ShowSuccessMessage("Job started")
      })
    }


    const WasherPauseJobMethod = async () => {
      let data = {
        job_id: jobId,
        remark: reamark
      }
      // let jobEnd = true;
      EndJobAPI(data).then(async (res) => {
        console.log(res.data, "RESPONSE OF END JOB");
        if (res.data.success == false) {
          return ShowErrorMessage(res.data?.message)
        } else if (res.data.success == true)
          try {
            await AsyncStorage.setItem(`${jobId}_Washer_job_pause_${orderId}`, true.toString())
            await AsyncStorage.setItem(`${jobId}_Washer_job_restart_${orderId}`, false.toString())
          } catch (e) {
            console.log(e);
          }
        GetJobStatus()
        ConfirmationSheet.current.close()
        return ShowSuccessMessage("Job Paused")
      })
    }



    const getDropDownData = async (data) => {

      FetchMechanicAPI(data).then((res) => {
        let trying = null
        let setingObect = (res?.data?.mechanics.map((superVisor, index) => {
          return trying = { label: superVisor.name.toString(), value: superVisor.id.toString(), key: index.toString() }
        }))
        setMechanic(setingObect)
        return res;
      }).catch(err => { return err; });

      FetchQCAPI(data).then((res) => {
        let trying = null
        let setingObect = (res?.data?.qcs.map((superVisor, index) => {
          return trying = { label: superVisor.name, value: superVisor.id.toString(), key: index.toString() }
        }))
        setQCS(setingObect)
        return res
      }).catch(err => { return err; });

      FetchWasherAPI(data).then((res) => {
        let trying = null
        let setingObect = (res?.data?.washers.map((superVisor, index) => {
          return trying = { label: superVisor.name, value: superVisor.id.toString(), key: index.toString() }
        }))
        setwasher(setingObect)
        return res?.data;
      }).catch(err => { return err; });

      setloading(false)
    }

    useEffect(() => {
      setloading(true)
      getDropDownData({})
    }, [])



    return (
      <>
        <View>
          <View style={[styles.JobCenter]}>
            <View style={styles.JobDateCenter} >
              <View style={[styles.upperTextCenter]}>
                <Text style={styles.cardTextGrey} >Job Start Time</Text>
                <Text style={styles.cardTextBlack} >{formattedStartTime}</Text>
              </View>
            </View>
            <View style={styles.LineForRow} >
              <DashLineSVG height={15} width={100} />
            </View>
            <View style={styles.JobOtherDetailCenter}>
              <View style={[styles.upperTextCenter]}>
                <Text style={styles.cardTextGrey}>Job End Time</Text>
                <Text style={styles.cardTextBlack}>{formattedEndTime}</Text>
              </View>
            </View>
          </View>
          <View style={[styles.BottomLine]}></View>
          <View style={styles.JobDetail}>
            <View style={styles.RemarkScopeWrapper}>
              <Text style={styles.cardTextGrey} >Job Remarks</Text>
              <Text style={styles.RemarkForScope} >{jobSingleData?.job_scope}</Text>
            </View>
            {/* <View style={styles.JobDate} >
              <View style={styles.StartDate} >
                <View style={styles.upperText} >
                  <Text style={styles.cardTextGrey} >VR No.</Text>
                  <Text style={styles.cardTextBlack} >{jobSingleData?.vehicle_number}</Text>
                </View>
              </View>
              <View style={styles.DownText} >
                <Text style={styles.cardTextGrey} >Booking date</Text>
                <Text style={styles.cardTextBlack} >{formatedBookingDate}</Text>
              </View>
            </View>
            <View style={styles.JobOtherDetail}>
              <View style={styles.upperText}>
                <Text style={styles.cardTextGrey}>Vehicle Type</Text>
                <Text style={styles.cardTextBlack}>{jobSingleData?.vehicle_category}</Text>
              </View>
              <View style={styles.DownText}>
                <Text style={styles.cardTextGrey}>Total amount</Text>
                <Text style={styles.cardTextBlack}>SGD {jobSingleData?.amount}</Text>
              </View>
            </View> */}
          </View>
          <View style={[styles.BottomLine]}></View>
          {jobDetail.job_status == 1 ? null : IS_JOB_RESTARTED == "false" ? null :
            <View style={styles.DownCTA} >
              {
                (jobSingleData?.job_type === 1 && user?.user?.id === jobSingleData?.mechanic_id) && (jobSingleData?.is_started == 0 && jobSingleData?.is_acknowledged == 0) ?
                  <Pressable bgColor={'#004A7F'} onPress={() => { AcknowledgeTheJob() }} activeOpacity={0.7}>
                    <Text style={styles.DownCTAText} >
                      Acknowledge Job
                    </Text>
                  </Pressable>
                  : null}
              {
                (jobSingleData?.job_type === 1 && user?.user?.id === jobSingleData?.mechanic_id) ? LocalStatus == 0 ?
                  <Pressable bgColor={'#004A7F'} onPress={() => { startJobMethod() }} activeOpacity={0.7}>
                    <Text style={styles.DownCTAText} >
                      Start Job
                    </Text>
                  </Pressable>
                  :
                  LocalStatus == 1 ?
                    <Pressable bgColor={'#004A7F'} onPress={() => { navigation.navigate(NavigationString.MATERIALS_SCREEN) }} activeOpacity={0.7}>
                      <Text style={styles.DownCTAText} >
                        Collect Material
                      </Text>
                    </Pressable>
                    :
                    LocalStatus == 2 ?
                      <Pressable bgColor={'#004A7F'} onPress={() => { navigation.navigate(NavigationString.CHECK_IN) }} activeOpacity={0.7}>
                        <Text style={styles.DownCTAText} >
                          Check in Vehicle
                        </Text>
                      </Pressable>
                      :
                      LocalStatus === 3 ?
                        <Pressable bgColor={'#004A7F'} onPress={() => { navigation.navigate(NavigationString.SERVICE_REPORT) }} activeOpacity={0.7}>
                          <Text style={styles.DownCTAText} >
                            Service Report
                          </Text>
                        </Pressable>
                        :
                        LocalStatus === 6 ?
                          jobSingleData?.all_mech_jobs_done == true ?
                            <Pressable bgColor={'#004A7F'} onPress={() => { navigation.navigate(NavigationString.CHECK_OUT) }} activeOpacity={0.7}>
                              <Text style={styles.DownCTAText} >
                                Vehicle Checkout
                              </Text>
                            </Pressable> : <Pressable bgColor={'#004A7F'} onPress={() => { displayErrForoCheckout() }} activeOpacity={0.7}>
                              <Text style={styles.DownCTAText} >
                                Vehicle Checkout
                              </Text>
                            </Pressable>
                          :
                          LocalStatus === 7 ?
                            <>
                              <Pressable bgColor={'#004A7F'} onPress={() => { EndJobMethod() }} activeOpacity={0.7}>
                                <Text style={styles.DownCTAText} >
                                  End Job
                                </Text>
                              </Pressable>
                            </>
                            : (jobSingleData?.job_type == 1 && jobSingleData?.isInstallerCheckOut == 1 && jobSingleData?.job_status == 1) ?
                              <Pressable bgColor={'#004A7F'} activeOpacity={0.7}>
                                <Text style={styles.DownCTAText} >
                                  Job Completed
                                </Text>
                              </Pressable>
                              : null : (jobSingleData?.job_type === 1 && user?.user?.id !== jobSingleData?.mechanic_id) ?
                  (jobSingleData?.is_started == 0 && jobSingleData?.is_acknowledged == 0) ?
                    <Pressable bgColor={'#004A7F'} onPress={() => { AcknowledgeTheJob() }} activeOpacity={0.7}>
                      <Text style={styles.DownCTAText} >
                        Acknowledge Job
                      </Text>
                    </Pressable>
                    : (jobSingleData?.is_started == 0 && jobSingleData?.is_acknowledged == 1) ?
                      <Pressable bgColor={'#004A7F'} onPress={() => startJobMethod()} >
                        <Text style={styles.DownCTAText} >
                          Start Job
                        </Text>
                      </Pressable>
                      : (jobSingleData?.is_started == 1 && jobSingleData?.is_acknowledged == 1) ?
                        <Pressable bgColor={'#004A7F'} onPress={() => EndJobMethod()} >
                          <Text style={styles.DownCTAText} >
                            End Job
                          </Text>
                        </Pressable> : null : null
              }

              {
                (jobSingleData?.is_started == 1 && user?.user?.id === jobSingleData?.mechanic_id && jobSingleData?.job_type == 1) ?
                  LocalStatus >= 7 ? null :
                    <Pressable bgColor={'#004A7F'} onPress={() => { EndJobMethod() }} activeOpacity={0.7}>
                      <Text style={styles.DownCTAText} >
                        End Job
                      </Text>
                    </Pressable>
                  : null
              }

              {jobSingleData?.job_type == 3 ?
                <>

                  {(jobSingleData?.is_started == 0 && jobSingleData?.is_acknowledged == 0) ?
                    <Pressable bgColor={'#004A7F'} onPress={() => { AcknowledgeTheJob() }} activeOpacity={0.7}>
                      <Text style={styles.DownCTAText} >
                        Acknowledge Job
                      </Text>
                    </Pressable> : null
                  }
                  {
                    (jobSingleData?.is_started == 0 && jobSingleData?.is_acknowledged == 1) ?
                      <Pressable bgColor={'#004A7F'} onPress={() => QCstartJobMethod()} >
                        <Text style={styles.DownCTAText} >
                          Start Job
                        </Text>
                      </Pressable>
                      : jobSingleData?.is_started == 1 && IS_QC_JOB_PAUSE !== "true" ?
                        <>
                          <View>
                            <Pressable bgColor={'#004A7F'} onPress={() => { IS_QC_JOB_PAUSE === "true" ? displayErr() : ReWorkBottomSheet.current.open() }} activeOpacity={0.7}>
                              <Text style={styles.DownCTAText} >
                                Request Rework
                              </Text>
                            </Pressable>
                            <Pressable bgColor={'#004A7F'} onPress={() => { IS_QC_JOB_PAUSE === "true" ? displayErr() : WashingBottomSheet.current.open() }} activeOpacity={0.7}>
                              <Text style={styles.DownCTAText} >
                                Request Washing
                              </Text>
                            </Pressable>
                          </View>
                          <Pressable bgColor={'#004A7F'} onPress={() => { EndJobMethod() }} activeOpacity={0.7}>
                            <Text style={styles.DownCTAText} >
                              End Job
                            </Text>
                          </Pressable>
                        </>
                        : IS_QC_JOB_CLOSED === "true" ?
                          null
                          : null

                  }
                </>
                :
                null
              }


              {jobSingleData?.job_type == 2 ?
                jobDetail.job_status == 1 ? null :
                  <>
                    {
                      (jobSingleData?.is_started == 0 && jobSingleData?.is_acknowledged == 0) ?
                        <Pressable bgColor={'#004A7F'} onPress={() => { AcknowledgeTheJob() }} activeOpacity={0.7}>
                          <Text style={styles.DownCTAText} >
                            Acknowledge Job
                          </Text>
                        </Pressable> : null
                    }
                    {
                      (jobSingleData?.is_started == 0 && jobSingleData?.is_acknowledged == 1) ?
                        <Pressable bgColor={'#004A7F'} onPress={() => WasherstartJobMethod()} >
                          <Text style={styles.DownCTAText} >
                            Start Job
                          </Text>
                        </Pressable>
                        : jobSingleData?.is_started == 1 && IS_WASHER_JOB_PAUSE !== "true" ?
                          <Pressable bgColor={'#004A7F'} onPress={() => IS_WASHER_JOB_PAUSE === "true" ? displayErr() : CompleteTheJob(3)} activeOpacity={0.7}>
                            <Text style={styles.DownCTAText} >
                              Close Job
                            </Text>
                          </Pressable>
                          : null
                    }
                  </>
                : null
              }
              {/* <Pressable>
                <Text style={styles.DownCTATextRed} >Report job</Text>
              </Pressable>  */}


            </View>
          }



          {jobSingleData?.job_type === 1 && user?.user?.id === jobSingleData?.mechanic_id ?
            jobSingleData.job_status == 1 ? null :
              LocalStatus > 0 && LocalStatus <= 7 ?
                <View style={styles.JobButtonArea} >
                  {IS_JOB_RESTARTED === "false" ?
                    <Pressable style={[styles.JobButton]}
                      bgColor={'#004A7F'}
                      onPress={() => { RestartJobMethod() }}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.JobButtonText} >
                        Restart Job
                      </Text>
                    </Pressable>
                    : (jobSingleData?.current_order_status == 4 && IS_JOB_STARTED === "true" && jobSingleData?.current_order_status !== 3) ?
                      <Pressable
                        style={{ backgroundColor: "#B3B3B3", borderRadius: 30, justifyContent: "center", alignItems: 'center', width: '35%', paddingVertical: 10, paddingHorizontal: 15 }}
                        bgColor={'red'}
                        onPress={() => { }}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.JobButtonText} >
                          Restart Job
                        </Text>
                      </Pressable>
                      :
                      <Pressable
                        style={{ backgroundColor: "#B3B3B3", borderRadius: 30, justifyContent: "center", alignItems: 'center', width: '35%', paddingVertical: 10, paddingHorizontal: 15 }}
                        bgColor={'red'}
                        onPress={() => { }}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.JobButtonText} >
                          Restart Job
                        </Text>
                      </Pressable>
                  }


                  {IS_JOB_PAUSE === "false" || IS_JOB_PAUSE == null ?
                    <Pressable
                      style={styles.JobButton}
                      bgColor={'#004A7F'}
                      onPress={() => { AddRemark() }}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.JobButtonText} >
                        Pause Job
                      </Text>
                    </Pressable>
                    :
                    <Pressable
                      style={{ backgroundColor: "#B3B3B3", borderRadius: 30, justifyContent: "center", alignItems: 'center', width: '35%', paddingVertical: 10, paddingHorizontal: 15 }}
                      bgColor={'#004A7F'}
                      onPress={() => { }}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.JobButtonText} >
                        Pause Job
                      </Text>
                    </Pressable>
                  }
                </View>
                : null : null
          }


          {/* For Secondary Mechanic Start */}

          {(jobSingleData?.job_type === 1 && user?.user?.id !== jobSingleData?.mechanic_id) ?
            jobSingleData.job_status == 1 ? null :
              jobSingleData?.is_started == 1 ?
                <View style={styles.JobButtonArea} >
                  {IS_JOB_RESTARTED === "false" ?
                    <Pressable style={[styles.JobButton]}
                      bgColor={'#004A7F'}
                      onPress={() => { RestartJobMethod() }}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.JobButtonText} >
                        Restart Job
                      </Text>
                    </Pressable>
                    : (jobSingleData?.current_order_status == 4 && IS_JOB_STARTED === "true" && jobSingleData?.current_order_status !== 3) ?
                      <Pressable
                        style={{ backgroundColor: "#B3B3B3", borderRadius: 30, justifyContent: "center", alignItems: 'center', width: '35%', paddingVertical: 10, paddingHorizontal: 15 }}
                        bgColor={'red'}
                        onPress={() => { }}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.JobButtonText} >
                          Restart Job
                        </Text>
                      </Pressable>
                      :
                      <Pressable
                        style={{ backgroundColor: "#B3B3B3", borderRadius: 30, justifyContent: "center", alignItems: 'center', width: '35%', paddingVertical: 10, paddingHorizontal: 15 }}
                        bgColor={'red'}
                        onPress={() => { }}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.JobButtonText} >
                          Restart Job
                        </Text>
                      </Pressable>
                  }

                  {IS_JOB_PAUSE === "false" || IS_JOB_PAUSE == null ?
                    <Pressable
                      style={styles.JobButton}
                      bgColor={'#004A7F'}
                      onPress={() => { AddRemark() }}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.JobButtonText} >
                        Pause Job
                      </Text>
                    </Pressable>
                    :
                    <Pressable
                      style={{ backgroundColor: "#B3B3B3", borderRadius: 30, justifyContent: "center", alignItems: 'center', width: '35%', paddingVertical: 10, paddingHorizontal: 15 }}
                      bgColor={'#004A7F'}
                      onPress={() => { }}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.JobButtonText} >
                        Pause Job
                      </Text>
                    </Pressable>
                  }
                </View>
                : null : null
          }

          {/* For Secondary Mechanic END  */}





          {jobSingleData?.job_type == 3 ?
            jobSingleData?.is_started == 1 && IS_QC_JOB_STARTED == "true" && IS_QC_JOB_CLOSED !== "true" && jobSingleData?.job_status !== 1 ?

              <View style={styles.JobButtonArea} >
                {IS_QC_JOB_RESTARTED === "false" ?
                  <Pressable style={styles.JobButton}
                    bgColor={'#004A7F'}
                    onPress={() => { QCRestartJobMethod() }}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.JobButtonText} >
                      Restart Job
                    </Text>
                  </Pressable>
                  : IS_QC_JOB_RESTARTED === "true" ? <Pressable
                    style={{ backgroundColor: "#B3B3B3", borderRadius: 30, justifyContent: "center", alignItems: 'center', width: '35%', paddingVertical: 10, paddingHorizontal: 15 }}
                    bgColor={'red'}
                    onPress={() => { }}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.JobButtonText} >
                      Restart Job
                    </Text>
                  </Pressable>
                    :
                    <Pressable
                      style={{ backgroundColor: "#B3B3B3", borderRadius: 30, justifyContent: "center", alignItems: 'center', width: '35%', paddingVertical: 10, paddingHorizontal: 15 }}
                      bgColor={'red'}
                      onPress={() => { }}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.JobButtonText} >
                        Restart Job
                      </Text>
                    </Pressable>
                }
                {IS_QC_JOB_PAUSE === "false" || IS_QC_JOB_PAUSE == null ?
                  <Pressable
                    style={styles.JobButton}
                    bgColor={'#004A7F'}
                    onPress={() => { AddRemark() }}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.JobButtonText} >
                      Pause Job
                    </Text>
                  </Pressable>
                  :
                  <Pressable
                    style={{ backgroundColor: "#B3B3B3", borderRadius: 30, justifyContent: "center", alignItems: 'center', width: '35%', paddingVertical: 10, paddingHorizontal: 15 }}
                    bgColor={'#004A7F'}
                    onPress={() => { }}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.JobButtonText} >
                      Pause Job
                    </Text>
                  </Pressable>
                }
              </View>
              : null : null
          }





          {jobSingleData?.job_type == 2 ?
            jobSingleData?.is_started == 1 ?

              <View style={styles.JobButtonArea} >
                {IS_WASHER_JOB_RESTARTED === "false" ?
                  <Pressable style={styles.JobButton}
                    bgColor={'#004A7F'}
                    onPress={() => { WasherRestartJobMethod() }}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.JobButtonText} >
                      Restart Job
                    </Text>
                  </Pressable>
                  : IS_WASHER_JOB_RESTARTED === "true" ? <Pressable
                    style={{ backgroundColor: "#B3B3B3", borderRadius: 30, justifyContent: "center", alignItems: 'center', width: '35%', paddingVertical: 10, paddingHorizontal: 15 }}
                    bgColor={'red'}
                    onPress={() => { }}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.JobButtonText} >
                      Restart Job
                    </Text>
                  </Pressable>
                    :
                    <Pressable
                      style={{ backgroundColor: "#B3B3B3", borderRadius: 30, justifyContent: "center", alignItems: 'center', width: '35%', paddingVertical: 10, paddingHorizontal: 15 }}
                      bgColor={'red'}
                      onPress={() => { }}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.JobButtonText} >
                        Restart Job
                      </Text>
                    </Pressable>
                }
                {IS_WASHER_JOB_PAUSE === "false" || IS_WASHER_JOB_PAUSE == null ?
                  <Pressable
                    style={styles.JobButton}
                    bgColor={'#004A7F'}
                    onPress={() => { AddRemark() }}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.JobButtonText} >
                      Pause Job
                    </Text>
                  </Pressable>
                  :
                  <Pressable
                    style={{ backgroundColor: "#B3B3B3", borderRadius: 30, justifyContent: "center", alignItems: 'center', width: '35%', paddingVertical: 10, paddingHorizontal: 15 }}
                    bgColor={'#004A7F'}
                    onPress={() => { }}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.JobButtonText} >
                      Pause Job
                    </Text>
                  </Pressable>
                }
              </View>
              : null : null
          }
        </View>

        {/* BOTTOM SHEETS  */}
        <RBSheet
          ref={refRBSheetQC}
          height={windowHeight / 1.6}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(32, 32, 32, 0.5)'
            },
            draggableIcon: {
              backgroundColor: "#DADCE5",
              width: 100,
            },
            container: {
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }

          }}
        >
          <BottomSheet Heading={jobSingleData?.job_type == 1 ? "Assign To QC" : "Assign Worker"} CloseIT={() => refRBSheetQC.current.close()} children={
            <>
              <AssignBottomSheet selectType={"Select QC"} SettingTheLocalStatus={SettingTheLocalStatus} ArrayOfWorker={qcs} assignType={2} closeSheet={() => refRBSheetQC.current.close()} />
            </>
          }
          />
        </RBSheet>
        <RBSheet
          ref={ReWorkBottomSheet}
          height={windowHeight / 2.6}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(32, 32, 32, 0.5)'
            },
            draggableIcon: {
              backgroundColor: "#DADCE5",
              width: 100,
            },
            container: {
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }

          }}
        >
          <BottomSheet Heading={"Rework Remark"} CloseIT={() => ReWorkBottomSheet.current.close()} children={
            <>
              <View style={styles.BottomMarginAdd} >
                <Text style={styles.TextColor} >Remark</Text>
                {
                  Platform.OS === 'ios' ?
                    <TextInput
                      multiline={true}
                      numberOfLines={3}
                      placeholderTextColor="#979797"
                      placeholder="Enter the remark for rework"
                      onChangeText={text => setReworkRemark(text)}
                      backgroundColor="#fff"
                      autoCorrect={false}
                      style={styles.RemarkInput}
                    >
                    </TextInput>
                    :
                    <TextInput
                      //    {...preRemark}
                      multiline={true}
                      style={{
                        textAlignVertical: 'top', padding: 10, color: '#000', borderWidth: 1, borderStyle: 'solid', borderColor: '#ddd', borderRadius: 5, fontSize: 18, marginVertical: 10,
                      }}
                      // style={styles.RemarkInput}
                      numberOfLines={3}
                      placeholderTextColor="#979797"
                      placeholder="Enter the remark for rework"
                      onChangeText={text => setReworkRemark(text)}
                      autoCorrect={false}
                      backgroundColor="#fff" >

                    </TextInput>
                }
                {/* <TextInput
                  style={styles.TextInputStyles}
                  placeholder="Enter the remark for rework"
                  onChangeText={text => setReworkRemark(text)}
                /> */}
                <CustomButton title={"Request Rework"} onPress={() => ReWorkAPI()} />
              </View>
            </>
          }
          />
        </RBSheet>
        <RBSheet
          ref={WashingBottomSheet}
          height={windowHeight / 2.6}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(32, 32, 32, 0.5)'
            },
            draggableIcon: {
              backgroundColor: "#DADCE5",
              width: 100,
            },
            container: {
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }

          }}
        >
          <BottomSheet Heading={"Request Washing"} CloseIT={() => WashingBottomSheet.current.close()} children={
            <>
              <View style={styles.BottomMarginAdd} >
                <Text style={styles.TextColor} >Remark</Text>
                <TextInput
                  style={styles.TextInputStyles}
                  placeholder="Enter the remark for rework"
                  onChangeText={text => setReworkRemark(text)}
                />
                <CustomButton title={"Request Washing"} onPress={() => WasherRequestByQC()} />
              </View>
            </>
          }
          />
        </RBSheet>
        <RBSheet
          ref={refRBSheetWasher}
          height={windowHeight / 1.6}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(32, 32, 32, 0.5)'
            },
            draggableIcon: {
              backgroundColor: "#DADCE5",
              width: 100,
            },
            container: {
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }

          }}
        >
          <BottomSheet Heading={"Assign To Washer"} CloseIT={() => refRBSheetWasher.current.close()} children={
            <>
              <AssignBottomSheet selectType={"Select Washer"} ArrayOfWorker={washer} assignType={3} closeSheet={() => refRBSheetWasher.current.close()} />
            </>
          }
          />
        </RBSheet>
        <RBSheet
          ref={refRBSheetMechanic}
          height={windowHeight / 1.6}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(32, 32, 32, 0.5)'
            },
            draggableIcon: {
              backgroundColor: "#DADCE5",
              width: 100,
            },
            container: {
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }

          }}
        >
          <BottomSheet Heading={"Assign To Mechanic"} CloseIT={() => refRBSheetMechanic.current.close()} children={
            <>
              <AssignBottomSheet selectType={"Select Mechanic"} ArrayOfWorker={mechanic} assignType={1} closeSheet={() => refRBSheetMechanic.current.close()} />
            </>
          }
          />
        </RBSheet>
        <RBSheet
          ref={refRBSheetRE_Mechanic}
          height={windowHeight / 1.6}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(32, 32, 32, 0.5)'
            },
            draggableIcon: {
              backgroundColor: "#DADCE5",
              width: 100,
            },
            container: {
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }

          }}
        >
          <BottomSheet Heading={"Assign To Mechanic"} CloseIT={() => refRBSheetRE_Mechanic.current.close()} children={
            <>
              <AssignBottomSheet selectType={"Select Mechanic"} ArrayOfWorker={mechanic} assignType={11} closeSheet={() => refRBSheetRE_Mechanic.current.close()} />
            </>
          }
          />
        </RBSheet>
        <RBSheet
          ref={pauseRemarkAdd}
          height={windowHeight / 2.5}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(32, 32, 32, 0.5)'
            },
            draggableIcon: {
              backgroundColor: "#DADCE5",
              width: 100,
            },
            container: {
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }

          }}
        >
          <BottomSheet Heading={"Pause Job"} CloseIT={() => pauseRemarkAdd.current.close()} children={
            <>
              <View style={styles.BottomMarginAdd} >
                <Text style={styles.TextColor} >Remark</Text>
                {
                  Platform.OS === 'ios' ?
                    <TextInput
                      multiline={true}
                      numberOfLines={3}
                      placeholderTextColor="#979797"
                      placeholder="Enter the reason"
                      onChangeText={text => setreamark(text)}
                      backgroundColor="#fff"
                      autoCorrect={false}
                      style={styles.RemarkInput}
                    >
                    </TextInput>
                    :
                    <TextInput
                      //    {...preRemark}
                      multiline={true}
                      style={{
                        textAlignVertical: 'top', padding: 10, color: '#000', borderWidth: 1, borderStyle: 'solid', borderColor: '#ddd', borderRadius: 5, fontSize: 18, marginVertical: 10,
                      }}
                      // style={styles.RemarkInput}
                      numberOfLines={3}
                      placeholderTextColor="#979797"
                      placeholder="Enter the reason"
                      onChangeText={text => setreamark(text)}
                      autoCorrect={false}
                      backgroundColor="#fff" >

                    </TextInput>
                }
                {/* <TextInput
                  style={styles.TextInputStyles}
                  placeholder="Enter the reason"
                  onChangeText={text => setreamark(text)}
                /> */}
                <CustomButton title={"Pause Job"} onPress={() => ConfirmationSheet.current.open()} />
                {/* {
                              homeData?.user?.role_name == "Mechanic" ? 
                            <CustomButton title={"Pause Job"} onPress={() => PauseJobMethod()} />
:
                              homeData?.user?.role_name == "QC" ? 
                            <CustomButton title={"Pause Job"} onPress={() => QCPauseJobMethod()} />
                              :
                              homeData?.user?.role_name == "Washer" ? 
                            <CustomButton title={"Pause Job"} onPress={() => WasherPauseJobMethod()} />
                              : null
                            } */}
              </View>
            </>
          }
          />
        </RBSheet>
        <RBSheet
          ref={ConfirmationSheet}
          height={windowHeight / 2.5}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(32, 32, 32, 0.5)'
            },
            draggableIcon: {
              backgroundColor: "#DADCE5",
              width: 100,
            },
            container: {
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }

          }}
        >
          <BottomSheet Heading={"Pause Job"} CloseIT={() => ConfirmationSheet.current.close()} children={
            <>
              <View style={styles.SpiltTwo} >
                <Text style={styles.TextColor} >Are you sure you want to close the job ?</Text>
                {
                  jobSingleData?.job_type == 1 ?
                    <CustomButton title={"Pause Job"} onPress={() => PauseJobMethod()} />
                    :
                    jobSingleData?.job_type == 3 ?
                      <CustomButton title={"Pause Job"} onPress={() => QCPauseJobMethod()} />
                      :
                      jobSingleData?.job_type == 2 ?
                        <CustomButton title={"Pause Job"} onPress={() => WasherPauseJobMethod()} />
                        : null
                }
              </View>
            </>
          }
          />
        </RBSheet>
      </>
    )
  }




  const TimeLineFetch = () => {
    let data = { order_id: orderId }
    TimeLineAPI(data).then((res) => {
      if (res?.data?.success == true)
        // console.log(res?.data, "TimeLine Data");
        setTimeLine(res?.data?.timeline)
      // console.log(res?.data?.timeline?.delivered, "TimeLine Data");
    }).catch(err => { return err; });
  }

  useEffect(() => {
    TimeLineFetch()
  }, [])

  const ViewJObCard = () => {
    setloading(true)
    let data = {
      order_id: orderId,
    }
    GenerateJobCardAPI(data).then((res) => {
      // console.log(res?.data);
      setPDFlink(res?.data?.url);
      if (res?.data?.success == true) {
        setcardVisible(true)
      }
      setloading(false)

    }).catch(err => { return err; });
  }

  const OpenJObCard = () => {

    setloading(true)
    let data = {
      order_id: orderId,
    }
    GenerateJobCardAPI(data).then((res) => {
      // console.log(res?.data);
      // setPDFlink(res?.data?.url);
      if (res?.data?.success == true) {
        setcardVisible(true)
        Linking.openURL(res?.data?.url).catch((err) => {
          console.log(err)
        });
        setloading(false)
      }


    }).catch(err => { setloading(false); return err; });
  }


  // useEffect(() => {
  //   ViewJObCard()
  // }, [])


  //ANIMATION 
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });
  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0.90],
    extrapolate: 'clamp',
  });
  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -windowWidth / 8, -windowWidth / 6],
    extrapolate: 'clamp',
  });

  const FasttitleTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 1.2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -windowWidth / 8, -windowWidth / 6],
    extrapolate: 'clamp',
  });

  const fastTitleTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 1.2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -windowWidth / 8, -windowWidth / 6],
    extrapolate: 'clamp',
  });

  const titleTranslateX = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 1, -windowWidth / 20],
    extrapolate: 'clamp',
  });

  const titleTranslateY1 = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -10, -windowWidth / 12],
    extrapolate: 'clamp',
  });

  const orderTranslateX = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 1, windowWidth / 2.5],
    extrapolate: 'clamp',
  });

  const cardTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -windowWidth / 5, -windowWidth / 1.50],
    extrapolate: 'extend',
  });

  // const orderTranslateY1 = scrollY.interpolate({
  //   inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
  //   outputRange: [0, -10, -windowWidth / 15],
  //   extrapolate: 'clamp',
  // });


  // const titleTranslateX1 = scrollY.interpolate({
  //   inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
  //   outputRange: [0, 100, windowWidth / 1.30],
  //   extrapolate: 'clamp',
  // });

  const op = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  })

  const fastop = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE / 1.5],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  })

  const reverseop = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE + 2],
    outputRange: [0, 0.1, 1],
    extrapolate: 'clamp',
  })

  const indexOfHeader = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE + 2],
    outputRange: [-10, 10, 12],
    extrapolate: 'clamp',
  })

  const indexOfDownContent = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE, HEADER_SCROLL_DISTANCE + 2],
    outputRange: [-10, -100, -100],
    extrapolate: 'clamp',
  })


  return (
    <SafeAreaView>
      {/* {loading === true ? <Spinner style={{ height: '100%' }} /> */}

      <Animated.ScrollView
        // ref={aref}
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT - 32 }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}>
        {loading === true ?
          <SkeletonPlaceholder  >
            <ScrollView style={styles.ShadowStyle} >
              <View style={styles.Jobhadow} />
              <View style={styles.ThirdShadow} />
              <View style={styles.ThirdShadow} />
              <View style={styles.ThirdShadow} />
              <View style={styles.ThirdShadow} />
              <View style={styles.ThirdShadow} />
              <View style={styles.ThirdShadow} />
              <View style={styles.ThirdShadow} />
              <View style={styles.ThirdShadow} />
              <View style={styles.ThirdShadow} />
              <View style={styles.ThirdShadow} />
              <View style={styles.ThirdShadow} />
              <View style={styles.ThirdShadow} />
              <View style={styles.ThirdShadow} />
              <View style={styles.ThirdShadow} />
              <View style={styles.ThirdShadow} />
            </ScrollView>
          </SkeletonPlaceholder>
          :
          <>

            <View style={styles.JobDetailContentWrapper} >
              <TouchableOpacity style={styles.TileView} onPress={OpenJObCard} >
                <>
                  <View style={styles.IconArea} >
                    <PDFIcon width={windowWidth / 20} height={windowHeight / 20} />
                  </View>
                  <Text style={styles.TileText} >View Job Card</Text>
                </>
              </TouchableOpacity>
              <CollapseiveCard ScreenName={"Job Details"} child={<RenderDetail />} />
              {/* <CollapseiveCard ScreenName={"Timeline"} child={<RenderTimeLine TimeLine={TimeLine} TimelineStatus={jobSingleData?.current_order_status} />} /> */}
              <NavigationCard ScreenName={"Materials"} screenName={() => Action == true ? navigation.navigate(NavigationString.MATERIALS_SCREEN) : displayErr()} />
              <NavigationCard ScreenName={"Check in markings"} screenName={() => Action == true ? navigation.navigate(NavigationString.CHECK_IN) : displayErr()} />
              <NavigationCard ScreenName={"Service Report"} screenName={() => Action == true ? navigation.navigate(NavigationString.SERVICE_REPORT) : displayErr()} />
              {/* <NavigationCard ScreenName={"Installer images"} screenName={() => Action == true ? navigation.navigate(NavigationString.INSTALLER_IMAGES) : displayErr()} />
              <NavigationCard ScreenName={"Installer remarks"} screenName={() => Action == true ? navigation.navigate(NavigationString.INSTALLER_REMARKS) : displayErr()} /> */}
              {/* <NavigationCard ScreenName={"Customer images"} screenName={() => Action == true ? navigation.navigate(NavigationString.CUSTOMER_IMAGES) : displayErr()} /> */}
              {jobSingleData?.order_type == 0 ? null :
                <NavigationCard ScreenName={"Survey Details"} screenName={() => Action == true ? navigation.navigate(NavigationString.SURVEY_DETAIL) : displayErr()} />}
              <NavigationCard ScreenName={"Check out markings"} screenName={() => Action == true ? jobSingleData?.all_mech_jobs_done == true ? navigation.navigate(NavigationString.CHECK_OUT) : displayErrForoCheckout() : displayErr()} />
            </View>
          </>

        }

      </Animated.ScrollView>


      {/* <Animated.View
        style={[styles.header, { transform: [{ translateY: headerTranslateY }] }]}>
        <Animated.Image
          style={[
            styles.headerBackground,
            {
              opacity: imageOpacity,
              transform: [{ translateY: imageTranslateY }],
            },
          ]}
          source={jobSingleData.order_type == 0 ? Images.HeaderBack : Images.AccidentBack}
        />
      </Animated.View> */}
      <Animated.View style={[styles.topBar,]}>
        <Animated.View style={styles.HeaderWrapper}>
          <View style={styles.inLine}>
            <View style={styles.backAndHeading} >
              <Pressable style={[styles.backArrowStyle]} onPress={() => navigation.goBack()} >
                <IoIcon name="chevron-back" size={25} color="#FFFFFF" />
              </Pressable>
              <View style={[styles.HeadingID]} >
                {jobSingleData?.order_type == 0 ?
                  <Animated.Text style={[styles.nameStyleAbsoulte, { transform: [{ translateX: titleTranslateX }], }, { opacity: reverseop }]} >General servicing & repairs</Animated.Text>
                  : jobSingleData?.order_type == 1 ?
                    <Animated.Text style={[styles.nameStyleAbsoulte, { transform: [{ translateX: titleTranslateX }], }, { opacity: reverseop }]} >Accidental claims</Animated.Text>
                    : null
                }

                <Animated.Text style={[styles.HeadingText, { transform: [{ translateX: orderTranslateX }, { scale: titleScale }] }]} >
                  #{orderId}</Animated.Text>
              </View>
            </View>
          </View>
          <Animated.View style={[styles.DownStyling, { zIndex: indexOfDownContent }, {
            transform: [
              { scale: titleScale },
              { translateY: cardTranslateY },
            ],
          },]} >
            <View style={styles.NameAndNumber} >
              {jobSingleData?.order_type == 0 ?
                <View style={[styles.IconBack]} >
                  <Animated.Text style={[styles.nameStyle, { opacity: fastop }, {
                    transform: [{ scale: titleScale }, { translateY: fastTitleTranslateY }],
                  }]} >General servicing & repairs</Animated.Text>
                </View> : jobSingleData?.order_type == 1 ?
                  <Animated.Text style={[styles.nameStyle, { opacity: fastop }, {
                    transform: [{ scale: titleScale }, { translateY: fastTitleTranslateY }],
                  }]} >Accidental claims</Animated.Text>
                  : null
              }
              <Animated.Text style={[styles.subNameStyle, { opacity: op }, {
                transform: [{ scale: titleScale }, { translateY: titleTranslateY }],
              }]} >VRN:{jobSingleData?.vehicle_number}</Animated.Text>
            </View>
            <View style={styles.idWithIcon} >
              <Animated.Text style={[styles.DownID, { opacity: op }, {
                transform: [{ scale: titleScale }, { translateY: titleTranslateY }],
              }]} >{jobSingleData?.vehicle_category}</Animated.Text>

            </View>
            <View style={styles.statusAndPDF} >
              <View style={styles.IconStyle} >

                {(jobSingleData?.job_type === 0 || jobSingleData?.job_type === 4) ?

                  jobSingleData?.current_order_status == 0 ?
                    <Animated.Text style={[styles.StatusTextUnCompleted, { opacity: op }, {
                      transform: [{ scale: titleScale }, { translateY: FasttitleTranslateY }],
                    }]} >Incomplete</Animated.Text>
                    :
                    <>
                      <Animated.View style={[styles.StatusText, { opacity: op }, {
                        transform: [{ scale: titleScale }, { translateY: FasttitleTranslateY }],
                      }]} >
                        <GreenTickTocn width={windowWidth / 30} height={windowHeight / 30} />
                      </Animated.View>
                      <Animated.Text style={[styles.StatusText, { opacity: op }, {
                        transform: [{ scale: titleScale }, { translateY: FasttitleTranslateY }],
                      }]} >Completed</Animated.Text>
                    </>
                  :
                  jobSingleData?.job_status == 0 ?
                    <Animated.Text style={[styles.StatusTextUnCompleted, { opacity: op }, {
                      transform: [{ scale: titleScale }, { translateY: FasttitleTranslateY }],
                    }]} >Incomplete</Animated.Text>
                    :
                    <>
                      <Animated.View style={[styles.StatusText, { opacity: op }, {
                        transform: [{ scale: titleScale }, { translateY: FasttitleTranslateY }],
                      }]} >
                        <GreenTickTocn width={windowWidth / 30} height={windowHeight / 30} />
                      </Animated.View>
                      <Animated.Text style={[styles.StatusText, { opacity: op }, {
                        transform: [{ scale: titleScale }, { translateY: FasttitleTranslateY }],
                      }]} >Completed</Animated.Text>
                    </>
                }
              </View>
              {cardVisible == true ?
            <TouchableOpacity style={styles.TextAndIconWhite} onPress={OpenJObCard} >
              <Animated.Text style={[styles.subNameStyleForWhite, { opacity: op }, {
                transform: [{ scale: titleScale }, { translateY: titleTranslateY }],
              }]} >Download Job Card </Animated.Text>
              <WhitePdfAVG width={windowWidth / 20} height={windowHeight / 20} />
              </TouchableOpacity>
              : null }
            </View>
          </Animated.View>
        </Animated.View>
      </Animated.View>



    </SafeAreaView>
  )
}

export default JobDetail

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.primaryColor,
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -10,
    // backgroundColor: "red",
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  topBar: {
    marginTop: 0,
    height: 50,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: "flex-end",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -10,
    // backgroundColor: "pink",
  },
  HeaderContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    height: windowHeight / 3.9,
    paddingVertical: 10,
  },
  HeaderWrapper: {
    // backgroundColor: "red",
    width: '100%',
    height: '85%',
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
  },
  inLine: {
    // backgroundColor: "green",
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
  },
  backAndHeading: {
    marginTop: 10,
    // backgroundColor: "pink",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHorizontal: 10,

  },
  backArrowStyle: {
    // backgroundColor: 'purple',
    width: '10%',
  },
  HeadingID: {
    // backgroundColor: 'green',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    right: '60%',
  },
  HeadingText: {
    color: Colors.Pure_White,
    fontSize: 18,
    lineHeight: 27,
    fontFamily: fonts.PoppinsSemiBold,
  },
  // DownStyling: {
  //   // backgroundColor: 'purple',
  //   paddingHorizontal: 5,
  // },
  NameAndNumber: {
    // backgroundColor: 'green',
  },
  nameStyle: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fonts.PoppinsSemiBold,
    color: Colors.Pure_White,
    textTransform: 'uppercase',
    paddingVertical: 5,
  },
  subNameStyle: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fonts.PoppinsSemiBold,
    color: Colors.Pure_White,
    textTransform: 'uppercase',
    paddingVertical: 5,
    bottom: 1
  },
  TextAndIconWhite: {
    // backgroundColor: 'purple',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 15,
  },
  RemarkForScope: {
    // backgroundColor: 'purple',
    paddingHorizontal: '2%',
    fontSize: 14,
    lineHeight: 16,
    fontFamily: fonts.PoppinsMedium,
    color: '#000',
    marginVertical: 8,
  },
  RemarkScopeWrapper: {
    // backgroundColor: 'red',
    width: '100%',
    // alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: '10%',
    paddingVertical: '2%',

    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    // zIndex: 15,
  },
  subNameStyleForWhite: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fonts.PoppinsSemiBold,
    color: Colors.Pure_White,
    textTransform: 'uppercase',
    paddingVertical: 5,
    bottom: 1
  },
  idWithIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  IconStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  DownID: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: fonts.PoppinsMedium,
    color: Colors.Pure_White,
  },
  statusAndPDF: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'purple',
    width: "100%",
    // alignItems: 'center',
  },
  StatusTextUnCompleted: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: fonts.PoppinsSemiBold,
    marginHorizontal: 5,
    color: '#FFA600',
  },
  StatusText: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: fonts.PoppinsSemiBold,
    marginHorizontal: 5,
    color: '#27AE60',
  },
  saveArea: {
    flex: 1,
    backgroundColor: '#eff3fb',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#402583',
    backgroundColor: '#ffffff',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 1,
    borderRadius: 10,
    marginHorizontal: 12,
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  JobDetailContentWrapper: {
    // backgroundColor: 'yellow',
  },
  DownloadLink: {
    // backgroundColor: 'pink',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: '5%',
    marginVertical: '5%',
  },
  DownloadText: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fonts.PoppinsSemiBold,
    color: Colors.primary_Red,
    textDecorationLine: 'underline',
    paddingVertical: 5,
  },
  CollapsibleStyle: {
  },
  CollapsibleWrapper: {
  },




  // JobDetail Styling
  JobDetail: {
    flexDirection: 'row',
    width: '100%',
    // paddingHorizontal: '5%',
    justifyContent: 'space-between',
    paddingVertical: '2%',
    zIndex: 5,
    // backgroundColor: "yellow",
  },
  JobCenter: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
    // backgroundColor: "red",
  },
  BottomLine: {
    // backgroundColor: "red",
    borderBottomColor: "#155B9F99",
    borderBottomWidth: 0.5,
    alignSelf: 'center',
    width: '85%',
  },
  JobDate: {
    justifyContent: 'space-between',
    alignItems: "center",
    alignSelf: 'center',
    // backgroundColor: "green",
    width: '40%',
  },
  JobDateCenter: {
    justifyContent: 'space-around',
    width: "40%",
    justifyContent: 'center',
    alignItems: "center",
    alignSelf: 'center',
    // backgroundColor: "purple",

  },
  JobOtherDetailCenter: {
    justifyContent: 'space-around',
    width: "40%",
    justifyContent: 'center',
    alignItems: "center",
    alignSelf: 'center',
    // backgroundColor: "purple",

  },
  TileView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: windowWidth,
    marginTop: windowWidth / 10,
  },
  TileText: {
    fontSize: 14,
    fontFamily: fonts.PoppinsMedium,
    lineHeight: 16,
    color: "#155B9F",
    paddingHorizontal: 10,
  },
  IconArea: {
    // backgroundColor: 'pink',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // bottom: 5,
  },
  upperTextCenter: {
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: "center",
    alignSelf: 'center',

  },
  StartDate: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
    alignSelf: 'center',
  },
  upperText: {
    width: '95%',
    paddingVertical: 5,
    paddingHorizontal: 5,
    // backgroundColor: "pink",
    justifyContent: 'center',
    alignItems: "center",
    alignSelf: 'center',
  },
  cardTextGrey: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    fontFamily: fonts.PoppinsRegular,
    color: '#777',
  },
  cardTextBlack: {
    fontSize: 14,
    lineHeight: 16,
    fontFamily: fonts.PoppinsMedium,
    color: '#000',
    marginVertical: 8,
  },
  DownText: {
    marginVertical: 5,
    paddingHorizontal: 5,
    // backgroundColor: "pink",
    justifyContent: 'center',
    alignItems: "center",
    alignSelf: 'center',

  },
  JobOtherDetail: {
    justifyContent: "space-between",
    width: '40%',
  },
  dashArea: {
    position: 'absolute',
    left: '40%',
    top: '10%',
  },
  makeItrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  LineForRow: {
    marginTop: '5%',
    width: "100%",
    position: 'absolute',
    justifyContent: 'center',
    alignItems: "center",
    alignSelf: 'center',
  },
  LineForRowText: {
    color: '#000000',
  },
  TextForRow: {
    maxWidth: '50%',
  },
  TextAndLine: {
    // flexDirection: 'row',
    paddingVertical: 5,
  },
  TextAndLine: {
    flexDirection: 'row',
  },
  DownCTA: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '10%',
    paddingVertical: '2%',
    // backgroundColor: 'red',
  },
  DownCTAText: {
    fontSize: 14,
    lineHeight: 16,
    fontFamily: fonts.PoppinsSemiBold,
    color: '#155B9F',
    marginVertical: 8,
  },
  DownCTATextRed: {
    fontSize: 14,
    lineHeight: 16,
    fontFamily: fonts.PoppinsSemiBold,
    color: '#AE282E',
    marginVertical: 8,
  },
  JobButtonArea: {
    flexDirection: 'row',
    justifyContent: "space-evenly",
    alignItems: 'center',
    width: '100%',
    margin: 0,
    bottom: '-5%',
  },
  JobButton: {
    backgroundColor: "#155B9F",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: 'center',
    width: '35%',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  JobButtonText: {
    color: "#fff",
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: 14,
  },
  timelineContainer: {
    borderBottomWidth: 1,
    borderColor: 'red',
    paddingHorizontal: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 10,
  },
  title: {
    color: 'black',
    fontWeight: 'normal',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  subTitle: {
    fontSize: 14,
    color: 'grey',
  },

  //TimeLine Styling

  RowTimeLineWrapper:
  {
    // border: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingVertical: 10,
  },

  RowStepAndTitleWrap:
  {
    flexDirection: 'row',
  },

  RowTimeLine:
  {
    width: '20 %',
    /* margin:2 , */
    /* backgroundColor: red, */
  },

  RowTimeLineSteps:
  {
    width: '80%',
    /* backgroundColor: red, */
    flexDirection: 'row',
    paddingBottom: 15,
    marginVertical: 2,
  },

  RowTimeLineCircle:
  {

    backgroundColor: '#B3B3B3',
    width: 25,
    height: 25,
    borderRadius: 14,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: '5%',
  },

  RowTimeLineCircleIncomplete:
  {

    backgroundColor: '#B3B3B3',
    width: 30,
    height: 30,
    borderRadius: 14,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: '5 %',
    zIndex: 2,
  },

  RowTimeLineCircleCompleted:
  {

    backgroundColor: '#0DAF4B',
    width: 30,
    height: 30,
    borderRadius: 14,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: '5%',
    zIndex: 2,
  },

  RowTimeLineCircleOngoing:
  {

    backgroundColor: '#FFA600',
    width: 30,
    height: 30,
    borderRadius: 14,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: '5%',
    zIndex: 5,
  },


  RowNameAndTIme:
  {

    width: '65%',
  },

  TimeLineItemTitle:
  {

    color: '#000',
    fontSize: 15,
    fontWeight: "600",
  },

  DateAndTime:
  {

    color: "#777",
    fontSize: 15,
  },

  RowDownLine:
  {

    backgroundColor: '#B3B3B3',
    // backgroundColor: #000,
    height: 3,
    transform: [{ rotate: "90deg" }],
    /* position: absolute, */
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    /* bottom: 30%, */
    width: '121%',
    zIndex: -3,
    // content: '',
  },

  FirstRowDownLine:
  {

    backgroundColor: '#B3B3B3',
    backgroundColor: '#000',
    height: 3,
    transform: [{ rotate: "90deg" }],
    /* position: absolute, */
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    /* bottom: 30%, */
    width: '80%',
    zIndex: -3,
    // content: '',
  },

  RowBottomLine:
  {

    backgroundColor: "#ddd",
    height: "2%",
    position: 'absolute',
    width: '100%',
    // content: '',
  },

  RowStepTick:
  {

  },

  //HeaderStyle Start
  topBar: {
    marginTop: 0,
    height: 50,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: "flex-end",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "pink",
  },

  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.primaryColor,
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },

  inLine: {
    // backgroundColor: "green",
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
  },
  backAndHeading: {
    // marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: HEADER_MAX_HEIGHT / 8,
    paddingHorizontal: 10,
    // backgroundColor: "pink",
  },
  IconBack: {
    flexDirection: "row",
    // backgroundColor: "pink",
    // justifyContent: 'center',
    alignItems: 'center',
  },
  HeaderContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    height: windowHeight / 3.9,
    paddingVertical: 10,
  },
  HeaderWrapper: {
    // backgroundColor: "red",
    width: '100%',
    height: '85%',
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
  },
  backArrowStyle: {
    // backgroundColor: 'purple',
    width: '10%',
  },
  HeadingID: {
    // backgroundColor: 'red',
    // position: 'absolute',
    width: '90%',
    // alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    right: '60%',
  },
  HeadingText: {
    color: Colors.Pure_White,
    fontSize: 18,
    lineHeight: 27,
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: 16,
    lineHeight: 24,
  },
  DownStyling: {
    // backgroundColor: 'purple',
    paddingHorizontal: 10,
    marginTop: 20,
    height: HEADER_MAX_HEIGHT,
    height: "auto",
    // bottom: HEADER_MAX_HEIGHT / -6,
    // justifyContent: 'flex-end',
  },
  NameAndNumber: {
    // backgroundColor: 'green',
  },
  nameStyle: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fonts.PoppinsSemiBold,
    color: Colors.Pure_White,
    textTransform: 'uppercase',
    paddingVertical: 5,
  },
  nameStyleAbsoulte: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fonts.PoppinsSemiBold,
    color: Colors.Pure_White,
    textTransform: 'uppercase',
    paddingVertical: 5,
    position: 'absolute',
  },
  subNameStyle: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fonts.PoppinsSemiBold,
    color: Colors.Pure_White,
    textTransform: 'uppercase',
    paddingVertical: 5,
  },
  idWithIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  IconStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  DownID: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: fonts.PoppinsMedium,
    color: Colors.Pure_White,
  },
  StatusTextUnCompleted: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: fonts.PoppinsSemiBold,
    marginHorizontal: 5,
    color: '#FFA600',
  },
  StatusText: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: fonts.PoppinsSemiBold,
    marginHorizontal: 5,
    color: '#27AE60',
  },
  TextColor: {
    fontSize: 14,
    paddingVertical: 10,
    color: Colors.primary_Color,
    fontFamily: fonts.PoppinsMedium,
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
  BottomMarginAdd: {
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  SpiltTwo: {
    flex: 1,
    width: "100%",
    // height : "100%",
    paddingHorizontal: 20,
    justifyContent: 'center',
    // alignItems: 'center',
  },

  ShadowStyle: {
    // alignItems: "center",
    width: '90%',
    alignSelf: 'center',
    height: windowHeight,
    marginTop: "10%",
    paddingHorizontal: 5,
  },
  Jobhadow: {
    width: '40%',
    height: 30,
    marginVertical: 10,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    borderRadius: 4,
  },
  ThirdShadow: {
    width: '100%',
    height: 50,
    marginVertical: 10,
    justifyContent: 'flex-end',
    borderRadius: 10,
  },
  RemarkInput: {
    backgroundColor: "#fff",
    padding: 5,
    width: "100%",
    height: 100,
    fontSize: 18,
    color: "#000",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 10,
  },

})