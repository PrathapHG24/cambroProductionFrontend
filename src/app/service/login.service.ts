import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './help';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
//generate token
public generateToken(loginData:any)
{
return this.http.post(`${baseURL}/generate-token`,loginData);
}

//get current user
public getCurrentUser()
{
  return this.http.get(`${baseURL}/current-user`);
}


//login user set token to local storage
public loginUseer(token:any)
{
  localStorage.setItem('token',token);
  return true;
}

//user is login or not
public isLoggedIn()
{
  let tokenstr=localStorage.getItem("token");
if(tokenstr==undefined || tokenstr=='' || tokenstr==null)
{
  return false;
}
return true;
}

//logout remove token from local storage
public logout()
{
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  
  return true;
}

//get token
public getToken()
{
  return localStorage.getItem("token");
}

//set userDetail
public setUser(user:any)
{
  localStorage.setItem('user',JSON.stringify(user));
}

//getuser
public getUser()
{
  let userstr=localStorage.getItem("user");
  if(userstr!=null)
  {
    return JSON.parse(userstr);
  }
  else{
    this.logout();
    return null;
    
  }
}


//getUSerRole


public getUserRole()
{
  let user=this.getUser();
  return user.authorities[0].authority;
}
}
