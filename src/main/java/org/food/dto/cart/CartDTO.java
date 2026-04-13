package org.food.dto.cart;

import java.math.BigDecimal;
import java.util.List;

public record CartDTO(
        Long id,
        boolean checkedOut,
        List<CartItemDTO> items,
        BigDecimal totalAmount) {
}

