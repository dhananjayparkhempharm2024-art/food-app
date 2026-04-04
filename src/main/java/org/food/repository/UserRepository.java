package org.food.repository;

import java.util.Optional;
import java.util.List;

import org.food.entity.User;
import org.food.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    long countByRole(Role role);

    List<User> findTop50ByOrderByCreatedAtDesc();
}

