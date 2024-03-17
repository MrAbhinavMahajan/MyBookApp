import {StyleSheet} from 'react-native';
import {SCREEN_WIDTH} from '../../../../utilities/AppUtils';
import {FONTS} from '../../../../constants/Fonts';
import {fpx, hpx, vpx} from '../../../../libraries/responsive-pixels';
import {COLORS} from '../../../../utilities/Colors';

export const styles = StyleSheet.create({
  bookCardView: {
    width: SCREEN_WIDTH,
  },
  bookCardViewImgWrapper: {
    height: vpx(100),
    aspectRatio: 1,
    marginHorizontal: hpx(20),
    marginTop: vpx(20),
    borderRadius: vpx(12),
    overflow: 'hidden',
    backgroundColor: COLORS.fullBlack,
  },
  bookCardViewImg: {
    height: '100%',
    width: '100%',
  },
  bookCardViewTitleText: {
    fontFamily: FONTS.Medium,
    fontSize: fpx(14),
    color: COLORS.fullWhite,
    minWidth: hpx(80),
    marginRight: hpx(16),
  },
  bookCardViewValueText: {
    fontFamily: FONTS.Medium,
    fontSize: fpx(14),
    color: COLORS.fullWhite,
    flex: 1,
    textAlign: 'right',
  },
  bookCardInfoView: {
    margin: hpx(20),
    padding: vpx(16),
    borderWidth: 1,
    borderRadius: vpx(12),
    backgroundColor: COLORS.fullBlack,
  },
  bookCardInfoDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.fullWhite,
    marginVertical: vpx(12),
  },
  bookCardInfoSubView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: vpx(8),
  },
  imgLoader: {
    justifyContent: 'center',
    flex: 1,
  },
  mainCTA: {
    marginHorizontal: hpx(20),
    marginBottom: vpx(20),
    alignItems: 'center',
    backgroundColor: COLORS.basic100,
    borderRadius: vpx(8),
    paddingVertical: vpx(12),
  },
  mainCTAText: {
    fontFamily: FONTS.Medium,
    fontSize: fpx(14),
    color: COLORS.danger500,
  },
});
