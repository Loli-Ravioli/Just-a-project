window.addEventListener("DOMContentLoaded",()=>{

// tabs и их переключение 

const tabs = document.querySelectorAll(".tabheader__item"),
tabscontent = document.querySelectorAll(".tabcontent"),
tabparent = document.querySelector(".tabheader__items");

function hidetabscontent(){
	tabscontent.forEach(element=>{
		element.style.display="none";
	})

	tabs.forEach(element=>{
		element.classList.remove("tabheader__item_active");
	});
};
function showtabscontent(i=0) {
	tabscontent[i].style.display="block";
	tabs[i].classList.add(".tabheader__item_active")
}
hidetabscontent();
showtabscontent();

tabparent.addEventListener("click",(event)=>{
	const target = event.target;

	if (target && target.classList.contains("tabheader__item")){
		tabs.forEach((element,index)=>{
			if(element==target){
				hidetabscontent();
				showtabscontent(index);
			}
		})
	}

})

	//timer 

	//дедлайн даты таймера 
	const deadlinetime = "2022-03-23";

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
				clearinetval(timeinterval);
			}
		}		

	}
	setTimer(".timer",deadlinetime);

	//Модальное окно и всё с ним связанное 
	3
	function zeronum(num) {
		return (num >= 0 && num < 10)? `0${num}`: num
	};
	const modalTrigger = document.querySelectorAll("[data-modal]");
	const modal = document.querySelector(".modal");
	//const modalclose = document.querySelector("[data-close]");

	
	modalTrigger.forEach((el)=>{
		el.addEventListener("click", showmodal);
	});

	//modalclose.addEventListener("click", closemodal);


	modal.addEventListener("click",(el)=>{
		if(el.target === modal || el.target.getAttribute("data-close")==""){
			
			closemodal();								
		}
	});
	document.addEventListener('keydown',(el) => {
		if(el.code === "Escape" && (modal.style.display == "block")){
			closemodal();
			window.removeEventListener("scroll",ShowModalByScroll); 		
		}
	});

	// helpers
	function showmodal() {
		modal.style.display = "block";
		document.body.style.overflow = "hidden";
		clearInterval(modaltimer);
	};
	function closemodal() {
		modal.style.display = "none";
		document.body.style.overflow = "";
		window.removeEventListener("scroll",ShowModalByScroll);

	};
	function ShowModalByScroll() {
		if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)
			showmodal();
	};
	
	const modaltimer = setTimeout(showmodal,60000);

	window.addEventListener("scroll",ShowModalByScroll);

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

/*	const GetData =  async (url) => {
	    	const result = await fetch(url);

	    	if(!result.ok){
	    		 throw new Error(`fetch error on url: ${url}, status${result.status}`);
	    	}

	    	return  await result.json();
	    };
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
	    	 	//console.log(data);
	    	 	//console.log(data);
	    	data.data.forEach(({img, altimg, title, descr, price,currency})=>{
	    		 new MenuCard(img, altimg, title, descr, price,currency, ".menu .container").render();	    		
	    	})
	    });
	    	//axios.post("http://localhost:3000/menu")





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



	    // forms формы заполнения 
	    const forms = document.querySelectorAll("form");

	    const errorMessage = {
	    	loading: "img/animation/spinner.svg",
	    	success: "Данные переданны, ожидайте звонка",
	    	failure: "Что-то пошло не так, повторите попытку"
	    };

	    forms.forEach( item =>{
	    	formPost(item);
	    });

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

	     	

	     		postData("http://localhost:3000/requests",json)
	     		.then(data => {
	     				//console.log(data);	
	     				showMessageModal(errorMessage.success); 	
	     				statusError.remove()
	     		}).catch(()=>{
	     			showMessageModal(errorMessage.failure);
	     			console.log(formDataObj);
	     		}).finally(()=>{
	     			form.reset();
	     		});	     		
	     	})
	    };




	     //Модольное окно после отправки формы 

	     function showMessageModal(message) {
	     	const pervModalDialog = document.querySelector(".modal__dialog");

	     	pervModalDialog.style.display = "none";
	     	showmodal();

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
	     		closemodal();
	     	},3000);
	     } 

	      
	     	//Слайдер



	     	const slides = document.querySelectorAll(".offer__slide");
	     	const slider = document.querySelector(".offer__slider")
	     	const previos = document.querySelector(".offer__slider-prev");
	     	const next = document.querySelector(".offer__slider-next");
	     	const total = document.querySelector("#total");
	     	const current = document.querySelector("#current");
	     	const slidesWrapper = document.querySelector(".offer__slider-wrapper");
	     	const slidesField = document.querySelector(".offer__slider-inner");
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
	     	 
	 }); 