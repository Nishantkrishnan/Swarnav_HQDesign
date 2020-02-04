var mainurl = "";
var auth_token = localStorage.getItem('coworks-accessToken-remember');

export const authInfo = {
	mainUrl: mainurl,
	getToken: auth_token			
};