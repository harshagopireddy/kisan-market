package com.kisan_market.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kisan_market.backend.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByBuyerId(Long buyerId);

    List<Order> findByFarmerId(Long farmerId);
}
