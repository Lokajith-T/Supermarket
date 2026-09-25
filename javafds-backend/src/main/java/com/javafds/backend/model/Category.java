package com.javafds.backend.model;

import com.google.firebase.database.IgnoreExtraProperties;
import lombok.Data;

@IgnoreExtraProperties
@Data
public class Category {
    private String id;
    private String name;
    private Integer productCount;
    private String icon;
    private String accent;
    private String image;
    private String createdAt;
    private Boolean active;
}
