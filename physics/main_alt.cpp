#include <emscripten.h>
#include <math.h>
#include "precision.h"
#include "core.h"

// Expose this function to JavaScript
extern "C" {
    EMSCRIPTEN_KEEPALIVE
    cyclone::Vector3* Vector3_create(cyclone::real x, cyclone::real y, cyclone::real z) {
        return new cyclone::Vector3(x, y, z);
    }

    EMSCRIPTEN_KEEPALIVE
    void Vector3_delete(cyclone::Vector3* vec) {
        delete vec;
    }

    EMSCRIPTEN_KEEPALIVE
    cyclone::real Vector3_magnitude(cyclone::Vector3* vec) {
        return vec->magnitude();
    }

    EMSCRIPTEN_KEEPALIVE
    void Vector3_normalize(cyclone::Vector3* vec) {
        vec->normalize();
    }

    EMSCRIPTEN_KEEPALIVE
    void Vector3_add(cyclone::Vector3* vec, cyclone::Vector3* other) {
        *vec += *other;
    }

    EMSCRIPTEN_KEEPALIVE
    cyclone::real Vector3_dotProduct(cyclone::Vector3* vec, cyclone::Vector3* other) {
        return vec->scalarProduct(*other);
    }

    EMSCRIPTEN_KEEPALIVE
    cyclone::Vector3* Vector3_crossProduct(cyclone::Vector3* vec, cyclone::Vector3* other) {
        return new cyclone::Vector3(vec->vectorProduct(*other));
    }
}
