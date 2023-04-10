import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import { width } from '../assects/strings';

const TabViewComponent = ({ TabRoutes, IntialIndex, Screens,renderTabBar }) => {
    console.log("DSDDSDSD",IntialIndex)
    const [index, setIndex] = React.useState(IntialIndex);
    const [routes] = React.useState(TabRoutes ? TabRoutes : [{ key: 'first', title: 'First' }]);

    const renderScene = SceneMap(Screens);

    return (
        <TabView
           lazyPreloadDistance={1}
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={width}
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