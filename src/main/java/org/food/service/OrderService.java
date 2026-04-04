package org.food.service;

import java.math.BigDecimal;
import java.util.List;

import org.food.dto.order.CheckoutRequest;
import org.food.entity.Cart;
import org.food.entity.CartItem;
import org.food.entity.CustomerOrder;
import org.food.entity.OrderItem;
import org.food.entity.User;
import org.food.enums.OrderStatus;
import org.food.enums.Role;
import org.food.exception.BadRequestException;
import org.food.exception.ForbiddenException;
import org.food.repository.OrderRepository;
import org.food.repository.UserRepository;
import org.food.security.CurrentUserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {

    private final CartService cartService;
    private final OrderRepository orderRepository;
    private final CurrentUserService currentUserService;

    public OrderService(CartService cartService,
                        OrderRepository orderRepository,
                        CurrentUserService currentUserService) {
        this.cartService = cartService;
        this.orderRepository = orderRepository;
        this.currentUserService = currentUserService;
    }

    @Transactional
    public CustomerOrder checkout(CheckoutRequest request) {
        User customer = currentUserService.getCurrentUser();
        if (customer.getRole() != Role.CUSTOMER) {
            throw new ForbiddenException("Only customers can checkout");
        }

        Cart cart = cartService.getOrCreateCart(customer);
        if (cart.getItems().isEmpty()) {
            throw new BadRequestException("Cart is empty");
        }

        CustomerOrder order = new CustomerOrder();
        order.setCustomer(customer);
        order.setRestaurant(cart.getItems().get(0).getMenuItem().getRestaurant());
        order.setDeliveryAddress(request.deliveryAddress());
        order.setStatus(OrderStatus.CREATED);

        BigDecimal total = BigDecimal.ZERO;
        for (CartItem cartItem : cart.getItems()) {
            if (!cartItem.getMenuItem().getRestaurant().getId().equals(order.getRestaurant().getId())) {
                throw new BadRequestException("All cart items must come from one restaurant");
            }
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setMenuItemName(cartItem.getMenuItem().getName());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setUnitPrice(cartItem.getUnitPrice());
            orderItem.setLineTotal(cartItem.getLineTotal());
            order.getItems().add(orderItem);
            total = total.add(cartItem.getLineTotal());
        }
        order.setTotalAmount(total);

        CustomerOrder saved = orderRepository.save(order);
        cart.getItems().clear();
        return saved;
    }

    public List<CustomerOrder> myOrders() {
        User current = currentUserService.getCurrentUser();
        if (current.getRole() != Role.CUSTOMER && current.getRole() != Role.RESTAURANT && current.getRole() != Role.ADMIN && current.getRole() != Role.SYSTEM_ADMIN) {
            throw new ForbiddenException("Not allowed");
        }
        return orderRepository.findByCustomerId(current.getId());
    }

    public List<CustomerOrder> restaurantOrders(Long restaurantId) {
        User current = currentUserService.getCurrentUser();
        if (current.getRole() != Role.ADMIN && current.getRole() != Role.SYSTEM_ADMIN) {
            throw new ForbiddenException("Only admin roles can view restaurant orders");
        }
        return orderRepository.findByRestaurantId(restaurantId);
    }
}

