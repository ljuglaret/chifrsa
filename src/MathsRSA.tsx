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
      return NaN // invalid input
    }
    a = (a % m + m) % m
    if (!a || m < 2) {
      return NaN // invalid input
    }
    // find the gcd
    const s : [{ a:number, b:number}]= [{a:m,b:a}]
    let b = m
    while(b) {
      [a, b] = [b, a % b]
      s.push({ a, b})
    }
    if (a !== 1) {
      return NaN // inverse does not exists
    }
    // find the inverse
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

   function pgcd(a,b) {
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
    return f2(
      str.map(char => puissmod(char,e,n))
      )
  }

  //C^d[n]
  //d, l'inverse de e modulo (p – 1)(q – 1),
export function decrypt(c: string , d : number , n : number):string[]{
    
    var   str : number[] = f1(c)   
    
    return f2(
        str.map(char => puissmod(char,d,n))
        ) 
}

  export function affichageChiffrement(value: string , p : number , q : number) {
    var n : number    = p*q
    var phin : number = (p-1)*(q-1)
    var e = calcE(phin)
    var   str : number[] = f1(value)  
    return f2(
        str.map(char => (puissmod(char,e,n)%94)+33)
        )
  }
