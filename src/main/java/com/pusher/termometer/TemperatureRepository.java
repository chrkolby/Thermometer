package com.pusher.termometer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Create the JPARepository for the temperature table.
 */

@Repository
public interface TemperatureRepository extends JpaRepository<Temperature, Long> {
	
}
