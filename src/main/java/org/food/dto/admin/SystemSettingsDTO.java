package org.food.dto.admin;

import java.math.BigDecimal;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record SystemSettingsDTO(
        @NotBlank String siteName,
        boolean maintenanceMode,
        @NotNull @Positive BigDecimal baseDeliveryFee,
        @NotBlank @Email String adminEmail) {
}

