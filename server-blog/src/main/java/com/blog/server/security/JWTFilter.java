package com.blog.server.security;

import com.blog.server.config.CustomUserDetails;
import com.blog.server.config.CustomerUsersDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JWTFilter extends OncePerRequestFilter {
    private final JWTTokenProvider jwtTokenProvider;
    private final CustomerUsersDetailsService customerUsersDetailsService;

    @Autowired
    public JWTFilter(JWTTokenProvider jwtTokenProvider, CustomerUsersDetailsService customerUsersDetailsService) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.customerUsersDetailsService = customerUsersDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain)
            throws ServletException, IOException {

        String token = getTokenFromRequest(httpServletRequest);
        if (token != null && jwtTokenProvider.validateToken(token)) {
            String userLogin = jwtTokenProvider.getLoginFromToken(token);
            System.out.println(SecurityContextHolder.getContext().getAuthentication());
            if (userLogin != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                CustomUserDetails customUserDetails = customerUsersDetailsService.loadUserByUsername(userLogin);
                Authentication auth = new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }
        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }

    private String getTokenFromRequest(HttpServletRequest request) {
        String bearer = request.getHeader(SecurityConstant.AUTHORIZATION);
        if (StringUtils.hasText(bearer) && bearer.startsWith(SecurityConstant.BEARER)) {
            return bearer.substring(7);
        }
        return null;
    }
}
