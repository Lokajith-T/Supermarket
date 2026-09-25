package com.javafds.backend.service;

import com.google.firebase.database.*;
import com.javafds.backend.model.Category;
import com.javafds.backend.model.Product;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

@Service
public class FirebaseService {

    public CompletableFuture<List<Product>> getProducts() {
        CompletableFuture<List<Product>> future = new CompletableFuture<>();
        DatabaseReference ref = FirebaseDatabase.getInstance().getReference("products");
        ref.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                List<Product> products = new ArrayList<>();
                for (DataSnapshot child : dataSnapshot.getChildren()) {
                    Product p = child.getValue(Product.class);
                    if (p != null) {
                        p.setId(child.getKey()); // Assign the Firebase key as ID
                        products.add(p);
                    }
                }
                future.complete(products);
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                future.completeExceptionally(databaseError.toException());
            }
        });
        return future;
    }

    public CompletableFuture<Product> saveProduct(Product product) {
        CompletableFuture<Product> future = new CompletableFuture<>();
        DatabaseReference ref = FirebaseDatabase.getInstance().getReference("products");
        String id = product.getId();
        if (id == null || id.isEmpty()) {
            id = ref.push().getKey();
            product.setId(id);
        }
        
        ref.child(id).setValue(product, (databaseError, databaseReference) -> {
            if (databaseError != null) {
                future.completeExceptionally(databaseError.toException());
            } else {
                future.complete(product);
            }
        });
        return future;
    }

    public CompletableFuture<Void> deleteProduct(String id) {
        CompletableFuture<Void> future = new CompletableFuture<>();
        FirebaseDatabase.getInstance().getReference("products").child(id).removeValue((databaseError, databaseReference) -> {
            if (databaseError != null) {
                future.completeExceptionally(databaseError.toException());
            } else {
                future.complete(null);
            }
        });
        return future;
    }

    // Categories
    public CompletableFuture<List<Category>> getCategories() {
        CompletableFuture<List<Category>> future = new CompletableFuture<>();
        DatabaseReference ref = FirebaseDatabase.getInstance().getReference("categories");
        ref.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                List<Category> categories = new ArrayList<>();
                for (DataSnapshot child : dataSnapshot.getChildren()) {
                    Category c = child.getValue(Category.class);
                    if (c != null) {
                        c.setId(child.getKey());
                        categories.add(c);
                    }
                }
                future.complete(categories);
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                future.completeExceptionally(databaseError.toException());
            }
        });
        return future;
    }

    public CompletableFuture<Category> saveCategory(Category category) {
        CompletableFuture<Category> future = new CompletableFuture<>();
        DatabaseReference ref = FirebaseDatabase.getInstance().getReference("categories");
        String id = category.getId();
        if (id == null || id.isEmpty()) {
            id = ref.push().getKey();
            category.setId(id);
        }
        
        ref.child(id).setValue(category, (databaseError, databaseReference) -> {
            if (databaseError != null) {
                future.completeExceptionally(databaseError.toException());
            } else {
                future.complete(category);
            }
        });
        return future;
    }

    public CompletableFuture<Void> deleteCategory(String id) {
        CompletableFuture<Void> future = new CompletableFuture<>();
        FirebaseDatabase.getInstance().getReference("categories").child(id).removeValue((databaseError, databaseReference) -> {
            if (databaseError != null) {
                future.completeExceptionally(databaseError.toException());
            } else {
                future.complete(null);
            }
        });
        return future;
    }

    // Stock Requests
    public CompletableFuture<com.javafds.backend.model.ProductRequest> saveStockRequest(com.javafds.backend.model.ProductRequest request) {
        CompletableFuture<com.javafds.backend.model.ProductRequest> future = new CompletableFuture<>();
        DatabaseReference ref = FirebaseDatabase.getInstance().getReference("stockRequests");
        String id = request.getId();
        if (id == null || id.isEmpty()) {
            id = ref.push().getKey();
            request.setId(id);
        }
        
        ref.child(id).setValue(request, (databaseError, databaseReference) -> {
            if (databaseError != null) {
                future.completeExceptionally(databaseError.toException());
            } else {
                future.complete(request);
            }
        });
        return future;
    }

    public CompletableFuture<List<com.javafds.backend.model.ProductRequest>> getStockRequests() {
        CompletableFuture<List<com.javafds.backend.model.ProductRequest>> future = new CompletableFuture<>();
        DatabaseReference ref = FirebaseDatabase.getInstance().getReference("stockRequests");
        ref.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                List<com.javafds.backend.model.ProductRequest> requests = new ArrayList<>();
                for (DataSnapshot child : dataSnapshot.getChildren()) {
                    com.javafds.backend.model.ProductRequest r = child.getValue(com.javafds.backend.model.ProductRequest.class);
                    if (r != null) {
                        r.setId(child.getKey());
                        requests.add(r);
                    }
                }
                future.complete(requests);
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                future.completeExceptionally(databaseError.toException());
            }
        });
        return future;
    }
}
