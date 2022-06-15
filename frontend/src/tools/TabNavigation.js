import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from '../screens/Main';
import Market from '../screens/Market';
import Community from '../screens/Community';
import Job from '../screens/Job';
import MyInfo from '../screens/MyInfo';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TabIcon = ({ name, size, color }) => {
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
};

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="홈"
      tabBarOptions={{
        labelPosition: 'below-icon',
        style: {
          backgroundColor: '#54b7f9',
          borderTopColor: '#ffffff',
          borderTopWidth: 2,
        },
        activeTintColor: '#2F5597',
        inactiveTintColor: '#000000',
      }}
    >
      <Tab.Screen
        name="홈"
        component={Main}
        options={{
          tabBarLabel: '홈',
          tabBarIcon: props =>
            TabIcon({
              ...props,
              name: 'home',
            }),
        }}
      />
      <Tab.Screen
        name="동네생활"
        component={Community}
        options={{
          headerShown: false,
          tabBarLabel: '동네생활',
          tabBarIcon: props =>
            TabIcon({
              ...props,
              name: 'wechat',
            }),
        }}
      />
      <Tab.Screen
        name="벼룩시장"
        component={Market}
        options={{
          headerShown: false,
          tabBarLabel: '벼룩시장',
          tabBarIcon: props =>
            TabIcon({
              ...props,
              name: 'handshake',
            }),
        }}
      />
      <Tab.Screen
        name="구인공고"
        component={Job}
        options={{
          headerShown: false,
          tabBarLabel: '구인공고',
          tabBarIcon: props =>
            TabIcon({
              ...props,
              name: 'bullhorn',
            }),
        }}
      />
      <Tab.Screen
        name="내정보"
        component={MyInfo}
        options={{
          tabBarLabel: '내정보',
          tabBarIcon: props =>
            TabIcon({
              ...props,
              name: 'account',
            }),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;