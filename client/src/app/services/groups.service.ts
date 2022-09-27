import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group, Member } from '../models/groups';
import { groupsURL } from '../models/url-constants';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  jsonContentTypeHeaders = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };

  constructor(private http: HttpClient) { }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(groupsURL);
  }

  addGroup(group: Group): Observable<any> {
    const results = this.http.post(groupsURL, group, this.jsonContentTypeHeaders);
    console.log("RESULT", results);
    return results;
  }

  // editGroup(group: Group): Observable<any> {
  //   const results = this.http.put(groupsURL, group, this.jsonContentTypeHeaders);
  //   console.log("RESULT", results);
  //   return results;
  // }

  // deleteGroup(groupId: number): Observable<any> {
  //   const results = this.http.delete(`${groupsURL}/${groupId}`, this.jsonContentTypeHeaders);
  //   console.log("RESULT", results);
  //   return results;
  // }

  addMember(member: Member, groupId: any) {
    const results = this.http.post(`${groupsURL}/${groupId}/members`, member, this.jsonContentTypeHeaders);
    console.log("RESULT", results);
    return results;
  }

  // editMember(member: Member, groupId: number): Observable<any> {
  //   const results = this.http.put(`${groupsURL}/${groupId}`/members, member, this.jsonContentTypeHeaders);
  //   console.log("RESULT", results);
  //   return results;
  // }

  // deleteMember(memberId: number, groupId: number): Observable<any> {
  //   const results = this.http.delete(`${groupsURL}/${groupId}`/members/${memberId}`, this.jsonContentTypeHeaders);
  //   console.log("RESULT", results);
  //   return results;
  // }
}
