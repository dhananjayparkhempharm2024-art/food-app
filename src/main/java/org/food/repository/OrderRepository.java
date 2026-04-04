package org.food.repository;

import java.util.List;
import java.math.BigDecimal;

import org.food.dto.admin.OrderHistoryDTO;
import org.food.entity.CustomerOrder;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<CustomerOrder, Long> {

    List<CustomerOrder> findByCustomerId(Long customerId);

    List<CustomerOrder> findByRestaurantId(Long restaurantId);

    List<CustomerOrder> findTop5ByOrderByCreatedAtDesc();

    @Query("select new org.food.dto.admin.OrderHistoryDTO(o.id, c.fullName, r.name, o.totalAmount, o.status, o.createdAt) " +
            "from CustomerOrder o join o.customer c join o.restaurant r order by o.createdAt desc")
    List<OrderHistoryDTO> findAllOrderHistory();

    @Query("select sum(o.totalAmount) from CustomerOrder o")
    BigDecimal sumTotalRevenue();
}

