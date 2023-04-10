import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Linking,
  StatusBar,
  ScrollView,
  Pressable,
  TouchableOpacity,
  ImageBackground,
  Animated,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import VMOCustomHeader from '../../Components/VMOCustomHeader';
import ImageHeader from '../../Components/ImageHeader';
import fonts from '../../../../assects/fonts';
import { Colors } from '../../Constant/Colors';
import moment from 'moment';

// import Collapsible from 'react-native-collapsible';
// import Accordion from 'react-native-collapsible/Accordion';
import NavigationCard from '../../Components/Cards/NavigationCard';
import CollapseiveCard from '../../Components/Cards/CollapseiveCard';
import * as Animatable from 'react-native-animatable';
import JobsCard from '../../Components/Cards/JobsCard';
import Timeline from 'react-native-timeline-flatlist';
import Images from '../../assets/Images';
import RenderTimeLine from './RenderTimeLine';
import NavigationString from '../../routes/NavigationString';
import { useSelector, useDispatch } from 'react-redux';
import {
  AdminGetOrderDetailAPI,
  EndJobAPI,
  FetchMechanicAPI,
  FetchQCAPI,
  FetchWasherAPI,
  GenerateJobCardAPI,
  JobDetailAPI,
  StartJobAPI,
  TimeLineAPI,
} from '../../api';
import Spinner from '../../Components/Spinner';
import { windowHeight, windowWidth } from '../../utils/Dimension';
import {
  saveJobDetail,
  setOrderId,
  setOrderStatus,
} from '../../../../redux/actions/Job';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShowErrorMessage } from '../../../../component';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import BottomSheet from '../../Components/BottomSheet';
import AssignBottomSheet from './AssignBottomSheet';
import CustomButton from '../../Components/CustomButton';
import { DashLineSVG, GreenTickTocn, PDFIcon } from '../../assets/Icons';
import IoIcon from 'react-native-vector-icons/Ionicons';
import MiIcon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../../../assects/colors';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


