import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CsvService } from '../core/service/csv-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalRegistarComponent } from '../modal/modal-registar/modal-registar.component';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent implements AfterViewInit {

  public myForm: FormGroup;
  displayedColumns: string[] = ['parcela', 'vencimento', 'responsavel', 'valor', 'verificado'];
  dataSource!: MatTableDataSource<any>;
  dataSourcePagas!: MatTableDataSource<any>;
  pagas: any[] = [];
  naoPagas: any[] = [];
  pagashoje: any[] = [];
  data: any;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('paginatorPagas') paginatorPagas!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('sortPagas') sortPagas!: MatSort;

  constructor(private formBuilder: FormBuilder, private csvService: CsvService,
    public dialog: MatDialog, private datePipe: DatePipe, private decimalPipe: DecimalPipe) {
    this.data = this.datePipe.transform(new Date(), 'dd/MMMM/yyyy');

    this.myForm = this.formBuilder.group({
      responsavel: ['', Validators.required],
      qtdParcelas: ['', Validators.required]
    });
    this.readFile();

  }
  ngAfterViewInit(): void {

  }


  applyFilter(event: Event, tipo: string) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (tipo == "pagas") {
      this.dataSourcePagas.filter = filterValue.trim().toLowerCase()
    } else if (tipo == "naoPagas") {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  readFile() {
    this.pagas.splice(0, this.pagas.length);
    this.naoPagas.splice(0, this.naoPagas.length);
    this.csvService.readCsvFileLineByLine().subscribe(
      (lines: any[]) => {

        lines.forEach((linha) => {
          if (linha.verificado != "") {
            this.pagas.push(linha)
          } else {
            this.naoPagas.push(linha)
          }
        })

        this.dataSource = new MatTableDataSource(this.naoPagas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        /**para uma seginda tabela */
        this.dataSourcePagas = new MatTableDataSource(this.pagas);
        this.dataSourcePagas.paginator = this.paginatorPagas;
        this.dataSourcePagas.sort = this.sortPagas;


      },
      (error) => {
        console.error('Erro ao ler arquivo CSV:', error);
      }
    );
  }
  onSubmit() {
    this.pagashoje.splice(0, this.pagashoje.length)

    if (this.myForm.valid) {
      const responsavel = this.myForm.get('responsavel')?.value;
      let qtdParcelas = parseInt(this.myForm.get('qtdParcelas')?.value);

      if (this.naoPagas.length > qtdParcelas) {
        if (qtdParcelas == 1) {
          let flag = true;
          let i = 0;

          while (flag == true) {
            console.log(this.naoPagas[i].verificado);
            
            if (this.naoPagas[i].verificado ==  "" && this.naoPagas[i].responsavel == "") {
              this.naoPagas[i].responsavel = responsavel;
              this.naoPagas[i].dataPagamento = this.data;
              this.pagashoje.push(this.naoPagas[i])
              flag = false;
            }
            i++;

          }


        } else {
          let ultimo = this.naoPagas.length - 1;
          qtdParcelas = qtdParcelas - 1;
          let flag = true;
          let i = 0;
          
          while (flag == true) {
            if (this.naoPagas[i].verificado == "" && this.naoPagas[i].responsavel == "") {
              this.naoPagas[i].responsavel = responsavel;
              this.naoPagas[i].dataPagamento = this.data;
              this.pagashoje.push(this.naoPagas[i])
              flag = false;
            }
            i++;
            
          }
          i=0;
          while (i < qtdParcelas ) {
              
            if (this.naoPagas[ultimo].verificado == "" && this.naoPagas[ultimo].responsavel == "") {
              this.naoPagas[ultimo].responsavel = responsavel;
              this.naoPagas[ultimo].dataPagamento = this.data;
              this.pagashoje.push(this.naoPagas[ultimo])
              i++
              ultimo--
            }else{
              ultimo--;
            }
            
          }
        }
      } else {
        alert("Você quer pagar parcelas demais há em aberto: " + this.naoPagas.length + " parcelas")
      }

      let arrayToCSV: any[] = this.naoPagas.concat(this.pagas);
      arrayToCSV.sort((a, b) => a.parcela - b.parcela)
      this.csvService.saveCSVPHP(arrayToCSV).forEach((resp: any) => {
        console.log(resp.method);
        this.openDialog()
      });
      this.myForm.reset();
      this.readFile();
    }
  }
  openDialog(): void {
    this.dialog.open(ModalRegistarComponent, {
      width: '90vw',
      data: this.pagashoje
    });
  }

}


