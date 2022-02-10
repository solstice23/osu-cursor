import cursorDefault from '../assets/cursor.png';
import cursorAdditive from '../assets/cursor-additive.png';
import anime from 'animejs';

export default class osuCursor {
    constructor(options) {
		this.options = options || {};
		this.options.rotate ??= true;

		this.init();
    }


	injectHtml(html, el) {
		let div = document.createElement('div');
		div.innerHTML = html;
		while (div.children.length > 0) {
			el.appendChild(div.children[0]);
		}
		return el.lastChild;
	}


	init() {
		this.dragState = 0;
		/*0 - not dragging
		  1 - start dragging
		  2 - dragging and rotating
		  3 - native browser dragging*/
		this.visible = false;
		this.dragStartPos = {x: 0, y: 0};
		this.rotateState = {
			isInAnimation: false,
			degrees: 0
		}
		this.isTouch = false;

		if (document.querySelector("#osu-cursor")){
			return;
		}
		this.cursor = this.injectHtml(`
		<div class='osu-cursor' id='osu-cursor'>
			<div class='cursor-inner'>
			<img class='cursor-fg' src='${cursorDefault}'/>
			<img class='cursor-additive' src='${cursorAdditive}'/>
			</div>
		</div>`, document.body);
		this.cursor.style.display = "none";
		this.cursor.style.top = -500;
		this.cursor.style.left = -500;
		//document.documentElement.style.cursor = "none";

		this.cursorInner = this.cursor.querySelector(".cursor-inner");
		this.cursorFg = this.cursor.querySelector(".cursor-fg");
		this.cursorAdditive = this.cursor.querySelector(".cursor-additive");

		this.mouseMoveFunc = this.mouseMove.bind(this);
		this.mouseOverFunc = this.mouseOver.bind(this);
		this.mouseDownFunc = this.mouseDown.bind(this);
		this.mouseUpFunc = this.mouseUp.bind(this);
		this.mouseLeaveFunc = this.mouseLeave.bind(this);
		this.dragFunc = this.drag.bind(this);
		this.dragEndFunc = this.dragEnd.bind(this);
		this.touchFunc = this.touch.bind(this);
		document.addEventListener('mousemove', this.mouseMoveFunc, {passive: true});
		document.addEventListener('mouseover', this.mouseOverFunc, {passive: true});
		document.addEventListener('mousedown', this.mouseDownFunc, {passive: true});
		document.addEventListener('touchstart', this.touchFunc, {passive: true});
		document.addEventListener('touchmove', this.touchFunc, {passive: true});
		document.addEventListener('mouseup', this.mouseUpFunc, {passive: true});
		document.addEventListener('mouseleave', this.mouseLeaveFunc, {passive: true});
		document.addEventListener('drag', this.dragFunc, {passive: true});
		document.addEventListener('dragend', this.dragEndFunc, {passive: true});
	}
		
	getCurrentCursorStyle(target){
		let cursorStyle = getComputedStyle(target).cursor;
		return cursorStyle;
	}

    mouseMove(e) {
		if (this.isTouch){
			this.isTouch = false;
			return;
		}
		this.cursor.style.top = e.pageY - window.pageYOffset + "px";
		this.cursor.style.left = e.pageX - window.pageXOffset + "px";
		if (this.dragState != 0 && this.dragState != 3 && this.options.rotate){
			const deltaX = e.pageX - window.pageXOffset - this.dragStartPos.x;
			const deltaY = e.pageY - window.pageYOffset - this.dragStartPos.y;
			
			if (deltaX * deltaX + deltaY * deltaY > 30 * 30){
				this.dragState = 2;
			}else{
				return;
			}

			let degrees = Math.atan2(-deltaX, deltaY) * 180 / Math.PI + 24.3;
			
			const diff = (degrees - this.rotateState.degrees) % 360;
			if (diff < -180) diff += 360;
			if (diff > 180) diff -= 360;
			this.rotateState.degrees += diff;
			anime.remove(this.cursor);
			this.cursor.style.transition = `transform 0.15s`;
			this.cursor.style.transform = `rotate(${this.rotateState.degrees}deg)`;
			
		}		
    }

