package com.kisan_market.backend.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.kisan_market.backend.entity.Product;
import com.kisan_market.backend.entity.User;
import com.kisan_market.backend.service.ProductService;
import com.kisan_market.backend.service.UserService;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;
    private final UserService userService;

    public ProductController(ProductService productService, UserService userService) {
        this.productService = productService;
        this.userService = userService;
    }

    @PostMapping("/add")
    public Product addProduct(@RequestBody Product product, Authentication authentication) {
        User farmer = userService.findByEmail(authentication.getName());
        return productService.addProduct(product, farmer);
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @GetMapping("/farmer/{farmerId}")
    public List<Product> getProductsByFarmer(@PathVariable Long farmerId) {
        return productService.getProductsByFarmer(farmerId);
    }

    @PutMapping("/{id}")
    public Product updateProduct(
            @PathVariable Long id,
            @RequestBody Product product,
            Authentication authentication) {
        User user = userService.findByEmail(authentication.getName());
        return productService.updateProduct(id, product, user);
    }

    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable Long id, Authentication authentication) {
        User user = userService.findByEmail(authentication.getName());
        productService.deleteProduct(id, user);
        return "Product Deleted Successfully";
    }
}

// commit;
