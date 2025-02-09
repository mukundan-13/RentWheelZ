package com.rentwheelz.rentwheelzz.service;

import com.rentwheelz.rentwheelzz.model.Vehicle;
import com.rentwheelz.rentwheelzz.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;
    public List<Vehicle> getAvailableVehicles(LocalDate startDate, LocalDate endDate, String companyName, 
            String sortBy, Integer capacity, Integer rating) {
        
        Sort sort = Sort.by(Sort.Direction.ASC, "pricePerDay");
        if ("desc".equalsIgnoreCase(sortBy)) {
            sort = Sort.by(Sort.Direction.DESC, "pricePerDay");
        }

      
        List<Vehicle> availableVehicles = vehicleRepository.findAvailableVehicles(startDate, endDate, sort);

        if (companyName != null && !companyName.isEmpty()) {
            availableVehicles = availableVehicles.stream()
                    .filter(v -> v.getCompanyName().toLowerCase().contains(companyName.toLowerCase()))
                    .toList();
        }

        if (capacity != null) {
            availableVehicles = availableVehicles.stream()
                    .filter(v -> v.getCapacity().equals(capacity))
                    .toList();
        }

        if (rating != null) {
            availableVehicles = availableVehicles.stream()
                    .filter(v -> v.getRating() >= rating)
                    .toList();
        }

        return availableVehicles;
    }
	
    public Vehicle getVehicleById(Long id) {
        return vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found with ID: " + id));
    }

    
    
}
