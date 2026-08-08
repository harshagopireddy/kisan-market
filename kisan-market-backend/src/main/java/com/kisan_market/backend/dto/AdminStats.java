package com.kisan_market.backend.dto;

public class AdminStats {

    private long users;
    private long products;
    private long orders;

    public AdminStats() {
    }

    public AdminStats(long users, long products, long orders) {
        this.users = users;
        this.products = products;
        this.orders = orders;
    }

    public long getUsers() {
        return users;
    }

    public void setUsers(long users) {
        this.users = users;
    }

    public long getProducts() {
        return products;
    }

    public void setProducts(long products) {
        this.products = products;
    }

    public long getOrders() {
        return orders;
    }

    public void setOrders(long orders) {
        this.orders = orders;
    }
}