import {StyleSheet} from 'react-native';
import {FONTS} from '../../../constants/Fonts';
import {fpx, vpx} from '../../../libraries/responsive-pixels';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../utilities/AppUtils';

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
  lottieView: {
    flex: 1,
  },
  contentLoader: {
    position: 'absolute',
    zIndex: 1,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
  },
});
