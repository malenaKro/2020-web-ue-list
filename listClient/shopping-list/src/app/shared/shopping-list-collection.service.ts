import { Injectable } from '@angular/core';
import {ShoppingList} from "./shopping-list";
import {HttpClient} from "@angular/common/http";
import {catchError, retry} from "rxjs/operators";
import {Observable, throwError} from "rxjs";

@Injectable()
export class ShoppingListCollectionService {

    private api = 'http://ue-list.s1710456019.student.kwmhgb.at/api';

    constructor(private http: HttpClient) { }

    getAll(): Observable<Array<ShoppingList>> {
        return this.http.get(`${this.api}/lists`)
            .pipe(retry(3)).pipe(catchError (this.errorHandler))
    }
    getSingle(id: number): Observable<ShoppingList> {
        return this.http.get<ShoppingList>(`${this.api}/list/${id}`)
            .pipe(retry(3)).pipe(catchError(this.errorHandler))
    }
    create(list: ShoppingList): Observable<any> {
        return this.http.post(`${this.api}/list`,list)
            .pipe(retry(3)).pipe(catchError (this.errorHandler))
    }
    update(list: ShoppingList): Observable<any> {
        return this.http.put(`${this.api}/list/${list.id}`, list)
            .pipe(retry(3)).pipe(catchError (this.errorHandler));
    }
    delete(id: number): Observable<any> {
        return this.http.delete(`${this.api}/list/${id}`)
            .pipe(retry(3)).pipe(catchError (this.errorHandler));
    }
    getUsersLists(user: any): Observable<Array<ShoppingList>> {
        //console.log(user);
        return this.http.post(`${this.api}/lists/usersLists`, user)
            .pipe(retry(3)).pipe(catchError (this.errorHandler))
    }
    volunteer(list: ShoppingList, user: any): Observable<any> {
        //console.log(user);
        return this.http.put(`${this.api}/list/volunteer/${list.id}`, user)
            .pipe(retry(3)).pipe(catchError (this.errorHandler));
    }
    dropVolunteer(list: ShoppingList, user: any): Observable<any> {
        return this.http.put(`${this.api}/list/dropVolunteer/${list.id}`, user)
            .pipe(retry(3)).pipe(catchError (this.errorHandler));
    }
    postComment(id: number, comment: any): Observable<any>{
        return this.http.post(`${this.api}/list/comment/${id}`, comment)
            .pipe(retry(3)).pipe(catchError (this.errorHandler));
    }
    billing(id: number, billing: any): Observable<any>{
        return this.http.put(`${this.api}/list/putFinalSum/${id}`, billing)
            .pipe(retry(3)).pipe(catchError (this.errorHandler));
    }
    private errorHandler (error: Error | any): Observable<any> {
        return throwError(error);
    }
}
