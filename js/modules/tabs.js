function tabs(){

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
}

module.exports = tabs;