import React from 'react';
import { Layout} from 'antd';
import { useState, useEffect } from 'react';
import EmployeeTable from '../EmployeeTable';
import EmployeeDataCard from '../EmployeeDataCard';
import LineGraph from '../LineGraph';
import Header from '../Header';
import EmployeePie from '../EmployeePie';
import Footer from '../Footer';


function Home() {

  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/employees')
      .then(response => response.json())
      .then(data => setEmployeeData(data))
      .catch(error => console.error(error));
  }, []);

    const employeeTableStyles  = {
        position: 'absolute',
        top:'550px',
        bottom: '3px',
        left: 0,
        
      };

    return (
        


<div style={{ overflowX: 'hidden' , overflowY: 'hidden' }}>
   <div>
      <Header/>
   </div>
   <div>
     <EmployeeDataCard/>
   </div>
   <div>
     <LineGraph/>
   </div>
   <div style={employeeTableStyles }>
     <EmployeeTable/>
   </div>
    <div>
    <EmployeePie/>
    </div>
    <Footer/>    
           </div>
         );
       };


export default Home;
