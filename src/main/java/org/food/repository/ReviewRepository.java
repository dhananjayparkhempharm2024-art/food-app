package org.food.repository;

import java.util.List;

import org.food.dto.admin.ReviewDTO;
import org.food.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("select new org.food.dto.admin.ReviewDTO(rv.id, c.fullName, r.name, rv.rating, rv.comment, rv.createdAt) " +
            "from Review rv join rv.customer c join rv.restaurant r order by rv.createdAt desc")
    List<ReviewDTO> findAllReviewSummaries();
}

