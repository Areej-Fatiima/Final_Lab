import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', // Add opacity to the background
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'red',
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 2,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    quizText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 2,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
});