package org.food.controller;

import org.food.dto.cart.CartItemRequest;
import org.food.entity.Cart;
import org.food.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/cart")
@PreAuthorize("hasRole('CUSTOMER')")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public Cart getMyCart() {
        return cartService.getMyCart();
    }

    @PostMapping("/items")
    public Cart addItem(@Valid @RequestBody CartItemRequest request) {
        return cartService.addItem(request);
    }

    @DeleteMapping("/items/{cartItemId}")
    public Cart removeItem(@PathVariable Long cartItemId) {
        return cartService.removeItem(cartItemId);
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart() {
        cartService.clearCart();
        return ResponseEntity.noContent().build();
    }
}

