package org.food.controller;

import java.util.List;

import org.food.dto.order.CheckoutRequest;
import org.food.dto.order.CustomerOrderDTO;
import org.food.entity.CustomerOrder;
import org.food.service.OrderService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/checkout")
    @PreAuthorize("hasRole('CUSTOMER')")
    public CustomerOrder checkout(@Valid @RequestBody CheckoutRequest request) {
        return orderService.checkout(request);
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('CUSTOMER')")
    public List<CustomerOrderDTO> myOrders() {
        return orderService.myOrders();
    }

    @GetMapping("/restaurant/{restaurantId}")
    @PreAuthorize("hasAnyRole('ADMIN','SYSTEM_ADMIN')")
    public List<CustomerOrder> restaurantOrders(@PathVariable Long restaurantId) {
        return orderService.restaurantOrders(restaurantId);
    }
}

