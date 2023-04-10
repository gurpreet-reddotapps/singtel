import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import VMOCustomHeader from '../../Components/VMOCustomHeader'
import CustomSearch from '../../Components/CustomSeach'
import { Colors } from '../../Constant/Colors'
import AdminHomeTabs from './AdminHomeTabs'
import FloatingButton from '../../Components/FloatingButton'
import SwipeHomeTabs from './SwipeHomeTabs'

const AdminHome = () => {
  return (
    <SafeAreaView style={styles.JobsWrapper}>
      <VMOCustomHeader title={"VMO"} menuIcon />
      <View style={styles.jobContentWrapper} >
        <View style={{ flex: 1 }} >
          {/* <AdminHomeTabs /> */}
          <SwipeHomeTabs />
        </View>
      </View>
      <FloatingButton
        style={{ position: 'absolute' }}
      />
    </SafeAreaView>
  )
}

export default AdminHome

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