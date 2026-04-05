package org.food.entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "system_settings")
@Getter
@Setter
public class SystemSetting extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String siteName;

    @Column(nullable = false)
    private boolean maintenanceMode;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal baseDeliveryFee;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal minOrderValue;

    @Column(nullable = false)
    private String adminEmail;
}

