import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Group, Member } from '../models/groups';
import { groupsURL } from '../models/url-constants';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  jsonContentTypeHeaders = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };
  groups$: BehaviorSubject<Group[]> = new BehaviorSubject<Group[]>([]);
  currentGroups = this.groups$.asObservable();

  constructor(private http: HttpClient) { }

  setGroup(groups: Group[]) {
    this.groups$.next(groups);
  }

  getGroups(): Observable<Group[]> {
    this.http
      .get<Group[]>(groupsURL)
      .subscribe((response) => this.setGroup(response));
    console.log(this.groups$);
    return this.groups$;
  }

  addGroup(group: Group): Observable<any> {
    const results = this.http.post(groupsURL, group, this.jsonContentTypeHeaders);
    console.log("RESULT", results);
    return results;
  }

  editGroup(group: Group): Observable<any> {
    const results = this.http.put(groupsURL, group, this.jsonContentTypeHeaders);
    console.log("RESULT", results);
    return results;
  }

  deleteGroup(groupId: number): Observable<any> {
    console.log('delete url: ', `${groupsURL}/${groupId}`)
    const results = this.http.delete(`${groupsURL}/${groupId}`, this.jsonContentTypeHeaders);
    console.log("RESULT", results);
    return results;
  }

  addMember(member: Member, groupId: any) {
    const results = this.http.post(`${groupsURL}/${groupId}/members`, member, this.jsonContentTypeHeaders);
    console.log("RESULT", results);
    return results;
  }

  editMember(member: Member, groupId: number): Observable<any> {
    const results = this.http.put(`${groupsURL}/${groupId}/members`, member, this.jsonContentTypeHeaders);
    console.log("RESULT", results);
    return results;
  }

  deleteMember(memberId: number, groupId: number): Observable<any> {
    const results = this.http.delete(`${groupsURL}/${groupId}/members/${memberId}`, this.jsonContentTypeHeaders);
    console.log("RESULT", results);
    return results;
  }
}
