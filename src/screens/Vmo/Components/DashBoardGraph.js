import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { LineChart, } from 'react-native-chart-kit'
import { windowHeight, windowWidth } from '../utils/Dimension'
import { VictoryChart, VictoryBar, VictoryTheme, VictoryLine, VictoryAxis } from "victory-native";

const DashBoardGraph = (props) => {
    const [dataVal, setdataVal] = useState(props?.DashData?.graph_data?.data)

    console.log(props?.DashData?.graph_data, "  New Data")
    console.log(props?.DashData?.graph_data?.new_data, "  New Data")

    const data = props?.DashData?.graph_data?.new_data;

    return (
        <View style={styles.GraphWrapper} >
            <VictoryChart theme={VictoryTheme.material} width={windowWidth / 1.1} height={windowHeight / 2.8}>
                <VictoryLine animate data={data}   />
            </VictoryChart>
        </View>
    )
}

export default DashBoardGraph


const styles = StyleSheet.create({
    GraphWrapper: {
        backgroundColor: '#fff',
        // backgroundColor: 'red',
        marginLeft: '5%',
        borderRadius: 5,
        justifyContent: 'center',
    }   


})
