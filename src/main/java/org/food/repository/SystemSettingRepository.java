package org.food.repository;

import java.util.Optional;

import org.food.entity.SystemSetting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SystemSettingRepository extends JpaRepository<SystemSetting, Long> {

    Optional<SystemSetting> findTopByOrderByIdAsc();
}

