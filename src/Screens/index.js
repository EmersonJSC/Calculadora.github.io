//imports
import react, { useState } from 'react';
import './../Styles/index.css'

//função main
const Index = () => {

    const [display, setdisplay] = useState('0');
    const [history, sethistory] = useState('')
    const [clear, setclear] = useState(false);
    const [values, setvalues] = useState([0,0]);
    const [indice, setindice] = useState(0);
    const [operation, setoperation] = useState(null);
    //git

    const _numberDig = (n) =>{
        //validar o ponto
        if(n === ',' && display.includes(','))return;
        //validar 0 a esquerda
        const valuecurrent = display === "0" || clear ? '' : display;

        const newValueDisplay = valuecurrent + n;
        const newValues = [...values];

        if(n !== '.') newValues[indice] = parseFloat(newValueDisplay)
        setdisplay(newValueDisplay);
        setclear(false);
        setvalues(newValues);

    }
    const _reset = () =>{
        setdisplay('0');
        sethistory('')
        setclear(false);
        setvalues([0, 0]);
        setindice(0);
        setoperation(null);
    }
    const _operation = (operation_Click) =>{
        if(values[0] === 0)return;
        
        if (indice === 0) {

            setindice(1)
            setoperation(operation_Click)
            setclear(true)

        }else{
            const equal = operation_Click === '=';
            const newValues = [...values];
            try{
                if(operation_Click === 'signal'){
                    newValues[0] = newValues[0] * (-1);
                }else{
                    newValues[0] = eval(`${newValues[0]} ${operation} ${newValues[1]}`);
                }
               
            }catch(error){newValues[0] = values[0]}

            console.log(newValues[0])
            newValues[1]=0;

            setdisplay(newValues[0]);
            setclear(!equal);
            setoperation(equal ? null : operation_Click);
            setvalues(newValues);
            setindice(equal ? 0 : 1);

           
        }

        
        

    }

    return(
        <nav className="container">
            <div className="Calc_box_container">
                <div className="container visor ml-5">
                    <h2 className="is-size-4 history pr-6 pt-6 mt-5 font_robotoRegular">{history}</h2>
                    <h1 className="is-size-1 result pr-6 pb-6  font_robotoBold">{display}</h1>
                </div>
                <div className="container buttonsView mx-3">
                    <div className="buttonColunsTree">
                        <button className="buttonBig buntonBackWhite font_robotoRegular m-3" onClick={e => {_reset()}}>AC</button>
                        <button className="buttonCalc font_robotoRegular buttonColorPurple m-3" onClick={e => {_operation('signal')}}>+/-</button>
                        <button className="buttonCalc font_robotoRegular buttonColorPurple m-3" onClick={e => {_operation('/')}}>÷</button>
                    </div>
                    <div className="buttonColuns">
                        <button className="buttonCalc font_robotoRegular m-3" onClick={e => {_numberDig(8)}} >8</button>
                        <button className="buttonCalc font_robotoRegular m-3" onClick={e => {_numberDig(7)}}>7</button>
                        <button className="buttonCalc font_robotoRegular m-3" onClick={e => {_numberDig(9)}}>9</button>
                        <button className="buttonCalc font_robotoRegular m-3 buttonColorPurple" onClick={e => {_operation('*')}}>×</button>
                    </div>
                    
                    <div className="buttonColuns">
                        <button className="buttonCalc font_robotoRegular m-3" onClick={e => {_numberDig(4)}}>4</button>
                        <button className="buttonCalc font_robotoRegular m-3" onClick={e => {_numberDig(5)}}>5</button>
                        <button className="buttonCalc font_robotoRegular m-3" onClick={e => {_numberDig(6)}}>6</button>
                        <button className="buttonCalc font_robotoRegular m-3 buttonColorPurple" onClick={e => {_operation('-')}}>-</button>
                    </div>
                    <div className="buttonColuns">
                        <button className="buttonCalc font_robotoRegular m-3" onClick={e => {_numberDig(1)}}>1</button>
                        <button className="buttonCalc font_robotoRegular m-3" onClick={e => {_numberDig(2)}}>2</button>
                        <button className="buttonCalc font_robotoRegular m-3" onClick={e => {_numberDig(3)}}>3</button>
                        <button className="buttonCalc font_robotoRegular m-3 buttonColorPurple" onClick={e => {_operation('+')}}>+</button>
                    </div>
                    <div className="buttonColunsTree">
                        <button className="buttonCalc font_robotoRegular m-3" onClick={e => {_numberDig(0)}}>0</button>
                        <button className="buttonCalc font_robotoRegular m-3 buttonColorPurple"  onClick={e => {_numberDig(',')}}>,</button>
                        <button className="buttonBig buntonBackPurple font_robotoRegular buttonColorWhite" onClick={e => {_operation('=')}}>=</button>
                    </div>
                    
                    
                </div>
            </div>
        </nav>
    )
}

export default Index;
