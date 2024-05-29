import { useNavigation } from '@react-navigation/native';

export const useNavigateToCategory = () => {
    const navigation = useNavigation();

    const navigateToCategory = (category) => {
        navigation.navigate('Playground', { category });
    };

    return navigateToCategory;
};
