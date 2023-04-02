import React from 'react';
import EmployeeStatusTable from '../EmployeeTable';
import EmployeeDataCard from '../EmployeeDataCard';
import BarGraph from '../BarGraph';
import Header from '../Header';
import EmployeePie from '../EmployeePie';
import Footer from '../Footer';


function Home() {
    
    const employeeTableStyles  = {
        position: 'absolute',
        top:'550px',
        bottom: '3px',
        left: 0,
        
      };
    
    return (
        <>
        <div>
          <Header/>
        </div>
        <div style={employeeTableStyles }>
        <EmployeeStatusTable/>
          </div>
          <div>
        <BarGraph/>
          </div>
          <div>
        <EmployeeDataCard/>
          </div>
          <div>
            <EmployeePie/>
          </div>
          <div>
            <Footer/>
          </div>
            
        </>
      );
    };
  

export default Home;