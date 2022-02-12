import React, { useState } from 'react';
import { View, Text, Pressable, Modal, SafeAreaView, FlatList, Alert } from 'react-native';
import MLKitTranslator, { LANG_TAGS } from './MLKitTranslator';

function rand255() {
	return Math.round(Math.random() * 255);
}
function getHumanLang(l: string) {
	for (let key of Object.keys(LANG_TAGS)) {
		if (LANG_TAGS[key] == l) return key;
	}
	return 'unknown language tag'
}
const App = (props) => {

	const langs = [
		"Hello, this is English",
		"Bonjour, c’est en français",
		"はい、こちらはフランス語です",
		"안녕하세요, 여기는 프랑스어입니다",
		"Здравствуйте, это французский",
	];

	const [targetLanguage, setTargetLanguage] = useState(getHumanLang(LANG_TAGS.CHINESE));
	const [languageType, setLanguageType] = useState('');
	const [translatedText, setTranslatedText] = useState('');
	const [visible, setVisible] = useState(false);
	const identify = (text: string) => {
		MLKitTranslator.identifyLanguage(text).then((v: any) => {
			setLanguageType(getHumanLang(v));
		})
	}
	const identifyAndTranslateTo = async (text: string) => {
		identify(text);
		try {
			
			let sourcelang: any = await MLKitTranslator.identifyLanguage(text);
			let isSourceLangDownloaded = await MLKitTranslator.isModelDownloaded(sourcelang);
			let isTargetLangDownloaded = await MLKitTranslator.isModelDownloaded(LANG_TAGS[targetLanguage]);
			if (!isSourceLangDownloaded || !isTargetLangDownloaded) {
				Alert.alert('identifyAndTranslateTo', 'model not available,downloading ... you will be notified again once downloaded');
				await MLKitTranslator.downloadModel(sourcelang)
				await MLKitTranslator.downloadModel(LANG_TAGS[targetLanguage])
				Alert.alert('identifyAndTranslateTo', 'downloaded success');
			} else {
				//downloaded both of s & t
				let result: any = await MLKitTranslator.translateText(text, sourcelang, LANG_TAGS[targetLanguage]);
				setTranslatedText(result);
			}
		} catch (error: any) {
			Alert.alert('identifyAndTranslateTo', error);
		}
	}
	const changeTargetLanguage = () => {
		setVisible(true);
	}

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f8fa' }}>
			<Modal visible={visible} transparent={false} animationType='fade'>
				<SafeAreaView style={{ backgroundColor: '#fff' }}>
					<FlatList
						data={Object.keys(LANG_TAGS)}
						keyExtractor={(item, index) => item}
						renderItem={({ item, index }) => {
							return (
								<Text onPress={() => {
									setTargetLanguage(item);
									setVisible(false);
								}} style={{ paddingStart: 30, paddingVertical: 15, color: '#000', fontSize: 18 }}>{item}</Text>
							)
						}}
					/>
				</SafeAreaView>
			</Modal>
			<Text style={{ color: '#000', fontWeight: 'bold', fontSize: 25 }}>🍻 MLKit 🍻</Text>
			<Text style={{ fontSize: 17, color: '#333', marginTop: 8 }}>☆☆☆Press Item To Identify Text ☆☆☆</Text>
			<Text style={{ fontSize: 15, color: '#333', marginTop: 8 }}>While Long Press Item To Translate Text</Text>
			<Text style={{ fontSize: 15, color: '#333', marginTop: 8, marginBottom: 20 }}>
				Press 'CHINESE' To Change Target
			</Text>
			<Pressable onPress={changeTargetLanguage} style={{ paddingVertical: 20 }}>
				<Text style={{ fontSize: 15, color: '#333' }}>Target Translate Language: <Text style={{ color: '#000', fontWeight: "bold" }}>{targetLanguage}</Text></Text>
			</Pressable>
			<View style={{ width: "100%", paddingHorizontal: 20 }}>
				{langs.map((lang, index) => {
					return (
						<Pressable
							key={lang}
							onPress={() => {
								identify(lang);
							}}
							onLongPress={() => {
								identifyAndTranslateTo(lang);
							}} 
							style={{ marginHorizontal: 15, paddingVertical: 10, paddingHorizontal: 20 }}>
							<Text style={{ fontSize: 18, color: `rgba(${rand255()},${rand255()},${rand255()},1.0)` }}>{lang}</Text>
						</Pressable>
					)
				})}
			</View>
			<View style={{ backgroundColor: '#FFF', borderRadius: 6, paddingHorizontal: 20, paddingVertical: 10, marginTop: 20 }}>
				<Text style={{ color: '#56565a', fontSize: 15 }}>Current Text is Of Language: <Text style={{ color: '#000' }}>{languageType}</Text></Text>
			</View>
			<View style={{ backgroundColor: '#FFF', borderRadius: 6, paddingHorizontal: 20, paddingVertical: 10, marginTop: 20 }}>
				<Text style={{ color: '#56565a', fontSize: 15 }}>Translated Text</Text>
				<Text style={{ marginTop: 6, color: '#000' }}>{translatedText}</Text>
			</View>
		</View>
	)
}
export default App;