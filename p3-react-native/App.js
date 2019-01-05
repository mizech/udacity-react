import React from 'react';
import { createMaterialTopTabNavigator,
         createStackNavigator,
         createAppContainer } from "react-navigation";
import { StyleSheet, Text, View } from 'react-native';

import Decks from "./components/Decks";
import NewDeck from "./components/NewDeck";
import NewQuestion from "./components/NewQuestion";
import Deck from "./components/Deck";
import Quiz from "./components/Quiz";

const StackNavigator = createStackNavigator({
  Home: {
    screen: createMaterialTopTabNavigator({
      Decks: {
        screen: Decks,
        navigationOptions: {
          tabBarLabel: "Available Decks"
        }
      },
      NewDeck: {
        screen: NewDeck,
        navigationOptions: {
          tabBarLabel: "Create a new deck"
        }
      }
    })
  },
  NewQuestion: {
    screen: NewQuestion,
    navigationOptions: {
      title: "Add a new question"
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: "Start Quiz"
    }
  },
  Deck: {
    screen: Deck
  }
});

const AppContainer = createAppContainer(StackNavigator);

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <AppContainer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef'
  },
});
