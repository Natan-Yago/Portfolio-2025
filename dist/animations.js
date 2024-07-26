
// document.addEventListener("DOMContentLoaded", function() {  
//   var body = document.body;  

//   window.addEventListener("scroll", function() {  
//       var scroll = window.scrollY;  

//       if (scroll >= 500) {  
//           body.classList.remove('orange');  
//           body.classList.add('dark'); // Add the dark class for scroll beyond 500px  
//       } else if (scroll >= 200) {  
//           body.classList.remove('light');  
//           body.classList.add('orange'); // Add the orange class for scroll between 200px and 500px  
//       } else {  
//           body.classList.remove('dark', 'orange'); // Remove dark and orange classes  
//           body.classList.add('light'); // Add the light class when scrolling back to top  
//       }  
//   });  
// });  



document.addEventListener("DOMContentLoaded", function() {  
  var body = document.body;  

  window.addEventListener("scroll", function() {  
      var scroll = window.scrollY;  

      if (scroll >= 1200) {  
          body.classList.remove('orange', 'light');  
          body.classList.add('dark'); // Add the dark class for scroll beyond 500px  
      } else if (scroll >= 100) {  
          body.classList.remove('orange', 'dark');  
          body.classList.add('light'); // Add the orange class for scroll between 200px and 500px  
      } else {  
          body.classList.remove('dark', 'light'); // Remove dark and orange classes  
          body.classList.add('orange'); // Add the light class when scrolling back to top  
      }  
  });  
});  
// ======SLIDER ANIMATION===============================================================================
const wrapper = document.querySelector(".wrapper");
const boxes = gsap.utils.toArray(".box");



const loop = horizontalLoop(boxes, {paused: true, paddingRight: 4, draggable: true});

// boxes.forEach((box, i) => box.addEventListener("click", () => loop.toIndex(i, {duration: 0.8, ease: "power1.inOut"})));

document.querySelector(".next").addEventListener("click", () => loop.next({duration: 0.4, ease: "power1.inOut"}));
document.querySelector(".prev").addEventListener("click", () => loop.previous({duration: 0.4, ease: "power1.inOut"}));


/*
This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.

Features:
 - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
 - When each item animates to the left or right enough, it will loop back to the other side
 - Optionally pass in a config object with values like draggable: true, center: true, speed (default: 1, which travels at roughly 100 pixels per second), paused (boolean), repeat, reversed, and paddingRight.
 - The returned timeline will have the following methods added to it:
   - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
   - current() - returns the current index (if an animation is in-progress, it reflects the final index)
   - times - an Array of the times on the timeline where each element hits the "starting" spot.
 */

