

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Keyboard, ActivityIndicator, ImageBackground } from 'react-native';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';

const TranslatorScreen = () => {
    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [fromLanguage, setFromLanguage] = useState('en');
    const [toLanguage, setToLanguage] = useState('ur');
    const [openFrom, setOpenFrom] = useState(false);
    const [openTo, setOpenTo] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Add loading state

    const API_KEY = '69ddba1ee45668b44714';

    const translateText = async () => {
        setLoading(true); // Set loading to true before making the request
        try {
            const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=${fromLanguage}|${toLanguage}&key=${API_KEY}`;
            const response = await axios.get(apiUrl);
            setTranslatedText(response.data.responseData.translatedText);
            // Dismiss the keyboard
            Keyboard.dismiss();
        } catch (error) {
            console.error("Error translating text:", error);
            setError("Error translating text. Please try again.");
        } finally {
            setLoading(false); // Set loading to false regardless of success or failure
        }
    };

    return (
        <ImageBackground
            source={{ uri: 'https://i.pinimg.com/564x/ec/58/76/ec5876a1020ddea162217cb1d8b738c8.jpg' }}
            style={styles.background}
        >
            <View style={styles.container}>
            
                <Text style={styles.title}>Chatter Craft</Text>
                <View style={styles.formContainer}>
                <Text style={styles.translationHeading}>Translation</Text>
                    <View style={styles.dropdownContainer}>

                        <DropDownPicker
                            open={openFrom}
                            value={fromLanguage}
                            setOpen={setOpenFrom}
                            setValue={setFromLanguage}
                            items={[
                                { label: "Greek", value: "el-GR" },
                                { label: "English", value: "en-GB" },
                                { label: "Amharic", value: "am-ET" },
                                { label: "Arabic", value: "ar-SA" },
                                { label: "Bielarus", value: "be-BY" },
                                { label: "Bemba", value: "bem-ZM" },
                                { label: "Bislama", value: "bi-VU" },
                                { label: "Bajan", value: "bjs-BB" },
                                { label: "Bengali", value: "bn-IN" },
                                { label: "Tibetan", value: "bo-CN" },
                                { label: "Breton", value: "br-FR" },
                                { label: "Bosnian", value: "bs-BA" },
                                { label: "Catalan", value: "ca-ES" },
                                { label: "Coptic", value: "cop-EG" },
                                { label: "Czech", value: "cs-CZ" },
                                { label: "Welsh", value: "cy-GB" },
                                { label: "Danish", value: "da-DK" },
                                { label: "Dzongkha", value: "dz-BT" },
                                { label: "German", value: "de-DE" },
                                { label: "Maldivian", value: "dv-MV" },
                                { label: "Spanish", value: "es-ES" },
                                { label: "Estonian", value: "et-EE" },
                                { label: "Basque", value: "eu-ES" },
                                { label: "Persian", value: "fa-IR" },
                                { label: "Finnish", value: "fi-FI" },
                                { label: "Fanagalo", value: "fn-FNG" },
                                { label: "Faroese", value: "fo-FO" },
                                { label: "French", value: "fr-FR" },
                                { label: "Galician", value: "gl-ES" },
                                { label: "Gujarati", value: "gu-IN" },
                                { label: "Hausa", value: "ha-NE" },
                                { label: "Hebrew", value: "he-IL" },
                                { label: "Hindi", value: "hi-IN" },
                                { label: "Croatian", value: "hr-HR" },
                                { label: "Hungarian", value: "hu-HU" },
                                { label: "Indonesian", value: "id-ID" },
                                { label: "Icelandic", value: "is-IS" },
                                { label: "Italian", value: "it-IT" },
                                { label: "Japanese", value: "ja-JP" },
                                { label: "Kazakh", value: "kk-KZ" },
                                { label: "Khmer", value: "km-KM" },
                                { label: "Kannada", value: "kn-IN" },
                                { label: "Korean", value: "ko-KR" },
                                { label: "Kurdish", value: "ku-TR" },
                                { label: "Kyrgyz", value: "ky-KG" },
                                { label: "Latin", value: "la-VA" },
                                { label: "Lao", value: "lo-LA" },
                                { label: "Latvian", value: "lv-LV" },
                                { label: "Mende", value: "men-SL" },
                                { label: "Malagasy", value: "mg-MG" },
                                { label: "Maori", value: "mi-NZ" },
                                { label: "Malay", value: "ms-MY" },
                                { label: "Maltese", value: "mt-MT" },
                                { label: "Burmese", value: "my-MM" },
                                { label: "Nepali", value: "ne-NP" },
                                { label: "Niuean", value: "niu-NU" },
                                { label: "Dutch", value: "nl-NL" },
                                { label: "Norwegian", value: "no-NO" },
                                { label: "Nyanja", value: "ny-MW" },
                                { label: "Pakistani", value: "ur-PK" },
                                { label: "Palauan", value: "pau-PW" },
                                { label: "Panjabi", value: "pa-IN" },
                                { label: "Pashto", value: "ps-PK" },
                                { label: "Pijin", value: "pis-SB" },
                                { label: "Polish", value: "pl-PL" },
                                { label: "Portuguese", value: "pt-PT" },
                                { label: "Kirundi", value: "rn-BI" },
                                { label: "Romanian", value: "ro-RO" },
                                { label: "Russian", value: "ru-RU" },
                                { label: "Sango", value: "sg-CF" },
                                { label: "Sinhala", value: "si-LK" },
                                { label: "Slovak", value: "sk-SK" },
                                { label: "Samoan", value: "sm-WS" },
                                { label: "Shona", value: "sn-ZW" },
                                { label: "Somali", value: "so-SO" },
                                { label: "Albanian", value: "sq-AL" },
                                { label: "Serbian", value: "sr-RS" },
                                { label: "Swedish", value: "sv-SE" },
                                { label: "Swahili", value: "sw-SZ" },
                                { label: "Tamil", value: "ta-LK" },
                                { label: "Telugu", value: "te-IN" },
                                { label: "Tetum", value: "tet-TL" },
                                { label: "Tajik", value: "tg-TJ" },
                                { label: "Thai", value: "th-TH" },
                                { label: "Tigrinya", value: "ti-TI" },
                                { label: "Turkmen", value: "tk-TM" },
                                { label: "Tagalog", value: "tl-PH" },
                                { label: "Tswana", value: "tn-BW" },
                                { label: "Tongan", value: "to-TO" },
                                { label: "Turkish", value: "tr-TR" },
                                { label: "Ukrainian", value: "uk-UA" },
                                { label: "Uzbek", value:"uz-UZ" },
                                { label: "Vietnamese", value: "vi-VN" },
                                { label: "Wolof", value: "wo-SN" },
                                { label: "Xhosa", value: "xh-ZA" },
                                { label: "Yiddish", value: "yi-YD" },
                                { label: "Yoruba", value: "yo-NG" },
                                { label: "Chinese", value: "zh-CN" },
                                { label: "Zulu", value: "zu-ZA" }
                            ]}
                            placeholder="From"
                            containerStyle={{ flex: 1 }}
                        />
                        <DropDownPicker
                            open={openTo}
                            value={toLanguage}
                            setOpen={setOpenTo}
                            setValue={setToLanguage}
                            items={[
                                { label: "Greek", value: "el-GR" },
                                { label: "English", value: "en-GB" },
                                { label: "Arabic", value: "ar-SA" },
                                { label: "Bielarus", value: "be-BY" },
                                { label: "Bemba", value: "bem-ZM" },
                                { label: "Bislama", value: "bi-VU" },
                                { label: "Bajan", value: "bjs-BB" },
                                { label: "Bengali", value: "bn-IN" },
                                { label: "Tibetan", value: "bo-CN" },
                                { label: "Breton", value: "br-FR" },
                                { label: "Bosnian", value: "bs-BA" },
                                { label: "Catalan", value: "ca-ES" },
                                { label: "Coptic", value: "cop-EG" },
                                { label: "Czech", value: "cs-CZ" },
                                { label: "Welsh", value: "cy-GB" },
                                { label: "Danish", value: "da-DK" },
                                { label: "Dzongkha", value: "dz-BT" },
                                { label: "German", value: "de-DE" },
                                { label: "Maldivian", value: "dv-MV" },
                                { label: "Spanish", value: "es-ES" },
                                { label: "Estonian", value: "et-EE" },
                                { label: "Basque", value: "eu-ES" },
                                { label: "Persian", value: "fa-IR" },
                                { label: "Finnish", value: "fi-FI" },
                                { label: "Fanagalo", value: "fn-FNG" },
                                { label: "Faroese", value: "fo-FO" },
                                { label: "French", value: "fr-FR" },
                                { label: "Galician", value: "gl-ES" },
                                { label: "Gujarati", value: "gu-IN" },
                                { label: "Hausa", value: "ha-NE" },
                                { label: "Hebrew", value: "he-IL" },
                                { label: "Hindi", value: "hi-IN" },
                                { label: "Croatian", value: "hr-HR" },
                                { label: "Hungarian", value: "hu-HU" },
                                { label: "Indonesian", value: "id-ID" },
                                { label: "Icelandic", value: "is-IS" },
                                { label: "Italian", value: "it-IT" },
                                { label: "Japanese", value: "ja-JP" },
                                { label: "Kazakh", value: "kk-KZ" },
                                { label: "Khmer", value: "km-KM" },
                                { label: "Kannada", value: "kn-IN" },
                                { label: "Korean", value: "ko-KR" },
                                { label: "Kurdish", value: "ku-TR" },
                                { label: "Kyrgyz", value: "ky-KG" },
                                { label: "Latin", value: "la-VA" },
                                { label: "Lao", value: "lo-LA" },
                                { label: "Latvian", value: "lv-LV" },
                                { label: "Mende", value: "men-SL" },
                                { label: "Malagasy", value: "mg-MG" },
                                { label: "Maori", value: "mi-NZ" },
                                { label: "Malay", value: "ms-MY" },
                                { label: "Maltese", value: "mt-MT" },
                                { label: "Burmese", value: "my-MM" },
                                { label: "Nepali", value: "ne-NP" },
                                { label: "Niuean", value: "niu-NU" },
                                { label: "Dutch", value: "nl-NL" },
                                { label: "Norwegian", value: "no-NO" },
                                { label: "Nyanja", value: "ny-MW" },
                                { label: "Pakistani", value: "ur-PK" },
                                { label: "Palauan", value: "pau-PW" },
                                { label: "Panjabi", value: "pa-IN" },
                                { label: "Pashto", value: "ps-PK" },
                                { label: "Pijin", value: "pis-SB" },
                                { label: "Polish", value: "pl-PL" },
                                { label: "Portuguese", value: "pt-PT" },
                                { label: "Kirundi", value: "rn-BI" },
                                { label: "Romanian", value: "ro-RO" },
                                { label: "Russian", value: "ru-RU" },
                                { label: "Sango", value: "sg-CF" },
                                { label: "Sinhala", value: "si-LK" },
                                { label: "Slovak", value: "sk-SK" },
                                { label: "Samoan", value: "sm-WS" },
                                { label: "Shona", value: "sn-ZW" },
                                { label: "Somali", value: "so-SO" },
                                { label: "Albanian", value: "sq-AL" },
                                { label: "Serbian", value: "sr-RS" },
                                { label: "Swedish", value: "sv-SE" },
                                { label: "Swahili", value: "sw-SZ" },
                                { label: "Tamil", value: "ta-LK" },
                                { label: "Telugu", value: "te-IN" },
                                { label: "Tetum", value: "tet-TL" },
                                { label: "Tajik", value: "tg-TJ" },
                               
                                { label: "Thai", value: "th-TH" },
                                { label: "Tigrinya", value: "ti-TI" },
                                { label: "Turkmen", value: "tk-TM" },
                                { label: "Tagalog", value: "tl-PH" },
                                { label: "Tswana", value: "tn-BW" },
                                { label: "Tongan", value: "to-TO" },
                                { label: "Turkish", value: "tr-TR" },
                                { label: "Ukrainian", value: "uk-UA" },
                                { label: "Uzbek", value: "uz-UZ" },
                                { label: "Vietnamese", value: "vi-VN" },
                                { label: "Wolof", value: "wo-SN" },
                                { label: "Xhosa", value: "xh-ZA" },
                                { label: "Yiddish", value: "yi-YD" },
                                { label: "Yoruba", value: "yo-NG" },
                                { label: "Chinese", value: "zh-CN" },
                                { label: "Zulu", value: "zu-ZA" }
                            ]}
                            placeholder="To"
                            containerStyle={{ flex: 1 }}
                        />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter text"
                        value={inputText}
                        onChangeText={setInputText}
                        multiline={true}
                    />
                    {loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <TouchableOpacity style={styles.button} onPress={translateText}>
                            <Text style={styles.buttonText}>Translate</Text>
                        </TouchableOpacity>
                    )}
                    {error && <Text style={styles.error}>{error}</Text>}
                    {translatedText && (
                        <View style={styles.outputContainer}>
                            <Text style={styles.outputTitle}>Translation:</Text>
                            <Text style={styles.output}>{translatedText}</Text>
                        </View>
                    )}
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    background: {
        flex: 1,
        width: '100%',
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    title: {
        fontSize: 39,
        fontWeight: 'bold',
        marginTop: -35,
        marginBottom: 30,
        color: 'black',
    },

    formContainer: {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // White with transparency
        padding: 16,
        borderRadius: 8,
        elevation: 2, // Add shadow for Android
        shadowColor: '#000', // Add shadow for iOS
        shadowOffset: { width: 0, height: 2 }, // Add shadow for iOS
        shadowOpacity: 0.2, // Add shadow for iOS
        shadowRadius: 4, // Add shadow for iOS
    },
    dropdownContainer: {
        flexDirection: 'row',
        marginBottom: 18,
    },
    input: {
        height: 100,
        borderColor: '#ced4da',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#fff',
        marginBottom: 16,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: 'brown',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    error: {
        marginTop: 16,
        color: '#dc3545',
        fontSize: 16,
    },
    translationHeading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center', // Center text horizontally
        color: 'red',
        alignSelf: 'center', // Center text vertically
        width: '100%', // Ensure the heading takes the full width of the form
    },
    
    outputContainer: {
        marginTop: 24,
        padding: 16,
        borderColor: '#ced4da',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#e9ecef',
    },
    outputTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    output: {
        fontSize: 16,
        color: '#495057',
    },
});

export default TranslatorScreen;





