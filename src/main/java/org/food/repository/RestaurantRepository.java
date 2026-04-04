package org.food.repository;

import java.util.List;
import java.util.Optional;

import org.food.entity.Restaurant;
import org.food.enums.RestaurantStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    List<Restaurant> findByStatus(RestaurantStatus status);

    List<Restaurant> findByStatusOrderByCreatedAtDesc(RestaurantStatus status);

    Optional<Restaurant> findByOwnerId(Long ownerId);
}

