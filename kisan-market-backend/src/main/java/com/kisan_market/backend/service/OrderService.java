package com.kisan_market.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kisan_market.backend.dto.PlaceOrderRequest;
import com.kisan_market.backend.entity.Order;
import com.kisan_market.backend.entity.Product;
import com.kisan_market.backend.entity.Role;
import com.kisan_market.backend.entity.User;
import com.kisan_market.backend.exception.BadRequestException;
import com.kisan_market.backend.exception.ForbiddenException;
import com.kisan_market.backend.exception.NotFoundException;
import com.kisan_market.backend.repository.OrderRepository;
import com.kisan_market.backend.repository.ProductRepository;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public OrderService(OrderRepository orderRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    @Transactional
    public Order placeOrder(PlaceOrderRequest request, User buyer) {
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new NotFoundException("Product not found"));

        if (product.getQuantity() < request.getQuantity()) {
            throw new BadRequestException("Not enough stock available");
        }

        product.setQuantity(product.getQuantity() - request.getQuantity());
        productRepository.save(product);

        Order order = new Order();
        order.setProductId(product.getId());
        order.setProductName(product.getProductName());
        order.setBuyerId(buyer.getId());
        order.setBuyerName(buyer.getName());
        order.setBuyerEmail(buyer.getEmail());
        order.setFarmerId(product.getFarmerId());
        order.setDeliveryLocation(request.getDeliveryLocation());
        order.setQuantity(request.getQuantity());
        order.setTotalPrice(product.getPrice() * request.getQuantity());
        order.setPaymentMethod(request.getPaymentMethod() == null || request.getPaymentMethod().isBlank()
                ? "OFFLINE" : request.getPaymentMethod());
        order.setStatus("PLACED");

        return orderRepository.save(order);
    }

    public List<Order> getOrders(User user) {
        if (user.getRole() == Role.ADMIN) {
            return orderRepository.findAll();
        }
        return orderRepository.findByFarmerId(user.getId());
    }

    public Order updateStatus(Long id, String status, User user) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Order not found"));

        if (user.getRole() != Role.ADMIN && !user.getId().equals(order.getFarmerId())) {
            throw new ForbiddenException("You can only update your own orders");
        }

        String current = order.getStatus();
        String next = status == null ? null : status.trim().toUpperCase();

        if (!isAllowedTransition(current, next)) {
            throw new BadRequestException(
                    "Cannot change status from " + current + " to " + (next == null ? "null" : next));
        }

        order.setStatus(next);
        return orderRepository.save(order);
    }

    private boolean isAllowedTransition(String current, String next) {
        switch (current) {
            case "PLACED":
                return "ACCEPTED".equals(next);
            case "ACCEPTED":
                return "OUT FOR DELIVERY".equals(next);
            case "OUT FOR DELIVERY":
                return "DELIVERED".equals(next);
            case "DELIVERED":
                return false;
            default:
                return false;
        }
    }

    public List<Order> getOrdersByBuyer(Long buyerId) {
        return orderRepository.findByBuyerId(buyerId);
    }
}
