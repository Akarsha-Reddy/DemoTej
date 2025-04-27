package com.ibm.config;

import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.handler.SimpleUrlHandlerMapping;
import org.springframework.web.servlet.resource.ResourceHttpRequestHandler;

@Configuration
public class RestConfig implements WebMvcConfigurer {

    @Bean
    public SimpleUrlHandlerMapping customUrlMapping() {
        SimpleUrlHandlerMapping mapping = new SimpleUrlHandlerMapping();
        mapping.setOrder(Integer.MAX_VALUE - 2);
        mapping.setUrlMap(Collections.emptyMap());
        return mapping;
    }

    @Bean
    public ResourceHttpRequestHandler customResourceHandler() {
        return new ResourceHttpRequestHandler();
    }
}