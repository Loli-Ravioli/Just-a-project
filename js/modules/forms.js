function forms() {
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

}
module.exports=forms;