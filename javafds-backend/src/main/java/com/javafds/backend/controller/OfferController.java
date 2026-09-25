package com.javafds.backend.controller;
import com.javafds.backend.model.Offer;
import com.javafds.backend.repository.OfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/offers")
public class OfferController {
    @Autowired
    private OfferRepository repository;

    @GetMapping
    public List<Offer> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Offer create(@RequestBody Offer entity) {
        return repository.save(entity);
    }
}
