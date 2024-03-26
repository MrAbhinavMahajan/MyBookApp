/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {STYLES} from '../../../utilities/Styles';
import useComponentDidMount from '../../../hooks/useComponentDidMount';
import useComponentWillUnmount from '../../../hooks/useComponentWillUnmount';
import usePageView from '../../../hooks/usePageView';
import usePageLeave from '../../../hooks/usePageLeave';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {styles} from './styles';
import AppLottieView from '../../common/AppLottieView';
import {
  ERROR_404_PANDA_ANIM,
  LOADING_FLASK_ANIM,
} from '../../../utilities/Assets';
import {BookDetailsCard} from './BookDetailsCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import {COLORS} from '../../../utilities/Colors';
import AppTextInput from '../../common/AppTextInput';
import AppText from '../../common/AppText';
import {SCREEN_HEIGHT} from '../../../utilities/AppUtils';

const HomePageView = props => {
  const insets = useSafeAreaInsets();
  useComponentDidMount(componentDidMount);
  useComponentWillUnmount(componentWillUnmount);
  usePageView(props, onPageView);
  usePageLeave(props, onPageLeave);
  const [loading, setLoading] = useState(true);
  const [errorState, setErrorState] = useState(false);
  const [pageData, setPageData] = useState([]);
  const [searchPageData, setSearchPageData] = useState([]);
  const [searchText, setSearchText] = useState();
  const [, setSearchPageNumber] = useState(1);
  const favlistData = useRef([]);
  const searchInputRef = useRef(null);
  const searchInputDebounceTimer = useRef();
  const abortController = new AbortController(); // API abort controller

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

  const makeSearchAPICall = async (searchedText, pageNumber = 1) => {
    console.log('Searched Query::', {searchedText, pageNumber});
    if (searchedText?.length > 0) {
      startLoading();
      try {
        const apiURL = `https://openlibrary.org/search.json?q=${searchedText}&page=${pageNumber}&limit=15`;
        const apiRes = await fetch(apiURL, {
          signal: abortController.signal,
        });
        const apiResJson = await apiRes.json();
        const pageInfo = apiResJson;
        console.log('Searched Response: ', pageInfo);
        setSearchPageData([...searchPageData, ...pageInfo?.docs]);
        stopLoading();
      } catch (error) {
        console.log(error);
        Alert.alert('Something went wrong, Try Again');
        stopLoading();
      }
    }
  };

  const makeBooksFetchAPICall = async () => {
    // Fetch Books
    startLoading();
    setErrorState(false);
    try {
      const apiURL =
        'https://openlibrary.org/subjects/sci-fi.json?jscmd=details';
      const apiRes = await fetch(apiURL, {
        signal: abortController.signal,
      });
      const apiResJson = await apiRes.json();
      const pageInfo = apiResJson?.works;
      makeFavsFetchAPICall();
      setPageData(pageInfo);
    } catch (error) {
      console.log(error);
      Alert.alert('Something went wrong, Try Again');
      stopLoading();
      setErrorState(true);
    }
  };

  useEffect(() => {
    if (_.isEmpty(searchText)) {
      setSearchPageData([]);
      setSearchPageNumber(1);
    }
  }, [searchText]);

  const refreshPage = () => {
    makeBooksFetchAPICall();
  };

  function componentDidMount() {
    makeBooksFetchAPICall();
  }

  function componentWillUnmount() {
    abortController.abort();
  }

  function onPageView() {
    // On Page Focus/ View
  }

  function onPageLeave() {
    // On Page Blur/ Leave
    abortController.abort();
  }

  const renderDetailedBookItem = useCallback(propsData => {
    return (
      <BookDetailsCard
        {...propsData}
        favlistData={favlistData.current}
        refreshPage={refreshPage}
        refreshFavs={makeFavsFetchAPICall}
      />
    );
  }, []);

  const renderSearchedItem = useCallback(propsData => {
    const {item, index} = propsData || {};
    const {title} = item || {};
    return (
      <View key={index}>
        <AppText style={styles.searchedTextResult}>{title}</AppText>
      </View>
    );
  }, []);

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

  const renderErrorAnim = () => {
    if (!errorState || loading) {
      return <></>;
    }
    return (
      <AppLottieView
        source={ERROR_404_PANDA_ANIM}
        autoPlay
        loop
        style={styles.lottieView}
      />
    );
  };

  function debounce(func, delay) {
    return function (...args) {
      clearTimeout(searchInputDebounceTimer?.current);
      searchInputDebounceTimer.current = setTimeout(() => {
        func.apply(this, args);
        clearTimeout(searchInputDebounceTimer?.current);
      }, delay);
    };
  }

  const debouncedSearchHandler = debounce(makeSearchAPICall, 500);

  const renderPageLayout = (visible = false) => {
    if (errorState) {
      return <></>;
    }
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
          ref={searchInputRef}
          placeholder={'Search book...'}
          placeholderTextColor={COLORS.fullBlack}
          containerStyle={styles.textInputView}
          value={searchText}
          onChangeText={txt => {
            setSearchText(txt);
            debouncedSearchHandler(txt);
          }}
          style={styles.textInputStyle}
        />

        {searchPageData?.length > 0 ? (
          <FlatList
            data={searchPageData}
            renderItem={renderSearchedItem}
            keyExtractor={(itm, idx) => idx.toString()}
            ItemSeparatorComponent={SearchedItemSeparatorComponent}
            contentContainerStyle={styles.listView}
            removeClippedSubviews
            initialNumToRender={15}
            windowSize={SCREEN_HEIGHT}
            onEndReached={_.throttle(() => {
              setSearchPageNumber(pg => {
                const modifiedPageNumber = parseInt(pg) + 1;
                makeSearchAPICall(searchText, modifiedPageNumber);
                return modifiedPageNumber;
              });
            }, 200)}
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
            removeClippedSubviews
            initialNumToRender={5}
            windowSize={SCREEN_HEIGHT}
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
        {renderErrorAnim()}
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
