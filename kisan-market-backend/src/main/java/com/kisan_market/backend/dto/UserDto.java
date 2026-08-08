package com.kisan_market.backend.dto;

import com.kisan_market.backend.entity.Role;
import com.kisan_market.backend.entity.User;

public class UserDto {

    private Long id;
    private String name;
    private String email;
    private String phone;
    private String deliveryLocation;
    private Role role;

    public UserDto() {
    }

    public UserDto(Long id, String name, String email, String phone, String deliveryLocation, Role role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.deliveryLocation = deliveryLocation;
        this.role = role;
    }

    public static UserDto from(User user) {
        return new UserDto(user.getId(), user.getName(), user.getEmail(), user.getPhone(), user.getDeliveryLocation(), user.getRole());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getDeliveryLocation() {
        return deliveryLocation;
    }

    public void setDeliveryLocation(String deliveryLocation) {
        this.deliveryLocation = deliveryLocation;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
