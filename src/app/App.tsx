import React from 'react';
import {COLORS} from '../utilities/Colors';
import {STYLES} from '../utilities/Styles';
import {StatusBar, View} from 'react-native';
import RootStack from '../components/stacks/RootStack';
import {ErrorBoundary} from './Errorboundary';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <View style={[STYLES.flex01, STYLES.fullSmokeWhiteBgColor]}>
          <StatusBar backgroundColor={COLORS.whiteSmoke} />
          <RootStack />
        </View>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
};

export default App;
