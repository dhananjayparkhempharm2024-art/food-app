package org.food.controller;

import java.util.List;
import java.util.Map;

import org.food.dto.admin.AdminUserSummaryDTO;
import org.food.dto.admin.CouponDTO;
import org.food.dto.admin.DashboardDTO;
import org.food.dto.admin.OrderHistoryDTO;
import org.food.dto.admin.RestaurantDTO;
import org.food.dto.admin.ReviewDTO;
import org.food.dto.admin.SystemSettingsDTO;
import org.food.dto.common.ApiResponse;
import org.food.dto.common.ResponseDTO;
import org.food.dto.admin.UserRoleUpdateRequest;
import org.food.dto.admin.UserStatusUpdateRequest;
import org.food.entity.Restaurant;
import org.food.entity.User;
import org.food.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAnyRole('ADMIN','SYSTEM_ADMIN')")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/orders/history")
    @PreAuthorize("hasAnyRole('ADMIN', 'SYSTEM_ADMIN')")
    public ResponseEntity<Map<String, Object>> orderHistory() {
        List<OrderHistoryDTO> orders = adminService.getOrderHistory();
        return ResponseEntity.ok(Map.of("data", orders));
    }

    @GetMapping("/coupons")
    @PreAuthorize("hasAnyRole('ADMIN', 'SYSTEM_ADMIN')")
    public ResponseEntity<Map<String, Object>> getCoupons() {
        return ResponseEntity.ok(Map.of("data", adminService.getCoupons()));
    }

    @PostMapping("/coupons")
    @PreAuthorize("hasAnyRole('ADMIN', 'SYSTEM_ADMIN')")
    public ResponseEntity<Map<String, Object>> createCoupon(@Valid @RequestBody CouponDTO request) {
        return ResponseEntity.ok(Map.of("data", adminService.createCoupon(request)));
    }

    @DeleteMapping("/coupons/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SYSTEM_ADMIN')")
    public ResponseEntity<Map<String, Object>> deleteCoupon(@PathVariable Long id) {
        adminService.deleteCoupon(id);
        return ResponseEntity.ok(Map.of("data", "Coupon deleted successfully"));
    }

    @GetMapping("/reviews")
    @PreAuthorize("hasAnyRole('ADMIN', 'SYSTEM_ADMIN')")
    public ResponseEntity<Map<String, Object>> getReviews() {
        List<ReviewDTO> reviews = adminService.getReviews();
        return ResponseEntity.ok(Map.of("data", reviews));
    }

    @DeleteMapping("/reviews/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SYSTEM_ADMIN')")
    public ResponseEntity<Map<String, Object>> deleteReview(@PathVariable Long id) {
        adminService.deleteReview(id);
        return ResponseEntity.ok(Map.of("data", "Review deleted successfully"));
    }

    @GetMapping("/settings")
    @PreAuthorize("hasAnyRole('ADMIN', 'SYSTEM_ADMIN')")
    public ResponseEntity<Map<String, Object>> getSettings() {
        return ResponseEntity.ok(Map.of("data", adminService.getSettings()));
    }

    @PutMapping("/settings")
    @PreAuthorize("hasAnyRole('ADMIN', 'SYSTEM_ADMIN')")
    public ResponseEntity<Map<String, Object>> updateSettings(@Valid @RequestBody SystemSettingsDTO request) {
        return ResponseEntity.ok(Map.of("data", adminService.updateSettings(request)));
    }

    @GetMapping("/restaurants/pending")
    public ResponseEntity<ResponseDTO<List<RestaurantDTO>>> pendingRestaurants() {
        return ResponseEntity.ok(new ResponseDTO<>(adminService.getPendingRestaurants(), "Pending restaurants fetched successfully"));
    }

    @PostMapping("/restaurants/{id}/approve")
    public ResponseEntity<ResponseDTO<RestaurantDTO>> approveRestaurant(@PathVariable Long id) {
        return ResponseEntity.ok(new ResponseDTO<>(adminService.approveRestaurant(id), "Restaurant approved successfully"));
    }

    @PostMapping("/restaurants/{id}/reject")
    public ResponseEntity<ResponseDTO<RestaurantDTO>> rejectRestaurant(@PathVariable Long id) {
        return ResponseEntity.ok(new ResponseDTO<>(adminService.rejectRestaurant(id), "Restaurant rejected successfully"));
    }

    @GetMapping("/getTop50Users")
    public ResponseEntity<ApiResponse<List<AdminUserSummaryDTO>>> getTop50Users() {
        return ResponseEntity.ok(new ApiResponse<>(adminService.getTop50Users()));
    }

    @DeleteMapping("/deleteUser/{userId}")
    public ResponseEntity<ApiResponse<String>> deleteUser(@PathVariable Long userId) {
        adminService.deleteUser(userId);
        return ResponseEntity.ok(new ApiResponse<>("User deleted successfully"));
    }

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<DashboardDTO>> dashboard() {
        return ResponseEntity.ok(new ApiResponse<>(adminService.getDashboard()));
    }

    @GetMapping("/users")
    public List<User> users() {
        return adminService.getUsers();
    }

    @GetMapping("/restaurants")
    public List<Restaurant> restaurants() {
        return adminService.getRestaurants();
    }


    @PutMapping("/users/{userId}/role")
    public User updateUserRole(@PathVariable Long userId, @Valid @RequestBody UserRoleUpdateRequest request) {
        return adminService.updateUserRole(userId, request.role());
    }

    @PutMapping("/users/{userId}/enabled")
    public User updateUserStatus(@PathVariable Long userId, @Valid @RequestBody UserStatusUpdateRequest request) {
        return adminService.updateUserEnabled(userId, request.enabled());
    }
}

