import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { retry } from 'rxjs/operators';
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";
import * as decode from 'jwt-decode';
import {ActivatedRoute, Router} from "@angular/router";
//npm install --save-dev jwt-decode

interface User {
    result : {
        created_at : Date,
        email : string,
        id : number,
        name : string,
        role: number,
        updated_at : Date
    }
}

@Injectable ()
export class AuthService {
    private api: string =
        'http://ue-list.s1710456019.student.kwmhgb.at/api/auth'; //'http://localhost:8080/api/auth';

    constructor(private http: HttpClient, private router: Router,  private route: ActivatedRoute) {
    }

    login(email: string, password: string) {
        return this.http.post(`${this.api}/login`, {
            'email': email,
            'password': password
        });
    }

    public setCurrentUserId() {
        this.http.get<User>(`${this.api}/user`).pipe(retry(3)).subscribe(res => {
            localStorage.setItem('userId', res.result.id.toString());
            }
        );
    }

    public setCurrentUserRole() {
        this.http.get<User>(`${this.api}/role`).pipe(retry(3)).subscribe(res => {
            localStorage.setItem('role', res.result.role.toString());
        });
    }

    public getCurrentUserId() {
        return Number.parseInt(localStorage.getItem('userId'));
    }

    public getCurrentUserRole() {
        return Number.parseInt(localStorage.getItem('role'));
    }

    public setLocalStorage(token: string) {
        const decodedToken = decode(token);
        console.log(token);
        //console.log(decodedToken);
        localStorage.setItem('token', token);
        localStorage.setItem('userId', decodedToken.user.id);
        localStorage.setItem('role', decodedToken.user.role);
    }

    logout() {
        this.http.post(`${this.api}/logout`, {});
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        //console.log("logged out");
        this.router.navigate(['login'], {relativeTo: this.route});
    }

    public isLoggedIn() {
        if (isNotNullOrUndefined(localStorage.getItem("token"))) {
            let token: string = localStorage.getItem("token");
            const decodedToken = decode(token);
            let expirationDate: Date = new Date(0);
            expirationDate.setUTCSeconds(decodedToken.exp);
            if (expirationDate < new Date()) {
              console.log("token expired");
              localStorage.removeItem("token");
              return false;
            }
            return true;
        } else {
            return false;
        }
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }
}
