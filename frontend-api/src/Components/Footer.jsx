import React, { useState, useEffect } from 'react';
function Footer() {

  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/employees')
      .then(response => response.json())
      .then(data => setEmployeeData(data))
      .catch(error => console.error(error));
  }, []);

    const footerStyle = {
        textAlign: 'center',
        color: 'white',
        height: 64,
        bottom: 0,
        width:'100%',
        paddingInline: 50,
        lineHeight: '64px',
        backgroundColor: '#4169E1',
        
      };

    return (
      <footer style={footerStyle}>
                APP4035 SPRING ©2023 Group1
      </footer>
    );
  }
  
  export default Footer;
