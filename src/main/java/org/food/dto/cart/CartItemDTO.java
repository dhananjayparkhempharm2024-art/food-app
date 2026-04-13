package org.food.dto.cart;

import java.math.BigDecimal;

public record CartItemDTO(
		Long id,
		CartMenuItemDTO menuItem,
		int quantity,
		BigDecimal unitPrice,
		BigDecimal lineTotal) {
}

