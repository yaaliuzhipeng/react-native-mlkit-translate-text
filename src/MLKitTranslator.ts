import { NativeModules, Platform } from 'react-native';

const { MLKitTranslateText: NativeMLKitTranslateText } = NativeModules;

export const LANG_TAGS = {
    AFRIKAANS: "af",
    ALBANIAN: "sq",
    ARABIC: "ar",
    BELARUSIAN: "be",
    BULGARIAN: "bg",
    BENGALI: "bn",
    CATALAN: "ca",
    CHINESE: "zh",
    CROATIAN: "hr",
    CZECH: "cs",
    DANISH: "da",
    DUTCH: "nl",
    ENGLISH: "en",
    ESPERANTO: "eo",
    ESTONIAN: "et",
    FINNISH: "fi",
    FRENCH: "fr",
    GALICIAN: "gl",
    GEORGIAN: "ka",
    GERMAN: "de",
    GREEK: "el",
    GUJARATI: "gu",
    HAITIAN_CREOLE: "ht",
    HEBREW: "he",
    HINDI: "hi",
    HUNGARIAN: "hu",
    ICELANDIC: "is",
    INDONESIAN: "id",
    IRISH: "ga",
    ITALIAN: "it",
    JAPANESE: "ja",
    KANNADA: "kn",
    KOREAN: "ko",
    LITHUANIAN: "lt",
    LATVIAN: "lv",
    MACEDONIAN: "mk",
    MARATHI: "mr",
    MALAY: "ms",
    MALTESE: "mt",
    NORWEGIAN: "no",
    PERSIAN: "fa",
    POLISH: "pl",
    PORTUGUESE: "pt",
    ROMANIAN: "ro",
    RUSSIAN: "ru",
    SLOVAK: "sk",
    SLOVENIAN: "sl",
    SPANISH: "es",
    SWEDISH: "sv",
    SWAHILI: "sw",
    TAGALOG: "tl",
    TAMIL: "ta",
    TELUGU: "te",
    THAI: "th",
    TURKISH: "tr",
    UKRAINIAN: "uk",
    URDU: "ur",
    VIETNAMESE: "vi",
    WELSH: "cy",
}
export type LANG_TAGS_TYPE = 'AFRIKAANS' |
    'ALBANIAN' |
    'ARABIC' |
    'BELARUSIAN' |
    'BULGARIAN' |
    'BENGALI' |
    'CATALAN' |
    'CHINESE' |
    'CROATIAN' |
    'CZECH' |
    'DANISH' |
    'DUTCH' |
    'ENGLISH' |
    'ESPERANTO' |
    'ESTONIAN' |
    'FINNISH' |
    'FRENCH' |
    'GALICIAN' |
    'GEORGIAN' |
    'GERMAN' |
    'GREEK' |
    'GUJARATI' |
    'HAITIAN_CREOLE' |
    'HEBREW' |
    'HINDI' |
    'HUNGARIAN' |
    'ICELANDIC' |
    'INDONESIAN' |
    'IRISH' |
    'ITALIAN' |
    'JAPANESE' |
    'KANNADA' |
    'KOREAN' |
    'LITHUANIAN' |
    'LATVIAN' |
    'MACEDONIAN' |
    'MARATHI' |
    'MALAY' |
    'MALTESE' |
    'NORWEGIAN' |
    'PERSIAN' |
    'POLISH' |
    'PORTUGUESE' |
    'ROMANIAN' |
    'RUSSIAN' |
    'SLOVAK' |
    'SLOVENIAN' |
    'SPANISH' |
    'SWEDISH' |
    'SWAHILI' |
    'TAGALOG' |
    'TAMIL' |
    'TELUGU' |
    'THAI' |
    'TURKISH' |
    'UKRAINIAN' |
    'URDU' |
    'VIETNAMESE' |
    'WELSH';

const identifyLanguage = (text: string) => {
    return new Promise((resolver, rejecter) => {
        NativeMLKitTranslateText.identifyLanguage(
            text,
            (v) => { resolver(v); },
            (e) => { rejecter(e); });
    });
}
const identifyPossibleLanguages = (text: string) => {
    return new Promise((resolver, rejecter) => {
        NativeMLKitTranslateText.identifyLanguage(
            text,
            (v) => { resolver(v); },
            (e) => { rejecter(e); });
    });
}
const translateText = (text: string, sourceLanguage: LANG_TAGS_TYPE, targetLanguage: LANG_TAGS_TYPE) => {
    return new Promise((resolver, rejecter) => {
        if (LANG_TAGS[sourceLanguage] === undefined || LANG_TAGS[targetLanguage] === undefined) {
            rejecter('unsupport language');
            return;
        }
        NativeMLKitTranslateText.translateText(
            text,
            LANG_TAGS[sourceLanguage],
            LANG_TAGS[targetLanguage],
            (v) => { resolver(v); },
            (e) => { rejecter(e); });
    });
}
const isModelDownloaded = (language: LANG_TAGS_TYPE) => {
    return new Promise((resolver, rejecter) => {
        if (LANG_TAGS[language] === undefined) {
            rejecter('unsupport language');
            return;
        }
        NativeMLKitTranslateText.isModelDownloaded(
            LANG_TAGS[language],
            (v) => {
                if (Platform.OS === 'ios') {
                    resolver(v === 1 ? true : false);
                } else {
                    resolver(v);
                }
            },
            // (e) => { rejecter(e); } // no need for now
        );
    });
}
const deleteDownloadedModel = (language: LANG_TAGS_TYPE) => {
    return new Promise((resolver, rejecter) => {
        if (LANG_TAGS[language] === undefined) {
            rejecter('unsupport language');
            return;
        }
        NativeMLKitTranslateText.deleteDownloadedModel(
            LANG_TAGS[language],
            (v) => { resolver(v); },
            (e) => { rejecter(e); }
        );
    });
}
const downloadModel = (language: LANG_TAGS_TYPE) => {
    return new Promise((resolver, rejecter) => {
        if (LANG_TAGS[language] === undefined) {
            rejecter('unsupport language');
            return;
        }
        NativeMLKitTranslateText.downloadModel(
            LANG_TAGS[language],
            (v) => { resolver(v); },
            (e) => { rejecter(e); }
        );
    });
}

const MLKitTranslator = {
    identifyLanguage,
    identifyPossibleLanguages,
    translateText,
    isModelDownloaded,
    deleteDownloadedModel,
    downloadModel
}
export default MLKitTranslator;
export {
    identifyLanguage,
    identifyPossibleLanguages,
    translateText,
    isModelDownloaded,
    deleteDownloadedModel,
    downloadModel
}