import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as Papa from 'papaparse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CsvService {
  //public urlFile = "http://localhost:8080/api/manipuladordados.php";
  public urlFile = "https://trezentosdemil.achei.digital//api/manipuladordados.php";
  constructor(private http: HttpClient) { }
  saveCSVPHP(arquivo: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'text/csv',
      'Access-Control-Allow-Origin': "*"
    });

    const csv = this.convertToCsv(arquivo);
    const formData: FormData = new FormData();
    const blob = new Blob([csv], { type: 'text/csv' });

    formData.append('file', blob, "pagamentos.CSV");
    return this.http.post(this.urlFile, blob)
  }
  readCsvFileLineByLine(): Observable<any> {
    return new Observable<any>(observer => {
      this.http.get(this.urlFile).subscribe(
        (fileContent: any) => {
          Papa.parse(fileContent.data, {
            delimiter: ';',
            header: true,
            complete: (result) => {
              observer.next(result.data);
              observer.complete();
            }
          });
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }

  private convertToCsv(data: any[]): string {
    console.log(data);

    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(';'));

    for (const row of data) {
      const values = headers.map(header => row[header]);
      csvRows.push(values.join(';'));
    }

    return csvRows.join('\r\n');
  }
}
