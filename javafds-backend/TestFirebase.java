import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import java.io.FileInputStream;
import java.io.InputStream;

public class TestFirebase {
    public static void main(String[] args) {
        try {
            InputStream serviceAccount = new FileInputStream("D:\\JSD Training\\javafds-backend\\src\\main\\resources\\serviceAccountKey.json");
            FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setDatabaseUrl("https://sentinal-vision-default-rtdb.firebaseio.com")
                .build();
            FirebaseApp.initializeApp(options);
            System.out.println("SUCCESS");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
