package com.example.video.controller;

import com.example.video.repository.UserRepository;
import com.example.video.security.JwtTokenProvider;
import com.example.video.security.UserAuthenticationToken;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@AllArgsConstructor
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;

    private final JwtTokenProvider jwtTokenProvider;

    private final UserRepository users;

    @PostMapping("/auth/base/login")
    public ResponseEntity login(@RequestBody AuthenticationRequest data) {
        try {
            var username = data.getUsername();
            var password = data.getPassword();
            var authentication = (UserAuthenticationToken) authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            var token = jwtTokenProvider.createToken(authentication.getId());
            Map<Object, Object> model = new HashMap<>();
            model.put("access_token", token);
            return ok(model);
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid username/password supplied", e);
        }
    }

}