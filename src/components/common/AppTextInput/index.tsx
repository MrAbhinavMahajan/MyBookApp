import React, {memo, forwardRef} from 'react';
import {TextInput, View} from 'react-native';
import {styles} from './styles';
import _ from 'lodash';

interface AppTextInputProps {
  LeftComponent: any;
  RightComponent: any;
  containerStyle: any;
  style: any;
  value?: any;
}

const AppTextInput = forwardRef(function (props: AppTextInputProps, ref: any) {
  const {
    LeftComponent,
    RightComponent,
    containerStyle,
    style,
    value = '',
    placeholderTextColor,
    ...remainingProps
  } = props;

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      {!_.isEmpty(LeftComponent) && LeftComponent}
      <TextInput
        value={`${value}`}
        allowFontScaling={false}
        autoCapitalize="none"
        style={[styles.textInputStyle, style]}
        placeholderTextColor={placeholderTextColor || '#000'}
        {...remainingProps}
      />
      {!_.isEmpty(RightComponent) && RightComponent}
    </View>
  );
});

export default memo(AppTextInput);
