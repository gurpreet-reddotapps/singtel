import Geolocation from 'react-native-geolocation-service';
export const GetLocationApi = () =>  new Promise(async (resolve, reject) =>{

  
 Geolocation.getCurrentPosition(
    //Will give you the current location
    (position) => {
        
       return resolve(position)
    },
    (error) => {
        console.log("lat Long find error:- ", error.message)
      return  reject(error)
    },
    {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 1000
    },
);
}  )