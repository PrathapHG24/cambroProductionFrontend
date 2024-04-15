import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

const TOKEN_HEADER='Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{

    constructor(private login:LoginService){}
    intercept(
        req: HttpRequest<any>, 
        next: HttpHandler
        ): Observable<HttpEvent<any>> {

       const token=this.login.getToken();
       console.log(token);
       console.log("Inside interpretor");
       let authreq=req;
       if(token!=null)
       {
            authreq=authreq.clone({setHeaders:{Authorization:`Bearer ${token}`},
        
        });
       }

       return next.handle(authreq);

    }
    
}

export const AuthInterceptorProviders=[
    {
        provide:HTTP_INTERCEPTORS,
        useClass:AuthInterceptor,
        multi:true,
    },
];