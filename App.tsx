import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView, StatusBar, Text, useColorScheme, View } from 'react-native';
import * as Font from 'expo-font';

import { getTheme } from './src/theme';

function ScreenShell({ title, subtitle }: { title: string; subtitle?: string }) {
  const scheme = useColorScheme();
  const theme = getTheme(scheme === 'light' ? 'light' : 'dark');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'} />
      <View style={{ padding: 20 }}>
        <Text
          style={{
            color: theme.text,
            fontSize: 22,
            fontFamily: 'NicoMoji',
            letterSpacing: 0.2,
          }}
        >
          {title}
        </Text>
        <Text style={{ color: theme.mutedText, marginTop: 10, fontSize: 14 }}>
          {subtitle ??
            'OnGuard Phase 1: connect wallets → choose networks → unified activity feed → high-signal alerts → Guard Reports.'}
        </Text>
      </View>
    </SafeAreaView>
  );
}

function ActivityScreen() {
  return <ScreenShell title="Activity (All Wallets)" />;
}

function InsightsScreen() {
  return <ScreenShell title="Insights" />;
}

function SettingsScreen() {
  return <ScreenShell title="Settings" />;
}

const Tab = createBottomTabNavigator();

export default function App() {
  const scheme = useColorScheme();
  const theme = getTheme(scheme === 'light' ? 'light' : 'dark');

  const [fontsLoaded] = Font.useFonts({
    NicoMoji: require('./assets/fonts/NicoMoji-Regular.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer
      theme={{
        dark: theme.mode === 'dark',
        colors: {
          primary: theme.primary,
          background: theme.background,
          card: theme.card,
          text: theme.text,
          border: theme.border,
          notification: theme.secondary,
        },
      }}
    >
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.card,
            borderTopColor: theme.border,
          },
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: theme.mutedText,
        }}
      >
        <Tab.Screen name="Activity" component={ActivityScreen} />
        <Tab.Screen name="Insights" component={InsightsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
