package com.ikinsure.filmbook.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import static com.ikinsure.filmbook.security.Permission.*;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final PasswordEncoder encoder;

    @Autowired
    public SecurityConfig(PasswordEncoder encoder) {
        this.encoder = encoder;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.
                cors().disable().
                csrf().disable().authorizeRequests()

                // configure permissions
                .antMatchers(HttpMethod.GET, "/index*", "/static/**", "/*.js", "/*.json", "/*.ico", "/*.png")
                    .permitAll()
                .antMatchers(HttpMethod.POST, "/api/films/**")
//                    .hasAuthority(FILM_WRITE.name())
                    .permitAll()
                .antMatchers(HttpMethod.PUT, "/api/films/**")
//                    .hasAuthority(FILM_WRITE.name())
                    .permitAll()
                .antMatchers(HttpMethod.DELETE, "/api/films/**")
//                    .hasAuthority(FILM_WRITE.name())
                    .permitAll()
                .antMatchers(HttpMethod.GET, "/api/films/**")
//                    .hasAuthority(FILM_READ.name())
                    .permitAll()

                .anyRequest().authenticated()
                .and()
                .formLogin().loginPage("/index.html")
                .loginProcessingUrl("/perform_login")
                .defaultSuccessUrl("/homepage.html",true)
                .failureUrl("/index.html?error=true")
                .and()
                .httpBasic();
    }

    @Bean
    @Override
    public UserDetailsService userDetailsService() {
        return new InMemoryUserDetailsManager(
                createUser("user", "password", Role.USER.name()),
                createUser("admin", "password", Role.ADMIN.name())
        );
    }

    private UserDetails createUser(String username, String password, String... roles) {
        return User.builder()
                .username(username)
                .password(encoder.encode(password))
                .roles(roles)
                .build();
    }
}
