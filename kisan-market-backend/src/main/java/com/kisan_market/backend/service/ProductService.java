package com.kisan_market.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kisan_market.backend.entity.Product;
import com.kisan_market.backend.entity.Role;
import com.kisan_market.backend.entity.User;
import com.kisan_market.backend.exception.ForbiddenException;
import com.kisan_market.backend.exception.NotFoundException;
import com.kisan_market.backend.repository.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product addProduct(Product product, User farmer) {
        product.setId(null);
        product.setFarmerId(farmer.getId());
        product.setFarmerName(farmer.getName());
        if (product.getContactNumber() == null || product.getContactNumber().isBlank()) {
            product.setContactNumber(farmer.getPhone());
        }
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAllByOrderByCreatedAtDesc();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Product not found"));
    }

    public List<Product> getProductsByFarmer(Long farmerId) {
        return productRepository.findByFarmerId(farmerId);
    }

    public void deleteProduct(Long id, User user) {
        Product product = getProductById(id);
        if (user.getRole() != Role.ADMIN && !product.getFarmerId().equals(user.getId())) {
            throw new ForbiddenException("You can only delete your own products");
        }
        productRepository.deleteById(id);
    }

    public Product updateProduct(Long id, Product product, User user) {
        Product existing = getProductById(id);
        if (user.getRole() != Role.ADMIN && !existing.getFarmerId().equals(user.getId())) {
            throw new ForbiddenException("You can only update your own products");
        }

        existing.setProductName(product.getProductName());
        existing.setCategory(product.getCategory());
        existing.setDescription(product.getDescription());
        existing.setPrice(product.getPrice());
        existing.setQuantity(product.getQuantity());
        existing.setImageUrl(product.getImageUrl());
        existing.setLocation(product.getLocation());
        existing.setContactNumber(product.getContactNumber());

        return productRepository.save(existing);
    }
}
