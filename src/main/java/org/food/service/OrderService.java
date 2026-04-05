package org.food.service;

import java.math.BigDecimal;
import java.util.List;

import org.food.dto.admin.OrderHistoryDTO;
import org.food.dto.order.CheckoutRequest;
import org.food.dto.order.RestaurantTransactionSummaryDTO;
import org.food.entity.Cart;
import org.food.entity.CartItem;
import org.food.entity.CustomerOrder;
import org.food.entity.OrderItem;
import org.food.entity.Restaurant;
import org.food.entity.User;
import org.food.enums.OrderStatus;
import org.food.enums.Role;
import org.food.exception.BadRequestException;
import org.food.exception.ForbiddenException;
import org.food.repository.OrderRepository;
import org.food.repository.RestaurantRepository;
import org.food.security.CurrentUserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {

    private final CartService cartService;
    private final OrderRepository orderRepository;
    private final RestaurantRepository restaurantRepository;
    private final CurrentUserService currentUserService;

    public OrderService(CartService cartService,
                        OrderRepository orderRepository,
                        RestaurantRepository restaurantRepository,
                        CurrentUserService currentUserService) {
        this.cartService = cartService;
        this.orderRepository = orderRepository;
        this.restaurantRepository = restaurantRepository;
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
        if (!"PAY_ON_DELIVERY".equalsIgnoreCase(request.paymentMode())) {
            throw new BadRequestException("Only PAY_ON_DELIVERY is supported");
        }

        CustomerOrder order = new CustomerOrder();
        order.setCustomer(customer);
        order.setRestaurant(cart.getItems().get(0).getMenuItem().getRestaurant());
        order.setDeliveryAddress(request.deliveryAddress());
        order.setPaymentMode("PAY_ON_DELIVERY");
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

    public List<OrderHistoryDTO> myRestaurantOrders() {
        Restaurant restaurant = resolveRestaurantForCurrentUser();
        return orderRepository.findRestaurantOrderHistory(restaurant.getId());
    }

    public RestaurantTransactionSummaryDTO myRestaurantTransactions() {
        Restaurant restaurant = resolveRestaurantForCurrentUser();
        List<CustomerOrder> orders = orderRepository.findByRestaurantId(restaurant.getId());

        long deliveredOrders = orders.stream().filter(o -> o.getStatus() == OrderStatus.DELIVERED).count();
        long activeOrders = orders.stream()
                .filter(o -> o.getStatus() != OrderStatus.DELIVERED && o.getStatus() != OrderStatus.CANCELLED)
                .count();
        BigDecimal totalRevenue = orders.stream()
                .filter(o -> o.getStatus() == OrderStatus.DELIVERED)
                .map(CustomerOrder::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return new RestaurantTransactionSummaryDTO(
                restaurant.getId(),
                (long) orders.size(),
                deliveredOrders,
                activeOrders,
                totalRevenue);
    }

    private Restaurant resolveRestaurantForCurrentUser() {
        User current = currentUserService.getCurrentUser();
        if (current.getRole() != Role.RESTAURANT) {
            throw new ForbiddenException("Only restaurant users can view this resource");
        }
        return restaurantRepository.findByOwnerId(current.getId())
                .orElseThrow(() -> new BadRequestException("Current user does not own a restaurant"));
    }
}

