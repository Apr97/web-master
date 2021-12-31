import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'audit' })
export class AuditPipe implements PipeTransform {
  transform(audits: any, searchText: any): any {
    if (searchText == null) return audits;
    
    return audits.filter( audit => audit.user.toLowerCase().indexOf(searchText.toLowerCase()) > -1    
    )
  }
}