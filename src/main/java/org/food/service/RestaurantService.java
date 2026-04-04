package org.food.service;

import java.util.List;

import org.food.dto.restaurant.DeliveryManRequest;
import org.food.dto.restaurant.MenuItemRequest;
import org.food.dto.restaurant.RestaurantRequest;
import org.food.entity.MenuItem;
import org.food.entity.Restaurant;
import org.food.entity.User;
import org.food.enums.RestaurantStatus;
import org.food.enums.Role;
import org.food.exception.BadRequestException;
import org.food.exception.ForbiddenException;
import org.food.exception.ResourceNotFoundException;
import org.food.repository.MenuItemRepository;
import org.food.repository.RestaurantRepository;
import org.food.repository.UserRepository;
import org.food.security.CurrentUserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final MenuItemRepository menuItemRepository;
    private final UserRepository userRepository;
    private final CurrentUserService currentUserService;
    private final PasswordEncoder passwordEncoder;

    public RestaurantService(RestaurantRepository restaurantRepository,
                             MenuItemRepository menuItemRepository,
                             UserRepository userRepository,
                             CurrentUserService currentUserService,
                             PasswordEncoder passwordEncoder) {
        this.restaurantRepository = restaurantRepository;
        this.menuItemRepository = menuItemRepository;
        this.userRepository = userRepository;
        this.currentUserService = currentUserService;
        this.passwordEncoder = passwordEncoder;
    }

    public List<Restaurant> getApprovedRestaurants() {
        return restaurantRepository.findByStatus(RestaurantStatus.APPROVED);
    }

    public Restaurant getRestaurant(Long restaurantId) {
        return restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found"));
    }

    public List<MenuItem> getPublicMenu(Long restaurantId) {
        Restaurant restaurant = getRestaurant(restaurantId);
        if (restaurant.getStatus() != RestaurantStatus.APPROVED) {
            throw new ResourceNotFoundException("Restaurant menu is not available");
        }
        return menuItemRepository.findByRestaurantId(restaurantId);
    }

    @Transactional
    public Restaurant updateMyRestaurant(RestaurantRequest request) {
        User currentUser = currentUserService.getCurrentUser();
        Restaurant restaurant = restaurantRepository.findByOwnerId(currentUser.getId())
                .orElseThrow(() -> new ForbiddenException("Current user does not own a restaurant"));

        restaurant.setName(request.name());
        restaurant.setDescription(request.description());
        restaurant.setAddress(request.address());
        restaurant.setPhone(request.phone());
        restaurant.setCuisineType(request.cuisineType());
        return restaurantRepository.save(restaurant);
    }

    @Transactional
    public MenuItem addMenuItem(Long restaurantId, MenuItemRequest request) {
        Restaurant restaurant = getManageableRestaurant(restaurantId);
        ensureRestaurantCanBeManaged(restaurant);

        MenuItem item = new MenuItem();
        item.setRestaurant(restaurant);
        item.setName(request.name());
        item.setDescription(request.description());
        item.setPrice(request.price());
        item.setCategory(request.category());
        item.setAvailable(request.available() == null || request.available());
        return menuItemRepository.save(item);
    }

    @Transactional
    public MenuItem updateMenuItem(Long restaurantId, Long menuItemId, MenuItemRequest request) {
        getManageableRestaurant(restaurantId);
        MenuItem item = menuItemRepository.findByIdAndRestaurantId(menuItemId, restaurantId)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found"));
        ensureRestaurantCanBeManaged(item.getRestaurant());

        item.setName(request.name());
        item.setDescription(request.description());
        item.setPrice(request.price());
        item.setCategory(request.category());
        if (request.available() != null) {
            item.setAvailable(request.available());
        }
        return menuItemRepository.save(item);
    }

    @Transactional
    public void deleteMenuItem(Long restaurantId, Long menuItemId) {
        getManageableRestaurant(restaurantId);
        MenuItem item = menuItemRepository.findByIdAndRestaurantId(menuItemId, restaurantId)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found"));
        ensureRestaurantCanBeManaged(item.getRestaurant());
        menuItemRepository.delete(item);
    }

    @Transactional
    public User registerDeliveryMan(Long restaurantId, DeliveryManRequest request) {
        Restaurant restaurant = getManageableRestaurant(restaurantId);
        ensureRestaurantCanBeManaged(restaurant);

        if (userRepository.existsByEmail(request.email().toLowerCase())) {
            throw new BadRequestException("Email already registered");
        }

        User deliveryMan = new User();
        deliveryMan.setFullName(request.fullName());
        deliveryMan.setEmail(request.email().toLowerCase());
        deliveryMan.setPhone(request.phone());
        deliveryMan.setPassword(passwordEncoder.encode(request.password()));
        deliveryMan.setRole(Role.DELIVERY_MAN);
        deliveryMan.setRestaurant(restaurant);
        return userRepository.save(deliveryMan);
    }

    private Restaurant getManageableRestaurant(Long restaurantId) {
        Restaurant restaurant = getRestaurant(restaurantId);
        User currentUser = currentUserService.getCurrentUser();
        if (currentUser.getRole() == Role.SYSTEM_ADMIN || currentUser.getRole() == Role.ADMIN) {
            return restaurant;
        }
        if (!restaurant.getOwner().getId().equals(currentUser.getId())) {
            throw new ForbiddenException("You do not own this restaurant");
        }
        return restaurant;
    }

    private void ensureRestaurantCanBeManaged(Restaurant restaurant) {
        User currentUser = currentUserService.getCurrentUser();
        if (currentUser.getRole() == Role.SYSTEM_ADMIN || currentUser.getRole() == Role.ADMIN) {
            return;
        }
        if (restaurant.getStatus() == RestaurantStatus.PENDING) {
            throw new ForbiddenException("Restaurant must be approved before menu management");
        }
    }
}


