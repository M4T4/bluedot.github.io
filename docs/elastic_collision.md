# Elastic Collision

1. Let's consider the first scenario where we need to tell the system that if a particle hits the wall(surface) it should banced off
2. If two particles collide with each other, they should banced off
3. Physiscs mask for simulations?
4. Consider a box with a lot of particles moving in different constant valocities.


### Collisions

In a collision, there is a change of momentum when a particle collides.
Impulse: Is a vector that represents change in momentum of a particle that just collided it.

The simplest form of collision is with a surface, because it is static. There are 3 types of collisions:
- Sticky collisions, in which the particle sticks to the surface.
- Elastic collisions, in which the particle bounces off the surface with the same kinetic energy as before the collision.
- Inelastic collisions, in which the particle exchanges energy with the surface, and may bounce off with less energy or more energy than before the collision.

We will focus on elastic collision.

In a elastic collision, a particle scatters from a wall with the same kinectic energy it initially had.

If there are no external forces at the moment of collision, the total momentum after the collision will be the same as the end.

**Total momentum**
$$m_1 v_1 + m_2 v_2 = (m_1 + m_2) v_c$$

This allows us to calculate the velocity vector

$$v_c = \frac{m_1 v_1 + m_2 v_2}{(m_1 + m_2)}  $$


***Compilation**

``sh
emcc physics/main.cpp -o public/physics/output.js \
    -s EXPORTED_FUNCTIONS='["_Vector3_create", "_Vector3_delete", "_Vector3_magnitude", "_Vector3_normalize", "_Vector3_add", "_Vector3_dotProduct", "_Vector3_crossProduct"]' \
    -s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]' \
    -s MODULARIZE=1 \
    -s EXPORT_ES6=0
``



### References

- https://en.wikipedia.org/wiki/Elastic_collision#Examples

- Revisar esto 
https://web.chem.ox.ac.uk/teaching/Physics%20for%20CHemists/Mechanics/Collisions.html#Int35
