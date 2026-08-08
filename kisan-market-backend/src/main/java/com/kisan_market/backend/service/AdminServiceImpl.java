package com.kisan_market.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kisan_market.backend.dto.AdminStats;
import com.kisan_market.backend.dto.UserDto;
import com.kisan_market.backend.entity.Order;
import com.kisan_market.backend.entity.Product;
import com.kisan_market.backend.exception.NotFoundException;
import com.kisan_market.backend.repository.OrderRepository;
import com.kisan_market.backend.repository.ProductRepository;
import com.kisan_market.backend.repository.UserRepository;

@Service
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    public AdminServiceImpl(
            UserRepository userRepository,
            ProductRepository productRepository,
            OrderRepository orderRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
    }

    @Override
    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream().map(UserDto::from).toList();
    }

    @Override
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new NotFoundException("User not found");
        }
        userRepository.deleteById(id);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new NotFoundException("Product not found");
        }
        productRepository.deleteById(id);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public AdminStats getDashboardStats() {
        return new AdminStats(
                userRepository.count(),
                productRepository.count(),
                orderRepository.count());
    }
}
