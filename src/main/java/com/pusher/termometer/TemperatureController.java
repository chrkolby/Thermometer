package com.pusher.termometer;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TemperatureController {
	 
	@Autowired
	private TemperatureRepository temperatureRepository;

	/**
	 * Database repository
	 * Returns a page with content from the temperature table.
	 */
	@RequestMapping(
			value = "/api/temperature",
			method = RequestMethod.GET
		)
	public Page<Temperature> getTemperatures(@RequestParam("page") Optional<Integer> page, @RequestParam("count") Optional<Integer> count){
		 
		int pageInt = 0;
		int countInt = 20;
		
		if(page.isPresent()) {
			pageInt = page.get();
		}
		
		if(count.isPresent()) {
			countInt = count.get();
		}
		 
		return temperatureRepository.findAll(PageRequest.of(pageInt, countInt));
	}
	    
}
