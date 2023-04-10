import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import VMOCustomHeader from '../../Components/VMOCustomHeader'
import CustomSearch from '../../Components/CustomSeach'
import { Colors } from '../../Constant/Colors'
import JobsTab from './JobsTab'
import WorkerJobstab from './WorkerJobstab'

const Jobs = () => {
  return (
    <SafeAreaView style={styles.JobsWrapper}>
      <VMOCustomHeader title={"Jobs"} />
      <View style={styles.jobContentWrapper} >
        {/* <CustomSearch /> */}
        <View style={{ flex: 1 }} >
          {/* <JobsTab /> */}
          <WorkerJobstab />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Jobs

const styles = StyleSheet.create({
  JobsWrapper: {
    flex: 1,
    backgroundColor: Colors.Pure_White,
  },
  jobContentWrapper: {
    flex: 1,
    paddingHorizontal: '3%',
  },
})