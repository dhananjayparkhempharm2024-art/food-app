package org.food.dto.admin;

import java.math.BigDecimal;
import java.time.LocalDate;

import org.food.enums.DiscountType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

public record CouponDTO(
        Long id,
        @NotBlank String code,
        @NotNull DiscountType discountType,
        @NotNull @Positive BigDecimal discountValue,
        @NotNull @PositiveOrZero BigDecimal minOrderAmount,
        @NotNull LocalDate expiryDate) {
}

