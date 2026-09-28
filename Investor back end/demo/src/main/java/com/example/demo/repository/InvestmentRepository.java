package com.example.demo.repository;

import com.example.demo.model.Investment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface InvestmentRepository extends CrudRepository<Investment, Long> {
    
}