package com.javafds.backend.controller;

import com.javafds.backend.model.ProductRequest;
import com.javafds.backend.service.FirebaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/stock-requests")
public class StockRequestController {

    @Autowired
    private FirebaseService firebaseService;

    @PostMapping
    public CompletableFuture<ProductRequest> create(@RequestBody ProductRequest request) {
        return firebaseService.saveStockRequest(request);
    }
}
