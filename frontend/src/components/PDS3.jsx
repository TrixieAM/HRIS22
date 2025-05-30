import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PrintIcon from '@mui/icons-material/Print'






const PDS3 = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [voluntaryWorkInfo, setVoluntaryWorkInfo] = useState([]);
  const [learningDevelopmentInfo, setLearningDevelopmentInfo] = useState([]);
  const [otherInformationInfo, setOtherInformationInfo] = useState([]);




  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    const storedEmployeeNumber = localStorage.getItem('employeeNumber');




    console.log("Stored Role:", storedRole);
    console.log("Stored Employee Number:", storedEmployeeNumber);




    if (storedRole && storedEmployeeNumber) {
      setRole(storedRole);
      setEmployeeNumber(storedEmployeeNumber);
    } else {
      navigate("/");
    }
  }, [navigate]);




  useEffect(() => {
    if (employeeNumber) {
      const fetchvoluntaryWorkData = async () => {
        try {
          const requests = Array.from({ length: 7 }, (_, i) =>
            axios.get(`http://localhost:5000/VoluntaryRoute/voluntary-work${i + 1}/${employeeNumber}`)
          );
          const responses = await Promise.all(requests);
          setVoluntaryWorkInfo(responses.map(res => res.data || null));
        } catch (error) {
          console.error("Error loading voluntary work data:", error);
        }
      };




      const fetchLearningDevelopmentData = async () => {
        try {
          const requests = Array.from({ length: 21 }, (_, i) =>
            axios.get(`http://localhost:5000/learning_and_development_table${i + 1}/${employeeNumber}`)
          );
          const responses = await Promise.all(requests);
          setLearningDevelopmentInfo(responses.map(res => res.data || null));
        } catch (error) {
          console.error("Error loading learning and development data:", error);
        }
      };




      const fetchOtherInformationData = async () => {
        if (!employeeNumber) {
          console.warn("Employee number is not defined");
          return;
        }

        try {
          const requests = Array.from({ length: 7 }, (_, i) =>
            axios.get(`http://localhost:5000/OtherInfo/other-information${i + 1}/${employeeNumber}`)
          );
          const responses = await Promise.all(requests);
          const data = responses.map(res => res.data || null);
          setOtherInformationInfo(data);
        } catch (error) {
          console.error("Error loading other information data:", error);
        }
      };









     




      fetchvoluntaryWorkData();
      fetchLearningDevelopmentData();
      fetchOtherInformationData();
    }
  }, [employeeNumber]);




 




  // Normalize data
  const normalizedVoluntaryWork = [...voluntaryWorkInfo.filter(e => e !== null)];
  while (normalizedVoluntaryWork.length < 7) normalizedVoluntaryWork.push(null);




  const normalizedLearningDevelopment = [...learningDevelopmentInfo.filter(e => e !== null)];
  while (normalizedLearningDevelopment.length < 21) normalizedLearningDevelopment.push(null);




  const normalizedOtherInformation = [...otherInformationInfo.filter(e => e !== null)];
  while (normalizedOtherInformation.length < 7) normalizedOtherInformation.push(null);
 












           
        return (


            <div id="print-section">


            <style>
              {`
                @media print {
                  html, body {
                    background: white !important;
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                    margin: 0;
                    padding: 0;
                    .no-print {
                    display: none !important;
                    height: 100vh;
                    overflow: hidden;
                    }
                  }
           
                  body * {
                    visibility: hidden;
                  }
           
                  #print-section, #print-section * {
                    visibility: visible;
                  }
           
                  #print-section {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: fit-content;
                    margin: 0;
                    margin-bottom: 0;
                    padding: 0;
                    background-color: white !important;
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                    transform: scale(1);
                    transform-origin: center;
                    page-break-inside: avoid;
                    break-inside: avoid;
                  }
           
                  .print-button {
                    display: none;
                  }
           
                  @page {
                    size: legal portrait;
                    margin: 0;
                  }
                }
              `}
            </style>






        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
             
            <div style={{  padding: '0.25in', width: '8in', height: '12.9in' }}>
           
               
                    <table style= {{border: '1px solid black', borderCollapse: 'collapse', fontFamily: 'Arial, Helvetica, sans-serif', width: '8in', tableLayout: 'fixed'}}>
                        <tbody>








                        <tr>
                            <td colSpan="15" style={{ height:'0.2in', fontSize:'72.5%', backgroundColor:'gray', color: 'white'}}>
                                <b><i>VI. VOLUNTARY WORK OR INVOLVEMENT IN CIVIC / NON-GOVERNMENT / PEOPLE / VOLUNTARY ORGANIZATION/S</i></b>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="1" rowSpan="2" style={{ height:'0.3in', fontSize:'62.5%', backgroundColor:'lightgray', border:'1px 1px 1px 0px solid black'}}>
                                29.
                            </td>
                            <td colSpan="6" rowSpan="2" style={{ height:'0.3in', fontSize:'62.5%', backgroundColor:'lightgray', border:'1px 0px 1px 1px solid black', textAlign: 'center'}}>
                                NAME & ADDRESS OF ORGANIZATION<br></br>
                                (Write in full)
                            </td>
                            <td colSpan="2" style={{ height:'0.2in', fontSize:'62.5%', backgroundColor:'lightgray', border: '1px solid black', textAlign: 'center'}}>
                                INCLUSIVE DATES<br></br>
                                (mm/dd/yyyy)
                            </td>
                            <td colSpan="1" rowSpan="2" style={{ height:'0.3in', fontSize:'50%', backgroundColor:'lightgray', border: '1px solid black', textAlign: 'center'}}>
                                NUMBER OF<br></br>
                                HOURS
                            </td>
                            <td colSpan="5" rowSpan="2" style={{ height:'0.3in', fontSize:'62.5%', backgroundColor:'lightgray', border: '1px solid black', textAlign: 'center'}}>
                                POSITION / NATURE OF WORK
                            </td>
                        </tr>
                       
                        <tr>
                            <td colSpan="1" style={{ height:'0.11in', fontSize:'62.5%', backgroundColor:'lightgray', border: '1px solid black', textAlign: 'center'}}>
                                From
                            </td>  
                            <td colSpan="1" style={{ height:'0.11in', fontSize:'62.5%', backgroundColor:'lightgray', border: '1px solid black', textAlign: 'center'}}>
                                To
                            </td>          
                        </tr>
                        {normalizedVoluntaryWork.map((voluntarywork, index) => (
                        <tr key={index}>                        
                            <td colSpan="7" style={{ height:'0.3in', fontSize:'62.5%', border: '1px solid black'}}>
                            {voluntarywork ? voluntarywork.nameAndAddress: 'N/A'}
                            </td>
                           
                            <td colSpan="1" style={{ height:'0.3in', fontSize:'55%', border: '1px solid black'}}>
                            {voluntarywork ? voluntarywork.dateFrom: 'N/A'}
                            </td>
                            <td colSpan="1" style={{ height:'0.3in', fontSize:'55%', border: '1px solid black'}}>
                            {voluntarywork ? voluntarywork.dateTo: 'N/A'}
                            </td>
                            <td colSpan="1" style={{ height:'0.3in', fontSize:'55%', border: '1px solid black'}}>
                            {voluntarywork ? voluntarywork.numberOfHours: 'N/A'}
                            </td>
                            <td colSpan="5" style={{ height:'0.3in', fontSize:'62.5%', border: '1px solid black'}}>
                            {voluntarywork ? voluntarywork.natureOfWork: 'N/A'}
                            </td>
                        </tr>
                        ))}
                       
                       
                   
                        <tr>
                            <td colSpan="15" style={{ height:'0.11in', fontSize:'55%', backgroundColor:'lightgray', color:'red', border: '1px solid black', textAlign: 'center'}}>
                                <b><i>(Continue on separate sheet if necessary)</i></b>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="15" style={{ height:'0.2in', fontSize:'72.5%', backgroundColor:'gray', color: 'white'}}>
                                <b><i>VII. LEARNING AND DEVELOPMENT (L&D) INTERVENTIONS/TRAINING PROGRAMS ATTENDED</i></b>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="1" rowSpan="2" style={{height:'0.5in', fontSize:'62.5%', backgroundColor:'lightgray', border:'1px 1px 1px 0px solid black'}}>
                                30.
                            </td>
                            <td colSpan="6" rowSpan="2" style={{height:'0.5in', fontSize:'62.5%', backgroundColor:'lightgray', border:'1px 0px 1px 1px solid black', textAlign: 'center'}}>
                                TITLE OF LEARNING AND DEVELOPMENT INTERVENTIONS/TRAINING PROGRAMS<br></br>
                                (Write in full)
                            </td>
                            <td colSpan="2" style={{ height:'0.4in', fontSize:'55%', backgroundColor:'lightgray', border: '1px solid black', textAlign: 'center'}}>
                                INCLUSIVE DATES OF<br></br>
                                ATTENDANCE<br></br>
                                (mm/dd/yyyy)
                            </td>
                            <td colSpan="1" rowSpan="2" style={{height:'0.5in', fontSize:'55%', backgroundColor:'lightgray', border: '1px solid black', textAlign: 'center'}}>
                                NUMBER OF<br></br>
                                HOURS
                            </td>
                            <td colSpan="1" rowSpan="2" style={{height:'0.5in', fontSize:'50%', backgroundColor:'lightgray', border: '1px solid black', textAlign: 'center'}}>
                                Type of LD<br></br>
                                ( Managerial/ Supervisory/<br></br>
                                Technical/etc)
                            </td>
                            <td colSpan="4" rowSpan="2" style={{height:'0.5in', fontSize:'62.5%', backgroundColor:'lightgray', border: '1px solid black', textAlign: 'center'}}>
                                CONDUCTED/ SPONSORED BY<br></br>
                                (Write in full)
                            </td>
                        </tr>
                       
                        <tr>
                            <td colSpan="1" style={{ height:'0.11in', fontSize:'62.5%', backgroundColor:'lightgray', border: '1px solid black', textAlign: 'center'}}>
                                From
                            </td>  
                            <td colSpan="1" style={{ height:'0.11in', fontSize:'62.5%', backgroundColor:'lightgray', border: '1px solid black', textAlign: 'center'}}>
                                To
                            </td>          
                        </tr>
                        {normalizedLearningDevelopment.map((learningdevelopment, index) => (
                        <tr key={index}>
                       
                            <td colSpan="7" style={{ height:'0.25in', fontSize:'62.5%', border: '1px solid black'}}>
                           {learningdevelopment ? learningdevelopment.titleOfProgram: 'N/A'}
                            </td>
                            <td colSpan="1" style={{ height:'0.25in', fontSize:'55%', border: '1px solid black'}}>
                            {learningdevelopment ? learningdevelopment.dateFrom: 'N/A'}
                            </td>
                            <td colSpan="1" style={{ height:'0.25in', fontSize:'55%', border: '1px solid black'}}>
                            {learningdevelopment ? learningdevelopment.dateTo: 'N/A'}
                            </td>
                            <td colSpan="1" style={{ height:'0.25in', fontSize:'55%', border: '1px solid black'}}>
                            {learningdevelopment ? learningdevelopment.numberOfHours: 'N/A'}
                            </td>
                            <td colSpan="1" style={{ height:'0.25in', fontSize:'55%', border: '1px solid black'}}>
                            {learningdevelopment ? learningdevelopment.typeOfLearningDevelopment: 'N/A'}
                            </td>
                            <td colSpan="4" style={{ height:'0.25in', fontSize:'62.5%', border: '1px solid black'}}>
                            {learningdevelopment ? learningdevelopment.conductedSponsored: 'N/A'}
                            </td>
                        </tr>
                        ))}
                   
                       
                        <tr>
                            <td colSpan="1" style={{ height:'0.3in', fontSize:'62.5%', backgroundColor:'lightgray', border:'1px 1px 1px 0px solid black'}}>
                                31.
                            </td>
                            <td colSpan="3" style={{ height:'0.3in', fontSize:'55%', backgroundColor:'lightgray', border:'1px 0px 1px 1px solid black', textAlign: 'center'}}>
                                SPECIAL SKILLS and HOBBIES
                            </td>
                            <td colSpan="1" style={{ height:'0.3in', fontSize:'62.5%', backgroundColor:'lightgray', border: '1px solid black'}}>
                                32.
                            </td>
                            <td colSpan="6" style={{ height:'0.3in', fontSize:'62.5%', backgroundColor:'lightgray', border: '1px solid black', textAlign: 'center'}}>
                                NON-ACADEMIC DISTINCTIONS / RECOGNITION<br></br>
                                (Write in full)
                            </td>
                            <td colSpan="1" style={{ height:'0.3in', fontSize:'62.5%', backgroundColor:'lightgray', border:'1px 1px 1px 0px solid black'}}>
                                33.
                            </td>
                            <td colSpan="3" style={{ height:'0.3in', fontSize:'55%', backgroundColor:'lightgray', border:'1px 0px 1px 1px solid black', textAlign: 'center'}}>
                                MEMBERSHIP IN ASSOCIATION/ORGANIZATION<br></br>
                                (Write in full)
                            </td>
                        </tr>








                       
                       
                         
                        {normalizedOtherInformation.map((otherinformation, index) => (
                        <tr key={index}>
                            <td colSpan="4" style={{ height:'0.3in', fontSize:'62.5%', border: '1px solid black'}}>
                            {otherinformation ? otherinformation.specialSkills: 'N/A'}
                            </td>
                            <td colSpan="7" style={{ height:'0.3in', fontSize:'62.5%', border: '1px solid black'}}>
                            {otherinformation ? otherinformation.nonAcademicDistinctions: 'N/A'}
                            </td>
                            <td colSpan="4" style={{ height:'0.3in', fontSize:'62.5%', border: '1px solid black'}}>
                            {otherinformation ? otherinformation.membershipInAssociation: 'N/A'}
                            </td>
                        </tr>
                        ))}
                       
                        <tr>
                            <td colSpan="15" style={{ height:'0.11in', fontSize:'55%', backgroundColor:'lightgray', color:'red', border: '1px solid black', textAlign: 'center'}}>
                                <b><i>(Continue on separate sheet if necessary)</i></b>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="4" style={{ height:'0.25in', fontSize:'62.5%', backgroundColor:'lightgray', border: '1px solid black', textAlign: 'center'}}>
                            <b><i>SIGNATURE</i></b>
                            </td>
                            <td colSpan="5" style={{ height:'0.25in', fontSize:'62.5%', border: '1px solid black'}}>
                                &nbsp;
                            </td>
                            <td colSpan="2" style={{ height:'0.25in', fontSize:'62.5%', backgroundColor:'lightgray', border: '1px solid black', textAlign: 'center'}}>
                            <b><i>DATE</i></b>
                            </td>
                            <td colSpan="4" style={{ height:'0.25in', fontSize:'62.5%', border: '1px solid black'}}>
                                &nbsp;
                            </td>      
                        </tr>
                        <tr>
                            <td colSpan="15" style={{ height:'0.11in', fontSize:'50%', border: '1px solid white', textAlign: 'right'}}>
                            <i>CS FORM 212 (Revised 2017), Page 3 of 4</i>
                            </td>
                        </tr>












                       
                           








                           
                       
                                       
                                       
                                       
                        </tbody>
                       
                   
                    </table>
            </div>
            </div>
            <button
            onClick={() => window.print()}
            className="no-print"
            style={{
            backgroundColor: '#6D2323',
            color: '#FFFFFF',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            marginTop: '20px',
            fontSize: '14px',  
            marginLeft: '80%',
            marginBottom: '30px'
          }}
        >
          <PrintIcon style={{ fontSize: '24px' }} />
            Save as PDF
        </button>
        </div>
);








};


export default PDS3;

