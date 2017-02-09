package com.chaser.services;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;

import com.chaser.MainApplication;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import java.util.HashMap;
import java.util.Map;

public class NotificationService extends FirebaseMessagingService {

    private static final String TAG = "NotificationService";

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);
        Log.d(TAG, "From: " + remoteMessage.getFrom());

        // Check if message contains a data payload.
        Map<String, String> data = remoteMessage.getData();
        if (data.size() > 0) {
            handleSpecialNotifications(data);
        }
    }

    public void handleSpecialNotifications(Map<String, String> data) {
        Log.d(TAG, "Message data payload: " + data);
        if (data.containsKey("type")) {
            String type = data.get("type");
            if (type.equals("url")) {
                String url = data.get("value");
                Intent i = new Intent(Intent.ACTION_VIEW);
                i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                i.setData(Uri.parse(url));
                MainApplication.getAppContext().startActivity(i);
            }
        }
    }

    public void handleSpecialNotifications(Bundle bundle) {
        if (bundle != null && bundle.containsKey("type")) {
            Map<String, String> data = new HashMap<>();
            data.put("type", bundle.getString("type"));
            data.put("value", bundle.getString("value"));
            handleSpecialNotifications(data);
        }
    }
}
