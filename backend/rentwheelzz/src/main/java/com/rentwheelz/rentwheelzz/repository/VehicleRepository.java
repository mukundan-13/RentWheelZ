package com.rentwheelz.rentwheelzz.repository;

import com.rentwheelz.rentwheelzz.model.Vehicle;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    @Query("""
            SELECT v FROM Vehicle v 
            WHERE v.id NOT IN (
                SELECT b.vehicle.id FROM Booking b 
                WHERE (b.startDate <= :endDate AND b.endDate >= :startDate) 
                  AND (b.status = 'PENDING' OR b.status = 'CONFIRMED')
            )
            """)
    List<Vehicle> findAvailableVehicles(LocalDate startDate, LocalDate endDate, Sort sort);

    List<Vehicle> findByCompanyNameContainingIgnoreCase(String companyName);

    List<Vehicle> findByCompanyNameContainingIgnoreCaseAndCapacity(String companyName, Integer capacity);

    List<Vehicle> findByCompanyNameContainingIgnoreCaseAndRatingGreaterThanEqual(String companyName, Integer rating);

    List<Vehicle> findByCompanyNameContainingIgnoreCaseAndCapacityAndRatingGreaterThanEqual(
            String companyName, Integer capacity, Integer rating);

    List<Vehicle> findByCapacity(Integer capacity, Sort sort);

    List<Vehicle> findByRatingGreaterThanEqual(Integer rating, Sort sort);

    List<Vehicle> findByCapacityAndRatingGreaterThanEqual(Integer capacity, Integer rating, Sort sort);
}
