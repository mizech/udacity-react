import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from 'react-native';

import { getDecks } from "../model/functions";

class Deck extends Component {
    state = {
        decks: []
    }

    componentDidMount() {
        let promise = new Promise((resolve) => {
            resolve(getDecks());
        });

        promise
            .then((mockdata) => {
                this.setState({
                    decks: mockdata
                });
               
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentWillUpdate() {
        let promise = new Promise((resolve) => {
            resolve(getDecks());
        });

        promise
            .then((mockdata) => {
                if (JSON.stringify(this.state.decks) !== JSON.stringify(mockdata)) {
                    this.setState({
                        decks: mockdata
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const id = this.props.navigation.state.params.id;
        const aDecks = Object.values(this.state.decks);
        
        const deck = aDecks.find((deck, i) => {
            return i === id;
        });

        let title;
        let numberOf;

        if (deck) {
            title = deck.title;
            numberOf = deck.questions.length;
        }

        return <View style={styles.container}>
            <Text style={styles.item}>Card-Title: {title}</Text>
            <Text style={styles.item}>Number of cards in deck: {numberOf}</Text>
            <Button
                onPress={() => {
                    this.props.navigation.navigate("Quiz", { "deck": deck, id });
                }}
                title="Start Quiz"
                color="#841584"
            />
            <Button
                onPress={() => {
                    this.props.navigation.navigate("NewQuestion", { "id": id });
                }}
                title="Add New Question"
                color="#238989"
            />
        </View>
    }
}

export default Deck;

const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      backgroundColor: '#efefef'
    },
    item: {
        marginTop: 25,
        marginBottom: 30
    }
  });