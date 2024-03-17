import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import AppText from '../AppText';

const AppFallback = ({error, stackTrace}) => {
  return (
    <View style={styles.containerView}>
      <AppText>Oops, Something Went Wrong</AppText>
    </View>
  );
};

export default AppFallback;
