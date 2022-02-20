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
export default modal;

export {closemodal,showmodal};