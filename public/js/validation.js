function checkEmail(str){
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(str);
}

function checkLogin(str)
{
	//var re = /^[a-zA-Z]+$/;
	var re = /^[*]{1}$/;
	return (re.test(str) && str.length >= 4 && str.length <= 15);
}

function checkPassword(str)
{
	var re = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
	return re.test(str);
}

function checkFullName(str)
{
	var re = /^[а-яА-ЯёЁa-zA-Z ]+$/;
	return re.test(str);
}