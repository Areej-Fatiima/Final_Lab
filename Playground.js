import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './config'; // Correctly import db from config.js
import { useNavigation, useRoute } from '@react-navigation/native';

const Playground = () => {
    const [questions, setQuestions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const navigation = useNavigation();
    const route = useRoute();
    const { category } = route.params;

    useEffect(() => {
        getQuestions();

        // Set up the navigation options to include the "Quiz" button
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity style={styles.quizButton} onPress={() => navigation.navigate('QuizScreen')}>
                    <Text style={styles.quizButtonText}>Quiz</Text>
                </TouchableOpacity>
            ),
        });
    }, []);

    const getQuestions = async () => {
        setSelectedOptions({});
        setShowResult(false);
        try {
            const questionRef = collection(db, "Quiz1");
            const q = query(questionRef, where('category', '==', category));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                console.log("No matching documents...");
                return;
            }
            const allQuestions = querySnapshot.docs.map(doc => {
                const questionData = doc.data();
                const correctOption = questionData.correct_option ? questionData.correct_option.toString() : null;
                return { ...questionData, correctOption };
            });
            const shuffleQuestions = allQuestions.sort(() => 0.5 - Math.random());
            setQuestions(shuffleQuestions.slice(0, 10));
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

    const handleOptionsSelect = (questionIndex, option) => {
        setSelectedOptions({
            ...selectedOptions,
            [questionIndex]: option,
        });
    };

    const handleSubmit = () => {
        let correctAnswer = 0;
        questions.forEach((question, index) => {
            if (selectedOptions[index] && selectedOptions[index] === question.correctOption) {
                correctAnswer++;
            }
        });
        setScore(correctAnswer);
        setShowResult(true);
    };

    return (
        <ImageBackground source={{ uri: 'https://i.pinimg.com/564x/c2/a7/c6/c2a7c6cbefb6de83a6d6ebb3418d7b4b.jpg' }} style={styles.backgroundImage}>
            <View style={styles.container}>
                <FlatList
                    data={questions}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={styles.questionContainer}>
                            <Text style={styles.question}>{item.question}</Text>
                            {Object.keys(item.options).map((key) => (
                                <TouchableOpacity
                                    key={key}
                                    style={[
                                        styles.option,
                                        selectedOptions[index] === key && styles.selectedOption,
                                        showResult && item.correctOption === key && styles.correctOption,
                                        showResult && selectedOptions[index] === key && selectedOptions[index] !== item.correctOption && styles.wrongOption
                                    ]}
                                    onPress={() => handleOptionsSelect(index, key)}
                                    disabled={showResult}
                                >
                                    <Text>{item.options[key]}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                />
                {showResult && (
                    <View style={styles.result}>
                        <Text style={styles.resultText}>Result</Text>
                        <Text>You scored {score} out of {questions.length}</Text>
                        <TouchableOpacity style={styles.tryAgainButton} onPress={getQuestions}>
                            <Text style={styles.tryAgainButtonText}>Try Again</Text>
                        </TouchableOpacity>
                    </View>
                )}
                {!showResult && (
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                )}
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Example background color with transparency
        alignItems: 'center',
        justifyContent: 'center',
    },
    questionContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 30,
        marginBottom: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    question: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    option: {
        backgroundColor: '#eee',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
    },
    selectedOption: {
        backgroundColor: 'gray',
    },
    correctOption: {
        backgroundColor: 'green',
    },
    wrongOption: {
        backgroundColor: 'red',
    },
    submitButton: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        marginHorizontal: 10,
    },
    submitButtonText: {
        color: 'blue',
        fontSize: 20,
        fontWeight: 'bold',
    },
    result: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    resultText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    tryAgainButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    tryAgainButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    quizButton: {
        marginLeft: 10,
        padding: 10,
    },
    quizButtonText: {
        color: 'blue',
        fontSize: 18,
    },
});

export default Playground;

