import moment from 'moment';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { colors } from '../../../assects/colors';
import fonts from '../../../assects/fonts';
import { height, width } from '../../../assects/strings';
import MapPin from '../../../assects/Icons/map_pin.svg'
import Geocoder from 'react-native-geocoding';
import { saveLocationName, saveUserCurrentRegion, saveUserLatLng } from '../../../redux/actions/userLocation';

function MapComponent({ navigation, visible, latLng, currentRegion, locationName }) {
  const dispatch = useDispatch();
  const time = moment().subtract(1, 'days').format('hh:mm A')
  const mapRef = useRef(null);
  useEffect(() => {
    mapRef?.current?.animateToRegion(currentRegion, 3 * 1000);
  }, [])
  const userLocationChange = (coords) => {
    let currentRegion = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      // latitudeDelta: 0.001,
      // longitudeDelta: 0.001,
    };
    dispatch(saveUserCurrentRegion(currentRegion))
    dispatch(saveUserLatLng({ latitude: coords.latitude, longitude: coords.longitude }))
    // Geocoder.from(coords.latitude, coords.longitude).then(json => {
    //   var addressComponent = json.results[1].formatted_address;
    //   dispatch(saveLocationName(addressComponent))
    //   console.log("Ios Location name", addressComponent)
    // })
  }
  if(latLng)
  return (
    <MapView
      ref={mapRef}
      customMapStyle={customStyle}
      region={{
        latitude: parseFloat(latLng?.latitude),
        longitude: parseFloat(latLng?.longitude),
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
      }}
      onUserLocationChange={(coordinate) => userLocationChange(coordinate?.nativeEvent?.coordinate)}
      showsUserLocation
      style={{ flex: .3 }}
    >
      {/* <Marker
        title={locationName}
        focusable
        collapsable={false}
        coordinate={{
          latitude: parseFloat(latLng.latitude),
          longitude: parseFloat(latLng.longitude),
          latitudeDelta: 0.1,
        }} >
        <View style={{ width: width / 2, height: width / 2, justifyContent: "flex-end", alignItems: "center", overflow: "visible" }} >
          <Text style={{ color: 'black', width: width / 2, marginVertical: 5, textAlign: "center", backgroundColor: colors.white, padding: 5, borderRadius: 5, fontFamily: fonts.PoppinsLight, fontSize: 11 }} >{locationName}</Text>

          <MapPin width={width / 15} height={width / 15} />
        </View>

      </Marker> */}
    </MapView>
  )
  else
  return(
    <View   style={{ flex: .3 ,backgroundColor:'red'}} >   

    </View>
  )
}
MapComponent.defaultProps = {
  latLng: { latitude: "21.8335", longitude: "75.6150" }
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  imageView: { width: width / 2, height: width / 2 },
  modalContainer: { flex: 1, alignItems: "center", justifyContent: "flex-end", paddingBottom: 20, backgroundColor: '#00000099' },
  dataContainer: { width: width / 1.10, height: width / 4, marginBottom: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", backgroundColor: colors.white, borderRadius: 10 },
  text: { fontFamily: fonts.PoppinsRegular, color: colors.black }
})

const customStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#242f3e',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#ffb606',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#242f3e',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#ffb606',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#263c3f',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#00ff00',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#38414e',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#212a37',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9ca5b3',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#746855',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#1f2835',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#f3d19c',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [
      {
        color: '#2f3948',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#17263c',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#515c6d',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#17263c',
      },
    ],
  },
];


export default MapComponent;
