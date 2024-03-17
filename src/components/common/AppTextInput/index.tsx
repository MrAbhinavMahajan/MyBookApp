import React, {memo} from 'react';
import {TextInput, View} from 'react-native';
import {styles} from './styles';

interface AppTextInputProps {
  LeftComponent: any;
  RightComponent: any;
  containerStyle: any;
  style: any;
  refCallback: any;
  value?: any;
}

const AppTextInput = function (props: AppTextInputProps) {
  const {
    LeftComponent,
    RightComponent,
    containerStyle,
    style,
    refCallback,
    value = '',
    ...remainingProps
  } = props;

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      {LeftComponent}
      <TextInput
        value={`${value}`}
        allowFontScaling={false}
        autoCapitalize="none"
        style={[styles.textInputStyle, style]}
        placeholderTextColor={'rgba(0, 0, 8, 0.3)'}
        ref={refCallback}
        {...remainingProps}
      />
      {RightComponent}
    </View>
  );
};

AppTextInput.defaultProps = {
  LeftComponent: <></>,
  RightComponent: <></>,
  refCallback: null,
};

export default memo(AppTextInput);
