package com.javafds.backend.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Configuration;

import jakarta.annotation.PostConstruct;
import java.io.InputStream;
import java.io.ByteArrayInputStream;
import java.nio.charset.StandardCharsets;

@Configuration
public class FirebaseConfig {

    @PostConstruct
    public void init() {
        try {
            InputStream serviceAccount = null;
            String envCredentials = System.getenv("FIREBASE_CREDENTIALS");
            
            if (envCredentials != null && !envCredentials.isEmpty()) {
                serviceAccount = new ByteArrayInputStream(envCredentials.getBytes(StandardCharsets.UTF_8));
                System.out.println("Using FIREBASE_CREDENTIALS from environment variables.");
            } else {
                serviceAccount = getClass().getClassLoader().getResourceAsStream("serviceAccountKey.json");
            }
            
            if (serviceAccount == null) {
                System.err.println("Firebase credentials not found! Please set FIREBASE_CREDENTIALS env var or add serviceAccountKey.json");
                return;
            }

            FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setDatabaseUrl("https://sentinal-vision-default-rtdb.firebaseio.com")
                .build();

            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
                System.out.println("Firebase Admin SDK initialized successfully.");
            }
        } catch (Exception e) {
            System.err.println("CRITICAL ERROR: Failed to initialize Firebase!");
            e.printStackTrace();
            throw new RuntimeException("Firebase initialization failed", e);
        }
    }
}