const HEADER_MAX_HEIGHT = windowWidth / 2;
const HEADER_MIN_HEIGHT = windowWidth / 8;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const AdminJobDetail = () => {
  const [loading, setloading] = useState(false);
  const [jobSingleData, setjobSingleData] = useState(false);
  const [TimeLine, setTimeLine] = useState(false);
  const [userType, setuserType] = useState();
  const [PDFlink, setPDFlink] = useState()
  const [LocalStatus, setLocalStatus] = useState();
  const [cardVisible, setcardVisible] = useState(false)
  const [Action, setAction] = useState(false);
  const { jobId, orderId, quoteCreated, quoteApproved } = useSelector(
    state => state.JobDetails,
  );
  const { homeData } = useSelector(state => state.homeDetails);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const refRBSheetMechanic = useRef();
  const refRBSheetWasher = useRef();
  const refRBSheetQC = useRef();

  const formattedStartDate = moment(jobSingleData?.start_date).format(
    'YY-MM-DD',
  );

  const formattedEndDate = moment(jobSingleData?.end_time).format('YY-MM-DD');

  const formatedBookingDate = moment(jobSingleData?.booking_date).format(
    'YY-MM-DD',
  );

  const JobDetailFetch = data => {
    setloading(true);
    // console.log(orderId, 'DATA');
    JobDetailAPI(data)
      .then(res => {
        console.log(res?.data, 'DATA');
        if (res?.data?.success === true) {
          setloading(true);
          setjobSingleData(res?.data);
          dispatch(saveJobDetail(res?.data, true));
          // dispatch(setOrderId(res?.data?.id))
          dispatch(setOrderStatus(res?.data?.current_order_status));
          if (res?.data?.current_order_status > 3) {
            setAction(true);
          }
          setloading(false);
        } else {
          setloading(true);
          showError('No job Found !');
          setloading(false);
        }
        return res;
      })
      .catch(err => {
        setloading(false);
        return err;
      });
  };

  const displayErr = () => {
    ShowErrorMessage('Mechniac had not started his job yet.');
  };

  const TempdisplayErr = () => {
    ShowErrorMessage('Further Process can be done from website.');
  };

  useEffect(() => {
    JobDetailFetch({ order_id: orderId });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      JobDetailFetch({ order_id: orderId });
    }, [quoteCreated === true || quoteApproved === true]),
  );

  // const adminNavigate = () => {
  //   if (loading == false) {

  //     if (jobSingleData?.current_order_status > 4) {
  //       setAction(true)
  //     }
  //   }else{
  //     return 0;
  //   }
  // }

  useEffect(() => {
    if (jobSingleData?.current_order_status > 3) {
      setAction(true)
    } else {
      setAction(false)
    }
  }, [])

  const RenderDetail = () => {
    const [mechanic, setMechanic] = useState();
    const [qcs, setQCS] = useState();
    const [washer, setwasher] = useState();

    const getDropDownData = async data => {
      FetchMechanicAPI(data)
        .then(res => {
          let trying = null;
          let setingObect = res?.data?.mechanics.map((superVisor, index) => {
            return (trying = {
              label: superVisor.name.toString(),
              value: superVisor.id.toString(),
              key: index.toString(),
            });
          });
          setMechanic(setingObect);
          return res;
        })
        .catch(err => {
          return err;
        });

      FetchQCAPI(data)
        .then(res => {
          let trying = null;
          let setingObect = res?.data?.qcs.map((superVisor, index) => {
            return (trying = {
              label: superVisor.name,
              value: superVisor.id.toString(),
              key: index.toString(),
            });
          });
          setQCS(setingObect);
          return res;
        })
        .catch(err => {
          return err;
        });

      FetchWasherAPI(data)
        .then(res => {
          let trying = null;
          let setingObect = res?.data?.washers.map((superVisor, index) => {
            return (trying = {
              label: superVisor.name,
              value: superVisor.id.toString(),
              key: index.toString(),
            });
          });
          setwasher(setingObect);
          return res?.data;
        })
        .catch(err => {
          return err;
        });

      setloading(false);
    };

    useEffect(() => {
      setloading(true);
      getDropDownData({});
    }, []);

    return (
      <>
        <View style={styles.cardWrapper}>
          <View style={[styles.JobCenter]}>
            <View style={styles.JobDateCenter}>
              <View style={[styles.upperTextCenter]}>
                <Text style={styles.cardTextGrey}>Start Date</Text>
                <Text style={styles.cardTextBlack}>{formattedStartDate}</Text>
              </View>
            </View>
            <View style={styles.LineForRow}>
              <DashLineSVG height={15} width={100} />
            </View>
            <View style={styles.JobOtherDetailCenter}>
              <View style={[styles.upperTextCenter]}>
                <Text style={styles.cardTextGrey}>End Date</Text>
                <Text style={styles.cardTextBlack}>{formattedEndDate}</Text>
              </View>
            </View>
          </View>
          <View style={[styles.BottomLine]}></View>
          <View style={styles.JobDetail}>
            <View style={styles.JobDate}>
              <View style={styles.StartDate}>
                <View style={styles.upperText}>
                  <Text style={styles.cardTextGrey}>VR No.</Text>
                  <Text style={styles.cardTextBlack}>
                    {jobSingleData?.vehicle_number}
                  </Text>
                </View>
              </View>
              <View style={styles.DownText}>
                <Text style={styles.cardTextGrey}>Booking date</Text>
                <Text style={styles.cardTextBlack}>{formatedBookingDate}</Text>
              </View>
            </View>
            <View style={styles.JobOtherDetail}>
              <View style={styles.upperText}>
                <Text style={styles.cardTextGrey}>Vehicle Type</Text>
                <Text style={styles.cardTextBlack}>
                  {jobSingleData?.vehicle_category}
                </Text>
              </View>
              <View style={styles.DownText}>
                <Text style={styles.cardTextGrey}>Total amount</Text>
                <Text style={styles.cardTextBlack}>
                  SGD {jobSingleData?.amount}
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.BottomLine]}></View>
          {/* <View style={styles.DownCTA}>
            <Pressable>
              <Text style={styles.DownCTATextRed}>Report job</Text>
            </Pressable>
          </View> */}
        </View>

        {/* BOTTOM SHEETS  */}
        <RBSheet
          ref={refRBSheetQC}
          height={windowHeight / 1.6}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(32, 32, 32, 0.5)',
            },
            draggableIcon: {
              backgroundColor: '#DADCE5',
              width: 100,
            },
            container: {
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            },
          }}>
          <BottomSheet
            Heading={'Assign To QC'}
            CloseIT={() => refRBSheetQC.current.close()}
            children={
              <>
                <AssignBottomSheet
                  selectType={'Select QC'}
                  ArrayOfWorker={qcs}
                  type={3}
                  closeSheet={() => refRBSheetQC.current.close()}
                />
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
              backgroundColor: 'rgba(32, 32, 32, 0.5)',
            },
            draggableIcon: {
              backgroundColor: '#DADCE5',
              width: 100,
            },
            container: {
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            },
          }}>
          <BottomSheet
            Heading={'Assign To Washer'}
            CloseIT={() => refRBSheetWasher.current.close()}
            children={
              <>
                <AssignBottomSheet
                  selectType={'Select Washer'}
                  ArrayOfWorker={washer}
                  type={2}
                  closeSheet={() => refRBSheetWasher.current.close()}
                />
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
              backgroundColor: 'rgba(32, 32, 32, 0.5)',
            },
            draggableIcon: {
              backgroundColor: '#DADCE5',
              width: 100,
            },
            container: {
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            },
          }}>
          <BottomSheet
            Heading={'Assign To Mechanic'}
            CloseIT={() => refRBSheetMechanic.current.close()}
            children={
              <>
                <AssignBottomSheet
                  selectType={'Select Mechanic'}
                  ArrayOfWorker={mechanic}
                  type={1}
                  closeSheet={() => refRBSheetMechanic.current.close()}
                />
              </>
            }
          />
        </RBSheet>
      </>
    );
  };

  const TimeLineFetch = () => {
    let data = { order_id: orderId };
    TimeLineAPI(data)
      .then(res => {
        if (res?.data?.success == true)
          // console.log(res?.data, "TimeLine Data");
          setTimeLine(res?.data?.timeline);
        // console.log(res?.data?.timeline?.delivered, "TimeLine Data");
      })
      .catch(err => {
        return err;
      });
  };

  useEffect(() => {
    TimeLineFetch();
  }, []);

  const ViewJObCard = () => {
    setloading(true)

    let data = {
      order_id: orderId,
    };
    GenerateJobCardAPI(data)
      .then(res => {
        setPDFlink(res?.data?.url);
        if (res?.data?.success == true) {
          setcardVisible(true)
        }
        setloading(false)
      })
      .catch(err => {
        return err;
      });
  };

  const OpenJObCard = () => {
    Linking.openURL(PDFlink).catch(err => {
      console.log(err);
    });
  };

  useEffect(() => {
    ViewJObCard();
  }, []);

  let AnimatedHeaderValue = new Animated.Value(0);
  // const HEADER_MAX_HEIGHT = 250;
  // const HEADER_MIN_HEIGHT = 50;

  const AnimatedHeaderBackGround = AnimatedHeaderValue.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: ['rgb(0,0,255)', '	rgb(255,0,0)'],
    extrapolate: 'clamp',
  });

  const AnimatedHeaderHeight = AnimatedHeaderValue.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

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
    outputRange: [1, 1, 0.9],
    extrapolate: 'clamp',
  });
  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
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

  const orderTranslateY1 = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -10, -windowWidth / 15],
    extrapolate: 'clamp',
  });

  const titleTranslateX1 = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 100, windowWidth / 1.3],
    extrapolate: 'clamp',
  });

  const op = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });

  const fastop = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE / 1.5],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  const reverseop = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE + 2],
    outputRange: [0, 0.1, 1],
    extrapolate: 'clamp',
  });

  const indexOfHeader = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE, HEADER_SCROLL_DISTANCE + 2],
    outputRange: [-10, -10, 10],
    extrapolate: 'clamp',
  })

  const indexOfHeaderForUpper = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE, HEADER_SCROLL_DISTANCE + 2],
    outputRange: [-10, -10, -10],
    extrapolate: 'clamp',
  })
  const indexOfDownContent = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE, HEADER_SCROLL_DISTANCE + 2],
    outputRange: [-10, -100, -100],
    extrapolate: 'clamp',
  })

  const cardTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -windowWidth / 5, -windowWidth / 1.50],
    extrapolate: 'extend',
  });


  return (
    <SafeAreaView>
      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT - 10 }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}>
        {loading === true ? (
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
        ) : (
          <>
            <View style={styles.JobDetailContentWrapper}>
              <View style={styles.OnlyIndex}>
                {cardVisible == true ?
                  <>
                    <TouchableOpacity style={styles.TileView} onPress={OpenJObCard}>
                      <View style={styles.IconArea}>
                        <PDFIcon
                          width={windowWidth / 20}
                          height={windowHeight / 20}
                        />
                      </View>
                      <Text style={styles.TileText}>View Job Card</Text>
                    </TouchableOpacity>
                  </>
                  : <View style={{ paddingVertical: 10 }} />}
                <CollapseiveCard
                  ScreenName={'Job Details'}
                  child={<RenderDetail />}
                />
                <CollapseiveCard
                  ScreenName={'Timeline'}
                  child={
                    <RenderTimeLine
                      TimeLine={TimeLine}
                      TimelineStatus={jobSingleData?.current_order_status}
                    />
                  }
                />
                <NavigationCard
                  ScreenName={'Estimate material check'}
                  screenName={() =>
                    true == true ?
                  TempdisplayErr() 
                  :
                    navigation.navigate(NavigationString.ESTIMATE_MATERIAL)
                  }
                />
                <NavigationCard
                  ScreenName={'Quotations'}
                  screenName={() =>
                  true == true ?
                  TempdisplayErr() 
                  :
                    navigation.navigate(NavigationString.QUATATION_LIST)
                  }
                />
                <NavigationCard
                  ScreenName={'Assign Jobs'}
                  screenName={() =>
                    true == true ?
                  TempdisplayErr() 
                  :
                    navigation.navigate(NavigationString.ASSIGN_JOBS)
                  }
                />
                <NavigationCard
                  ScreenName={'Service Report'}
                  screenName={() =>
                    Action == true
                      ? navigation.navigate(NavigationString.SERVICE_REPORT)
                      : displayErr()
                  }
                />
                <NavigationCard
                  ScreenName={'Check in markings'}
                  screenName={() =>
                    Action == true
                      ? navigation.navigate(NavigationString.CHECK_IN)
                      : displayErr()
                  }
                />
                <NavigationCard
                  ScreenName={'Materials'}
                  screenName={() =>
                    Action == true
                      ? navigation.navigate(NavigationString.MATERIALS_SCREEN)
                      : displayErr()
                  }
                />
                {/* <NavigationCard
                  ScreenName={'Installer images'}
                  screenName={() =>
                    Action == true
                      ? navigation.navigate(NavigationString.INSTALLER_IMAGES)
                      : displayErr()
                  }
                />
                <NavigationCard
                  ScreenName={'Installer remarks'}
                  screenName={() =>
                    Action == true
                      ? navigation.navigate(NavigationString.INSTALLER_REMARKS)
                      : displayErr()
                  }
                /> */}
                <NavigationCard
                  ScreenName={'Customer images'}
                  screenName={() =>
                    Action == true
                      ? navigation.navigate(NavigationString.CUSTOMER_IMAGES)
                      : displayErr()
                  }
                />
                <NavigationCard
                  ScreenName={'Check out markings'}
                  screenName={() =>
                    Action == true
                      ? navigation.navigate(NavigationString.CHECK_OUT)
                      : displayErr()
                  }
                />
              </View>
            </View>
          </>
        )}
      </Animated.ScrollView>
      {/* <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} /> */}
      <Animated.View
        style={[styles.header, { zIndex: indexOfHeader }, { transform: [{ translateY: headerTranslateY }] }]}>
        <Animated.Image
          style={[
            styles.headerBackground,
            {
              opacity: imageOpacity,
              transform: [{ translateY: imageTranslateY }],
            },
          ]}
          source={
            jobSingleData.order_type == 0
              ? Images.HeaderBack
              : Images.AccidentBack
          }
        />
      </Animated.View>
      <Animated.View style={[styles.topBar, { zIndex: indexOfHeader },]}>
        <Animated.View style={styles.HeaderWrapper}>
          <View style={styles.inLine}>
            <View style={styles.backAndHeading}>
              <Pressable
                style={[styles.backArrowStyle]}
                onPress={() => navigation.goBack()}>
                <IoIcon name="chevron-back" size={25} color="#FFFFFF" />
              </Pressable>
              <View style={[styles.HeadingID]}>
                {jobSingleData?.order_type == 0 ? (
                  <Animated.Text
                    style={[
                      styles.nameStyleAbsoulte,
                      { transform: [{ translateX: titleTranslateX }] },
                      { opacity: reverseop },
                    ]}>
                    General servicing & repairs
                  </Animated.Text>
                ) : jobSingleData?.order_type == 1 ? (
                  <Animated.Text
                    style={[
                      styles.nameStyleAbsoulte,
                      { transform: [{ translateX: titleTranslateX }] },
                      { opacity: reverseop },
                    ]}>
                    Accidental claims
                  </Animated.Text>
                ) : null}

                <Animated.Text
                  style={[
                    styles.HeadingText,
                    {
                      transform: [
                        { translateX: orderTranslateX },
                        { scale: titleScale },
                      ],
                    },
                  ]}>
                  #{orderId}
                </Animated.Text>
              </View>
            </View>
          </View>
          <Animated.View
            // style={styles.DownStyling}
            style={[styles.DownStyling, { zIndex: indexOfDownContent }, {
              transform: [
                { scale: titleScale },
                { translateY: cardTranslateY },
              ],
            },]}>
            <View style={styles.NameAndNumber}>
              {jobSingleData?.order_type == 0 ? (
                <View style={[styles.IconBack]}>
                  <Animated.Text
                    style={[
                      styles.nameStyle,
                      { opacity: fastop },
                      {
                        transform: [
                          { scale: titleScale },
                          { translateY: fastTitleTranslateY },
                        ],
                      },
                    ]}>
                    General servicing & repairs
                  </Animated.Text>
                </View>
              ) : jobSingleData?.order_type == 1 ? (
                <Animated.Text
                  style={[
                    styles.nameStyle,
                    { opacity: fastop },
                    {
                      transform: [
                        { scale: titleScale },
                        { translateY: fastTitleTranslateY },
                      ],
                    },
                  ]}>
                  Accidental claims
                </Animated.Text>
              ) : null}
              <Animated.Text
                style={[
                  styles.subNameStyle,
                  { opacity: op },
                  {
                    transform: [
                      { scale: titleScale },
                      { translateY: titleTranslateY },
                    ],
                  },
                ]}>
                {jobSingleData?.vehicle_number}
              </Animated.Text>
            </View>
            <View style={styles.idWithIcon}>
              <Animated.Text
                style={[
                  styles.DownID,
                  { opacity: op },
                  {
                    transform: [
                      { scale: titleScale },
                      { translateY: titleTranslateY },
                    ],
                  },
                ]}>
                {jobSingleData?.vehicle_category}
              </Animated.Text>
              <View style={styles.IconStyle}>
                {jobSingleData?.current_order_status < 10 ? (
                  <Animated.Text
                    style={[
                      styles.StatusTextUnCompleted,
                      { opacity: op },
                      {
                        transform: [
                          { scale: titleScale },
                          { translateY: titleTranslateY },
                        ],
                      },
                    ]}>
                    Incomplete
                  </Animated.Text>
                ) : (
                  <>
                    <Animated.View
                      style={[
                        styles.StatusText,
                        { opacity: op },
                        {
                          transform: [
                            { scale: titleScale },
                            { translateY: titleTranslateY },
                          ],
                        },
                      ]}>
                      <GreenTickTocn
                        width={windowWidth / 30}
                        height={windowHeight / 30}
                      />
                    </Animated.View>
                    <Animated.Text
                      style={[
                        styles.StatusText,
                        { opacity: op },
                        {
                          transform: [
                            { scale: titleScale },
                            { translateY: titleTranslateY },
                          ],
                        },
                      ]}>
                      Completed
                    </Animated.Text>
                  </>
                )}
              </View>
            </View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default AdminJobDetail;

