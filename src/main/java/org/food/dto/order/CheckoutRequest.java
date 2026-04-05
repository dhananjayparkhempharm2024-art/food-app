package org.food.dto.order;

import jakarta.validation.constraints.NotBlank;

public record CheckoutRequest(
		@NotBlank String deliveryAddress,
		@NotBlank String paymentMode) {
}

