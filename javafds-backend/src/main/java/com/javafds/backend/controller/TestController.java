package com.javafds.backend.controller;

import com.google.firebase.FirebaseApp;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.io.StringWriter;
import java.io.PrintWriter;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseOptions;
import java.io.InputStream;

@RestController
public class TestController {

    @GetMapping("/api/test-firebase")
    public String testFirebase() {
        if (!FirebaseApp.getApps().isEmpty()) {
            return "Firebase is initialized!";
        }
        
        try {
            InputStream serviceAccount = getClass().getClassLoader().getResourceAsStream("serviceAccountKey.json");
            if (serviceAccount == null) return "serviceAccountKey.json not found";
            
            FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setDatabaseUrl("https://sentinal-vision-default-rtdb.firebaseio.com")
                .build();
                
            FirebaseApp.initializeApp(options);
            return "Initialized successfully on manual trigger!";
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            return sw.toString();
        }
    }
}
