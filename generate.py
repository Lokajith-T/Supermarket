import os

base_dir = r'd:\JSD Training\javafds-backend\src\main\java\com\javafds\backend'
os.makedirs(os.path.join(base_dir, 'model'), exist_ok=True)
os.makedirs(os.path.join(base_dir, 'repository'), exist_ok=True)
os.makedirs(os.path.join(base_dir, 'controller'), exist_ok=True)
os.makedirs(os.path.join(base_dir, 'config'), exist_ok=True)
os.makedirs(os.path.join(base_dir, 'service'), exist_ok=True)

# CORS config
with open(os.path.join(base_dir, 'config', 'CorsConfig.java'), 'w') as f:
    f.write('''package com.javafds.backend.config;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOrigins("*").allowedMethods("GET", "POST", "PUT", "DELETE");
    }
}
''')

# Category Entity
with open(os.path.join(base_dir, 'model', 'Category.java'), 'w') as f:
    f.write('''package com.javafds.backend.model;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Category {
    @Id
    private String id;
    private String name;
    private Integer productCount;
    private String icon;
    private String accent;
    private String image;
}
''')

# Product Entity
with open(os.path.join(base_dir, 'model', 'Product.java'), 'w') as f:
    f.write('''package com.javafds.backend.model;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Product {
    @Id
    private String id;
    private String name;
    private String brand;
    private String description;
    private Double price;
    private String unit;
    private String category;
    private Integer stock;
    private Double rating;
    private String image;
    private String status;
    private Double discount;
    private String sku;
}
''')

# Offer Entity
with open(os.path.join(base_dir, 'model', 'Offer.java'), 'w') as f:
    f.write('''package com.javafds.backend.model;
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
''')

# Repositories
for name in ['Category', 'Product', 'Offer']:
    with open(os.path.join(base_dir, 'repository', f'{name}Repository.java'), 'w') as f:
        f.write(f'''package com.javafds.backend.repository;
import com.javafds.backend.model.{name};
import org.springframework.data.jpa.repository.JpaRepository;

public interface {name}Repository extends JpaRepository<{name}, String> {{
}}
''')

# Controllers
for name in ['Category', 'Product', 'Offer']:
    with open(os.path.join(base_dir, 'controller', f'{name}Controller.java'), 'w') as f:
        f.write(f'''package com.javafds.backend.controller;
import com.javafds.backend.model.{name};
import com.javafds.backend.repository.{name}Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/{name.lower()}s")
public class {name}Controller {{
    @Autowired
    private {name}Repository repository;

    @GetMapping
    public List<{name}> getAll() {{
        return repository.findAll();
    }}

    @PostMapping
    public {name} create(@RequestBody {name} entity) {{
        return repository.save(entity);
    }}
}}
''')

# Mock Data Controller for the rest
with open(os.path.join(base_dir, 'controller', 'MockDataController.java'), 'w') as f:
    f.write('''package com.javafds.backend.controller;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/mock")
public class MockDataController {
    
    @GetMapping("/notifications")
    public List<Map<String, Object>> getNotifications() {
        return Arrays.asList(
            Map.of("id", "n1", "type", "Back in stock", "title", "Organic Milk is back", "description", "FarmFresh Organic Milk is available again for delivery.", "time", "4 min ago", "read", false),
            Map.of("id", "n2", "type", "Order update", "title", "Your order is on the way", "description", "Order #ORD1028 is out for delivery.", "time", "18 min ago", "read", false)
        );
    }
    
    @GetMapping("/orders")
    public List<Map<String, Object>> getOrders() {
        return Arrays.asList(
            Map.of("id", "#ORD1023", "date", "2026-09-20", "items", 4, "amount", 1245, "status", "Completed", "eta", "Delivered"),
            Map.of("id", "#ORD1024", "date", "2026-09-21", "items", 3, "amount", 890, "status", "Processing", "eta", "Packed")
        );
    }
    
    @GetMapping("/loyalty")
    public List<Map<String, Object>> getLoyalty() {
        return Arrays.asList(
            Map.of("id", "lt1", "type", "earned", "points", 15, "label", "Purchase #ORD1023", "date", "2026-09-20"),
            Map.of("id", "lt3", "type", "redeemed", "points", -1000, "label", "Reward redeemed", "date", "2026-09-13")
        );
    }
}
''')
