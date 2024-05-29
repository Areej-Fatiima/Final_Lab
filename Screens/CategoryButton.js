import React from 'react';
import { TouchableOpacity, Text, ImageBackground, StyleSheet } from 'react-native';

const CategoryButton = ({ category, onPress }) => (
    <TouchableOpacity style={styles.categoryButton} onPress={() => onPress(category.name)}>
        <ImageBackground source={{ uri: category.image }} style={styles.categoryImage}>
            <Text style={styles.categoryText}>{category.name}</Text>
        </ImageBackground>
    </TouchableOpacity>
);

export default CategoryButton;

const styles = StyleSheet.create({
    categoryButton: {
        width: 150,
        height: 150,
        borderRadius: 20,
        overflow: 'hidden',
        margin: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    categoryImage: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 10,
    },
    categoryText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
});
