package org.food.dto.order;

import java.math.BigDecimal;

public record RestaurantTransactionSummaryDTO(
        Long restaurantId,
        Long totalOrders,
        Long deliveredOrders,
        Long activeOrders,
        BigDecimal totalRevenue) {
}

