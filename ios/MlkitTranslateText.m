// MlkitTranslateText.m

#import "MlkitTranslateText.h"
@import MLKitLanguageID;
@import MLKitTranslate;
@import MLKitCommon;

@implementation MlkitTranslateText

RCT_EXPORT_MODULE(MLKitTranslateText)

RCT_EXPORT_METHOD(identifyLanguage:(NSString *) text
                  successCallback:(RCTResponseSenderBlock)successCallback
                  failCallback:(RCTResponseSenderBlock)failCallback )
{
    MLKLanguageIdentification *client = [MLKLanguageIdentification languageIdentification];
    
    [client identifyLanguageForText:text completion:^(NSString * _Nullable languageCode,
                                                      NSError * _Nullable error) {
        if (error != nil) {
            failCallback(@[error.localizedDescription]);
            return;
        }
        successCallback(@[languageCode]);
    }];
}

RCT_EXPORT_METHOD(identifyPossibleLanguages:(NSString *) text
                  successCallback:(RCTResponseSenderBlock)successCallback
                  failCallback:(RCTResponseSenderBlock)failCallback )
{
    MLKLanguageIdentification *client = [MLKLanguageIdentification languageIdentification];
    
    [client identifyPossibleLanguagesForText:text
                                  completion:^(NSArray * _Nonnull identifiedLanguages,
                                               NSError * _Nullable error) {
        if (error != nil) {
            failCallback(@[error.localizedDescription]);
            return;
        }
        NSMutableArray* marr = [NSMutableArray new];
        for (MLKIdentifiedLanguage *language in identifiedLanguages) {
            NSMutableDictionary* dictionary = [NSMutableDictionary new];
            [dictionary setObject:language.languageTag forKey: @"code"];
            [dictionary setObject: [[NSNumber alloc] initWithFloat:language.confidence] forKey: @"confidence"];
            [marr addObject:dictionary];
        }
        successCallback(@[marr]);
    }];
}

RCT_EXPORT_METHOD(translateText:(NSString *) text
                  sourceLanguageTag: (NSString *) sourceLanguageTag
                  targetLanguageTag: (NSString *) targetLanguageTag
                  successCallback:(RCTResponseSenderBlock)successCallback
                  failCallback:(RCTResponseSenderBlock)failCallback )
{
    MLKTranslatorOptions *options = [[MLKTranslatorOptions alloc] initWithSourceLanguage:sourceLanguageTag targetLanguage:targetLanguageTag];
    MLKTranslator *translator = [MLKTranslator translatorWithOptions: options];
    [translator translateText:text completion:^(NSString *_Nullable translatedText, NSError *_Nullable error) {
        if (error != nil) {
            failCallback(@[error.localizedDescription]);
            return;
        }
        successCallback(@[translatedText]);
    }];
}

RCT_EXPORT_METHOD(isModelDownloaded:(NSString *) lang
                  callback:(RCTResponseSenderBlock)callback)
{
    
    MLKTranslateRemoteModel *model = [MLKTranslateRemoteModel translateRemoteModelWithLanguage: lang];
    bool downloaded = [[MLKModelManager modelManager] isModelDownloaded: model];
    if (downloaded) {
        callback(@[@true]);
    }else{
        callback(@[@false]);
    }
}

RCT_EXPORT_METHOD(deleteDownloadedModel:(NSString *) lang
                  successCallback:(RCTResponseSenderBlock)successCallback
                  failCallback:(RCTResponseSenderBlock)failCallback )
{
    MLKTranslateRemoteModel *model = [MLKTranslateRemoteModel translateRemoteModelWithLanguage: lang];
    bool downloaded = [[MLKModelManager modelManager] isModelDownloaded: model];
    if(downloaded) {
        [[MLKModelManager modelManager] deleteDownloadedModel:model completion:^(NSError * _Nullable error) {
            if (error != nil) {
                failCallback(@[error.localizedDescription]);
                return;
            }
            successCallback(@[@"success"]);
        }];
    }
}

RCT_EXPORT_METHOD(downloadModel:(NSString *) lang
                  successCallback:(RCTResponseSenderBlock)successCallback
                  failCallback:(RCTResponseSenderBlock)failCallback )
{
    MLKModelDownloadConditions *conditions = [[MLKModelDownloadConditions alloc] initWithAllowsCellularAccess:NO
                                                                                  allowsBackgroundDownloading:YES];
    MLKTranslateRemoteModel *lmodel = [MLKTranslateRemoteModel translateRemoteModelWithLanguage: lang];
    [[MLKModelManager modelManager] downloadModel:lmodel conditions:conditions];
    id sob;
    id fob;
    sob = [NSNotificationCenter.defaultCenter
           addObserverForName:MLKModelDownloadDidSucceedNotification
           object:nil
           queue:nil
           usingBlock:^(NSNotification * _Nonnull note) {
        MLKTranslateRemoteModel *model = note.userInfo[MLKModelDownloadUserInfoKeyRemoteModel];
        if ([model isKindOfClass:[MLKTranslateRemoteModel class]] && model == lmodel) {
            successCallback(@[@"success"]);
        }
        [NSNotificationCenter.defaultCenter removeObserver:sob];
        [NSNotificationCenter.defaultCenter removeObserver:fob];
    }];
    fob = [NSNotificationCenter.defaultCenter
           addObserverForName:MLKModelDownloadDidFailNotification
           object:nil
           queue:nil
           usingBlock:^(NSNotification * _Nonnull note) {
        MLKTranslateRemoteModel *model = note.userInfo[MLKModelDownloadUserInfoKeyRemoteModel];
        if ([model isKindOfClass:[MLKTranslateRemoteModel class]] && model == lmodel) {
            NSError *error = note.userInfo[MLKModelDownloadUserInfoKeyError];
            failCallback(@[error.localizedDescription]);
        }
        [NSNotificationCenter.defaultCenter removeObserver:sob];
        [NSNotificationCenter.defaultCenter removeObserver:fob];
    }];
}

@end
