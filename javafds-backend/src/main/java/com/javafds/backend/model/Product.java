package com.javafds.backend.model;

import com.google.firebase.database.IgnoreExtraProperties;
import lombok.Data;

@IgnoreExtraProperties
@Data
public class Product {
    private String id;
    private String name;
    private String sku;
    private String categoryId;
    private String category; // Some older records might have 'category' instead of 'categoryId'
    private Double price;
    private Integer quantity;
    private Integer stock; // Some older records might have 'stock' instead of 'quantity'
    private Integer minStock;
    private Boolean active;
    private String imageUrl;
    private String image; // Some older records might have 'image'
    private String unit;
    private String packSize;
    private String createdAt;
    
    // extra fields from frontend
    private String brand;
    private String description;
    private Double rating;
    private String status;
    private Double discount;
}
