import { applyMiddleware, createStore,compose, combineReducers } from 'redux';
import {persistReducer,persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import {name as appName} from '../../app.json';
import reducers from './reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
const persistConfig = {
    key:`${appName}-storage`,
    storage:AsyncStorage,
    whitelist:["userDetails","homeDetails","JobDetails","MateralDetail","CheckInDetail","CheckOutDetail",
    "quotationDetail","InsuranceDetail","ServiceDetail","NewAccidentalDetail","NewReportingDetail",
    "notificationDetail","appSwitch"]
}

const persist = persistReducer(persistConfig,reducers)
const crateStoreWithMIddleware = applyMiddleware(thunk)(createStore);

export const Store = crateStoreWithMIddleware(persist);
export const persistor = persistStore(Store)

