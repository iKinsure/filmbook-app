package com.ikinsure.filmbook.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import static com.ikinsure.filmbook.security.Permission.*;
import static org.springframework.http.HttpMethod.*;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final PasswordEncoder encoder;

    @Autowired
    public SecurityConfig(PasswordEncoder encoder) {
        this.encoder = encoder;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors().disable()
                .csrf().disable()
                .authorizeRequests()

                .antMatchers(GET, "/index*", "/static/**", "/*.js", "/*.json", "/*.ico", "/*.png", "/")
                    .permitAll()
                .antMatchers(GET, "/api/films/**")
//                    .hasAuthority(FILM_READ.name())
                    .permitAll()
                .antMatchers(POST, "/api/films/**")
                    .hasAuthority(FILM_WRITE.name())
                .antMatchers(PUT, "/api/films/**")
                    .hasAuthority(FILM_WRITE.name())
                .antMatchers(DELETE, "/api/films/**")
                    .hasAuthority(FILM_WRITE.name())
                .antMatchers(GET, "/api/images/**")
//                    .hasAuthority(IMAGE_READ.name())
                    .permitAll()
                .antMatchers(POST, "/api/images/**")
                    .hasAuthority(IMAGE_WRITE.name())
                .antMatchers(PUT, "/api/images/**")
                    .hasAuthority(IMAGE_WRITE.name())
                .antMatchers(DELETE, "/api/images/**")
                    .hasAuthority(IMAGE_WRITE.name())
                .anyRequest()
                    .authenticated()
                .and()
                .httpBasic();

    }

    @Bean
    @Override
    public UserDetailsService userDetailsService() {
        return new InMemoryUserDetailsManager(
                createUser("user", "password", Role.USER),
                createUser("admin", "password", Role.ADMIN)
        );
    }

    private UserDetails createUser(String username, String password, Role role) {
        return User.builder()
                .username(username)
                .password(encoder.encode(password))
                .roles(role.name())
                .authorities(role.getAuthorities())
                .build();
    }
}
