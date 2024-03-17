import React, {useEffect, useState} from 'react';
import AppText from '../../../common/AppText';
import {styles} from './styles';
import {ActivityIndicator, Image, TouchableOpacity, View} from 'react-native';
import {FONTS} from '../../../../constants/Fonts';
import {STYLES} from '../../../../utilities/Styles';
import {fpx} from '../../../../libraries/responsive-pixels';
import _ from 'lodash';

export const BookDetailsCard = ({item, index}) => {
  const {title, authors, first_publish_year} = item || {};
  const bookId = item?.availability?.isbn;
  const authorsName = authors.map(el => el.name).join(', ');
  const [loading, setLoading] = useState(false);
  const [detailedData, setDetailedData] = useState();
  const isFav = false;

  const startLoading = () => setLoading(true);

  const stopLoading = () => setLoading(false);

  const saveToFavorites = () => {};

  const removeFromFavorites = () => {};

  const makeAPICall = async () => {
    // Fetch Book Details
    startLoading();
    try {
      const apiURL = `https://openlibrary.org/api/books?bibkeys=ISBN:${bookId}&jscmd=viewapi&format=json`;
      const apiRes = await fetch(apiURL);
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
  }, []);

  const render = () => {
    const {preview_url = '', thumbnail_url = '', details} = detailedData || {};
    const {description, notes} = details || {};

    return (
      <View style={styles.bookCardView} key={`${item?.key}_${index}`}>
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
          <AppText style={styles.bookCardViewTitleText}>{description}</AppText>
        )}
        {!_.isEmpty(notes) && (
          <AppText style={styles.bookCardViewTitleText}>{notes}</AppText>
        )}

        <TouchableOpacity
          style={styles.mainCTA}
          onPress={isFav ? removeFromFavorites : saveToFavorites}>
          <AppText style={styles.mainCTAText}>
            {isFav ? 'Remove from Favorites' : 'Save To Favorites'}
          </AppText>
        </TouchableOpacity>
      </View>
    );
  };

  return render();
};
