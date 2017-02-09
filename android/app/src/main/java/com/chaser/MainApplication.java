package com.chaser;

import android.app.Application;
import android.content.Context;

import com.brentvatne.react.ReactVideoPackage;
import com.chaser.services.FireBaseLogin;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.google.firebase.messaging.FirebaseMessaging;
import com.zmxv.RNSound.RNSoundPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private static Context context;
  public static Context getAppContext() {
    return MainApplication.context;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReactVideoPackage(),
            new RNSoundPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    MainApplication.context = getApplicationContext();
    FireBaseLogin.login();
    FirebaseMessaging.getInstance().subscribeToTopic("wix-notifications");
  }
}
