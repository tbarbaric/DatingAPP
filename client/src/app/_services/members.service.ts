import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

// see '9.102 Adding a member service'
// see '9.107 Using an interceptor to send the token' for why we don't need httpOptions any more
// see '10.121 Using Using the service to store state'

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
  members: Member[] = [];

  constructor(private http: HttpClient) { }

  getMembers() {
    //return this.http.get<Member[]>(this.baseUrl + 'users', httpOptions);  // see '9.107 Using an interceptor to send the token' for why we don't need httpOptions any more
    //return this.http.get<Member[]>(this.baseUrl + 'users');
    
    if (this.members.length > 0) // see '10.121 Using Using the service to store state'
      return of(this.members);

    return this.http.get<Member[]>(this.baseUrl + 'users').pipe( // see '10.121 Using Using the service to store state'
      map(members => {
        this.members = members;

        return members;
      })
    );
  } 

  getMember(username: string) {
    //return this.http.get<Member>(this.baseUrl + 'users/' + username, httpOptions); // see '9.107 Using an interceptor to send the token' for why we don't need httpOptions any more
    //return this.http.get<Member>(this.baseUrl + 'users/' + username);

    const member = this.members.find(m => m.username === username);

    if (member !== undefined) // see '10.121 Using Using the service to store state'
      return of(member);

    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member) {
    //return this.http.put(this.baseUrl + 'users', member); // see '10.119 Updating the user in the client app'

    return this.http.put(this.baseUrl + 'users', member).pipe( // see '10.121 Using Using the service to store state'
      map(() => {
        const index = this.members.indexOf(member);

        this.members[index] = member;
      })
    );
  }
}
