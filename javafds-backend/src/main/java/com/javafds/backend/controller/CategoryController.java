package com.javafds.backend.controller;
import com.javafds.backend.model.Category;
import com.javafds.backend.service.FirebaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/categorys")
public class CategoryController {
    
    @Autowired
    private FirebaseService firebaseService;

    @GetMapping
    public CompletableFuture<List<Category>> getAll() {
        return firebaseService.getCategories();
    }

    @PostMapping
    public CompletableFuture<Category> create(@RequestBody Category entity) {
        return firebaseService.saveCategory(entity);
    }

    @PutMapping("/{id}")
    public CompletableFuture<Category> update(@PathVariable String id, @RequestBody Category entity) {
        entity.setId(id);
        return firebaseService.saveCategory(entity);
    }

    @DeleteMapping("/{id}")
    public CompletableFuture<Void> delete(@PathVariable String id) {
        return firebaseService.deleteCategory(id);
    }
}
