/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {STYLES} from '../../../utilities/Styles';
import useComponentDidMount from '../../../hooks/useComponentDidMount';
import useComponentWillUnmount from '../../../hooks/useComponentWillUnmount';
import usePageView from '../../../hooks/usePageView';
import usePageLeave from '../../../hooks/usePageLeave';
import {FlatList, RefreshControl, View} from 'react-native';
import AppText from '../../common/AppText';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {styles} from './styles';
import AppLottieView from '../../common/AppLottieView';
import {LOADING_FLASK_ANIM} from '../../../utilities/Assets';
import {BookDetailsCard} from './BookDetailsCard';

const HomePageView = props => {
  const insets = useSafeAreaInsets();
  useComponentDidMount(componentDidMount);
  useComponentWillUnmount(componentWillUnmount);
  usePageView(props, onPageView);
  usePageLeave(props, onPageLeave);
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState([]);

  const startLoading = () => setLoading(true);

  const stopLoading = () => setLoading(false);

  const makeAPICall = async () => {
    // Fetch Books
    startLoading();
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
    return <BookDetailsCard {...propsData} />;
  };

  const render = () => {
    return (
      <View style={[STYLES.screenContainerView, {paddingTop: insets.top}]}>
        {loading ? (
          <AppLottieView
            source={LOADING_FLASK_ANIM}
            autoPlay
            loop
            style={styles.lottieView}
          />
        ) : (
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
        )}
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
