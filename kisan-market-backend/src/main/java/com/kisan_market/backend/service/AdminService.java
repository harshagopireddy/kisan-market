package com.kisan_market.backend.service;

import java.util.List;

import com.kisan_market.backend.dto.AdminStats;
import com.kisan_market.backend.dto.UserDto;
import com.kisan_market.backend.entity.Order;
import com.kisan_market.backend.entity.Product;

public interface AdminService {

    List<UserDto> getAllUsers();

    void deleteUser(Long id);

    List<Product> getAllProducts();

    void deleteProduct(Long id);

    List<Order> getAllOrders();

    AdminStats getDashboardStats();
}
