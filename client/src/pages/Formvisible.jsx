import React, { useState } from 'react';
import { Link,useNavigate  } from 'react-router-dom';


const Formvisible = ({ onAuthorize }) => {
  const [isFormVisible, setFormVisible] = useState(false);
  const navigateTo = useNavigate ();
  const handleKeyCheck = (e) => {
    e.preventDefault();
    const enteredKey = e.target.elements.secretKey.value;
    const correctKey = "sv@2024"; // Set your secret key here

    if (enteredKey === correctKey) {
      setFormVisible(true);
    onAuthorize();
    navigateTo('/form');
    } else {
      alert("Incorrect secret key!");
    }
  };

  return (
    <div className="">
      {!isFormVisible ? (
        <div >
        
          <form onSubmit={handleKeyCheck}>
            <div className="mb-4">
          
              <input type="password" name="secretKey" className="bg-[rgb(66,53,135)] font-bold text-white rounded-lg p-1 mt-4 mx-4" required placeholder='Form Secret Key' />
            </div>

          </form>
        </div>
      ) : (
        <li className='linkMenu'><Link to="/form">Form</Link></li>
      )}
    </div>
  );
};

export default Formvisible;
