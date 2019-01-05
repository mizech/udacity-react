import React, { Component } from "react";
import { StyleSheet,
         View,
         Animated,
         TouchableOpacity } from 'react-native';

import { getDecks } from "../model/functions";

class Decks extends Component {
    state = {
        decks: [],
        opacity: new Animated.Value(1)
    }

    componentDidMount() {
        let promise = new Promise((resolve) => {
            resolve(getDecks());
        });

        promise
            .then((mockdata) => {

                if (JSON.stringify(mockdata) !== JSON.stringify(this.state.decks)) {
                    this.setState({
                        decks: mockdata
                    });
                }
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
        const { opacity } = this.state;
        let decksItems
        
        if (this.state.decks) {
            const aDecks = Object.values(this.state.decks);
            decksItems = aDecks.map((deck, i) => {
                return <View key={i} style={ styles.deckSet }>
                                <TouchableOpacity onPress={() => {
                                    Animated.timing(opacity, { toValue: 0, duration: 1000 }).start();
                                    this.props.navigation.navigate("Deck", { "id": i });
                                    setTimeout(() => {
                                        Animated.timing(opacity, { toValue: 1, duration: 100 }).start();
                                    }, 1000);
                                }} >
                                <Animated.Text style={[{ opacity }]}>
                                    Name: { deck.title }
                                </Animated.Text>
                                <Animated.Text style={[{ opacity }]}>
                                    Number of cards: { deck.questions.length }
                                </Animated.Text>
                            </TouchableOpacity>
                       </View>
            });
        }
      
        return <View style={styles.container}>
            { decksItems }
        </View>
    }
}

export default Decks;

const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      backgroundColor: '#efefef'
    },
    deckSet: {
        marginTop: 15,
        marginBottom: 20
    }
  });