# [Fizz Buzz Time](https://1onyng.github.io/fizzBuzzTime/index.html)

## Technologies
 
* JavaScript
* HTML 
* CSS

## Summary

Fizz Buzz Time allows a user to enter two numbers for values "fizz" and "buzz". Upon submission, user is redirected to the timer page where they can start, stop, and reset a timer, as well as see their elapased time. Pop-up messages "fizz" and "buzz" will display if the total time in seconds is a multiple of their respective value. If total time is a multiple of both, "fizzbuzz" displays. 

## Error Handling

Before the fizzBuzz function is invoked, user input is inspected to determine if the values are numbers, and whether they are within range:

```javascript
  if (isNaN(fizz) || isNaN(buzz)) {
    alert("Fizz and Buzz need to be a number. Please try again.");
  } else if (fizz < 2 || fizz > 10 || buzz < 2 || buzz > 10) {
    alert("Fizz and Buzz need to be within the prescribed range. Please try again.")
```


## Persisting Data 

User input data "fizz" and "buzz" needed to be accessed by the fizzBuzz function on a separate web page. The sessionStorage property was used to pass these values by storing them inside the Storage object and retrieved using the getItem method:

```javascript
  function fizzBuzz(hr, min, sec) {
    let minSec = min * 60;
    let hrSec = hr * 60 * 60;
    let totalSec = minSec + hrSec + sec;
    let fizz = sessionStorage.getItem("fizz");
    let buzz = sessionStorage.getItem("buzz");
```

