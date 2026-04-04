package org.food.repository;

import java.util.List;

import org.food.entity.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CouponRepository extends JpaRepository<Coupon, Long> {

    List<Coupon> findAllByOrderByCreatedAtDesc();
}

