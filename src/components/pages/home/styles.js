import {StyleSheet} from 'react-native';
import {FONTS} from '../../../constants/Fonts';
import {fpx, vpx} from '../../../libraries/responsive-pixels';

export const styles = StyleSheet.create({
  booklistView: {
    paddingBottom: vpx(32),
  },
  booklistTitleText: {
    fontFamily: FONTS.Bold,
    fontSize: fpx(14),
  },
  itemSeparatorView: {
    height: vpx(8),
  },
  lottieView: {flex: 1},
  imgLoader: {
    justifyContent: 'center',
    flex: 1,
  },
});
