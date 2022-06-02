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

export default tabs;