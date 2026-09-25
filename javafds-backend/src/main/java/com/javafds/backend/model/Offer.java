package com.javafds.backend.model;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Offer {
    @Id
    private String id;
    private String title;
    private String discount;
    private String expiry;
    private String description;
    private String image;
}
