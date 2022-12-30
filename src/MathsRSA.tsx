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
 
 //Inverse Modulaire
 // a est l'inverse de b modulo n ssi a * b est congru à 1 modulo n
export function modInverse(a:number, m:number) {
    // validate inputs
    if (Number.isNaN(a) || Number.isNaN(m)) {
      return NaN 
    }
    a = (a % m + m) % m
    if (!a || m < 2) {
      return NaN 
    }
    const s : [{ a:number, b:number}]= [{a:m,b:a}]
    let b = m
    while(b) {
      [a, b] = [b, a % b]
      s.push({ a, b})
    }
    if (a !== 1) {
      return NaN 
    }
    let x = 1
    let y = 0
    for(let i = s.length - 2; i > 0; --i) {
      [x, y] = [y,  x - y * Math.floor(s[i].a / s[i].b)]
     
    }
    return (y % m + m) % m
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

  // 582,94 =>[39,18]
  function base10versbaseB(x: number, base : number):number[]{
    var  res : number[] =[];
    const xp = x;
    while (x> 0){
      x = Math.floor( x/ base);
      if (x!==0){res.push(x );}
      }
      res.push(xp%base)
    return res;
  }

//f2bis([582,984])
//582 = 6*94+18 => 39 51 => '3
//984 = 10*94 + 44 => 43 77 => +M
// => ["'3", "+M"]
    function f2bis(str2:number[]):string[]{
      let etape1 : number[][]= str2.map(c => base10versbaseB(c,94));
      let etape2 : number[][]= etape1.map(tab => tab.map(x=>x+33 ))
      let etape3 : string[] = etape2.map(tstr => f2(tstr).join(''))
      return etape3;
   }


// 6 18 => 582
   function baseBversbase10(x: number[], base : number):number{
    let res : number= 0 ;
    let puiss : number =1;
    x.reverse();
    for (let i = 0 ; i < x.length ; i++){
      res+=x[i]*puiss;
      puiss*=base;
    }
   
    return res;
  }
   
// => ["'3", "+M"]
// '3 => 39 51 => 6 18 => 6*94 + 18 =  582 
//+M => 43 77 => 10 44 =>  10*94 + 44 = 984
  function f2bisReciproque(tstr:string[]):number[]{
    let etape1 : number[][]= tstr.map(c =>f1(c))
    let etape2 : number[][] = etape1.map(tab => tab.map(x => x-33))
    let etape3 : number[] = etape2.map(tab => baseBversbase10(tab,94))
    return etape3
  }

   export function pgcd(a,b) {
    a = Math.abs(a);
    b = Math.abs(b);
    if (b > a) {
       var tmp = a; 
       a = b; 
       b = tmp;
    }
    while (true) {
        if (b === 0) return a;
        a %= b;
        if (a === 0) return b;
        b %= a;
    }
}
   //calcul de e tel que e soit premier avec (p - 1) * (q - 1)
   export function calcE(phiN : number):number{
    var e : number = 0
    for (let i = 2 ; i <phiN ; i++){
        if(pgcd(phiN,i) === 1 ){
            e = i;
            break;
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

    //à chaque caractère obtenu : application de la formule RSA
    return f2bis(
      str.map(char => puissmod(char,e,n))
      )
  }

  //C^d[n]
  //d, l'inverse de e modulo (p – 1)(q – 1),
export function decrypt(c: string[] , d : number , n : number):string[]{
    var  str : number[] = f2bisReciproque(c);   

    return  f2(str.map(char => puissmod(char,d,n)))
        
}


