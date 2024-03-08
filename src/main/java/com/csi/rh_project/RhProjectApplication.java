package com.csi.rh_project;


import com.csi.rh_project.auth.models.Role;
import com.csi.rh_project.auth.repositories.RoleRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Optional;

@SpringBootApplication
@EnableScheduling
public class RhProjectApplication implements WebMvcConfigurer {

	public static void main(String[] args) {
		SpringApplication.run(RhProjectApplication.class, args);
	}
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
				.allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
				.allowedOrigins("http://localhost:4200");
	}

	@Bean
	ApplicationRunner init(RoleRepository repository) {
		return (ApplicationArguments args) ->  dataSetup(repository);
	}

	public void dataSetup(RoleRepository repository) {
		//inserts

		Optional<Role> optRole;
		optRole = repository.findByRole("admin");
		if(!optRole.isPresent()){
			repository.save(new Role("admin"));
		}
		optRole = repository.findByRole("consultant");
		if(!optRole.isPresent()){
			repository.save(new Role("consultant"));
		}

		optRole = repository.findByRole("teamLead");
		if(!optRole.isPresent()){
			repository.save(new Role("teamLead"));
		}
		optRole= repository.findByRole("manager");
		if(!optRole.isPresent()){
			repository.save(new Role("manager"));
		}
		optRole = repository.findByRole("Rh");
		if(!optRole.isPresent()){
			repository.save(new Role("Rh"));
		}
		optRole = repository.findByRole("Infra");
		if(!optRole.isPresent()){
			repository.save(new Role("Infra"));
		}
		optRole = repository.findByRole("director");
		if(!optRole.isPresent()){
			repository.save(new Role("director"));
		}
		optRole = repository.findByRole("treasurer");
		if(!optRole.isPresent()){
			repository.save(new Role("treasurer"));
		}


	}
}

