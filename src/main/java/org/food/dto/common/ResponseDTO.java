package org.food.dto.common;

public record ResponseDTO<T>(T data, String message) {
}

