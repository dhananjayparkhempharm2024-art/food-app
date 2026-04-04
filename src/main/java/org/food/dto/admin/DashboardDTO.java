package org.food.dto.admin;

import java.util.List;

public record DashboardDTO(
        Long totalUsers,
        Long totalRestaurants,
        Long totalOrders,
        Double totalRevenue,
        List<RecentOrderDTO> recentOrders) {
}

