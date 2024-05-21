import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CeifadoresLoginComponent } from '../modal/ceifadores-login/ceifadores-login.component';
import { CsvService } from '../core/service/csv-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ceifadores',
  templateUrl: './ceifadores.component.html',
  styleUrl: './ceifadores.component.css'
})
export class CeifadoresComponent {
  loginSucesso: any[] = [{ "success": false, "nome": "" }];
  paraConferir: any[] = []
  conferidas?: any[];
  data: any
  arraySalvar: any[] = [];
  constructor(public dialog: MatDialog, private csvService: CsvService,
    private datePipe: DatePipe,
  ) {
    this.openDialog()
    this.data = this.datePipe.transform(new Date(), 'dd/MMMM/yyyy');
    this.reloadFile();

  }

  reloadFile() {
    this.csvService.readCsvFileLineByLine().subscribe((resposta: any) => {
      resposta.forEach((element: any) => {
        if (element.responsavel && element.verificado == '') {
          this.paraConferir.push(element)
        }

      });
    })
  }
  openDialog() {
    const dialogRef = this.dialog.open(CeifadoresLoginComponent, {
      width: '80vw'
    })
    dialogRef.componentInstance.loginResult.subscribe((resultado: boolean) => {

      this.loginSucesso[0] = resultado; // Atualizar loginSucesso com o resultado do login

    });

  }

  verificarTodas() {

    this.paraConferir.forEach((element, index) => {
      this.paraConferir[index].verificado = this.loginSucesso[0].nome
      this.paraConferir[index].dataVerificado = this.data
      element
    });

    this.salvarCSV()

  }
  verificarUM(parcela: any) {
    parcela.verificado = this.loginSucesso[0].nome;
    parcela.dataVerificado = this.data;
    let procurar = this.paraConferir.find((item) => item.parcela === parcela.parcela);
    console.warn(procurar);

    if (procurar) {
      Object.assign(procurar, parcela);
    }
    console.warn(this.paraConferir);

    this.salvarCSV()

  }

  salvarCSV() {

    this.csvService.readCsvFileLineByLine().subscribe((resposta: any) => {
      this.arraySalvar.push(resposta)
      this.paraConferir.forEach(element => {
        this.arraySalvar.forEach(subArray => {
          let procurar = subArray.find((item: { parcela: any; }) => item.parcela === element.parcela);
          if (procurar) {
            Object.assign(procurar, element);
          }
        });
      });
    });

    this.arraySalvar.sort((a, b) => a.parcela - b.parcela)
    console.warn(this.arraySalvar.flat());

    setTimeout(() => {
      this.csvService.saveCSVPHP(this.arraySalvar.flat()).forEach(resposta => {
        console.warn(resposta);
        this.paraConferir.splice(0, this.paraConferir.length)
        this.arraySalvar.splice(0, this.arraySalvar.length)
        this.reloadFile()
      })
    }, 2000);

  }

}
