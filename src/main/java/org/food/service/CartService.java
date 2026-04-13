package org.food.service;

import java.math.BigDecimal;
import java.util.List;

import org.food.dto.cart.CartDTO;
import org.food.dto.cart.CartItemDTO;
import org.food.dto.cart.CartMenuItemDTO;
import org.food.dto.cart.CartItemRequest;
import org.food.entity.Cart;
import org.food.entity.CartItem;
import org.food.entity.MenuItem;
import org.food.entity.User;
import org.food.enums.RestaurantStatus;
import org.food.enums.Role;
import org.food.exception.BadRequestException;
import org.food.exception.ForbiddenException;
import org.food.exception.ResourceNotFoundException;
import org.food.repository.CartItemRepository;
import org.food.repository.CartRepository;
import org.food.repository.MenuItemRepository;
import org.food.security.CurrentUserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final MenuItemRepository menuItemRepository;
    private final CurrentUserService currentUserService;

    public CartService(CartRepository cartRepository,
                       CartItemRepository cartItemRepository,
                       MenuItemRepository menuItemRepository,
                       CurrentUserService currentUserService) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.menuItemRepository = menuItemRepository;
        this.currentUserService = currentUserService;
    }

    @Transactional
    public CartDTO getMyCart() {
        User customer = requireCustomer();
        return toDto(getOrCreateCart(customer));
    }

    @Transactional
    public CartDTO addItem(CartItemRequest request) {
        User customer = requireCustomer();
        Cart cart = getOrCreateCart(customer);
        MenuItem menuItem = menuItemRepository.findById(request.menuItemId())
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found"));

        if (menuItem.getRestaurant().getStatus() != RestaurantStatus.APPROVED) {
            throw new BadRequestException("Menu item is not available from this restaurant");
        }

        if (cart.getItems().stream().anyMatch(item -> !item.getMenuItem().getRestaurant().getId().equals(menuItem.getRestaurant().getId()))) {
            throw new BadRequestException("A cart can only contain items from one restaurant");
        }

        CartItem cartItem = cartItemRepository.findByCartIdAndMenuItemId(cart.getId(), menuItem.getId())
                .orElseGet(CartItem::new);
        cartItem.setCart(cart);
        cartItem.setMenuItem(menuItem);
        cartItem.setQuantity(request.quantity());
        cartItem.setUnitPrice(menuItem.getPrice());
        cartItem.setLineTotal(menuItem.getPrice().multiply(BigDecimal.valueOf(request.quantity())));
        cart.getItems().removeIf(item -> item.getMenuItem().getId().equals(menuItem.getId()));
        cart.getItems().add(cartItem);
        return toDto(cartRepository.save(cart));
    }

    @Transactional
    public CartDTO removeItem(Long cartItemId) {
        User customer = requireCustomer();
        Cart cart = getOrCreateCart(customer);
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));
        if (!cartItem.getCart().getId().equals(cart.getId())) {
            throw new ForbiddenException("Cart item does not belong to current customer");
        }
        cart.getItems().remove(cartItem);
        cartItemRepository.delete(cartItem);
        return toDto(cartRepository.save(cart));
    }

    @Transactional
    public void clearCart() {
        User customer = requireCustomer();
        Cart cart = getOrCreateCart(customer);
        cart.getItems().clear();
        cartRepository.save(cart);
    }

    public Cart getOrCreateCart(User customer) {
        return cartRepository.findByCustomerId(customer.getId())
                .orElseGet(() -> {
                    Cart cart = new Cart();
                    cart.setCustomer(customer);
                    return cartRepository.save(cart);
                });
    }

    private User requireCustomer() {
        User current = currentUserService.getCurrentUser();
        if (current.getRole() != Role.CUSTOMER) {
            throw new ForbiddenException("Only customers can use the cart");
        }
        return current;
    }

    private CartDTO toDto(Cart cart) {
        List<CartItemDTO> items = cart.getItems().stream()
                .map(this::toDto)
                .toList();
        BigDecimal totalAmount = items.stream()
                .map(item -> item.lineTotal() == null ? BigDecimal.ZERO : item.lineTotal())
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        return new CartDTO(cart.getId(), cart.isCheckedOut(), items, totalAmount);
    }

    private CartItemDTO toDto(CartItem item) {
        MenuItem menuItem = item.getMenuItem();
        return new CartItemDTO(
                item.getId(),
                new CartMenuItemDTO(
                        menuItem.getId(),
                        menuItem.getName(),
                        menuItem.getDescription(),
                        menuItem.getPrice(),
                        menuItem.isAvailable()),
                item.getQuantity(),
                item.getUnitPrice(),
                item.getLineTotal());
    }
}

