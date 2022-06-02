/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {

	     	 //калькулятор калорий 

	     	 const result = document.querySelector(".calculating__result span");

	     	  let sex,
	     	  height,
	     	  weight,
	     	  age,
	     	  ratio=1.375;

	     	 if(localStorage.getItem("sex")){
	     	 	 sex = localStorage.getItem("sex");
	     	 }else{
	     	 	sex="female";
	     	 	localStorage.setItem("sex","female");
	     	 }

	     	  if(localStorage.getItem("ratio")){
	     	 	let ratio = localStorage.getItem("ratio");
	     	 }else{
	     	 	ratio = 1.375;
	     	 	localStorage.setItem("ratio",1.375);
	     	 }


	     	 function initLocalSettings(selector,activeClass){
	     	 	const  elements= document.querySelectorAll(selector);

	     	 	elements.forEach(el=>{
	     	 		el.classList.remove(activeClass);
	     	 		if(el.getAttribute("id") == localStorage.getItem("sex")){
	     	 			el.classList.add(activeClass);
	     	 		}
	     	 		if(el.getAttribute("data-ratio")== localStorage.getItem("ratio")){
	     	 			el.classList.add(activeClass);
	     	 		}
	     	 	})
	     	 }

	     	initLocalSettings("#gender div","calculating__choose-item_active");
	     	initLocalSettings(".calculating__choose_big div","calculating__choose-item_active");

	     	 function calcTotal(){
	     	 	if(!sex || !height || !weight || !age || !ratio){
	     	 		result.textContent="Вы ввели не все данные";
	     	 		return;
	     	 	}
	     	 	if(sex=="female"){
	     	 		result.textContent=Math.round((447.6 + (9.2 * weight) + (3.1 * weight) - (4.3*age)) * ratio);
	     	 	}else{
	     	 		result.textContent=Math.round((88.36 + (13.4 * weight) + (4.8 * weight) - (5.7*age)) * ratio);
	     	 	}
	     	 }

	     	 


	     	 function getStaticInfo(selector,activeClass){
	     	 	const elements=document.querySelectorAll(selector);
	     	 	
	     	 	elements.forEach(el=>{
	     	 		el.addEventListener("click",(e)=>{
	     	 		if(e.target.getAttribute("data-ratio")){
	     	 			ratio= +e.target.getAttribute("data-ratio");
	     	 			localStorage.setItem("ratio",+e.target.getAttribute("data-ratio"));
	     	 		}else{
	     	 			sex= e.target.getAttribute("id");
	     	 			localStorage.setItem("sex",e.target.getAttribute("id"));
	     	 		}

	     	 		console.log(ratio, sex);

	     	 		elements.forEach(el=>{
	     	 			el.classList.remove(activeClass);	     	 			
	     	 		});
	     	 		e.target.classList.add(activeClass);
	     	 		calcTotal();
	     	 	});
	     	 	})
	     	 	
	     	 }

	     	 getStaticInfo("#gender div","calculating__choose-item_active");
	     	 getStaticInfo(".calculating__choose_big div","calculating__choose-item_active");


	     	 function getDinamicInfo(selector){
	     	 	const  input = document.querySelector(selector);    	 	

	     	 	input.addEventListener("input",()=>{
	     	 		if(input.value.match(/\D/g)){
	     	 		input.style.border = '1px solid red';	     	 		
	     	 	}else {
	     	 		input.style.border= "none";
	     	 	}

	     	 		switch(input.getAttribute("id")){
	     	 			case "height":
	     	 				height= +input.value;
	     	 			case "weight":
	     	 				weight= +input.value;
	     	 			case "age":
	     	 				age= +input.value;
	     	 				break;
	     	 		}
	     	 		calcTotal();
	     	 		console.log("test");
	     	 	});
	     	 }


	     	 getDinamicInfo("#height");
	     	 getDinamicInfo("#weight");
	     	 getDinamicInfo("#age");


	     	 
	     	 
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards(){
		//Классы для для карточек

	class MenuCard{
		constructor(src,alt,title,descr,price,currency,parentElement,...classes){
			this.src=src;
			this.alt=alt;
			this.title=title;
			this.descr=descr;
			this.price=price;
			this.currency=currency;			
			this.parentElement=document.querySelector(parentElement);
			this.classes=classes || "menu__item";
		}

		changeTORub(){
			this.price= (+this.price * +this.transfer).toFixed();
			this.price=this.price.toFixed();

		}

		render(){
			const element = document.createElement("div");
			if(this.classes.Length==0){
				element.classList.add("menu__item");
			}
			else{
				this.classes.forEach((classname)=>{
					element.classList.add(classname)
				});					
			};

			element.innerHTML=` <div class="menu__item">
			<img src=${this.src} alt=${this.alt}>
			<h3 class="menu__item-subtitle">${this.title}</h3>
			<div class="menu__item-descr">${this.descr}</div>
			<div class="menu__item-divider"></div>
			<div class="menu__item-price">
			<div class="menu__item-cost">Цена:</div>
			<div class="menu__item-total"><span>${this.price}</span> ${this.currency}/день</div>
			</div>
			</div>`;

			this.parentElement.append(element)
		}	
	};



// Загрузка карточек с серва при помощи fetch
/*
	    GetData("http://localhost:3000/menu")
	    .then(data=>{
	    	data.forEach(({img, altimg, title, descr, price,currency})=>{
	    		 new MenuCard(img, altimg, title, descr, price,currency, ".menu .container").render();	    		
	    	})
	    });*/

	    //Загрузка карточек с серва при помощи библиотеки axios 
	   	//интерисующий обьект лежит в data.data. 
	    	axios.get("http://localhost:3000/menu")
	    	 .then(data=>{
	    	data.data.forEach(({img, altimg, title, descr, price,currency})=>{
	    		 new MenuCard(img, altimg, title, descr, price,currency, ".menu .container").render();	    		
	    	})
	    });
	    	axios.post("http://localhost:3000/menu");




// "Ручноесоздание карочек путем создание обьекта класса MenuCard"
/*	new MenuCard(
		"img/tabs/elite.jpg",
		"elite",
		'Меню "Фитнес"',
		"Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
		360,
		"Руб",
		2.6872,
		".menu .container"

		).render();*/


}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");




function forms(formSelector,modalTimerId) {
 // forms формы заполнения 
	    const forms = document.querySelectorAll(formSelector);

	    const errorMessage = {
	    	loading: "img/animation/spinner.svg",
	    	success: "Данные переданны, ожидайте звонка",
	    	failure: "Что-то пошло не так, повторите попытку"
	    };

	    forms.forEach( item =>{
	    	formPost(item);
	    });


	    

	    function formPost(form){
	    	form.addEventListener("submit",function submitingData(item){
	    		item.preventDefault();

	    		const statusError = document.createElement('img');
	    		statusError.src = errorMessage.loading;
	    		statusError.style.cssText = `
	    		display: block;
	    		margin: 0 auto;		     			     		
	    		`
	     		
	     		form.append(statusError);
	     		form.insertAdjacentElement("afterend",statusError); 		

	     		
	     		const formData = new FormData(form);
	     		console.log(new FormData(form));	     		

	     		const formDataObj = {};
	     		formData.forEach(function(value,key){
	     			formDataObj[key]=value;
	     		});
	     		console.log(formDataObj)


	     		const json = JSON.stringify(Object.fromEntries(formData.entries()));

	     	

	     		(0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests",json)
	     		.then(data => {
	     				showMessageModal(errorMessage.success); 	
	     				statusError.remove()
	     		}).catch(()=>{
	     			showMessageModal(errorMessage.failure);
	     			console.log(formDataObj);
	     		}).finally(()=>{
	     			form.reset();
	     		});	     		
	     	})}




	     //Модольное окно после отправки формы 

	     function showMessageModal(message) {
	     	const pervModalDialog = document.querySelector(".modal__dialog");

	     	pervModalDialog.style.display = "none";
	     	(0,_modal__WEBPACK_IMPORTED_MODULE_0__.showmodal)('.modal',modalTimerId);

	     	const ModalMessage = document.createElement("div");
	     	ModalMessage.classList.add("modal__dialog");
	     	ModalMessage.innerHTML = `
	     	<div class="modal__content">
	     	<div class="modal__close" data-close>&times;</div>
	     	<div class="modal__title">${message}</div>
	     	</div>`;
	     	ModalMessage.style.display = "block";
	     	document.querySelector(".modal").append(ModalMessage);
	     	setTimeout(()=>{
	     		ModalMessage.remove();
	     		pervModalDialog.style.display = "block";
	     		(0,_modal__WEBPACK_IMPORTED_MODULE_0__.closemodal)('.modal');
	     	},3000);
	     } 

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closemodal": () => (/* binding */ closemodal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "showmodal": () => (/* binding */ showmodal)
/* harmony export */ });
function showmodal(modalSelector,modaltimerid) {
	const modal = document.querySelector(modalSelector);
	modal.style.display = "block";
	document.body.style.overflow = "hidden";
	if(modaltimerid){
	clearInterval(modaltimerid);
	}
}
function closemodal(modalSelector) {
	const modal = document.querySelector(modalSelector);
	modal.style.display = "none";
	document.body.style.overflow = "";
	//window.removeEventListener("scroll",ShowModalByScroll);
}

function modal(triggerSelector,modalSelector,modaltimerid) {
//Модальное окно и всё с ним связанное 

	const modalTrigger = document.querySelectorAll(triggerSelector);
	const modal = document.querySelector(modalSelector);


	
	modalTrigger.forEach((el)=>{
		el.addEventListener("click", () => showmodal(modalSelector,modaltimerid));
	});

	//modalclose.addEventListener("click", closemodal);


	modal.addEventListener("click",(el)=>{
		if(el.target === modal || el.target.getAttribute("data-close")==""){
			window.removeEventListener("scroll",ShowModalByScroll);
			closemodal(modalSelector);
		}
	});
	document.addEventListener('keydown',(el) => {
		if(el.code === "Escape" && (modal.style.display == "block")){
			closemodal(modalSelector);
			window.removeEventListener("scroll",ShowModalByScroll); 		
		}
	});


	function ShowModalByScroll() {
		if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)
			showmodal(modalSelector,modaltimerid);
	};

	window.addEventListener("scroll",ShowModalByScroll);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector,tabscontentSelector,tabsparentSelector,activeClass){

// tabs и их переключение 

const tabs = document.querySelectorAll(tabsSelector),
tabsContent = document.querySelectorAll(tabscontentSelector),
tabparent = document.querySelector(tabsparentSelector);

function hidetabscontent(){
	tabsContent.forEach(element=>{
		element.style.display="none";
	})

	tabs.forEach(element=>{
		element.classList.remove(activeClass/*.slice(1)*/);

	});
}
function showtabscontent(i=0) {
	tabsContent[i].style.display="block";
	tabs[i].classList.add(activeClass)
}
hidetabscontent();
showtabscontent();

tabparent.addEventListener("click",(event)=>{
	const target = event.target;

	if (target && target.classList.contains(tabsSelector.slice(1))){
		tabs.forEach((element,index)=>{
			if(element===target){
				hidetabscontent();
				showtabscontent(index);
			}
		})
	}

})
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function clearinetval(timeinterval) {

}

function timer(id,deadline) {
	//timer 

	//дедлайн даты таймера

	function getTimeReamain(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date());
		const days = Math.floor(t / (1000*60*60*24));
		const hours = Math.floor((t / (1000*60*60) % 24));
		const mins = Math.floor((t / 1000 / 60) % 60);
		const seconds = Math.floor((t/1000) % 60);


		return{
			"total":t, 
			days, 
			hours,
			mins,
			seconds		
		};
	}
	function setTimer(elem,endtime) {
		const timer = document.querySelector(elem);
		const days = timer.querySelector("#days");
		const hours = timer.querySelector("#hours");
		const mins = timer.querySelector("#minutes");
		const seconds = timer.querySelector("#seconds");
		let timeinterval = setInterval(updatetime,1000);
		//запуск updatetime раньше чем он запустится через setInterval
		updatetime();

		function updatetime() {
			const t = getTimeReamain(endtime);					
			days.innerHTML = zeronum(t.days);
			hours.innerHTML = zeronum(t.hours);
			mins.innerHTML = zeronum(t.mins);					
			seconds.innerHTML = zeronum(t.seconds);
			if(t.total <= 0){
				//clearinetval(timeinterval);
			}
		}	

		function zeronum(num) {
		return (num >= 0 && num < 10)? `0${num}`: num
	}

	}
	setTimer(id,deadline);

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GetData": () => (/* binding */ GetData),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData =  async (url,data) => {
    const result = await fetch(url,{
        method:"POST",
        headers:{
            "Content-type": "application/json"
        },
        body: data
    });
    return  await result.json();
};

const GetData =  async (url) => {
    const result = await fetch(url);

    if(!result.ok){
        throw new Error(`fetch error on url: ${url}, status${result.status}`);
    }

    return  await result.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
	
	
	
	
	
	
	
	


	window.addEventListener("DOMContentLoaded",()=>{
		const modaltimerid = setTimeout(()=>(0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.showmodal)(".modal",modaltimerid),3000000);

						(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(".tabheader__item",".tabcontent",".tabheader__items","tabheader__item_active");
						(0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])("[data-modal]",".modal",modaltimerid);
						(0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])(".timer","2022-12-31");
						(0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
						(0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])("form",modaltimerid);
						(0,_modules_calc__WEBPACK_IMPORTED_MODULE_5__["default"])();
						(0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
							container:".offer__slider",
							slide:".offer__slide",
							nextArrow:".offer__slider-next",
							prevArrow:".offer__slider-prev",
							totalCuuner:"#total",
							cyrrentCounter:"#current",
							wrapper:".offer__slider-wrapper",
							field:".offer__slider-inner"

						});
	console.log(_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"]);
	});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map