import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment'
 
import { Storage } from '@capacitor/storage';
 
 
const API_KEY = 'apiKey';
 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  apiKey = '';
 
  constructor(private http: HttpClient) {
    this.loadApiKey();
  }
 
  async loadApiKey() {
    const apiKey = await Storage.get({ key: API_KEY });    
    if (apiKey && apiKey.value) {
      console.log('set apiKey: ', apiKey.value);
      this.apiKey = apiKey.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }
 
  // login(credentials: {email, password}): Observable<any> {
  //   return this.http.post(`${environment.apiUrl}/user/√`, credentials).pipe(
  //     map((data: any) => data),
  //     switchMap(apiKey => {
  //       return from(Storage.set({key: API_KEY, value: apiKey}));
  //     }),
  //     tap(_ => {
  //       this.isAuthenticated.next(true);
  //     })
  //   )
  // }

  login(credentials: {email, password}): Observable<any> {
    return this.http.post(`${environment.apiUrl}/user/reportWriterAppLogin`, credentials).pipe(
      tap(data => {
        console.log("tap data ",data)
        if (data.status === 'success') {
          this.isAuthenticated.next(true);
          Storage.set({key: API_KEY, value: data.data.apiKey});
        } else {
          this.logout();
        }
      })
    )
  }

  // login(credentials: {email:string,password:string}) {
  //   return new Promise((resolve,reject) => {
  //     this.http.post(`${environment.apiUrl}/user/reportWriterAppLogin`,credentials).subscribe(res => {
  //       const key = res['data']['reportWriterKey'];
  //       console.log("kdy is "+key)
  //       if (res['status'] == 'success'){
  //         Storage.set({key: API_KEY, value: key});
  //         resolve(res)
  //       } else {
  //         reject(res['data']['message']);
  //       }
  //     }, (err) => {
  //       reject(err);
  //     })
  //   })
  // }
 
  logout(): Promise<void> {
    console.log("Logging out")
    this.isAuthenticated.next(false);
    return Storage.remove({key: API_KEY});
  }
}