import {getData} from"../services/services";

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
	    	//axios.post("http://localhost:3000/menu")




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

export default cards;