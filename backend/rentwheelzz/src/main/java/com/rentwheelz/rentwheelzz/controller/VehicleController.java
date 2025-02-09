package com.rentwheelz.rentwheelzz.controller;

import com.rentwheelz.rentwheelzz.model.Vehicle;
import com.rentwheelz.rentwheelzz.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @GetMapping("/available")
    public ResponseEntity<List<Vehicle>> getAvailableVehicles(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(required = false) String companyName,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) Integer capacity,
            @RequestParam(required = false) Integer rating
    ) {
        List<Vehicle> vehicles = vehicleService.getAvailableVehicles(startDate, endDate, companyName, sortBy, capacity, rating);
        return ResponseEntity.ok(vehicles);
    }
    
    
    @GetMapping("/{vehicleId}")
    public ResponseEntity<Vehicle> getVehicleById(@PathVariable Long vehicleId) {
        Vehicle vehicle = vehicleService.getVehicleById(vehicleId);
        return ResponseEntity.ok(vehicle);
    }

}
