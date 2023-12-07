import './CalculatorBody.css'
import { useState } from 'react'

function CalculatorBody(){

    const [ formulaDisplay, setFormulaDisplay ] = useState('');
    const [ display, setDisplay ] = useState('0');
    const [decimalAllowed, setDecimalAllowed] = useState(true);

    
    function clear(){
        setDisplay('0');
        setFormulaDisplay('');   
        setDecimalAllowed(true); 
    }

    function bothDisplay(e){
        setDisplay(e);  
        setFormulaDisplay(e); 
    }
    
    function enterNumber(e){
        let value = e.target.value;
        switch (display){
            case '0':
                bothDisplay(value);
                break;
            case '+':
            case '-':
            case '*':
            case '/':
                setDisplay(value);
                setFormulaDisplay(formulaDisplay + value); 
                break;
            default:
                setDisplay(display + value);
                setFormulaDisplay(formulaDisplay + value);                            
        }               
    } 

    function equalTest(str){
        for (let i = 0; i < str.length; i++){
            if (str[i] === '='){return true;}
        }
        return false;
    }

    function sum(e){  

        switch(display){
            case '0':
                bothDisplay('+');
                break;
            case '+':
                //do nothing
                break;
            case '-':
                if (formulaDisplay[formulaDisplay.length-2] === '+' || formulaDisplay[formulaDisplay.length-2] === '-' || formulaDisplay[formulaDisplay.length-2] === '/' || formulaDisplay[formulaDisplay.length-2] === '*'){
                    setFormulaDisplay(formulaDisplay.slice(0,-2) + '+');
                    setDisplay('+');
                }                
                break;
            case '*':
            case '/':                        
                setFormulaDisplay(formulaDisplay.slice(0,-1) + '+');
                setDisplay('+');
                break;
            default:
                let signal = '+'
                if (equalTest(formulaDisplay)){
                    let a = display;            
                    setDisplay(signal);
                    setFormulaDisplay(a + signal);
                }else{
                    setFormulaDisplay(formulaDisplay + signal)
                    setDisplay(signal)
            }                
        }
        
    }

    function sub(e){
        switch(display){
            case '0':
                bothDisplay('-');
                break;
            case '-':
                //do nothing
                break;
            case '*':
            case '/':
            case '+':
                if (formulaDisplay.length > 1){
                    setFormulaDisplay(formulaDisplay + '-');
                    setDisplay('-');
                }else{
                    setFormulaDisplay(formulaDisplay.slice(0,-1) + '-');
                    setDisplay('-');
                }        
                
                break;
            default:
                let signal = '-'
                if (equalTest(formulaDisplay)){
                    let a = display;            
                    setDisplay(signal);
                    setFormulaDisplay(a + signal);
                }else{
                    setFormulaDisplay(formulaDisplay + signal)
                    setDisplay(signal)
            }
        }      
    }

    function divide(){
        switch(display){
            case '0':
                bothDisplay('/');
                break;
            case '/':
                //do nothing
                break;
            case '-':
                if (formulaDisplay[formulaDisplay.length-2] === '+' || formulaDisplay[formulaDisplay.length-2] === '-' || formulaDisplay[formulaDisplay.length-2] === '/'){
                    setFormulaDisplay(formulaDisplay.slice(0,-2) + '*');
                    setDisplay('*');
                }                
                break;
            case '*':            
            case '+':            
                setFormulaDisplay(formulaDisplay.slice(0,-1) + '/');
                setDisplay('/');
                break;
            default:
                let signal = '/'
                if (equalTest(formulaDisplay)){
                    let a = display;            
                    setDisplay(signal);
                    setFormulaDisplay(a + signal);
                }else{
                    setFormulaDisplay(formulaDisplay + signal)
                    setDisplay(signal)
            }
        }
    }

    function mult(){
        switch(display){
            case '0':
                bothDisplay('*');
                break;
            case '*':
                //do nothing
                break;
            case '-':
                if (formulaDisplay[formulaDisplay.length-2] === '+' || formulaDisplay[formulaDisplay.length-2] === '-' || formulaDisplay[formulaDisplay.length-2] === '/'){
                    setFormulaDisplay(formulaDisplay.slice(0,-2) + '*');
                    setDisplay('*');
                }                
                break;
            case '/':            
            case '+':            
                setFormulaDisplay(formulaDisplay.slice(0,-1) + '*');
                setDisplay('*');
                break;
            default:
                let signal = '*'
                if (equalTest(formulaDisplay)){
                    let a = display;            
                    setDisplay(signal);
                    setFormulaDisplay(a + signal);
                }else{
                    setFormulaDisplay(formulaDisplay + signal)
                    setDisplay(signal)
            }
        }
    }

    
    function decimal(){        
        switch(display[display.length -1]){
            case '0':
                if (!display.length > 1){
                    if (decimalAllowed){
                        bothDisplay('0.');   
                        setDecimalAllowed(false);                   
                    }                     
                }else{
                    setFormulaDisplay(formulaDisplay + '.')
                    setDisplay(display + '.')
                }                   
                break;  
            case '+':
            case '-':
            case '*':
            case '/':
                setFormulaDisplay(formulaDisplay + '0.')
                setDisplay('0.') 
                break;
            case '.':
                // do nothing
                break;
            default:
                if (decimalAllowed){
                    setFormulaDisplay(formulaDisplay + '.');
                    setDisplay(display + '.')
                    setDecimalAllowed(false); 
                }
                
        }
    } 

    function equal(){
        if(nanTest()){
            setDisplay('NaN')
            setFormulaDisplay('=Nan')
        }else{
            result();
        }    
    }

    function nanTest(){
        if(formulaDisplay === '' || formulaDisplay === '0' || formulaDisplay ==='+' || formulaDisplay ==='-' || formulaDisplay ==='.'|| formulaDisplay ==='/' ){
            return true
        }
        return false;
    }

    function result(){
        let numbers = [''];
        let index = 0;
        for (let i = 0; i < formulaDisplay.length; i++ ){

            switch(formulaDisplay[i]){
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                case '.':
                    numbers[index] += formulaDisplay[i];
                    break;
                default:
                    if(numbers[index] === ''){
                        numbers[index] = formulaDisplay[i];
                    }else{
                        numbers.push(formulaDisplay[i]);
                        numbers.push('');
                        index+= 2;
                    }                    
            }
        }    
        console.log(numbers);    
        setDisplay(arrayOperation(numbers))
        setFormulaDisplay(formulaDisplay + '=' + arrayOperation(numbers));
    }

    function arrayOperation(arr){
        let toNumber = arr.map((x) => (/\d/.test(x) ? parseFloat(x) : x))
        
        while (toNumber.length > 1){            
            let a,b,c;
            a = toNumber.shift();
            b = toNumber.shift();
            c = toNumber.shift();  
            if (b === '+'){toNumber.unshift(a+c);}
            if (b === '-'){toNumber.unshift(a-c);}
            if (b === '*'){toNumber.unshift(a*c);}
            if (b === '/'){toNumber.unshift(a/c);}            
        }
        
        return toNumber[0];        
    }
    
    
    
    const style = {
        background: 'rgb(0, 68, 102)',
        position: 'absolute',
        height: '130px', 
        bottom: '5px'
    }

    return(
        <div className='calculator'>
            <div id='formulaScreen' className='formulaScreen'>{formulaDisplay}</div>
            <div id='display' className='outputScreen'>{display}</div>
            <div className='buttonsContainer'>

                <button id='clear' className='jumboClear btn' value='AC' onClick={clear}>AC</button>       
                <button id='divide' className='operatorButton btn' onClick={divide} value='/'>/</button>
                <button id='multiply' className='operatorButton btn' onClick={mult} value='X'>X</button>  

                <button id='seven' className='numberButton btn' value='7' onClick={enterNumber}>7</button>  
                <button id='eight' className='numberButton btn' value='8' onClick={enterNumber}>8</button> 
                <button id='nine' className='numberButton btn' value='9' onClick={enterNumber}>9</button>
                <button id='subtract' className='operatorButton btn' onClick={sub} value='-'>-</button>  

                <button id='four' className='numberButton btn' value='4' onClick={enterNumber}>4</button>  
                <button id='five' className='numberButton btn' value='5' onClick={enterNumber}>5</button> 
                <button id='six' className='numberButton btn' value='6' onClick={enterNumber}>6</button>
                <button id='add' className='operatorButton btn' onClick={sum}  value='+'>+</button> 

                <button id='one' className='numberButton btn' value='1' onClick={enterNumber}>1</button>  
                <button id='two' className='numberButton btn' value='2' onClick={enterNumber}>2</button>                 
                <button id='three' className='numberButton btn' value='3' onClick={enterNumber}>3</button>
                
                <button id='zero' className='jumboZero btn' value='0' onClick={enterNumber}>0</button>                  
                <button id='decimal' className='numberButton btn' onClick={decimal} value='.'>.</button>
                <button id='equals' style={style} className='equals btn' onClick={equal} value='='>=</button>                
            </div>
            
        </div>
    )

}

export default CalculatorBody;