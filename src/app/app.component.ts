import { AfterViewInit, VERSION, Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { map} from 'rxjs/operators';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  officeInfo: any = [];
  dtTrigger: Subject<any> = new Subject();

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic aW50ZXJ2aWV3OjEyMzQ1Njc4OQ==');
    headers = headers.set('Banqin-Platform-TenantId', 'default');
    const dataUrl = 'http://13.92.224.212:8080/banqin-provider/api/v1/offices';

    this.http.get(dataUrl, { headers })
      .subscribe(response => {
        setTimeout(() => {
          this.officeInfo = response;
          console.log(response);
          // Calling the DT trigger to manually render the table
          this.dtTrigger.next();
        });
      });

  }

  ngAfterViewInit(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.columns().every(function () {
        const that = this;
        $('input', this.footer()).on('keyup change', function () {
          if (that.search() !== this['value']) {
            that
              .search(this['value'])
              .draw();
          }
        });
      });
    });
    this.dtTrigger.next();
  }
}
