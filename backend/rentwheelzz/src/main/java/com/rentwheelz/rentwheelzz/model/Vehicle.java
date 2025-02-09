package com.rentwheelz.rentwheelzz.model;

//import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "vehicles")
public class Vehicle {

 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;

 private String companyName;
 private String numberPlate;
 private String model;
 private String type;
 private Integer capacity;
 private Double pricePerDay;
 private Integer manufacturingYear;
 private Double rating;
 private String imageUrl;

 public Long getId() {
     return id;
 }

 public void setId(Long id) {
     this.id = id;
 }

 public String getCompanyName() {
     return companyName;
 }

 public void setCompanyName(String companyName) {
     this.companyName = companyName;
 }

 public String getNumberPlate() {
     return numberPlate;
 }

 public void setNumberPlate(String numberPlate) {
     this.numberPlate = numberPlate;
 }

 public String getModel() {
     return model;
 }

 public void setModel(String model) {
     this.model = model;
 }

 public String getType() {
     return type;
 }

 public void setType(String type) {
     this.type = type;
 }

 public Integer getCapacity() {
     return capacity;
 }

 public void setCapacity(Integer capacity) {
     this.capacity = capacity;
 }

 public Double getPricePerDay() {
     return pricePerDay;
 }

 public void setPricePerDay(Double pricePerDay) {
     this.pricePerDay = pricePerDay;
 }

 public Integer getManufacturingYear() {
     return manufacturingYear;
 }

 public void setManufacturingYear(Integer manufacturingYear) {
     this.manufacturingYear = manufacturingYear;
 }

 public Double getRating() {
     return rating;
 }

 public void setRating(Double rating) {
     this.rating = rating;
 }

 public String getImageUrl() {
     return imageUrl;
 }

 public void setImageUrl(String imageUrl) {
     this.imageUrl = imageUrl;
 }
}