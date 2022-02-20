import {showmodal,closemodal} from "./modal";
import {postData} from "../services/services";


function forms(formSelector,modaltimerid) {
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
	     	showmodal('.modal',modaltimerid);

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
	     		closemodal('.modal');
	     	},3000);
	     } 

}
export default forms;