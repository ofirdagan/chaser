/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.chaser.services;

import android.support.annotation.NonNull;
import android.util.Log;

import com.chaser.MainApplication;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.FirebaseInstanceIdService;


public class FireBaseTokenService extends FirebaseInstanceIdService {

    public FireBaseTokenService() {
        super();
    }

    private static final String TAG = "ChaserInstanceIDService";

    /**
     * Called if InstanceID token is updated. This may occur if the security of
     * the previous token had been compromised. Note that this is called when the InstanceID token
     * is initially generated so this is where you would retrieve the token.
     */
    // [START refresh_token]
    @Override
    public void onTokenRefresh() {
        // Get updated InstanceID token.
        String refreshedToken = FirebaseInstanceId.getInstance().getToken();
        Log.d(TAG, "Refreshed token: " + refreshedToken);

        // If you want to send messages to this application instance or
        // manage this apps subscriptions on the server side, send the
        // Instance ID token to your app server.
        sendRegistrationToServer(refreshedToken);
    }
    // [END refresh_token]

    /**
     * Persist token to third-party servers.
     *
     * Modify this method to associate the user's FCM InstanceID token with any server-side account
     * maintained by your application.
     *
     * @param token The new token.
     */
    private void sendRegistrationToServer(String token) {
        FirebaseDatabase database = FirebaseDatabase.getInstance();
        String email = UserEmailFetcher.getEmail(MainApplication.getAppContext());
        if (email != null) {
            Task<Void> voidTask = database.getReference().child("android_users").child(encodeAsFirebaseKey(email)).child("androidToken").setValue(token);
            voidTask.addOnCompleteListener(new OnCompleteListener<Void>() {
                @Override
                public void onComplete(@NonNull Task<Void> task) {
                    Log.d(TAG, "registerAndroidToken:onComplete:" + task.isSuccessful());
                    if (!task.isSuccessful()) {
                        Log.w(TAG, "registerAndroidToken:failed", task.getException());
                    }
                }
            });

        }
        else {
            Log.d(TAG, "got null email");
        }
    }

    private String encodeAsFirebaseKey(String s) {
        return s
          .replace(".", "%2E")
          .replace("$", "%24")
          .replace("#", "%23")
          .replace("[", "%5B")
          .replace("]", "%5D")
          .replace("/", "%2F");
    }

}