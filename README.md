# Alternative elections

## What is this?
Following the UK's 2017 general elections, I was curious as to how our own electoral system compares to others used in democracies around the world. A quick wiki search got me interested in the D'Hondt method of seat allocation.

It seemed like a fun little code exercise to implement it and see how it's results would compare against the results of the UK's 'first past the post' system.

## What data is used?
The data from the latest election wasn't yet available, so I took 2015 data from the [Electoral Commission's Website](https://www.electoralcommission.org.uk/our-work/our-research/electoral-data).
A version of this data can be seen in `data/2015-05_GeneralElection.json`, which was converted to JSON for easier processing.

## What electoral systems are calculated?
At the moment it's just looking at:
 - __First past the post__: What we're doing now. There's a bunch of constituencies which can each elect one person to represent them at parliament
 - __Party list proportional representation (National level)__: What if all votes across the country were tallied up, then seats assigned based the D'Hondt seat distribution.
 - __Party list proportional representation (County level)__: What if each county could send a certain number of people. For this distribution I have taken all constituencies within the same county and summed them to get a seat count for that county.


 These were the ones I was interested in seeing at the time, but the framework is there to implement other electoral systems as well.


 ## Will you develop this further?
 probably not. It was a fun bit of code-kata, but it's not my job or anything.

## License
__Cider-ware__ - Use, Distribute and modify to your hearts content. If you like it or find it useful (and we ever meet) feel free to buy me a cider.
