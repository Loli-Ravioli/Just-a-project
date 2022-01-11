window.addEventListener("DOMContentLoaded",()=>{
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
		const deadlinetime = "2022-01-12";

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
		function zeronum(num) {
			return (num >= 0 && num < 10)? `0${num}`: num
		};
		const modalTrigger = document.querySelectorAll("[data-modal]");
		const modal = document.querySelector(".modal");
		const modalclose = document.querySelector("[data-close]");

		
		modalTrigger.forEach((el)=>{
			el.addEventListener("click", showmodal);
		});

		modalclose.addEventListener("click", closemodal);
		modal.addEventListener("click",(el)=>{
			if(el.target === modal){
				closemodal();
			}
		});
		function showmodal() {
			modal.style.display = "block";
			document.body.style.overflow = "hidden";
			clearInterval(modaltimer);
		};
		function closemodal() {
			modal.style.display = "none";
			document.body.style.overflow = "";
		};
		function ShowModalByScroll() {
			if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)
				showmodal();
		};
		document.addEventListener('keydown',(el) => {
			if(el.code === "Escape" && (modal.style.display == "block")){
				closemodal();
				window.removeEventListener("scroll",ShowModalByScroll); 		
			}
		});

		const modaltimer = setTimeout(showmodal,11000);

		window.addEventListener("scroll",ShowModalByScroll ) 
	});