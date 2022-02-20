	import	tabs from"./modules/tabs";
	import	modal from"./modules/modal";
	import	timer from"./modules/timer";
	import	cards from"./modules/cards";
	import	forms from"./modules/forms";
	import	calc from"./modules/calc";
	import	slider from"./modules/slider";
	import {showmodal} from"./modules/modal";


	window.addEventListener("DOMContentLoaded",()=>{
		const modaltimerid = setTimeout(()=>showmodal(".modal",modaltimerid),3000000);

						tabs(".tabheader__item",".tabcontent",".tabheader__items","tabheader__item_active");
						modal("[data-modal]",".modal",modaltimerid);
						timer(".timer","2022-03-23");
						cards();
						forms("form",modaltimerid);
						calc();
						slider({
							container:".offer__slider",
							slide:".offer__slide",
							nextArrow:".offer__slider-next",
							prevArrow:".offer__slider-prev",
							totalCuuner:"#total",
							cyrrentCounter:"#current",
							wrapper:".offer__slider-wrapper",
							field:".offer__slider-inner"

						});
	console.log(tabs);
	});