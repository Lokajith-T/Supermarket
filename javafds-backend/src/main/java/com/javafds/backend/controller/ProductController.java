package com.javafds.backend.controller;
import com.javafds.backend.model.Product;
import com.javafds.backend.service.FirebaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    
    @Autowired
    private FirebaseService firebaseService;

    @GetMapping
    public CompletableFuture<List<Product>> getAll() {
        return firebaseService.getProducts();
    }

    @PostMapping
    public CompletableFuture<Product> create(@RequestBody Product entity) {
        return firebaseService.saveProduct(entity);
    }

    @PutMapping("/{id}")
    public CompletableFuture<Product> update(@PathVariable String id, @RequestBody Product entity) {
        entity.setId(id);
        return firebaseService.saveProduct(entity);
    }

    @DeleteMapping("/{id}")
    public CompletableFuture<Void> delete(@PathVariable String id) {
        return firebaseService.deleteProduct(id);
    }
}
