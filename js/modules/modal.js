function modal() {
//Модальное окно и всё с ним связанное 

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
}
module.exports=modal;