function slider({container, slide, nextArrow, prevArrow, totalCuuner, cyrrentCounter, wrapper, field}){

	      
	     	//Слайдер

	     	const slides = document.querySelectorAll(slide);
	     	const slider = document.querySelector(container);
	     	const previos = document.querySelector(prevArrow);
	     	const next = document.querySelector(nextArrow);
	     	const total = document.querySelector(totalCuuner);
	     	const current = document.querySelector(cyrrentCounter);
	     	const slidesWrapper = document.querySelector(wrapper);
	     	const slidesField = document.querySelector(field);
	     	const width = window.getComputedStyle(slidesWrapper).width;
	     	let slideIndex = 1;
	     	let offset = 0;

	     	//console.log(slides.length);
	     	//console.log(width)

	     	if(slides.length<10){
	     		total.textContent =`0${slides.length}`;
	     		current.textContent=`0${slideIndex}`;
	     	}else{
	     		total.textContent = slides.length;
	     		current.textContent=slideIndex;
	     	}

	     	

	     	slidesField.style.width = 100 * slides.length + "%";
	     	slidesField.style.display ="flex";
	     	slidesField.style.transition = "0.5s all";

	     	slidesWrapper.style.overflow ="hidden"

	     	slides.forEach(slide =>{
	     		slide.style.width = width;
	     	})

	     	slider.style.position = 'relative'
	     	const dots = document.createElement("ol");
	     	const dotsarr=[];
	     	dots.classList.add("carousel");
	     	dots.style.cssText=`
	     	    position: absolute;
			    right: 0;
			    bottom: 0;
			    left: 0;
			    z-index: 15;
			    display: flex;
			    justify-content: center;
			    margin-right: 15%;
			    margin-left: 15%;
			    list-style: none;
  				  `;
	     	slider.append(dots);

	     	for(let i=0;i<slides.length;i++){
	     		const dot = document.createElement("li");
	     		dot.setAttribute("data-slide-to",i+1);
	     		dot.classList.add("dot");
	     		dot.style.cssText=`
	     		 box-sizing: content-box;
			    flex: 0 1 auto;
			    width: 30px;
			    height: 6px;
			    margin-right: 3px;
			    margin-left: 3px;
			    cursor: pointer;
			    background-color: #fff;
			    background-clip: padding-box;
			    border-top: 10px solid transparent;
			    border-bottom: 10px solid transparent;
			    opacity: .5;
			    transition: opacity .6s ease;
   				 `;
   				 if(i==0){
   				 	dot.style.opacity=1;
   				 }
	     		dots.append(dot);
	     		dotsarr.push(dot);
	     	}

	     	next.addEventListener("click",()=>{
	     		if(offset == +(width.match(/\d+/)) * (slides.length -1)){
	     			offset=0;	     			
	     		} else{
	     			offset += +(width.match(/\d+/));
	     		}
	     		
	     		slidesField.style.transform=`translateX(-${offset}px)`;

	     		if(slideIndex == slides.length){
	     			slideIndex = 1;
	     		}else{
	     			slideIndex++;
	     		}
	     		if(slides.length<10){
	     			current.textContent = `0${slideIndex}`;
	     		} else {
	     			current.textContent = slideIndex;
	     		}

	     		dotsarr.forEach(dot=>dot.style.opacity=".5");
	     		dotsarr[slideIndex-1].style.opacity=1;
	     	});

	     	previos.addEventListener("click",()=>{
	     		if(offset==0){	     			
	     			offset = +(width.match(/\d+/)) * (slides.length -1)     			
	     		} else{
	     			offset -= +(width.match(/\d+/));
	     		}
	     		
	     		slidesField.style.transform=`translateX(-${offset}px)`;

	     		if(slideIndex == 1){	     			
	     			slideIndex = slides.length;
	     		}else{
	     			slideIndex--;
	     		}
	     		if(slides.length<10){
	     			current.textContent = `0${slideIndex}`;
	     		} else {
	     			current.textContent = slideIndex;
	     		}
	     		dotsarr.forEach(dot=>dot.style.opacity=".5");
	     		dotsarr[slideIndex-1].style.opacity=1;
	     	});


	     	dotsarr.forEach(dot=>{
	     		dot.addEventListener("click",(e)=>{
	     			const slideTo=e.target.getAttribute("data-slide-to");

	     			slideIndex=slideTo;
	     			offset= +(width.match(/\d+/)) * (slideTo-1);
	     			slidesField.style.transform=`translateX(-${offset}px)`;
	     			
	     			if(slides.length<10){
	     			current.textContent = `0${slideIndex}`;
	     		} else {
	     			current.textContent = slideIndex;
	     		}
	     		
	     		dotsarr.forEach(dot=>dot.style.opacity=".5");
	     		dotsarr[slideIndex-1].style.opacity=1;
	     			
	     		})
	     	})
//более простая версия слайдера 
	     	/*showSlides(slideIndex);
	     	if(slides.length<10){
	     		total.textContent =`0${slides.length}`;
	     	}else{
	     		total.textContent = slides.length
	     	}

	     	function showSlides(n){
	     		if(n>slides.length){
	     			slideIndex=1;
	     		}
	     		if(n < 1){
	     			slideIndex= slides.length
	     		}
	     		slides.forEach(item => item.style.display = "none");

	     		slides[slideIndex-1].style.display="block";

	     	if(slides.length<10){
	     		current.textContent =`0${slideIndex}`;
	     	}else{
	     		current.textContent = slideIndex
	     	}

	     	}
	     	function plusSlides(n){
	     		showSlides(slideIndex+=n);
	     	}

	     	previos.addEventListener("click",()=>{
	     		plusSlides(-1)
	     	});
	     	next.addEventListener("click",()=>{
	     		plusSlides(1)
	     	});*/

}
export default slider;