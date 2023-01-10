import React from 'react';
import './style.css';
import { changeCode } from './changeCode';
import Header from './Header';

const MainPage = () => {
    
    const [code, setCode] = React.useState("");
    const [changedCode, setchangedCode] = React.useState("");

    function magic (){

        setchangedCode(changeCode(code));
        setCode("");

    }

    return (
        <div>
            <Header/>
            <div  className='container'>
                <textarea 
                    className='input' 
                    
                    placeholder="Enter your code here..."
                    value={code}
                    onChange={(event) => setCode(event.target.value)}
                />
                <button className='change-button' onClick={magic}>Change</button>
                <textarea className='output '
                value={changedCode} 
                onChange={changeCode}
                />
            </div>
        </div>
    );
};

export default MainPage;