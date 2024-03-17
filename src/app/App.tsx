import React from 'react';
import {COLORS} from '../utilities/Colors';
import {STYLES} from '../utilities/Styles';
import {StatusBar, View} from 'react-native';
import RootStack from '../components/stacks/RootStack';
import {ErrorBoundary} from './Errorboundary';

const App = () => {
  return (
    <ErrorBoundary>
      <View style={[STYLES.flex01, STYLES.fullSmokeWhiteBgColor]}>
        <StatusBar backgroundColor={COLORS.whiteSmoke} />
        <RootStack />
      </View>
    </ErrorBoundary>
  );
};

export default App;
