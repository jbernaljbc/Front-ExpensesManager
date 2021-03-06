import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import LinksScreen from '../screens/LinksScreen'
import SettingsScreen from '../screens/SettingsScreen'
import ExpensesListScreen from '../screens/ExpensesListScreen'
import ExpensesInputScreen from '../screens/ExpensesInputScreen'

const ExpensesInputStack = createStackNavigator({
  Input: ExpensesInputScreen
})

ExpensesInputStack.navigationOptions = {
  tabBarLabel: 'Ingresar Gasto',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
}

const ExpensesListStack = createStackNavigator({
  List: ExpensesListScreen
})

ExpensesListStack.navigationOptions = {
  tabBarLabel: 'Mis gastos',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
}

const LinksStack = createStackNavigator({
  Links: LinksScreen,
})

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
}

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
})

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
}

export default createBottomTabNavigator({
  // HomeStack,
  ExpensesInputStack,
  ExpensesListStack,
  LinksStack,
  // SettingsStack,
})
