# Flocking-Simulation

Flocking Simulation using p5js with a quad tree to increase performance. </br>
Based on the Boids system created by Craig Reynolds in 1986 </br>

## The boids system makes use of three rules: </br>

### Alignment: </br>
Alignment calculates a steering force in the average steering direction of all boids within a specified radius. </br>
remember steering force is desired - velocity

### Cohesion: </br>
Cohesion averages the position of all boids in the radius mentioned above, </br>
then calculates a steering force with a magnitude of the direction of that average position.

### Separation
This rule simply generates a vector pointing in the average opposite direction of the forces exerted on the boids within a radius </br>
and sets a magnitude with respect to distance as well.
For example, a boid with a closer distance will be given a higher priority when averaging the steering forces rather than a boid further away
</br>
Finally a steering force equal to the total of all rules is exerted on the current boid

## Quad Tree:
Unfortunatly to check which boids are in its radius you need to calculate the position of every other boid in the system </br>
this creates a time complexity with a big O notation of O(n^2) as each boid is looping over all other boids. </br>
Even with only 1000 boids the computer needs to iterate one million different times per frame!</br>

However this system can be simplified into O(logn) using a quad tree data structure. </br>
A quad tree subdivides the scene into squares limited based on the number of boids within a region </br>
in a common quad tree the squares and positions of the boids within are compressed into a trie which has a search complexity of O(logn).</br>
Thus reducing a million iterations every frame into around four thousand iterations! </br>







## References:
https://en.wikipedia.org/wiki/Flocking_(behavior)

https://en.wikipedia.org/wiki/Quadtree

https://www.youtube.com/watch?v=OJxEcs0w_kE

https://www.youtube.com/watch?v=mhjuuHl6qHM

https://www.youtube.com/watch?v=bqtqltqcQhw
