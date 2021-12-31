import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Audit, User } from '@/_models';
import { AuditService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'audit.component.html' })
export class AuditComponent implements OnInit
{
    audits = [];
    currentUser: User;
    p:number = 1;
    constructor(
        private authenticationService: AuthenticationService,
        private auditService: AuditService
    )
    {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit()
    {
        this.loadAllAudits();
    }

    private loadAllAudits()
    {
        this.auditService.getAll()
            .pipe(first())
            .subscribe(audits => this.audits = audits);
    }

    isDesc: boolean = false;
  column: string = 'user';
    sort(property) {
        this.isDesc = !this.isDesc; //change the direction    
        this.column = property;
        let direction = this.isDesc ? 1 : -1;
    
        this.audits.sort(function (a, b) {
          if (a[property] < b[property]) {
            return -1 * direction;
          }
          else if (a[property] > b[property]) {
            return 1 * direction;
          }
          else {
            return 0;
          }
        });
      };
}