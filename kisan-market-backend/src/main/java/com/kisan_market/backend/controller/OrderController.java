package com.kisan_market.backend.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.kisan_market.backend.dto.PlaceOrderRequest;
import com.kisan_market.backend.entity.Order;
import com.kisan_market.backend.entity.Role;
import com.kisan_market.backend.entity.User;
import com.kisan_market.backend.exception.ForbiddenException;
import com.kisan_market.backend.service.OrderService;
import com.kisan_market.backend.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;

    public OrderController(OrderService orderService, UserService userService) {
        this.orderService = orderService;
        this.userService = userService;
    }

    @PostMapping("/place")
    public Order placeOrder(@Valid @RequestBody PlaceOrderRequest request, Authentication authentication) {
        User buyer = userService.findByEmail(authentication.getName());
        return orderService.placeOrder(request, buyer);
    }

    @GetMapping
    public List<Order> getOrders(Authentication authentication) {
        User user = userService.findByEmail(authentication.getName());
        return orderService.getOrders(user);
    }

    @PutMapping("/status/{id}")
    public Order updateStatus(
            @PathVariable Long id,
            @RequestParam String status,
            Authentication authentication) {
        User user = userService.findByEmail(authentication.getName());
        return orderService.updateStatus(id, status, user);
    }

    @GetMapping("/buyer/{buyerId}")
    public List<Order> getBuyerOrders(@PathVariable Long buyerId, Authentication authentication) {
        User user = userService.findByEmail(authentication.getName());
        if (user.getRole() != Role.ADMIN && !user.getId().equals(buyerId)) {
            throw new ForbiddenException("You can only view your own orders");
        }
        return orderService.getOrdersByBuyer(buyerId);
    }
}
