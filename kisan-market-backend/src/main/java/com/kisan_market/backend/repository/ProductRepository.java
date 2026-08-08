package com.kisan_market.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kisan_market.backend.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategory(String category);

    List<Product> findByFarmerId(Long farmerId);

    List<Product> findAllByOrderByCreatedAtDesc();
}
