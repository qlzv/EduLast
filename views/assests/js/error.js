
if(error == "true"){
    iziToast.warning({
    theme : 'dark',
    position : 'topRight',
    drag : false,
    title: Language[GetLang() || "ar"].Error_Login_Msg,
    titleColor : 'black',
    message: Language[GetLang() || "ar"].Error_Login_Msg2,
    messageColor : 'black',
    iconColor : 'red',
    rtl : (GetLang() || "ar") == 'ar'
    });
    }