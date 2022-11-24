//a^n [m]
  function puissmod(a:number,n:number,m:number){
    var x = a
    var y = 1;
    var p = m;
    do { 
         if (n%2===0) {
            x=(x*x)%p;
            n=n/2;
         }
         else {
             y=(y*x)%p;
             n=n-1;
         }
     }
     while (n!==0);
     return y;
 
 }
 

  //mot dans lequel chaque lettre est transformée en sa position dans l'alphabet
  //f1("ab") => [97,98]
  function f1(str:string):number[]{
    return str.split('').map(
        (c:string) => c.charCodeAt(0)
        )
   
  }

   //tableau ASCII dans lequel chaque lettre est transformée en son caractère,98
   //f2[97,98] => ["a","b"]
   function f2(str2:number[]):string[]{
    return str2
        .map(
            c => String.fromCharCode(c)
            )
      
   }

   //calcul de e tel que e soit premier avec (p - 1) * (q - 1)
   function calcE(phiN : number):number{
    var e : number = 0
    for (let i = 2 ; i < phiN/2; i++){
        if(phiN % i !== 0){
            e = i;
        }
    }
    return e
   }
   //M^e [n]
  export function encrypt(value: string , p : number , q : number):string[]{ 
    var n : number    = p*q
    var phin : number = (p-1)*(q-1)
    var e = calcE(phin)
    var   str : number[] = f1(value)    

    console.log("p : "+p+ " ; q :" + q + "e : " + e + "; msg  :"+ value)
    console.log (f2(
        str.map(char => puissmod(char,e,n))
        ))
    //à chaque caractère obtenu : applicaiion de la formule RSA
    return f2(
      str.map(char => puissmod(char,e,n))
      )
  }
