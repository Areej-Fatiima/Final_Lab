import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { useNavigateToCategory } from './navigateToCategory'; // Ensure this path is correct
import CategoryButton from './CategoryButton';
import styles from './styles';

const categories = [
    { name: 'Urdu', image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nuskaha-e-Hamidiyya.jpg' },
    { name: 'Turkish', image: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Irk_bitig_07.jpg' },
    { name: 'Japanese', image: 'https://cdn.britannica.com/45/63145-004-B508A2A5/Japanese-kana-symbols.jpg' },
    { name: 'Arabic', image: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Learning_Arabic_calligraphy.jpg' },
    { name: 'Hindi', image: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Hindi_pic.jpg' }
];

const QuizScreen = () => {
    const navigateToCategory = useNavigateToCategory();
    return (
        <ImageBackground
            source={{ uri: 'https://i.pinimg.com/564x/ca/4c/0d/ca4c0d22880e8ab951b85a204ea64ea0.jpg' }}
            style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.text}>Quizzes</Text>
                <Text style={styles.quizText}>Test your abilities here and discover your strengths!</Text>
                <View style={styles.categoryContainer}>
                    {categories.map((category) => (
                        <CategoryButton key={category.name} category={category} onPress={navigateToCategory} />
                    ))}
                </View>
            </View>
        </ImageBackground>
    );
}

export default QuizScreen;
