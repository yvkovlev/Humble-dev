function checkEmail(str){
	var re = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
	return re.test(str);
}

function checkLogin(str)
{
	var re = /^[a-z\d\.\_]{4,15}$/;
	return (re.test(str) && str != 'humble' && str != 'admin' && str != 'support' && str != 'moderator');
}

function checkPassword(str)
{
	var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=(.*[a-zA-Z]){2}).{8,}$/;
	return re.test(str);
}

function checkFullName(str)
{
var re = /^[а-яА-ЯёЁa-zA-Z ]{2,}$/; // от 2 символов, кириллица и латиница
return re.test(str);
}