function horizontalLoop(items, config) {
	items = gsap.utils.toArray(items);
	config = config || {};
	let onChange = config.onChange,
		lastIndex = 0,
		tl = gsap.timeline({repeat: config.repeat, onUpdate: onChange && function() {
				let i = tl.closestIndex();
				if (lastIndex !== i) {
					lastIndex = i;
					onChange(items[i], i);
				}
			}, paused: config.paused, defaults: {ease: "none"}, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)}),
		length = items.length,
		startX = items[0].offsetLeft,
		times = [],
		widths = [],
		spaceBefore = [],
		xPercents = [],
		curIndex = 0,
		indexIsDirty = false,
		center = config.center,
		pixelsPerSecond = (config.speed || 1) * 100,
		snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
		timeOffset = 0,
		container = center === true ? items[0].parentNode : gsap.utils.toArray(center)[0] || items[0].parentNode,
		totalWidth,
		getTotalWidth = () => items[length-1].offsetLeft + xPercents[length-1] / 100 * widths[length-1] - startX + spaceBefore[0] + items[length-1].offsetWidth * gsap.getProperty(items[length-1], "scaleX") + (parseFloat(config.paddingRight) || 0),
		populateWidths = () => {
			let b1 = container.getBoundingClientRect(), b2;
			items.forEach((el, i) => {
				widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
				xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / widths[i] * 100 + gsap.getProperty(el, "xPercent"));
				b2 = el.getBoundingClientRect();
				spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
				b1 = b2;
			});
			gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
				xPercent: i => xPercents[i]
			});
			totalWidth = getTotalWidth();
		},
		timeWrap,
		populateOffsets = () => {
			timeOffset = center ? tl.duration() * (container.offsetWidth / 2) / totalWidth : 0;
			center && times.forEach((t, i) => {
				times[i] = timeWrap(tl.labels["label" + i] + tl.duration() * widths[i] / 2 / totalWidth - timeOffset);
			});
		},
		getClosest = (values, value, wrap) => {
			let i = values.length,
				closest = 1e10,
				index = 0, d;
			while (i--) {
				d = Math.abs(values[i] - value);
				if (d > wrap / 2) {
					d = wrap - d;
				}
				if (d < closest) {
					closest = d;
					index = i;
				}
			}
			return index;
		},
		populateTimeline = () => {
			let i, item, curX, distanceToStart, distanceToLoop;
			tl.clear();
			for (i = 0; i < length; i++) {
				item = items[i];
				curX = xPercents[i] / 100 * widths[i];
				distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
				distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
				tl.to(item, {xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond}, 0)
				  .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false}, distanceToLoop / pixelsPerSecond)
				  .add("label" + i, distanceToStart / pixelsPerSecond);
				times[i] = distanceToStart / pixelsPerSecond;
			}
			timeWrap = gsap.utils.wrap(0, tl.duration());
		},
		refresh = (deep) => {
			let progress = tl.progress();
			tl.progress(0, true);
			populateWidths();
			deep && populateTimeline();
			populateOffsets();
			deep && tl.draggable ? tl.time(times[curIndex], true) : tl.progress(progress, true);
		},
		proxy;
	gsap.set(items, {x: 0});
	populateWidths();
	populateTimeline();
	populateOffsets();
	window.addEventListener("resize", () => refresh(true));
	function toIndex(index, vars) {
		vars = vars || {};
		(Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
		let newIndex = gsap.utils.wrap(0, length, index),
			time = times[newIndex];
		if (time > tl.time() !== index > curIndex && index !== curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
			time += tl.duration() * (index > curIndex ? 1 : -1);
		}
		if (time < 0 || time > tl.duration()) {
			vars.modifiers = {time: timeWrap};
		}
		curIndex = newIndex;
		vars.overwrite = true;
		gsap.killTweensOf(proxy);    
		return vars.duration === 0 ? tl.time(timeWrap(time)) : tl.tweenTo(time, vars);
	}
	tl.toIndex = (index, vars) => toIndex(index, vars);
	tl.closestIndex = setCurrent => {
		let index = getClosest(times, tl.time(), tl.duration());
		if (setCurrent) {
			curIndex = index;
			indexIsDirty = false;
		}
		return index;
	};
	tl.current = () => indexIsDirty ? tl.closestIndex(true) : curIndex;
	tl.next = vars => toIndex(tl.current()+1, vars);
	tl.previous = vars => toIndex(tl.current()-1, vars);
	tl.times = times;
	tl.progress(1, true).progress(0, true); // pre-render for performance
	if (config.reversed) {
		tl.vars.onReverseComplete();
		tl.reverse();
	}
	if (config.draggable && typeof(Draggable) === "function") {
		proxy = document.createElement("div")
		let wrap = gsap.utils.wrap(0, 1),
			ratio, startProgress, draggable, dragSnap, lastSnap, initChangeX,
			align = () => tl.progress(wrap(startProgress + (draggable.startX - draggable.x) * ratio)),
			syncIndex = () => tl.closestIndex(true);
		typeof(InertiaPlugin) === "undefined" && console.warn("InertiaPlugin required for momentum-based scrolling and snapping. https://greensock.com/club");
		draggable = Draggable.create(proxy, {
			trigger: items[0].parentNode,
			type: "x",
			onPressInit() {
        let x = this.x;
				gsap.killTweensOf(tl);
				startProgress = tl.progress();
				refresh();
				ratio = 1 / totalWidth;
        initChangeX = (startProgress / -ratio) - x;
				gsap.set(proxy, {x: startProgress / -ratio});
			},
			onDrag: align,
			onThrowUpdate: align,
      overshootTolerance: 0,
			inertia: true,
			snap(value) {
        //note: if the user presses and releases in the middle of a throw, due to the sudden correction of proxy.x in the onPressInit(), the velocity could be very large, throwing off the snap. So sense that condition and adjust for it. We also need to set overshootTolerance to 0 to prevent the inertia from causing it to shoot past and come back
        if (Math.abs(startProgress / -ratio - this.x) < 10) {
          return lastSnap + initChangeX
        }
				let time = -(value * ratio) * tl.duration(),
					wrappedTime = timeWrap(time),
					snapTime = times[getClosest(times, wrappedTime, tl.duration())],
					dif = snapTime - wrappedTime;
				Math.abs(dif) > tl.duration() / 2 && (dif += dif < 0 ? tl.duration() : -tl.duration());
        lastSnap = (time + dif) / tl.duration() / -ratio;
				return lastSnap;
			},
			onRelease() {
				syncIndex();
				draggable.isThrowing && (indexIsDirty = true);
			},
			onThrowComplete: syncIndex
		})[0];
		tl.draggable = draggable;
	}
	tl.closestIndex(true);
  lastIndex = curIndex;
	onChange && onChange(items[curIndex], curIndex);
	return tl;
}
// =====================================================================================================
// ======LOADER ANIMATION===============================================================================
function startLoader() {
  let counterelement = document.querySelector(".counter");
  let currentValue = 0;

  function updateCounter() {
      if (currentValue === 100) {
          return
      }
      currentValue += Math.floor(Math.random() * 10) + 3;

      if (currentValue > 100) {
          currentValue = 100;
      }
      counterelement.textContent = currentValue;
      let delay = Math.floor(Math.random() * 200) + 50;

      setTimeout(updateCounter, delay);
  }

  updateCounter();
}

startLoader();


gsap.to(".counter", 0.25, {
  delay: 3,
  opacity: 0,
})


gsap.to(".bar", 1.5, {
  delay: 3,
  height: 0,
  stagger: {
      amount: 0.5,
  },
  ease: "power4.inOut",
})
  
  
  document.addEventListener("DOMContentLoaded", (event) => {
   const tl = gsap.timeline({ defaults: { duration: 1 } });
   // Manually adding each element with specific delays or settings
   tl.from(".gsap-tl-1", { opacity: 0, y: 50, duration: 0.5 })
     .from(".gsap-tl-2", { opacity: 0, y: 50, duration: 0.5 }, "+=0") // Start 0.2 seconds after the previous animation
    gsap.from(".revel", { opacity: 0, y: 100, duration: 1 });

   });




   