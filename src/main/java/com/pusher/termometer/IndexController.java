package com.pusher.termometer;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class IndexController {
	
	/**
	 * Index controller, route requests to the index view.
	 */
	
	@RequestMapping(value = "/{[path:[^\\.]*}")
	public String index() {
		return "index";
	}
}