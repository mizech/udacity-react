import { AsyncStorage } from "react-native";
import mockdata from "./mockdata";


const getDecks = () => {
    return AsyncStorage.getItem("decks")
        .then((decks) => {
            if (!decks) {
                AsyncStorage.setItem("decks", JSON.stringify(mockdata));

                return mockdata;
            } else {
                return JSON.parse(decks);
            }
        });
}

const addCardToDeck = (textQuestion, textAnswer, id) => {
    return AsyncStorage.getItem("decks")
            .then((sDecks) => {
                let oDeck = Object.values(JSON.parse(sDecks))[id];
                const title = oDeck.title;

                oDeck.questions.push({
                    answer: textAnswer,
                    question: textQuestion
                });

                AsyncStorage.mergeItem(
                    "decks", 
                    JSON.stringify({
                        [title]: {
                            title: title,
                            questions: oDeck.questions
                        }
                    }))

                console.log(AsyncStorage.getItem("decks").then((result) => {
                    console.log(JSON.parse(result));
                }));
            });
}

const saveDeckTitle = (sTitle) => {
    let oNewDeck = {
        sTitle: {
            title: sTitle,
            questions: []
        }
    }
    return AsyncStorage.mergeItem("decks", JSON.stringify(oNewDeck));
}

export { getDecks, addCardToDeck, saveDeckTitle };