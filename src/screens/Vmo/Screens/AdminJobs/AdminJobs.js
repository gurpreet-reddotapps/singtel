import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import VMOCustomHeader from '../../Components/VMOCustomHeader'
import CustomSearch from '../../Components/CustomSeach'
import { Colors } from '../../Constant/Colors'
import AdminJobsTab from './AdminJobsTab'
import SwipeJobTabs from './SwipeJobTabs'

const AdminJobs = () => {
  return (
    <SafeAreaView style={styles.JobsWrapper}>
      <VMOCustomHeader title={"Jobs"} menuIcon />
      <View style={styles.jobContentWrapper} >
        {/* <CustomSearch /> */}
        <View style={{ flex: 1 }} >
          {/* <AdminJobsTab /> */}
          <SwipeJobTabs />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default AdminJobs

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