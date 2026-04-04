package org.food.service;

import java.math.BigDecimal;
import java.util.Locale;
import java.util.List;

import org.food.dto.admin.AdminUserSummaryDTO;
import org.food.dto.admin.CouponDTO;
import org.food.dto.admin.DashboardDTO;
import org.food.dto.admin.OrderHistoryDTO;
import org.food.dto.admin.RestaurantDTO;
import org.food.dto.admin.RecentOrderDTO;
import org.food.dto.admin.ReviewDTO;
import org.food.dto.admin.SystemSettingsDTO;
import org.food.entity.Coupon;
import org.food.entity.Restaurant;
import org.food.entity.CustomerOrder;
import org.food.entity.Review;
import org.food.entity.SystemSetting;
import org.food.entity.User;
import org.food.enums.RestaurantStatus;
import org.food.enums.Role;
import org.food.exception.ForbiddenException;
import org.food.exception.ResourceNotFoundException;
import org.food.exception.UserNotFoundException;
import org.food.repository.CouponRepository;
import org.food.repository.OrderRepository;
import org.food.repository.RestaurantRepository;
import org.food.repository.ReviewRepository;
import org.food.repository.SystemSettingRepository;
import org.food.repository.UserRepository;
import org.food.security.CurrentUserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;
    private final OrderRepository orderRepository;
    private final CouponRepository couponRepository;
    private final ReviewRepository reviewRepository;
    private final SystemSettingRepository systemSettingRepository;
    private final CurrentUserService currentUserService;

    public AdminService(UserRepository userRepository,
                        RestaurantRepository restaurantRepository,
                        OrderRepository orderRepository,
                        CouponRepository couponRepository,
                        ReviewRepository reviewRepository,
                        SystemSettingRepository systemSettingRepository,
                        CurrentUserService currentUserService) {
        this.userRepository = userRepository;
        this.restaurantRepository = restaurantRepository;
        this.orderRepository = orderRepository;
        this.couponRepository = couponRepository;
        this.reviewRepository = reviewRepository;
        this.systemSettingRepository = systemSettingRepository;
        this.currentUserService = currentUserService;
    }

    @Transactional(readOnly = true)
    public List<OrderHistoryDTO> getOrderHistory() {
        return orderRepository.findAllOrderHistory();
    }

    @Transactional(readOnly = true)
    public List<CouponDTO> getCoupons() {
        return couponRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::toCouponDTO)
                .toList();
    }

    @Transactional
    public CouponDTO createCoupon(CouponDTO request) {
        Coupon coupon = new Coupon();
        coupon.setCode(request.code().trim().toUpperCase(Locale.ROOT));
        coupon.setDiscountType(request.discountType());
        coupon.setDiscountValue(request.discountValue());
        coupon.setMinOrderAmount(request.minOrderAmount());
        coupon.setExpiryDate(request.expiryDate());
        return toCouponDTO(couponRepository.save(coupon));
    }

    @Transactional
    public void deleteCoupon(Long couponId) {
        Coupon coupon = couponRepository.findById(couponId)
                .orElseThrow(() -> new ResourceNotFoundException("Coupon not found"));
        couponRepository.delete(coupon);
    }

    @Transactional(readOnly = true)
    public List<ReviewDTO> getReviews() {
        return reviewRepository.findAllReviewSummaries();
    }

    @Transactional
    public void deleteReview(Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found"));
        reviewRepository.delete(review);
    }

    @Transactional(readOnly = true)
    public SystemSettingsDTO getSettings() {
        return toSystemSettingsDTO(systemSettingRepository.findTopByOrderByIdAsc().orElseGet(this::createDefaultSettings));
    }

    @Transactional
    public SystemSettingsDTO updateSettings(SystemSettingsDTO request) {
        SystemSetting settings = systemSettingRepository.findTopByOrderByIdAsc().orElseGet(SystemSetting::new);
        settings.setSiteName(request.siteName());
        settings.setMaintenanceMode(request.maintenanceMode());
        settings.setBaseDeliveryFee(request.baseDeliveryFee());
        settings.setAdminEmail(request.adminEmail());
        return toSystemSettingsDTO(systemSettingRepository.save(settings));
    }

    @Transactional(readOnly = true)
    public DashboardDTO getDashboard() {
        long totalUsers = userRepository.count();
        long totalRestaurants = restaurantRepository.count();
        long totalOrders = orderRepository.count();
        BigDecimal revenue = orderRepository.sumTotalRevenue();

        List<RecentOrderDTO> recentOrders = orderRepository.findTop5ByOrderByCreatedAtDesc().stream()
                .map(this::toRecentOrderDTO)
                .toList();

        return new DashboardDTO(
                totalUsers,
                totalRestaurants,
                totalOrders,
                revenue != null ? revenue.doubleValue() : 0.0,
                recentOrders);
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public List<Restaurant> getRestaurants() {
        return restaurantRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<RestaurantDTO> getPendingRestaurants() {
        return restaurantRepository.findByStatusOrderByCreatedAtDesc(RestaurantStatus.PENDING).stream()
                .map(this::toRestaurantDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<AdminUserSummaryDTO> getTop50Users() {
        return userRepository.findTop50ByOrderByCreatedAtDesc().stream()
                .map(this::toAdminUserSummaryDTO)
                .toList();
    }

    @Transactional
    public void deleteUser(Long userId) {
        User currentUser = currentUserService.getCurrentUser();
        if (currentUser.getId() != null && currentUser.getId().equals(userId)) {
            throw new ForbiddenException("Admin cannot delete themselves");
        }

        User target = getUser(userId);
        protectAdminAccounts(currentUser, target);
        userRepository.delete(target);
    }

    @Transactional
    public RestaurantDTO approveRestaurant(Long restaurantId) {
        Restaurant restaurant = getRestaurant(restaurantId);
        restaurant.setStatus(RestaurantStatus.APPROVED);
        restaurant.setApprovedBy(currentUserService.getCurrentUser());
        return toRestaurantDTO(restaurantRepository.save(restaurant));
    }

    @Transactional
    public RestaurantDTO rejectRestaurant(Long restaurantId) {
        Restaurant restaurant = getRestaurant(restaurantId);
        restaurant.setStatus(RestaurantStatus.REJECTED);
        return toRestaurantDTO(restaurantRepository.save(restaurant));
    }

    @Transactional
    public User updateUserRole(Long userId, Role role) {
        User currentUser = currentUserService.getCurrentUser();
        User target = getUser(userId);
        protectSystemAdmin(currentUser, target);
        if (role == Role.SYSTEM_ADMIN && currentUser.getRole() != Role.SYSTEM_ADMIN) {
            throw new ForbiddenException("Only system admin can assign system admin role");
        }
        target.setRole(role);
        return userRepository.save(target);
    }

    @Transactional
    public User updateUserEnabled(Long userId, boolean enabled) {
        User currentUser = currentUserService.getCurrentUser();
        User target = getUser(userId);
        protectSystemAdmin(currentUser, target);
        target.setEnabled(enabled);
        return userRepository.save(target);
    }

    private void protectSystemAdmin(User currentUser, User target) {
        if (target.getRole() == Role.SYSTEM_ADMIN) {
            throw new ForbiddenException("System admin account cannot be modified");
        }
        if (currentUser.getRole() != Role.SYSTEM_ADMIN && target.getRole() == Role.ADMIN) {
            throw new ForbiddenException("Only system admin can modify admin accounts");
        }
    }

    private void protectAdminAccounts(User currentUser, User target) {
        if (target.getRole() == Role.SYSTEM_ADMIN && currentUser.getRole() != Role.SYSTEM_ADMIN) {
            throw new ForbiddenException("Only system admin can delete system admin accounts");
        }
        if (currentUser.getRole() != Role.SYSTEM_ADMIN && target.getRole() == Role.ADMIN) {
            throw new ForbiddenException("Only system admin can delete admin accounts");
        }
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    private Restaurant getRestaurant(Long restaurantId) {
        return restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found"));
    }

    private RecentOrderDTO toRecentOrderDTO(CustomerOrder order) {
        return new RecentOrderDTO(
                order.getId(),
                order.getStatus().name(),
                order.getTotalAmount() != null ? order.getTotalAmount().doubleValue() : 0.0,
                order.getCreatedAt());
    }

    private CouponDTO toCouponDTO(Coupon coupon) {
        return new CouponDTO(
                coupon.getId(),
                coupon.getCode(),
                coupon.getDiscountType(),
                coupon.getDiscountValue(),
                coupon.getMinOrderAmount(),
                coupon.getExpiryDate());
    }

    private SystemSettingsDTO toSystemSettingsDTO(SystemSetting settings) {
        return new SystemSettingsDTO(
                settings.getSiteName(),
                settings.isMaintenanceMode(),
                settings.getBaseDeliveryFee(),
                settings.getAdminEmail());
    }

    private SystemSetting createDefaultSettings() {
        SystemSetting settings = new SystemSetting();
        settings.setSiteName("FoodExpress");
        settings.setMaintenanceMode(false);
        settings.setBaseDeliveryFee(new BigDecimal("30.00"));
        settings.setAdminEmail("admin@foodexpress.com");
        return systemSettingRepository.save(settings);
    }

    private RestaurantDTO toRestaurantDTO(Restaurant restaurant) {
        return new RestaurantDTO(
                restaurant.getId(),
                restaurant.getName(),
                restaurant.getAddress(),
                restaurant.getOwner() != null ? restaurant.getOwner().getEmail() : null,
                restaurant.getCuisineType(),
                restaurant.getDescription());
    }

    private AdminUserSummaryDTO toAdminUserSummaryDTO(User user) {
        return new AdminUserSummaryDTO(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getPhone(),
                user.isEnabled(),
                user.isEnabled() ? "ACTIVE" : "DISABLED");
    }
}

