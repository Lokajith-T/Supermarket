# Migration to Java Backend

We have successfully created a Java Spring Boot backend for this project in the `javafds-backend` directory.

## 1. Running the Java Backend

1. Open a new terminal in the `d:\JSD Training\javafds-backend` directory.
2. Run the Spring Boot application using Maven:
   ```bash
   # On Windows PowerShell
   .\mvnw.cmd spring-boot:run
   ```
   *If you don't have Maven installed, you can use the wrapper. The backend will start on `http://localhost:8081`.*
3. The backend uses an in-memory H2 database, which you can view by navigating to `http://localhost:8081/h2-console` (JDBC URL: `jdbc:h2:mem:javafdsdb`, Username: `sa`, Password: `[empty]`).

## 2. API Endpoints Created

The backend provides the following REST endpoints that replace your Firebase and `mockData.ts` objects:

- **Products**: `GET /api/products`, `POST /api/products`
- **Categories**: `GET /api/categorys`, `POST /api/categorys` (Note the pluralization, you can change this in the Controller).
- **Offers**: `GET /api/offers`, `POST /api/offers`
- **Mock Notifications**: `GET /api/mock/notifications`
- **Mock Orders**: `GET /api/mock/orders`
- **Mock Loyalty**: `GET /api/mock/loyalty`

## 3. Connecting the Frontend (React)

You need to replace your synchronous `mockData.ts` and `firebase` imports with asynchronous `fetch` calls to the Spring Boot API. Here is an example of how it is done for the Products list in `HomePage.tsx`:

### Before (Firebase):
```tsx
useEffect(() => {
  const productsRef = ref(database, 'products');
  const unsub = onValue(productsRef, (snapshot) => {
    // Process data...
  });
  return () => unsub();
}, []);
```

### After (Java Spring Boot):
```tsx
useEffect(() => {
  fetch('http://localhost:8081/api/products')
    .then(response => response.json())
    .then(data => {
      setFirebaseProducts(data); // Assuming data matches your Product type
    })
    .catch(error => console.error('Error fetching products:', error));
}, []);
```

You should apply this pattern to all your pages like `ProductListPage.tsx`, `AdminDashboardPage.tsx`, etc., by removing the `import { ... } from '@/data/mockData'` and adding `useEffect` with `fetch`.

## 4. Next Steps

- **Populate Data**: You'll need to populate the H2 database with your products/categories by writing a simple `CommandLineRunner` in Spring Boot, or using `POST` requests.
- **Update Components**: Iterate through the pages and replace `mockData` imports with the `fetch` API logic.
