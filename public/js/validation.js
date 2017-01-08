function checkEmail(str){
	var re = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/; // Валидация e-mail
	return re.test(str);
}

function checkLogin(str)
{
	var re = /^[a-z\d\.\_]{4,15}$/; //Прописная латиница, точка, нижний пробел и цифры
	return re.test(str);
}

function checkPassword(str)
{
	var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=(.*[a-zA-Z]){2}).{8,}$/; // От 8 символов, латиница  верхний регистр + нижний регистр + цифры,  спец.символы 
	return re.test(str);
}

function checkFullName(str)
{
	var re = /[а-яА-ЯёЁa-zA-Z ]{2,15}$/; // 2-15 символов, кириллица и латиница
	return re.test(str);
}