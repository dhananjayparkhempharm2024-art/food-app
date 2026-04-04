package org.food.dto.admin;

import org.food.enums.Role;

import jakarta.validation.constraints.NotNull;

public record UserRoleUpdateRequest(@NotNull Role role) {
}

