declare namespace ServerlessDevsReport {
    export interface ApiGateway {
        groupName:string,
        domain?:string,
        apis:any
    }
    export interface ReportData {
      name: string;
      access: string;
      content: ApiGateway;
    }
  }
  