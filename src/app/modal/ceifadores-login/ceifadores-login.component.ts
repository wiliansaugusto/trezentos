import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ceifadores-login',
  templateUrl: './ceifadores-login.component.html',
  styleUrl: './ceifadores-login.component.css'
})
export class CeifadoresLoginComponent {
  public nome: any = false;
   myForm!: FormGroup;
   btnWill: any = true;
   btnIza:any = true;
  clicked:boolean = false;  
  listaSenhas: any[] = ["halohomora", "mozibinha", "mdk", "naruto", "entra"]
  @Output() loginResult  = new EventEmitter<{ success: any, nome: string }>();
  

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<CeifadoresLoginComponent>) {
    this.myForm = this.formBuilder.group({
      senhaCeifadores: ['', Validators.required]
    });
  }
  loginUsuario(nome: string) {

    if(!this.nome ){
      this.nome = nome
      this.clicked = true;
      if(nome == "willians"){
        this.btnIza = false;
        
      }else{
        this.btnWill= false;
      }
    }else{
      this.nome =false;
      this.btnIza = true;
      this.btnWill = true;
      this.clicked = false;
    }

    

  }

  logar() {
    if (!this.nome) {
      alert("Voce precisa informar quem é")
    }
    if(this.myForm.invalid) {
      alert("Campeão vamos informar a senha, por gentileza!")
    }
    const senhaEnviada:string = this.myForm.get('senhaCeifadores')?.value;
      
    if (this.myForm.valid && this.nome) {
      let senhaValida = false;
      for (let senha of this.listaSenhas) {
        if (senhaEnviada.toLowerCase() == senha) {
          senhaValida = true;
      } 
      }

      if (senhaValida) {
        alert("Bem vindo " + this.nome)
        this.loginResult.emit({success:true, nome:this.nome});
        this.dialogRef.close();
      } else {
        alert("Você não é um ceifador!")
        this.loginResult.emit({success:false, nome: this.nome});
        this.dialogRef.close();
      }
    }
  }
}