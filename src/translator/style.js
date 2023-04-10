import {StyleSheet,Dimensions} from 'react-native';
import i18n from './strings';

const { width, height } = Dimensions.get('window');
// for use styles for diffrent languages 
export default class StyleSheetFactory{
    static getSheet(isRTL){
       i18n.setLanguage(isRTL);
        return StyleSheet.create({
            container: {
                flex: 1,
                justifyContent: 'center',
                alignItems: isRTL ? 'flex-end': 'flex-start',
               
            }
        })
    }
}