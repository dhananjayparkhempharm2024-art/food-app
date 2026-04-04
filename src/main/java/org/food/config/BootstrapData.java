package org.food.config;

import org.food.entity.User;
import org.food.enums.Role;
import org.food.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class BootstrapData {

    @Bean
    CommandLineRunner seedSystemAdmin(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            @Value("${app.bootstrap.system-admin-full-name}") String fullName,
            @Value("${app.bootstrap.system-admin-email}") String email,
            @Value("${app.bootstrap.system-admin-password}") String password) {
        return args -> {
            if (userRepository.existsByEmail(email)) {
                return;
            }
            User user = new User();
            user.setFullName(fullName);
            user.setEmail(email);
            user.setPassword(passwordEncoder.encode(password));
            user.setRole(Role.SYSTEM_ADMIN);
            user.setEnabled(true);
            userRepository.save(user);
        };
    }
}

