import {StyleSheet} from 'react-native';
import {appStyle} from '../../utility/styleHelper/appStyle';
import {color} from '../../utility/colors/index';
import {smallDeviceHeight} from '../../utility/constants';
import {deviceHeight} from '../../utility/styleHelper/appStyle'

const getDimensions = () => {
  if (deviceHeight > smallDeviceHeight) {
    return {
      height: 150,
      width: 150,
      borderRadius: 50,
      logoFontSize: 90,
    };
  } else {
    return {
      height: 120,
      width: 120,
      borderRadius: 40,
      logoFontSize: 70,
    };
  }
};

export default StyleSheet.create({
  logo: {
    height: getDimensions().height,
    width: getDimensions().width,
    borderRadius: getDimensions().borderRadius,
    // backgroundColor: color.DARK_GRAY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: getDimensions().logoFontSize,
    fontWeight: 'bold',
    // color: WHITE,
  },
});
