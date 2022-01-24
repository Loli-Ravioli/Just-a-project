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
			constructor(src,alt,title,descr,price,currency,transfer,parentElement,...classes){
				this.src=src;
				this.alt=alt;
				this.title=title;
				this.descr=descr;
				this.price=price;
				this.currency=currency;
				this.transfer=transfer;
				this.changeTORub();
				this.parentElement=document.querySelector(parentElement);
				this.classes=classes || "menu__item";
			}

			changeTORub(){
				this.price= +this.price * this.transfer;
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
		}

		 new MenuCard(
			"img/tabs/elite.jpg",
			"elite",
			'Меню "Фитнес"',
			"Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
			360,
			"Руб",
			2.6872,
			".menu .container"

			).render();
		  new MenuCard(
			"img/tabs/elite.jpg",
			"elite",
			'Меню "Фитнес"',
			"Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
			360,
			"Руб",
			2.6872,
			".menu .container"

			).render();
		   new MenuCard(
			"img/tabs/elite.jpg",
			"elite",
			'Меню "Фитнес"',
			"Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
			360,
			"Руб",
			2.6872,
			".menu .container"

			).render();
		    new MenuCard(
			"img/tabs/elite.jpg",
			"elite",
			'Меню "Фитнес"',
			"Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
			360,
			"Руб",
			2.6872,
			".menu .container"

			).render();

		    // forms формы заполнения 
		     const forms = document.querySelectorAll("form");

		     const errorMessage = {
		     	loading: "animations/spinner.svg",
		     	success: "Данные переданны, ожидайте звонка",
		     	failure: "Вы проиграли"
		     };

		     forms.forEach( item =>{
		     	formPost(item);
		     })

		     function formPost(form){
		     	form.addEventListener("submit",function submitingData(item){
		     		item.preventDefault();

		     		const statusError = document.createElement('img');
		     		statusError.src = errorMessage.loading;
		     		statusError.style.cssText = `
		     		display: block;
		     		margin: 0 auto;
		     		`
		     		//statusError.textContent = errorMessage.loading;
		     		form.append(statusError);
		     		
		     		const request = new XMLHttpRequest();
		     		request.open("POST", "php/server.php");

		     		//request.setRequestHeader("Content-type", "multipart/form-data");
		     		const formData = new FormData(form);

		     		request.send(formData);

		     		console.log(formData);

		     		request.addEventListener("load",()=>{
		     			if(request.status === 200){
		     				console.log(request.response);	
		     				showMessageModal(errorMessage.success);
		     				// form.removeEventListener("submit", submitingData);
		     				form.reset();
			     				statusError.remove()

		     			}else{
		     				showMessageModal(errorMessage.failure);
		     				
		     			}
		     		})
		     	})
		     };




		     //Модольное окно после отправки формы 

		function showMessageModal(message) {
		     	const pervModalDialog = document.querySelector(".modal__dialog");

		     	pervModalDialog.style.display = "none";
		     	showmodal();

		     	const ModalMessage = document.createElement("div");
		     	ModalMessage.style.display = "block";
		     	ModalMessage.innerHTML = `
		     	<div class="modal__content">
		     		<div class="modal__close">&times;</div>
		     		<div class="modal__title">${message}</div>
		     	</div>`

		     	document.querySelector(".modal").append(ModalMessage);
		     	setTimeout(()=>{
		     		ModalMessage.remove();
		     		pervModalDialog.style.display = "block";
		     		closemodal();
		     	},4000);
		     }     
	}); 