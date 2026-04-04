package org.food.dto.admin;

public record AdminUserSummaryDTO(
        Long id,
        String name,
        String email,
        String contact,
        boolean verified,
        String accountStatus) {
}

