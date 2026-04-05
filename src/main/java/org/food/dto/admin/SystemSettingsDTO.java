package org.food.dto.admin;

import java.math.BigDecimal;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

public record SystemSettingsDTO(
        @NotBlank String siteName,
        boolean maintenanceMode,
        @NotNull @Positive BigDecimal baseDeliveryFee,
        @NotNull @PositiveOrZero BigDecimal minOrderValue,
        @NotBlank @Email String adminEmail) {
}