const styles = StyleSheet.create({
  JobDetailContentWrapper: {
    // backgroundColor: 'yellow',
    // zIndex: -50, 
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
  CollapsibleStyle: {},
  CollapsibleWrapper: {},
  //HeaderStyle Start
  topBar: {
    marginTop: 0,
    height: 50,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -10,
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
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -10,
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
    flexDirection: 'row',
    // backgroundColor: "pink",
    // justifyContent: 'center',
    alignItems: 'center',
  },
  HeaderContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
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
    width: '10%',
    // backgroundColor: 'purple',
    // height: '150%',
    // justifyContent: 'center',
    // alignItems: 'center',
    // zIndex: 20,
  },
  HeadingID: {
    // backgroundColor: 'red',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    right: '60%',
    // position: 'absolute',
    // width: '100%',
    alignSelf: 'center',
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
    height: "auto",
    // bottom: HEADER_MAX_HEIGHT / -6,
    // justifyContent: 'flex-end',
    // position: 'absolute',
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

  //HeaderStyle END
  // JobDetail Styling
  JobDetail: {
    flexDirection: 'row',
    width: '100%',
    // paddingHorizontal: '5%',
    justifyContent: 'space-between',
    paddingVertical: '2%',
    // zIndex: 5,
    // backgroundColor: "yellow",
  },
  cardWrapper: {
    paddingHorizontal: 10,
  },
  JobCenter: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
    // backgroundColor: "red",
  },
  BottomLine: {
    borderBottomColor: '#155B9F99',
    borderBottomWidth: 0.5,
    alignSelf: 'center',
    width: '85%',
  },
  JobDate: {
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    // backgroundColor: "green",
    width: '40%',
  },
  JobDateCenter: {
    justifyContent: 'space-around',
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // backgroundColor: "purple",
  },
  JobOtherDetailCenter: {
    justifyContent: 'space-around',
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // backgroundColor: "purple",
  },
  TileView: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '80%',
    paddingVertical: 10,
    zIndex: -15,
  },
  TileText: {
    fontSize: 14,
    fontFamily: fonts.PoppinsMedium,
    lineHeight: 16,
    color: '#155B9F',
    paddingRight: 10,
    // width: '70%',
    // backgroundColor: 'red',
  },
  IconArea: {
    // backgroundColor: 'yellow',
    width: '20%',
    paddingLeft: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // bottom: 5,
  },
  upperTextCenter: {
    paddingVertical: 10,
  },
  StartDate: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  upperText: {
    width: '95%',
    paddingVertical: 5,
    paddingHorizontal: 5,
    // backgroundColor: "pink",
    justifyContent: 'center',
    alignItems: 'center',
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
    alignItems: 'center',
    alignSelf: 'center',
  },
  JobOtherDetail: {
    justifyContent: 'space-between',
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
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    margin: 0,
    bottom: '-5%',
  },
  JobButton: {
    backgroundColor: '#155B9F',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: '35%',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  JobButtonText: {
    color: '#fff',
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

  RowTimeLineWrapper: {
    // border: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingVertical: 10,
  },

  RowStepAndTitleWrap: {
    flexDirection: 'row',
  },

  RowTimeLine: {
    width: '20 %',
    /* margin:2 , */
    /* backgroundColor: red, */
  },

  RowTimeLineSteps: {
    width: '80%',
    /* backgroundColor: red, */
    flexDirection: 'row',
    paddingBottom: 15,
    marginVertical: 2,
  },

  RowTimeLineCircle: {
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

  RowTimeLineCircleIncomplete: {
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

  RowTimeLineCircleCompleted: {
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

  RowTimeLineCircleOngoing: {
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

  RowNameAndTIme: {
    width: '65%',
  },

  TimeLineItemTitle: {
    color: '#000',
    fontSize: 15,
    fontWeight: '600',
  },

  DateAndTime: {
    color: '#777',
    fontSize: 15,
  },

  RowDownLine: {
    backgroundColor: '#B3B3B3',
    // backgroundColor: #000,
    height: 3,
    transform: [{ rotate: '90deg' }],
    /* position: absolute, */
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    /* bottom: 30%, */
    width: '121%',
    zIndex: -3,
    // content: '',
  },

  FirstRowDownLine: {
    backgroundColor: '#B3B3B3',
    backgroundColor: '#000',
    height: 3,
    transform: [{ rotate: '90deg' }],
    /* position: absolute, */
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    /* bottom: 30%, */
    width: '80%',
    zIndex: -3,
    // content: '',
  },

  RowBottomLine: {
    backgroundColor: '#ddd',
    height: '2%',
    position: 'absolute',
    width: '100%',
    // content: '',
  },
  ShadowStyle: {
    // alignItems: "center",
    width: '90%',
    alignSelf: 'center',
    height: windowHeight,
    marginTop: "5%",
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

  RowStepTick: {},
});
