export class Group {
  GroupId: number;
  GroupName: string;
  StateName: string;
  MaxGroupSize: number;
  SponsorEmail: string;
  SponsorName: string;
  SponsorPhone: string;
  Members?: Member[];
  constructor() {
    this.GroupId = 0;
    this.GroupName = '';
    this.StateName = '';
    this.MaxGroupSize = 10;
    this.SponsorEmail = '';
    this.SponsorName = '';
    this.SponsorPhone = '';
    this.Members = [];
  }
}

export class Member {
  MemberEmail: string;
  MemberId: number;
  MemberName: string;
  MemberPhone: string;
  constructor() {
    this.MemberEmail = '';
    this.MemberId = 0;
    this.MemberName = '';
    this.MemberPhone = '';
  }
}