	mouseDown(e) {
		if (this.isTouch){
			this.isTouch = false;
			return;
		}
		if (this.visible){
			this.dragState = 1;
			//anime.remove(this.cursor);
			this.cursorAdditive.style.transitionDuration = "800ms";
			this.dragStartPos.x = e.pageX - window.pageXOffset;
			this.dragStartPos.y = e.pageY - window.pageYOffset;
			this.rotateState.degrees = 0;
			this.cursor.classList.add("active");
			anime.remove(this.cursorInner);
			anime({
				targets: this.cursorInner,
				scale: 0.9,
				duration: 800,
				easing: function() { return function(t) { return (t - 1) * (t - 1) * (t - 1) + 1;} }
			});
		}
	}

	mouseUp(e) {
		if (this.visible){
			if (this.dragState == 2){
				anime.remove(this.cursor);
				this.rotateState.isInAnimation = true;
				this.cursor.style.removeProperty("transition");
				anime({
					targets: this.cursor,
					rotate: 0,
					duration: 600 * (1 + Math.abs(this.rotateState.degrees / 720)),
					easing: function() { return function(t) { return Math.pow(2, -10 * t) * Math.sin((0.5 * t - 0.075) * 20.943951023931955) + 1 - 0.0004882812499999998 * t; } },
					complete: () => {
						this.rotateState.isInAnimation = false;
					}
				});
				this.rotateState.degrees = 0;
				//this.cursor.style.transform = `rotate(0deg)`;
			}
			this.dragState = 0;
			this.cursorAdditive.style.transitionDuration = "600ms";
			this.cursor.classList.remove("active");
			anime.remove(this.cursorInner);
			anime({
				targets: this.cursorInner,
				scale: 1,
				duration: 500,
				easing: function() { return function(t) { return Math.pow(2, -10 * t) * Math.sin((t - 0.075) * 20.943951023931955) + 1 - 0.00048828125 * t;} }
			});
		}
	}
	
	mouseLeave(e) {
		this.visible = false;
		document.documentElement.style.removeProperty("cursor");
		this.cursor.style.display = "none";
	}

	mouseOver(e) {
		if (this.dragState != 0){
			return;
		}
		const currentCursor = this.getCurrentCursorStyle(e.target);
		//console.log(currentCursor);
		if (["default", "auto", "none"].includes(currentCursor)){
			this.visible = true;
			document.documentElement.style.cursor = "none";
			this.cursor.style.display = "block";
		}else{
			this.visible = false;
			document.documentElement.style.removeProperty("cursor");
			this.cursor.style.display = "none";
		}
	}

	drag(e) {
		this.visible = false;
		document.documentElement.style.removeProperty("cursor");
		this.cursor.style.display = "none";
		this.dragState = 3;
	}

	dragEnd(e) {
		this.visible = true;
		document.documentElement.style.cursor = "none";
		this.cursor.style.display = "block";
		this.dragState = 0;
		this.cursor.classList.remove("active");
	}

	touch(e) {
		this.isTouch = true;
	}

    stop() {
		document.removeEventListener('mousemove', this.mouseMoveFunc);
		document.removeEventListener('mouseover', this.mouseOverFunc);
		document.removeEventListener('mousedown', this.mouseDownFunc);
		document.removeEventListener('touchstart', this.touchFunc);
		document.removeEventListener('touchmove', this.touchFunc);
		document.removeEventListener('mouseup', this.mouseUpFunc);
		document.removeEventListener('mouseleave', this.mouseLeaveFunc);
		document.removeEventListener('drag', this.dragFunc);
		document.removeEventListener('dragend', this.dragEndFunc);
		if (this.cursor){
			this.cursor.remove();
			this.cursor = null;
		}
    }
}