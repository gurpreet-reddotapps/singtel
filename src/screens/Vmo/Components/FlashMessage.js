import { View, Text } from 'react-native'
import React from 'react'
import { showMessage } from 'react-native-flash-message';


export function ShowTopErrorMessage(data){
    console.log("DKSJDKLSD",data)
    showMessage({
        type: 'danger',
        icon: 'danger',
        position : 'top',
        message:data,
    })
}


export function ShowTopSuccessMessage(data){
    showMessage({
        type: 'success',
        icon: 'success',
        position : 'top',
        message :data
    })
}