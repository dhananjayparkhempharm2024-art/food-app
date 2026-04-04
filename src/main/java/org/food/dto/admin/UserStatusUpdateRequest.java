package org.food.dto.admin;

import jakarta.validation.constraints.NotNull;

public record UserStatusUpdateRequest(@NotNull Boolean enabled) {
}

