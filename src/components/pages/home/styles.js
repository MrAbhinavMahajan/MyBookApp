import {StyleSheet} from 'react-native';
import {FONTS} from '../../../constants/Fonts';
import {fpx, hpx, vpx} from '../../../libraries/responsive-pixels';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../utilities/AppUtils';
import {COLORS} from '../../../utilities/Colors';

export const styles = StyleSheet.create({
  listView: {
    paddingBottom: vpx(32),
  },
  booklistTitleText: {
    fontFamily: FONTS.Bold,
    fontSize: fpx(14),
  },
  bookItemSeparatorView: {
    height: vpx(8),
    width: SCREEN_WIDTH,
    backgroundColor: COLORS.basic100,
  },
  searchedItemSeparatorView: {
    height: StyleSheet.hairlineWidth,
    width: SCREEN_WIDTH - hpx(2 * 20),
    backgroundColor: COLORS.basic100,
    marginVertical: vpx(12),
    alignSelf: 'center',
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
  textInputView: {
    borderWidth: 1,
    backgroundColor: COLORS.fullWhite,
    marginHorizontal: hpx(20),
    borderRadius: vpx(6),
    color: COLORS.fullBlack,
    minHeight: vpx(50),
    marginBottom: vpx(16),
  },
  textInputStyle: {
    flex: 1,
    paddingHorizontal: hpx(20),
    paddingVertical: vpx(16),
    fontSize: fpx(16),
  },
  searchedTextResult: {
    fontFamily: FONTS.Medium,
    fontSize: fpx(14),
    color: COLORS.fullWhite,
    marginHorizontal: hpx(20),
  },
});
