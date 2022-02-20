function timer(id,deadline) {
	//timer 

	//дедлайн даты таймера

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

		function zeronum(num) {
		return (num >= 0 && num < 10)? `0${num}`: num
	};	

	}
	setTimer(id,deadline);

}
export default timer;