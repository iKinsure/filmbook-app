package com.ikinsure.filmbook;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;


@SpringBootTest
class ApplicationTest {

    static class Calculator {
        int add(int a, int b) {
            return a + b;
        }
    }

    private final Calculator calculator = new Calculator();

    @Test
    void shouldAddNumbers() {
        int a = 20;
        int b = 30;
        int result = calculator.add(a, b);
        assertThat(result).isEqualTo(50);
    }

}
