package org.food.controller;

import java.util.List;

import org.food.dto.restaurant.DeliveryManRequest;
import org.food.dto.restaurant.MenuItemRequest;
import org.food.dto.restaurant.RestaurantRequest;
import org.food.dto.admin.OrderHistoryDTO;
import org.food.dto.order.RestaurantTransactionSummaryDTO;
import org.food.entity.MenuItem;
import org.food.entity.Restaurant;
import org.food.entity.User;
import org.food.service.OrderService;
import org.food.service.RestaurantService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {

    private final RestaurantService restaurantService;
    private final OrderService orderService;

    public RestaurantController(RestaurantService restaurantService, OrderService orderService) {
        this.restaurantService = restaurantService;
        this.orderService = orderService;
    }

    @GetMapping
    public List<Restaurant> getRestaurants() {
        return restaurantService.getApprovedRestaurants();
    }

    @GetMapping("/{restaurantId}/menu")
    public List<MenuItem> getPublicMenu(@PathVariable Long restaurantId) {
        return restaurantService.getPublicMenu(restaurantId);
    }

    @PutMapping("/me")
    @PreAuthorize("hasAnyRole('RESTAURANT','ADMIN','SYSTEM_ADMIN')")
    public Restaurant updateMyRestaurant(@Valid @RequestBody RestaurantRequest request) {
        return restaurantService.updateMyRestaurant(request);
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('RESTAURANT')")
    public Restaurant getMyRestaurant() {
        return restaurantService.getMyRestaurant();
    }

    @GetMapping("/me/orders")
    @PreAuthorize("hasRole('RESTAURANT')")
    public List<OrderHistoryDTO> myRestaurantOrders() {
        return orderService.myRestaurantOrders();
    }

    @GetMapping("/me/transactions")
    @PreAuthorize("hasRole('RESTAURANT')")
    public RestaurantTransactionSummaryDTO myRestaurantTransactions() {
        return orderService.myRestaurantTransactions();
    }

    @PostMapping("/{restaurantId}/menu-items")
    @PreAuthorize("hasAnyRole('RESTAURANT','ADMIN','SYSTEM_ADMIN')")
    public ResponseEntity<MenuItem> addMenuItem(@PathVariable Long restaurantId,
                                                @Valid @RequestBody MenuItemRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(restaurantService.addMenuItem(restaurantId, request));
    }

    @PutMapping("/{restaurantId}/menu-items/{menuItemId}")
    @PreAuthorize("hasAnyRole('RESTAURANT','ADMIN','SYSTEM_ADMIN')")
    public MenuItem updateMenuItem(@PathVariable Long restaurantId,
                                   @PathVariable Long menuItemId,
                                   @Valid @RequestBody MenuItemRequest request) {
        return restaurantService.updateMenuItem(restaurantId, menuItemId, request);
    }

    @DeleteMapping("/{restaurantId}/menu-items/{menuItemId}")
    @PreAuthorize("hasAnyRole('RESTAURANT','ADMIN','SYSTEM_ADMIN')")
    public ResponseEntity<Void> deleteMenuItem(@PathVariable Long restaurantId,
                                               @PathVariable Long menuItemId) {
        restaurantService.deleteMenuItem(restaurantId, menuItemId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{restaurantId}/delivery-men")
    @PreAuthorize("hasAnyRole('RESTAURANT','ADMIN','SYSTEM_ADMIN')")
    public ResponseEntity<User> registerDeliveryMan(@PathVariable Long restaurantId,
                                                    @Valid @RequestBody DeliveryManRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(restaurantService.registerDeliveryMan(restaurantId, request));
    }

    @GetMapping("/{restaurantId}/delivery-men")
    @PreAuthorize("hasAnyRole('RESTAURANT','ADMIN','SYSTEM_ADMIN')")
    public List<User> getDeliveryMen(@PathVariable Long restaurantId) {
        return restaurantService.getDeliveryMen(restaurantId);
    }
}

