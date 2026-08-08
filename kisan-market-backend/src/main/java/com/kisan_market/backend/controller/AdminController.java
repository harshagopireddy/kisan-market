package com.kisan_market.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.kisan_market.backend.dto.AdminStats;
import com.kisan_market.backend.dto.UserDto;
import com.kisan_market.backend.entity.Order;
import com.kisan_market.backend.entity.Product;
import com.kisan_market.backend.service.AdminService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/users")
    public List<UserDto> getAllUsers() {
        return adminService.getAllUsers();
    }

    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable Long id) {
        adminService.deleteUser(id);
        return "User deleted successfully";
    }

    @GetMapping("/stats")
    public AdminStats getDashboardStats() {
        return adminService.getDashboardStats();
    }

    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return adminService.getAllProducts();
    }

    @DeleteMapping("/products/{id}")
    public String deleteProduct(@PathVariable Long id) {
        adminService.deleteProduct(id);
        return "Product deleted successfully";
    }

    @GetMapping("/orders")
    public List<Order> getAllOrders() {
        return adminService.getAllOrders();
    }
}
