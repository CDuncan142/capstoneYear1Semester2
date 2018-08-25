/*
Graphite.js
author: Conner Duncan
*/

/* Global variable */

var rotations;
var timers;
var timer1, timer2, timer3, timer4;
var clickTimer;
var endClickTimer, clearClickTimer;
var angle = 1;
var slow = 0.9;

/* Index */

function wiggle(fun) {
  if (fun==false) {
  rotations = Array("rotate(10deg)", "rotate(-2.5deg)", "rotate(5deg)", "rotate(-10deg)", "rotate(0deg)");
  timer1 = setTimeout(function(){document.getElementById("logo").style.transform = rotations[0];}, (1 * 0300));
  timer2 = setTimeout(function(){document.getElementById("logo").style.transform = rotations[3];}, (2 * 0300));
  timer3 = setTimeout(function(){document.getElementById("logo").style.transform = rotations[2];}, (3 * 0300));
  timer4 = setTimeout(function(){document.getElementById("logo").style.transform = rotations[1];}, (4 * 0300));
  timer5 = setTimeout(function(){document.getElementById("logo").style.transform = rotations[4];}, (5 * 0300));
  }else {
    clickTimer = setInterval(function(){angle+=angle/60; document.getElementById("logo").style.transform = "rotate("+angle+"deg)";}, (0025));
    endClickTimer = setInterval(function(){clearClickTimer = clearInterval(clickTimer); angle=slow; slow*=slow;}, 10000);
  }
}
