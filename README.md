** 📢 **
** Arhived ! Use New Library (support new arch) instead **
([fast-mlkit-translate-text](https://github.com/yaaliuzhipeng/fast-mlkit-translate-text))


<p align="center">
  <img src="https://github.com/yaaliuzhipeng/react-native-mlkit-translate-text/blob/main/raw/logo.png" alt="MLKitTranslator" width="539" />
</p>

<h4 align="center">
  A MachineLearning Language Translator
</h4>

<p align="center">
  Build Powerful React Native With Greate Language Identifier And Translator <em>Amazing</em> ⚡️
</p>

<p align="center">
  <a href="https://github.com/yaaliuzhipeng/react-native-mlkit-translate-text">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="MIT License">
  </a>
</p>

|     | MLKitTranslator                                                                                                                                                     |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ⚡️ | **Identify Language Immediately** over 50 languages supported ([full list](https://developers.google.com/ml-kit/language/translation/translation-language-support)) |
| 😎  | **Lazy loaded**. download models when needed                                                                                                                        |
| 🔄  | **Offline-first.** no network required for using                                                                                                                    |
| 📱  | **Multiplatform**. iOS, Android                                                                                                                                     |
| ⏱   | **Fast.** About TO Migrating to RN New Arch(JSI)                                                                                                                    |
| 🔗  | **Relational.** Built on MLKit [Translation](https://developers.google.com/ml-kit/language/translation) foundation                                                  |
| ⚠️  | **Static typing** Full-Support [TypeScript](https://typescriptlang.org)                                                                                             |

## Why MLKitTranslator?

Key capabilities

-   Broad language support Translate between more than 50 different languages. See the complete list.
-   Proven translation models Powered by the same models used by the Google Translate app's offline mode.
-   Dynamic model management Keep on-device storage requirements low by dynamically downloading and managing language packs.
-   Runs on the device Translations are performed quickly, and don't require you to send users' text to a remote server.

## Installation

> yarn add react-native-mlkit-entity-extraction

or

> npm i --save react-native-mlkit-entity-extraction

## Usage

**Quick example:** identify language type

```typescript
import MLKitTranslator, { LANG_TAGS } from './MLKitTranslator';

const Lang = 'Bonjour, c’est en français';

MLKitTranslator.identifyLanguage(text).then((result: string) => {
	setLanguageType(getHumanLang(result));
});
```

**Translate text example:** identify 、download model and translate

etc: you'd like to translate french to english

1️⃣ download model firstly

```js
import MLKitTranslator, { LANG_TAGS } from './MLKitTranslator';
//better do this in async function
await MLKitTranslator.downloadModel(LANG_TAGS.FRENCH);
await MLKitTranslator.downloadModel(LANG_TAGS.ENGLISH);
```

Remember !✨ Always check model firstly ;
**Do not translate text if the model is not downloaded**

> use NativeMLKitTranslateText.isModelDownloaded to check

2️⃣ translate text

```js
await MLKitTranslator.translateText(text, LANG_TAGS.FRENCH, LANG_TAGS.ENGLISH);

// 🎉 got it, dude
```

## Author and license

**ReactNativeMLKitTranslateText** was created by [@yaaliuzhipeng](https://github.com/yaaliuzhipeng)

react-native-mlkit-translate-text is available under the MIT license. See the [LICENSE file](./LICENSE) for more info.
