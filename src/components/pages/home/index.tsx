/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef, useState} from 'react';
import {STYLES} from '../../../utilities/Styles';
import useComponentDidMount from '../../../hooks/useComponentDidMount';
import useComponentWillUnmount from '../../../hooks/useComponentWillUnmount';
import usePageView from '../../../hooks/usePageView';
import usePageLeave from '../../../hooks/usePageLeave';
import {ActivityIndicator, FlatList, RefreshControl, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {styles} from './styles';
import AppLottieView from '../../common/AppLottieView';
import {LOADING_FLASK_ANIM} from '../../../utilities/Assets';
import {BookDetailsCard} from './BookDetailsCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import {COLORS} from '../../../utilities/Colors';
import AppTextInput from '../../common/AppTextInput';
import AppText from '../../common/AppText';

const HomePageView = props => {
  const insets = useSafeAreaInsets();
  useComponentDidMount(componentDidMount);
  useComponentWillUnmount(componentWillUnmount);
  usePageView(props, onPageView);
  usePageLeave(props, onPageLeave);
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState([]);
  const [searchPageData, setSearchPageData] = useState([]);
  const [searchText, setSearchText] = useState();
  const favlistData = useRef([]);
  const searchInputRef = useRef(null);
  const timer = useRef();
  const startLoading = () => setLoading(true);

  const stopLoading = () => setLoading(false);

  const makeFavsFetchAPICall = () => {
    startLoading();
    AsyncStorage.getItem('FAV_LIST')
      .then(res => {
        if (res) {
          favlistData.current = JSON.parse(res);
        }
        stopLoading();
      })
      .catch(() => {
        favlistData.current = [];
        stopLoading();
      });
  };

  const makeSearchAPICall = async () => {
    startLoading();
    try {
      const apiURL = `https://openlibrary.org/search.json?q=${searchText}&availability&limit=10`;
      const apiRes = await fetch(apiURL);
      const apiResJson = await apiRes.json();
      const pageInfo = apiResJson;
      setSearchPageData(pageInfo?.docs);
      stopLoading();
    } catch (error) {
      stopLoading();
    }
  };

  const makeBooksFetchAPICall = async () => {
    // Fetch Books
    startLoading();
    try {
      const apiURL =
        'https://openlibrary.org/subjects/sci-fi.json?jscmd=details';
      const apiRes = await fetch(apiURL);
      const apiResJson = await apiRes.json();
      const pageInfo = apiResJson?.works;
      makeFavsFetchAPICall();
      setPageData(pageInfo);
      stopLoading();
    } catch (error) {
      stopLoading();
    }
  };

  const refreshPage = () => {
    makeBooksFetchAPICall();
  };

  function componentDidMount() {
    makeBooksFetchAPICall();
  }

  function componentWillUnmount() {}

  function onPageView() {
    // On Page Focus/ View
  }

  function onPageLeave() {
    // On Page Blur/ Leave
  }

  const renderDetailedBookItem = propsData => {
    return (
      <BookDetailsCard
        {...propsData}
        favlistData={favlistData.current}
        refreshPage={refreshPage}
        refreshFavs={makeFavsFetchAPICall}
      />
    );
  };

  const renderSearchedItem = propsData => {
    const {item, index} = propsData || {};
    const {title} = item || {};
    return (
      <View key={index}>
        <AppText style={styles.searchedTextResult}>{title}</AppText>
      </View>
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

  function debounce(func, delay) {
    return function (...args) {
      clearTimeout(timer?.current);
      timer.current = setTimeout(() => {
        func.apply(this, args);
        clearTimeout(timer?.current);
      }, delay);
    };
  }

  const debouncedSearchHandler = debounce(makeSearchAPICall, 500);

  const renderPageLayout = (visible = false) => {
    return (
      <View
        pointerEvents={loading ? 'none' : 'auto'}
        style={[
          STYLES.flex01,
          {display: visible ? 'flex' : 'none', justifyContent: 'center'},
        ]}>
        {loading && (
          <View style={styles.contentLoader}>
            <ActivityIndicator size={'large'} color={COLORS.info500} />
          </View>
        )}

        <AppTextInput
          refCallback={searchInputRef}
          placeholder={'Search book...'}
          placeholderTextColor={COLORS.fullBlack}
          containerStyle={styles.textInputView}
          value={searchText}
          onChangeText={txt => {
            setSearchText(txt);
            debouncedSearchHandler();
          }}
          style={styles.textInputStyle}
        />

        {searchText && searchPageData?.length > 0 ? (
          <FlatList
            data={searchPageData}
            renderItem={renderSearchedItem}
            keyExtractor={(itm, idx) => idx.toString()}
            ItemSeparatorComponent={SearchedItemSeparatorComponent}
            contentContainerStyle={styles.listView}
          />
        ) : (
          <FlatList
            data={pageData}
            renderItem={renderDetailedBookItem}
            keyExtractor={(itm, idx) => idx.toString()}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={refreshPage} />
            }
            ItemSeparatorComponent={BookItemSeparatorComponent}
            contentContainerStyle={styles.listView}
            keyboardShouldPersistTaps={'handled'}
          />
        )}
      </View>
    );
  };

  const render = () => {
    const isInitialLoading = _.isEmpty(pageData) && loading;
    return (
      <View style={[STYLES.screenContainerView, {paddingTop: insets.top}]}>
        {isInitialLoading && renderLoader()}
        {renderPageLayout(!isInitialLoading)}
      </View>
    );
  };

  return render();
};

const SearchedItemSeparatorComponent = () => {
  return <View style={styles.searchedItemSeparatorView} />;
};

const BookItemSeparatorComponent = () => {
  return <View style={styles.bookItemSeparatorView} />;
};

export default HomePageView;
