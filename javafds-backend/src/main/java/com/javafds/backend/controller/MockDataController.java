package com.javafds.backend.controller;
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
