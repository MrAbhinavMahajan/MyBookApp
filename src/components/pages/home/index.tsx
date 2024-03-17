/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef, useState} from 'react';
import {STYLES} from '../../../utilities/Styles';
import useComponentDidMount from '../../../hooks/useComponentDidMount';
import useComponentWillUnmount from '../../../hooks/useComponentWillUnmount';
import usePageView from '../../../hooks/usePageView';
import usePageLeave from '../../../hooks/usePageLeave';
import {ActivityIndicator, FlatList, RefreshControl, View} from 'react-native';
import AppText from '../../common/AppText';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {styles} from './styles';
import AppLottieView from '../../common/AppLottieView';
import {LOADING_FLASK_ANIM} from '../../../utilities/Assets';
import {BookDetailsCard} from './BookDetailsCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import {COLORS} from '../../../utilities/Colors';

const HomePageView = props => {
  const insets = useSafeAreaInsets();
  useComponentDidMount(componentDidMount);
  useComponentWillUnmount(componentWillUnmount);
  usePageView(props, onPageView);
  usePageLeave(props, onPageLeave);
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState([]);
  const favlistData = useRef([]);

  const startLoading = () => setLoading(true);

  const stopLoading = () => setLoading(false);

  const makeAPICall = async () => {
    // Fetch Books
    startLoading();
    AsyncStorage.getItem('FAV_LIST')
      .then(res => {
        if (res) {
          favlistData.current = JSON.parse(res);
        }
      })
      .catch(() => {
        favlistData.current = [];
      });

    try {
      const apiURL =
        'https://openlibrary.org/subjects/sci-fi.json?jscmd=details';
      const apiRes = await fetch(apiURL);
      const apiResJson = await apiRes.json();
      const pageInfo = apiResJson?.works;
      setPageData(pageInfo);
      stopLoading();
    } catch (error) {
      stopLoading();
    }
  };

  const refreshPage = () => {
    makeAPICall();
  };

  function componentDidMount() {
    makeAPICall();
  }

  function componentWillUnmount() {}

  function onPageView() {}

  function onPageLeave() {}

  const renderItem = propsData => {
    return (
      <BookDetailsCard
        {...propsData}
        favlistData={favlistData.current}
        refreshPage={refreshPage}
      />
    );
  };

  const renderLoader = () => {
    return (
      <AppLottieView
        source={LOADING_FLASK_ANIM}
        autoPlay
        loop
        style={styles.lottieView}
      />
    );
  };

  const renderPageLayout = () => {
    return (
      <View>
        {loading && (
          <View style={styles.contentLoader}>
            <ActivityIndicator size={'large'} color={COLORS.info500} />
          </View>
        )}
        <FlatList
          data={pageData}
          renderItem={renderItem}
          keyExtractor={(itm, idx) => idx.toString()}
          ListHeaderComponent={ListHeaderComponent}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={refreshPage} />
          }
          ItemSeparatorComponent={ItemSeparatorComponent}
          contentContainerStyle={styles.booklistView}
        />
      </View>
    );
  };

  const render = () => {
    const isInitialLoading = _.isEmpty(pageData) && loading;
    return (
      <View style={[STYLES.screenContainerView, {paddingTop: insets.top}]}>
        {isInitialLoading ? renderLoader() : renderPageLayout()}
      </View>
    );
  };

  return render();
};

const ListHeaderComponent = () => {
  return <AppText style={styles.booklistTitleText}>Sci-Fi Books</AppText>;
};

const ItemSeparatorComponent = () => {
  return <View style={styles.itemSeparatorView} />;
};

export default HomePageView;
