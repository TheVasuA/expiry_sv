import React,{useState} from 'react'
import FormTank from './FormTank'
import FormTwo from './FormTwo'
import FormFour from './FormFour';

const FormCollection = () => {
    const [selectedButton, setSelectedButton] = useState(null);

    const handleButtonClick = (button) => {
      setSelectedButton(button);
    };
  
    const renderContent = () => {
      switch (selectedButton) {
        case 'button1':
          return <FormTwo/>
        case 'button2':
          return <FormFour/>
        case 'button3':
          return <FormTank/>
        default:
          return <FormTwo/>
      }
    };
  return (
    <div>
        <ul className=' flex items-center justify-center bg-blue-100 p-5 gap-4 overflow-x-auto '>
            <li><button className='active:bg-yellow-400 hover:bg-green-400 w-[150px] bg-green-700 text-white p-2 rounded font-bold' type='button' onClick={() => handleButtonClick('button1')}>Two Wheeler</button></li>
            <li><button  className='active:bg-yellow-300 hover:bg-green-400 w-[150px] bg-green-700 text-white p-2 rounded font-bold' type='button' onClick={() => handleButtonClick('button2')}>Four Wheeler</button></li>
            <li><button  className='active:bg-yellow-300 hover:bg-green-400 w-[150px] bg-green-700 text-white p-2 rounded font-bold' type='button' onClick={() => handleButtonClick('button3')}>Peso Tank </button></li>
        </ul>

        {renderContent()}

    </div>

  )
}

export default FormCollection