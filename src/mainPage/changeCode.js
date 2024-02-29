
export const changeCode = (code) => {

    let string = code;

    // вспомогательные функци
    //------------------------------------------------------

    //удаление комментариев

    var RE_BLOCKS = new RegExp([
        /\/(\*)[^*]*\*+(?:[^*\/][^*]*\*+)*\//.source,           // $1: многострочный комментарий
        /\/(\/)[^\n]*$/.source,                                 // $2 однострочный комментарий
        /"(?:[^"\\]*|\\[\S\s])*"|'(?:[^'\\]*|\\[\S\s])*'|`(?:[^`\\]*|\\[\S\s])*`/.source,
        /(?:[$\w\)\]]|\+\+|--)\s*\/(?![*\/])/.source,           // - оператор деления
        /\/(?=[^*\/])[^[/\\]*(?:(?:\[(?:\\.|[^\]\\]*)*\]|\\.)[^[/\\]*)*?\/[gim]*/.source
        ].join('|'),                                            // - регулярное выражение
        'gm'  
    );


    string = string.replace(RE_BLOCKS, function(match, mlc, slc) {
        return mlc ? ' ' :         // многострочный комментарий (пробел)
        slc ? '' :          // одно/многострочный
        match;             
    });

    // замена названия идентификатора

    let simbols = 'ABCDEFGHIJKLMNOPQRSTUWWXYZabcdefghijklmnopqrstuvwxyz';

    function randomName() {
        let name = '';
        for ( let i = 0; i < 8; i++) {
            name += simbols[ Math.floor( Math.random() * simbols.length ) ];
        }

        return name;
    }

    //замена имени идентификатора во всех вхождениях

    function changeName(name, i, string) { 
        let newName = randomName();

        for( let j = i; j < string.length; j++){
            if ( string[j] === name ) {
                string[j] = newName; //замена элемента массива имя на новый элемент - новое имя
            }   
        }

    }

    // проход по строке с переменными

    function allVariablesInString(i, string) {
        let j = i;
        changeName(string[j], j, string);
        j++;

        while (true) {
            if ( string[j].includes(';') ) {
                if ( string[j-2] === ',' ) changeName(string[j-1], j-1, string);
                break;
            }
            if ( string[j+1] === ',' ||  string[j+1].includes('=') ) {
                changeName(string[j], j, string);
            }
            j++;
        }

        return j;
    }

    // кодирование строк

    function changeStr (type) {
        switch (type){
          case '1': return '-~[]';
          default: return '~~[]';
        }
      }
      
    function encryption(str) {
        let strArray = str.split('');
        let crypted = strArray.map(value => value.charCodeAt(0).toString(2));
        let newStr = crypted.map(value => value.split('').reduce(
          (accumulator, currentValue) =>accumulator + changeStr(currentValue), '')).join(' ');
        
        return newStr;
    }

      //декодирование строк 

      function decoding(str) {
        return str.split(' ').map(value => value.match(/.{1,4}/g).map(value => eval(value)).join('')).map(value => parseInt(value, 2)).map(value => String.fromCharCode(value)).join('');
      }

      //недостижимый код

      let arrOfCode = [

        " let DS12ksSWD = 42;if (Math.sin(DS12ksSWD) + Math.cos(DS12ksSWD) == 1){ let LL7FDr=578+Math.floor(Math.random()*42)+212;for(LL7FDr; LL7FDr<0; LL7FDr--){let LLi1l=DS12ksSWD*LL7FDr-(DS12ksSWD+LL7FDr)} return LLi1l;} ",

        " let Gal90Nsx=11111111111;while(11111111111>111111111111){let Sghclll1='Rosemary Fell was not exactly beautiful. She was young, brilliant, extremely modern, well dressed and amazingly well read in the newest of the new books. Rosemary had been married two years, and her husband was very fond of her. They were rich, really rich, not just comfortably well-off, so if Rosemary wanted to shop, she would go to Paris as you and I would go to Bond Street.'; Sghclll1.split(' ').map(value => value.match(/.{1,4}/g).map(value => eval(value)).join('')).join(' ').split(' ').map(value => parseInt(value, 2)).map(value => String.fromCharCode(value)).join('');} ",

        " if((Math.random()*12)+1 < (Math.cos(1)/13*Math.sqrt(144))*Math.cos(Math.PI/2)){let Lhs6Fcsd='ABCDEFGHIJKLMNOPQRSTUWWXYZabcdefghijklmnopqrstuvwxyz';let fs34HSlcs=Math.floor( Math.random()*Lhs6Fcsd.length);let Gd2dsdd67JJa=Lhs6Fcsd.split('').map(value => value.charCodeAt(0).toString(2)); return Lhs6Fcsd+'function gySjx0sd(){let df74Dms=2355, sdh4SDH=33; return df74Dms*33/sdh4SDH+Math.cos(1);}'}; ",

        "if('varrible45OfStringFFSa'.split(' ').length > 15){let df4JJsdO9=12,sjd63bSK8a=13,dsSS3Fkas343J=15,FF215Hskcwe=16,s83JAGDka5av=17,PzCbS3J90S=18,sd4FUJA3K=19,ks32gGGGG=20; for(let dj7F2LLL=0;dj7F2LLL<40;dj7F2LLL++){ return (df4JJsdO9+PzCbS3J90S/Math.sqrt(FF215Hskcwe))+s83JAGDka5av-FF215Hskcwe*2+(sjd63bSK8a*FF215Hskcwe*FF215Hskcwe);}}"
      ];

      function randomCode() {
          return arrOfCode[ Math.floor( Math.random() * arrOfCode.length ) ];;
      }

    //------------------------------------------------------

    //удаление переносов
    string = string.replace(/\n/g, " ");
    
    //удаление пробелов и разбиение строки на массив строк
    string = string.split(' ');

   
    //кодирование строк и добавление функции декодирования

    for (let i = 0; i < string.length; i++) {

        //для ковычек ''

        if ( string[i].includes("'") ) {
            
            let firstPartOfString = string[i].slice( 0, string[i].indexOf("'") );
            let partWhithFunction = ' D00sJa7(' + string[i].slice( string[i].indexOf("'"), string[i].indexOf("'")+1 );
            let secondPartOfString = string[i].slice( string[i].indexOf("'")+1, string[i].length );
            

            //если в строке 1 слово
            if ( secondPartOfString.includes("'") ) {

                //если строка пустая - пропуск кодирования
                let stringWhithoutQuotes = secondPartOfString.slice( 0, secondPartOfString.indexOf("'") );
                if ( stringWhithoutQuotes === '' ) continue;

                //сборка кодированной строки
                string[i] = firstPartOfString + partWhithFunction + encryption(stringWhithoutQuotes) + secondPartOfString.slice( secondPartOfString.indexOf("'"), secondPartOfString.indexOf("'")+1 ) + ')' + secondPartOfString.slice( secondPartOfString.indexOf("'")+1, secondPartOfString.length );

            //если слов несколько
            } else {

                //если строка - пробел - пропуск кодирования
                if (string[i+1].slice( 0, string[i+1].indexOf("'")+1 ) === "'") {
                    string[i+1] = ' ' + string[i+1];
                    i = i+1;
                    continue;
                }

                // -~[]~~[]~~[]~~[]~~[]~~[] - пробел между словами, который потом декодируется
                // кодирование первого слова в строке
                string[i] = firstPartOfString + partWhithFunction + encryption(secondPartOfString) + ' ' + '-~[]~~[]~~[]~~[]~~[]~~[]' + ' ';

                i++;

                // кодирование слов в середине строки
                while( !string[i].includes("'") ) {
                    string[i] = encryption(string[i]) + ' '  + '-~[]~~[]~~[]~~[]~~[]~~[]' + ' ';
                    i++;
                }
                
                // кодирование последнего слова в строке
                let firstPartOfString2 = string[i].slice( 0, string[i].indexOf("'") );
                let secondPartOfString2 = string[i].slice( string[i].indexOf("'"), string[i].length );
                string[i] = encryption(firstPartOfString2) + secondPartOfString2.slice( secondPartOfString2.indexOf("'"), secondPartOfString2.indexOf("'")+1 ) + ')' + secondPartOfString2.slice( secondPartOfString2.indexOf("'")+1, secondPartOfString2.length );
                
            }

        }

        //для ковычек ""

        if ( string[i].includes('"') ) {
            
            let firstPartOfString = string[i].slice( 0, string[i].indexOf('"') );
            let partWhithFunction = ' D00sJa7(' + string[i].slice( string[i].indexOf('"'), string[i].indexOf('"')+1 );
            let secondPartOfString = string[i].slice( string[i].indexOf('"')+1, string[i].length );
            

            //если в строке 1 слово
            if ( secondPartOfString.includes('"') ) {

                //если строка пустая - пропуск кодирования
                let stringWhithoutQuotes = secondPartOfString.slice( 0, secondPartOfString.indexOf("'") );
                if ( stringWhithoutQuotes === '' ) continue;

                string[i] = firstPartOfString + partWhithFunction + encryption(stringWhithoutQuotes) + secondPartOfString.slice( secondPartOfString.indexOf('"'), secondPartOfString.indexOf('"')+1 ) + ')' + secondPartOfString.slice( secondPartOfString.indexOf('"')+1, secondPartOfString.length );

            //если слов несколько
            } else {

                //если строка - пробел - пропуск кодирования
                if (string[i+1].slice( 0, string[i+1].indexOf('"')+1 ) === '"') {
                    string[i+1] = ' ' + string[i+1];
                    i = i+1;
                    continue;
                }

                string[i] = firstPartOfString + partWhithFunction + encryption(secondPartOfString) + ' ' + '-~[]~~[]~~[]~~[]~~[]~~[]' + ' ';

                i++;

                while( !string[i].includes('"') ) {
                    string[i] = encryption(string[i]) + ' '  + '-~[]~~[]~~[]~~[]~~[]~~[]' + ' ';
                    i++;
                }
                
                let firstPartOfString2 = string[i].slice( 0, string[i].indexOf('"') );
                let secondPartOfString2 = string[i].slice( string[i].indexOf('"'), string[i].length );
                string[i] = encryption(firstPartOfString2) + secondPartOfString2.slice( secondPartOfString2.indexOf('"'), secondPartOfString2.indexOf('"')+1 ) + ')' + secondPartOfString2.slice( secondPartOfString2.indexOf('"')+1, secondPartOfString2.length );
                
            }

        }
    }
    
    //замена идентификаторов

    for (let i = 0; i < string.length; i++) {

        if ( string[i] === 'const' || string[i] === 'let' || string[i] === 'var' ) {
            i = allVariablesInString(i+1, string);
        }

        
    }

    //добавление недостижимого кода

    for (let i = 0; i < string.length; i++) {
        if (string[i].includes('function')) {
            while (!string[i].includes('{')) i++
            string[i] = string[i] + randomCode();
        }
    }
    
    //добавление нужных пробелов

    let newString = '';

    for ( let i = 0; i<string.length; i++) {

        switch ( string[i] ) {
            case 'const': newString += 'const ';
            break;
            case 'let': newString += 'let ';
            break;
            case 'var': newString += 'var ';
            break;
            case 'function': newString += 'function ';
            break;
            case 'return': newString += 'return ';
            break;
            case '}': newString += '} ';
            break;
            case 'else': newString += 'else ';
            break;
            case 'case': newString += 'case ';
            break;
            default: newString += string[i];
        }

    }

    //добавление функции декодирования

    newString = newString + " function D00sJa7(str) {return str.split(' ').map(value => value.match(/.{1,4}/g).map(value => eval(value)).join('')).join(' ').split(' ').map(value => parseInt(value, 2)).map(value => String.fromCharCode(value)).join('');}"

    return newString;

};
