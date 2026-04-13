package org.food.repository;

import java.util.Optional;

import org.food.entity.Cart;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {

    @EntityGraph(attributePaths = {"items", "items.menuItem"})
    Optional<Cart> findByCustomerId(Long customerId);
}

