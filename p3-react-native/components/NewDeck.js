import React, { Component } from "react";
import { StyleSheet,
         Text,
         View,
         Alert,
         Button,
         TextInput } from 'react-native';

import { saveDeckTitle } from "./../model/functions";

class Decks extends Component {
    state = {
        textNewDeck: ""
    }

    handleSubmit = function() {
        const textNewDeck = this.state.textNewDeck;
        
        if (textNewDeck.length === 0) {
            Alert.alert("Missing data",
                        "Title for new deck is mandatory.");
        }
       
        let promise = new Promise((resolve) => {
            resolve(saveDeckTitle(textNewDeck));
        });

        promise
            .then(() => {
                this.props.navigation.navigate("Deck", { "id": this.state.textNewDeck });

                this.setState({
                    textNewDeck: ""
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return <View style={styles.container}>
            <Text style={styles.text}>Title of the new deck?</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(currentText) => {
                    this.setState({
                        textNewDeck: currentText
                    });
                }}
                value={this.state.textNewDeck} />
            <Button
                onPress={() => {
                    this.handleSubmit();
                }}
                title="Submit insertion"
                color="#238989"
            />
        </View>
    }
}

export default Decks;

const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      backgroundColor: '#efefef'
    },
    text: {
        marginTop: 15,
        marginBottom: 15,
    },
    textInput: {
        height: 40,
        width: 300,
        marginTop: 5,
        borderColor: "#000",
        borderWidth: 1
    }
  });