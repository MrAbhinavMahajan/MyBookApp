import React from 'react';
import {Text} from 'react-native';
import {FONTS} from '../../../constants/Fonts';

const AppText = props => {
  const {children, style, ...textProps} = props;
  return (
    <Text
      allowFontScaling={false}
      style={[FONTS.NunitoSans, style]}
      {...textProps}>
      {children}
    </Text>
  );
};

export default AppText;
