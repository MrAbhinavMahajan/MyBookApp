import React, {memo, useEffect, useState} from 'react';
import AppText from '../../../common/AppText';
import {styles} from './styles';
import {ActivityIndicator, Image, TouchableOpacity, View} from 'react-native';
import {FONTS} from '../../../../constants/Fonts';
import {STYLES} from '../../../../utilities/Styles';
import {fpx} from '../../../../libraries/responsive-pixels';
import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

export const BookDetailsCard = memo(
  ({item, index, favlistData = [], refreshFavs = () => {}}) => {
    const {title, authors, first_publish_year} = item || {};
    const bookId = item?.availability?.isbn;
    const authorsName = authors.map(el => el.name).join(', ');
    const [loading, setLoading] = useState(false);
    const [detailedData, setDetailedData] = useState(); // Book details data fetched
    const itmStorageKey = item?.key; // Storage key for favorite list item
    const isFav = favlistData.filter(el => el?.id === itmStorageKey).length > 0;
    const abortController = new AbortController(); // API abort controller
    const actionCTAScaleAnim = useSharedValue(1); // Value to be animated for scale effect

    const startLoading = () => setLoading(true);

    const stopLoading = () => setLoading(false);

    const onPressIn = () => {
      actionCTAScaleAnim.value = withSpring(
        actionCTAScaleAnim.value === 1 ? 0.9 : 1,
      );
    };

    const onPressOut = () => {
      actionCTAScaleAnim.value = withSpring(1);
    };

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{scale: actionCTAScaleAnim.value}],
      };
    });

    const saveFavList = list => {
      const stringifiedList = JSON.stringify(list);
      AsyncStorage.setItem('FAV_LIST', stringifiedList).then(() => {
        refreshFavs();
      });
    };

    const addToFavorites = () => {
      AsyncStorage.getItem('FAV_LIST')
        .then(favlist => {
          const list = !_.isEmpty(favlist) ? JSON.parse(favlist) : [];

          list.push({
            id: itmStorageKey,
            isFav: 'true',
          });

          saveFavList(list);
        })
        .catch(console.log);
    };

    const removeFromFavorites = () => {
      AsyncStorage.getItem('FAV_LIST')
        .then(favlist => {
          const list = !_.isEmpty(favlist) ? JSON.parse(favlist) : [];
          const modifiedList = list.filter(el => el.id !== itmStorageKey);

          saveFavList(modifiedList);
        })
        .catch(console.log);
    };

    const makeAPICall = async () => {
      // Fetch Book Details
      startLoading();
      try {
        const apiURL = `https://openlibrary.org/api/books?bibkeys=ISBN:${bookId}&jscmd=viewapi&format=json`;
        const apiRes = await fetch(apiURL, {
          signal: abortController.signal,
        });
        const apiResJson = await apiRes.json();
        const pageInfo = Object.values(apiResJson)[0];
        setDetailedData(pageInfo);
        stopLoading();
      } catch (error) {
        stopLoading();
      }
    };

    useEffect(() => {
      makeAPICall();

      return () => {
        abortController.abort();
      };
    }, []);

    const render = () => {
      const {
        preview_url = '',
        thumbnail_url = '',
        details,
      } = detailedData || {};
      const {description, notes} = details || {};

      return (
        <View style={styles.bookCardView} key={`${itmStorageKey}_${index}`}>
          <View style={styles.bookCardViewImgWrapper}>
            {loading ? (
              <View style={styles.imgLoader}>
                <ActivityIndicator />
              </View>
            ) : (
              <Image
                source={{uri: thumbnail_url ?? preview_url}}
                style={styles.bookCardViewImg}
              />
            )}
          </View>
          <View style={styles.bookCardInfoView}>
            <AppText
              style={[
                styles.bookCardViewTitleText,
                STYLES.textAlignHorizontallyCenter,
                {fontFamily: FONTS.Bold, fontSize: fpx(16)},
              ]}>
              {title}
            </AppText>
            <View style={styles.bookCardInfoDivider} />

            <View style={styles.bookCardInfoSubView}>
              <AppText style={styles.bookCardViewTitleText}>Authors</AppText>
              <AppText numberOfLines={1} style={styles.bookCardViewValueText}>
                {authorsName}
              </AppText>
            </View>

            <View style={styles.bookCardInfoSubView}>
              <AppText style={styles.bookCardViewTitleText}>Published</AppText>
              <AppText style={styles.bookCardViewValueText}>
                {first_publish_year}
              </AppText>
            </View>
          </View>

          {!_.isEmpty(description) && (
            <AppText style={styles.bookCardViewTitleText}>
              {description}
            </AppText>
          )}
          {!_.isEmpty(notes) && (
            <AppText style={styles.bookCardViewTitleText}>{notes}</AppText>
          )}
          <Animated.View style={[styles.mainCTA, animatedStyle]}>
            <TouchableOpacity
              style={{flex: 1}}
              onPressIn={onPressIn}
              onPressOut={onPressOut}
              onPress={isFav ? removeFromFavorites : addToFavorites}>
              <AppText style={styles.mainCTAText}>
                {isFav ? 'Remove from Favorite' : 'Add To Favorite'}
              </AppText>
            </TouchableOpacity>
          </Animated.View>
        </View>
      );
    };

    return render();
  },
);
