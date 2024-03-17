/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef} from 'react';
import {kSTACKS} from '../../../constants/Navigation';
import {HAPPY_SPACEMAN_ANIM} from '../../../utilities/Assets';
import useComponentDidMount from '../../../hooks/useComponentDidMount';
import useComponentWillUnmount from '../../../hooks/useComponentWillUnmount';
import usePageView from '../../../hooks/usePageView';
import usePageLeave from '../../../hooks/usePageLeave';
import AppLottieView from '../../common/AppLottieView';
import {styles} from './styles';
import * as NavService from '../../../service/NavService';

const SplashPageView = props => {
  useComponentDidMount(componentDidMount);
  useComponentWillUnmount(componentWillUnmount);
  usePageView(props, onPageView);
  usePageLeave(props, onPageLeave);

  const initialLaunchTimer = useRef<any>(null);

  function componentDidMount() {
    initialLaunchTimer.current = setTimeout(() => {
      NavService.navigateReplace(kSTACKS.MAIN_STACK);
    }, 3000);
  }

  function componentWillUnmount() {
    clearTimeout(initialLaunchTimer?.current);
  }

  function onPageView() {}

  function onPageLeave() {}
  return (
    <AppLottieView
      source={HAPPY_SPACEMAN_ANIM}
      autoPlay
      loop
      style={styles.lottieView}
    />
  );
};
export default SplashPageView;
