import React, { Component } from "react";
import { StyleSheet,
         Text,
         View,
         Alert,
         Button,
         TextInput } from 'react-native';

import { addCardToDeck } from "../model/functions";

class Decks extends Component {
    state = {
        textQuestion: "",
        textAnswer: "",
        id: ""
    }

    componentDidMount() {
        this.setState({
            id: this.props.navigation.state.params.id
        });
    }

    handleSubmitQuestion = function() {
        const textQuestion = this.state.textQuestion;
        const textAnswer = this.state.textAnswer;

        if (textQuestion.length === 0 || textAnswer.length === 0) {
            Alert.alert("Missing data",
                        "Text for question and answer are mandatory.");
        }

        let promise = new Promise((resolve) => {
            resolve(addCardToDeck(textQuestion, textAnswer, this.state.id));
        });

        promise
            .then(() => {
                this.setState({
                    textQuestion: "",
                    textAnswer: ""
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return <View style={styles.container}>
            <Text style={styles.text}>Text of question: </Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(currentText) => {
                    this.setState({
                        textQuestion: currentText
                    });
                }}
                value={this.state.textQuestion} />
            <Text style={styles.text}>Text of answer: </Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(currentText) => {
                    this.setState({
                        textAnswer: currentText
                    });
                }}
                value={this.state.textAnswer} />
            <Button
                onPress={() => {
                    this.handleSubmitQuestion();
                }}
                title="Submit question!"
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