package com.yaaliuzhipeng.mlkit.translatetext;

import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.google.mlkit.common.model.DownloadConditions;
import com.google.mlkit.common.model.RemoteModelManager;
import com.google.mlkit.nl.languageid.IdentifiedLanguage;
import com.google.mlkit.nl.languageid.LanguageIdentification;
import com.google.mlkit.nl.languageid.LanguageIdentifier;
import com.google.mlkit.nl.translate.TranslateLanguage;
import com.google.mlkit.nl.translate.TranslateRemoteModel;
import com.google.mlkit.nl.translate.Translation;
import com.google.mlkit.nl.translate.Translator;
import com.google.mlkit.nl.translate.TranslatorOptions;

public class MlkitTranslateTextModule extends ReactContextBaseJavaModule {

    private final String TAG = this.getName();
    private final ReactApplicationContext reactContext;

    public MlkitTranslateTextModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "MLKitTranslateText";
    }


    @ReactMethod
    void identifyLanguage(String text, Callback successCallback, Callback failCallback) {
        LanguageIdentifier languageIdentifier = LanguageIdentification.getClient();
        languageIdentifier.identifyLanguage(text)
                .addOnSuccessListener(v -> {
                    successCallback.invoke(v);
                    languageIdentifier.close();
                })
                .addOnFailureListener(e -> {
                    failCallback.invoke(e.getLocalizedMessage());
                    languageIdentifier.close();
                });
    }

    @ReactMethod
    void identifyPossibleLanguages(String text, Callback successCallback, Callback failCallback) {
        LanguageIdentifier languageIdentifier = LanguageIdentification.getClient();
        languageIdentifier.identifyPossibleLanguages(text)
                .addOnSuccessListener(identifiedLanguages -> {
                    WritableArray array = Arguments.createArray();
                    for (IdentifiedLanguage lang : identifiedLanguages) {
                        String code = lang.getLanguageTag();
                        float confidence = lang.getConfidence();
                        WritableMap map = Arguments.createMap();
                        map.putString("code", code);
                        map.putDouble("confidence", confidence);
                        array.pushMap(map);
                    }
                    successCallback.invoke(array);
                })
                .addOnFailureListener(e -> {
                    failCallback.invoke(e.getLocalizedMessage());
                });
    }

    @ReactMethod
    void translateText(String text, String sourceLanguageTag, String targetLanguageTag, Callback successCallback, Callback failCallback) {
        String sourceL = TranslateLanguage.fromLanguageTag(sourceLanguageTag);
        String targetL = TranslateLanguage.fromLanguageTag(targetLanguageTag);
        if (sourceL == null) {
            failCallback.invoke("unsupport source language");
            return;
        }
        if (targetL == null) {
            failCallback.invoke("unsupport target language");
            return;
        }
        TranslatorOptions options = new TranslatorOptions.Builder()
                .setSourceLanguage(sourceL)
                .setTargetLanguage(targetL)
                .build();
        final Translator translator = Translation.getClient(options);
        translator.translate(text)
                .addOnSuccessListener(v -> {
                    successCallback.invoke(v);
                    translator.close();
                })
                .addOnFailureListener(e -> {
                    failCallback.invoke(e.getLocalizedMessage());
                    translator.close();
                });
    }

    @ReactMethod
    void isModelDownloaded(String lang, Callback callback) {
        RemoteModelManager modelManager = RemoteModelManager.getInstance();
        TranslateRemoteModel lm = new TranslateRemoteModel
                .Builder(lang)
                .build();
        modelManager.isModelDownloaded(lm)
                .addOnSuccessListener(callback::invoke);
    }

    @ReactMethod
    void deleteDownloadedModel(String lang, Callback successCallback, Callback failCallback) {
        RemoteModelManager modelManager = RemoteModelManager.getInstance();
        TranslateRemoteModel lm = new TranslateRemoteModel
                .Builder(lang)
                .build();
        modelManager.isModelDownloaded(lm)
                .addOnSuccessListener(v -> {
                    if (v) {
                        modelManager.deleteDownloadedModel(lm)
                                .addOnSuccessListener(output -> {
                                    successCallback.invoke("success");
                                })
                                .addOnFailureListener(e -> {
                                    failCallback.invoke(e.getLocalizedMessage());
                                });
                    }
                })
                .addOnFailureListener(e -> {
                   failCallback.invoke(e.getLocalizedMessage());
                });
    }

    @ReactMethod
    void downloadModel(String lang, Callback successCallback, Callback failCallback) {
        RemoteModelManager modelManager = RemoteModelManager.getInstance();
        TranslateRemoteModel lm = new TranslateRemoteModel
                .Builder(lang)
                .build();
        modelManager.download(lm, new DownloadConditions.Builder().requireWifi().build())
                .addOnSuccessListener(v -> {
                    successCallback.invoke("success");
                })
                .addOnFailureListener(e -> {
                    failCallback.invoke(e.getLocalizedMessage());
                });
    }
}
