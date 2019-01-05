import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from 'react-native';

import { clearLocalNotifications, 
         setLocalNotification } from "./../notifications/functions";

class NewDeck extends Component {
    state = {
        correct: 0,
        incorrect: 0,
        answerVisible: false,
        i: 0
    }

    toggleAnswerVisible() {
        this.setState({
            answerVisible: !this.state.answerVisible
        });
    }

    updateNotification() {
        clearLocalNotifications()
            .then(setLocalNotification);
    }

    incrementCorrect() {
        this.setState({
            correct: this.state.correct + 1,
            answerVisible: false,
            i: this.state.i + 1
        });
    }

    incrementIncorrect() {
        this.setState({
            incorrect: this.state.incorrect + 1,
            answerVisible: false,
            i: this.state.i + 1
        });
    }

    render() {
        const deck = this.props.navigation.state.params.deck;
        const id = this.props.navigation.state.params.id;
        const numberOfQuestions = deck.questions.length;
        let percentCorrect;

        let content;
        let questionOrAnswer;
        let i = this.state.i;
        
        if (i < numberOfQuestions) {
            if (this.state.answerVisible) {
                questionOrAnswer = deck.questions[i].answer;
            } else {
                questionOrAnswer = deck.questions[i].question;
            }
        } else {
            percentCorrect = (Math.ceil((this.state.correct / numberOfQuestions) * 100));
        }

        if (i < numberOfQuestions) {
            content = <View style={styles.container}>
                <Text style={styles.title}>{deck.title}</Text>
                <Text style={styles.text}>Currently question {i + 1} out of {numberOfQuestions} questions</Text>
                <Text style={styles.text}>Questions left: {numberOfQuestions - i - 1}</Text>
                <Text style={styles.text}>{questionOrAnswer}</Text>
                <Button
                    onPress={() => {
                        this.toggleAnswerVisible();
                    }}
                    title="Turnover card"
                    color="#232323"
                />
                <Button
                    onPress={() => {
                        this.incrementCorrect();
                    }}
                    title="Correct"
                    color="#00bbff"
                />
                <Button
                    onPress={() => {
                        this.incrementIncorrect();
                    }}
                    title="Incorrect"
                    color="#ff0055"
                />
            </View>
        } else {
            content = <View style={styles.container}>
                <Text style={styles.title}>{deck.title}</Text>
                <Text style={styles.title}>
                    You have answered {this.state.correct} questions out of {numberOfQuestions} correct!
                </Text>
                <Text style={styles.title}>Percentage of questions correct: {percentCorrect}%</Text>
                <Button
                    onPress={() => {
                        this.setState({
                            correct: 0,
                            incorrect: 0,
                            answerVisible: false,
                            i: 0
                        });

                        this.updateNotification();
                    }}
                    title="Restart quiz"
                    color="#00bbff"
                />
                <Button
                    onPress={() => {
                        this.props.navigation.navigate("Deck", { id });

                        this.updateNotification();
                    }}
                    title="Back to deck"
                    color="#ff5500"
                />
            </View>
        }

        return <View>
            { content }
        </View>
    }
}

export default NewDeck;

const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      backgroundColor: '#efefef'
    },
    title: {
        marginTop: 20,
        marginBottom: 20
    },
    text: {
        marginBottom: 20,
        marginLeft: 12,
        marginRight: 12
    }
  });