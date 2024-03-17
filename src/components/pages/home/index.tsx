/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {STYLES} from '../../../utilities/Styles';
import useComponentDidMount from '../../../hooks/useComponentDidMount';
import useComponentWillUnmount from '../../../hooks/useComponentWillUnmount';
import usePageView from '../../../hooks/usePageView';
import usePageLeave from '../../../hooks/usePageLeave';
import {View} from 'react-native';
import AppText from '../../common/AppText';

const HomePageView = props => {
  useComponentDidMount(componentDidMount);
  useComponentWillUnmount(componentWillUnmount);
  usePageView(props, onPageView);
  usePageLeave(props, onPageLeave);

  function componentDidMount() {}

  function componentWillUnmount() {}

  function onPageView() {}

  function onPageLeave() {}
  return (
    <View style={STYLES.screenContainerView}>
      <AppText>Home screen</AppText>
    </View>
  );
};
export default HomePageView;
