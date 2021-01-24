import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

// see '9.102 Adding a member service'
// see '9.107 Using an interceptor to send the token' for why we don't need httpOptions any more
// const httpOptions = {
//   headers: new HttpHeaders({
//     Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token
//   })
// }

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl; // see '9.102 Adding a member service' (get rid of hard-coded strings)
  
  constructor(private http: HttpClient) { }

  getMembers() {
    //return this.http.get<Member[]>(this.baseUrl + 'users', httpOptions);  // see '9.107 Using an interceptor to send the token' for why we don't need httpOptions any more
    return this.http.get<Member[]>(this.baseUrl + 'users');
  } 

  getMember(username: string) {
    //return this.http.get<Member>(this.baseUrl + 'users/' + username, httpOptions); // see '9.107 Using an interceptor to send the token' for why we don't need httpOptions any more
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }
}
