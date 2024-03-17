import {StyleSheet} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from './AppUtils';
import {COLORS} from './Colors';
export const STYLES = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },
  fullHeightWidth: {
    height: '100%',
    width: '100%',
  },
  fullScreenHeight: {
    height: SCREEN_HEIGHT,
  },
  fullScreenWidth: {
    width: SCREEN_WIDTH,
  },
  fullScreenHeightScreenWidth: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  flex01: {
    flex: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexItemsFullyCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexAlignSelfCenter: {
    alignSelf: 'center',
  },
  flexCoAxialItemsCenter: {
    alignItems: 'center',
  },
  flexCoAxialItemsEnd: {
    alignItems: 'flex-end',
  },
  flexMainAxisItemsCenter: {
    justifyContent: 'center',
  },
  flexMainAxisItemsSpaceBetween: {
    justifyContent: 'space-between',
  },
  textAlignHorizontallyCenter: {
    textAlign: 'center',
  },
  textAlignVerticallyCenter: {
    textAlignVertical: 'center',
  },
  textFullyCentered: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  circularBorders: {
    borderRadius: 1000,
  },
  fullWhiteBgColor: {
    backgroundColor: COLORS.fullWhite,
  },
  fullBlackBgColor: {
    backgroundColor: COLORS.fullBlack,
  },
  fullSmokeWhiteBgColor: {
    backgroundColor: COLORS.whiteSmoke,
  },
  screenContainerView: {
    flex: 1,
    backgroundColor: COLORS.fullWhite,
  },
  comingSoonScreenContainerView: {
    flex: 1,
    backgroundColor: COLORS.fullBlack,
  },
});
