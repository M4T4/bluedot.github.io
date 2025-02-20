#include <emscripten.h>

// Expose this function to JavaScript
extern "C" {
    constexpr double myConst = 0.01;

    EMSCRIPTEN_KEEPALIVE
    int add(int a, int b) {
        return a + b;
    }

    EMSCRIPTEN_KEEPALIVE
    float multiply(float a, float b) {
        return a * b;
    }

    EMSCRIPTEN_KEEPALIVE
    float updatePosition(float a) {
        return a + 0.01f;
    }

    EMSCRIPTEN_KEEPALIVE
    double testConstant() {
        return myConst; // Devuelve un int directamente
    }

    // function contantVelocity() {
    //     // we recieve the current position
        
    //     // we calculate the next postion
    //     double nextPosition = 
    // }
}
