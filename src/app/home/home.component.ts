import { DatePipe, DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { addMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { CsvService } from '../core/service/csv-service.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [DatePipe]

})
export class HomeComponent {
  public currentMonth;
  public parcelasPagas = 0;
  public porcentagem: any = "0" ;
  public parcelasRestantes!: number;
  idades: any = {
    "willians": 1984,
    "ale": 1978,
    "pedro": 2007,
    "thiago": 2012,
    "iza": 1986,
    "cristina": 1977
  }

  constructor(private datePipe: DatePipe, private csvService: CsvService, private decimalPipe: DecimalPipe) {
    const mes = addMonths(new Date(), 1)
    this.currentMonth = format(mes, 'MMMM', { locale: ptBR });
    this.readFile();
  }
  readFile() {
    this.csvService.readCsvFileLineByLine().subscribe(
      (lines: any[]) => {
        lines.forEach((linha: any) => {
          if (linha['verificado']) {
            this.parcelasPagas = this.parcelasPagas + 1
          }
        });
        this.porcentagem = this.calcularPorcentagem(this.parcelasPagas, 300)
        this.parcelasRestantes = 300 - this.parcelasPagas;
        this.calcularIdade()
      },
      (error) => {
        console.error('Erro ao ler arquivo CSV:', error);
      }
    );
  }
  calcularPorcentagem(valorAtual: number, valorTotal: number): string {
    // Verifique se o valor total não é zero para evitar divisão por zero
    if (valorTotal === 0) {
      return '0.00%';
    }

    // Calcule a porcentagem
    const porcentagem = (valorAtual / valorTotal) * 100;
    // Formate a porcentagem com duas casas decimais usando o 'DecimalPipe'
    const porcentagemFormatada = this.decimalPipe.transform(porcentagem, '1.2-2');
    

    // Retorne a porcentagem formatada
    return `${porcentagemFormatada}%`;
  }
  calcularIdade() {
    const tempo: number = Math.trunc(this.parcelasRestantes / 12)
    const dataAtual: Date = new Date();
    const anoAtual: number = dataAtual.getFullYear();

    Object.entries(this.idades).forEach(([chave, valor]) => {
      const valorsomado: number = (anoAtual - Number(valor) )+tempo;
      this.idades[chave] = valorsomado;

    });
  
  }


}
