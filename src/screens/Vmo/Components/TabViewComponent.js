import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import { windowWidth } from '../utils/Dimension';


const TabViewComponent = ({ TabRoutes, IntialIndex, Screens,renderTabBar }) => {
    const [index, setIndex] = React.useState(IntialIndex);
    const [routes] = React.useState(TabRoutes ? TabRoutes : [{ key: 'first', title: 'First' }]);

    const renderScene = SceneMap(Screens);

    return (
        <TabView
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={windowWidth}
            lazy
            style={{ flex: 1 }}
        />
    );
}
TabViewComponent.defaultProps = {
    TabRoutes: [],
    IntialIndex: 0,
    Screens: [],
    renderTabBar:[]
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
    },
    scene: {
        flex: 1,
    },
});

export default TabViewComponent;