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

  addMember(member: Member, groupId: any) {
    const results = this.http.post(`${groupsURL}/${groupId}/members`, member, this.jsonContentTypeHeaders);
    console.log("RESULT", results);
    return results;
  }
}
