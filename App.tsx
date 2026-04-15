import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';

function ScreenShell({ title }: { title: string }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#09090b' }}>
      <StatusBar barStyle="light-content" />
      <View style={{ padding: 20 }}>
        <Text style={{ color: '#fafafa', fontSize: 22, fontWeight: '700' }}>{title}</Text>
        <Text style={{ color: '#a1a1aa', marginTop: 10, fontSize: 14 }}>
          OnGuard Phase 1 (MVP): connect wallets → choose networks → unified activity feed → high-signal alerts → Guard Reports.
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
  return (
    <NavigationContainer theme={DarkTheme}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#0a0a0a',
            borderTopColor: '#27272a',
          },
          tabBarActiveTintColor: '#38bdf8',
          tabBarInactiveTintColor: '#a1a1aa',
        }}
      >
        <Tab.Screen name="Activity" component={ActivityScreen} />
        <Tab.Screen name="Insights" component={InsightsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
