/* eslint-disable */

// https://medium.com/javascript-in-plain-english/add-google-login-to-your-react-apps-in-10-mins-c45315c93db0
// https://www.npmjs.com/package/react-google-login

import autoBind from 'auto-bind';
import React, { Component } from 'react';
import './css/LoginPage.css';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import { Link } from 'react-router-dom';
import logo from './css/logo.png';
import chs_logo from './css/chs_logo.png';
import Select from 'react-select';
import Modal from 'react-modal';
import { AiFillDelete, AiFillCloseCircle, AiFillEdit } from 'react-icons/ai';
import { FcCancel } from 'react-icons/fc';
import { RiSave3Fill } from 'react-icons/ri';

const clientId = "269624764057-hkcano4fqdrlg1upme538aqt8l0prvv9.apps.googleusercontent.com";
//refresh token setup
const refreshTokenSetup = (res) => {
    let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;
    const refreshToken = async() => {
        const newAuthRes = await res.reloadAuthResponse();
        refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;

        setTimeout(refreshToken, refreshTiming);
    }

    setTimeout(refreshToken, refreshTiming);
}

var deptOptions = [
    { value: 'Math', label: 'Math' },
    { value: 'Science', label: 'Science' },
    { value: 'English', label: 'English' },
    { value: 'Filipino', label: 'Filipino' },
    { value: 'AP', label: 'AP' },
    { value: 'TLE', label: 'TLE' },
    { value: 'ESP', label: 'ESP' },
    { value: 'MAPEH', label: 'MAPEH' }
  ]
  
  var yearOptions = [
    { value: 'Grade 7', label: 'Grade 7' },
    { value: 'Grade 8', label: 'Grade 8' },
    { value: 'Grade 9', label: 'Grade 9' },
    { value: 'Grade 10', label: 'Grade 10' }
  ]
  var yearSOptions = [
    { value: 'All', label: 'All' },
    { value: 'Grade 7', label: 'Grade 7' },
    { value: 'Grade 8', label: 'Grade 8' },
    { value: 'Grade 9', label: 'Grade 9' },
    { value: 'Grade 10', label: 'Grade 10' }
    
  ]

  var subjectOptions = [
    { value: 'All', label: 'All' },
    { value: 'Math', label: 'Math' },
    { value: 'Science', label: 'Science' },
    { value: 'English', label: 'English' },
    { value: 'Filipino', label: 'Filipino' },
    { value: 'AP', label: 'AP' },
    { value: 'TLE', label: 'TLE' },
    { value: 'ESP', label: 'ESP' },
    { value: 'MAPEH', label: 'MAPEH' }
    
  ]

  var positionOptions = [
    { value: 'Teacher', label: 'Teacher' },
    { value: 'Master Teacher', label: 'Master Teacher' },
    { value: 'Head Teacher', label: 'Head Teacher' }
  ]


// Login Page
class LoginPage extends Component{
    constructor(props){
        super(props)
        this.state ={
            accessToken:"",
            loggedIn: false,
            registered: false,
            user: "",
            year_level: "",
            department: "",
            position: "",
            editing: false,
            teacher_id: null,
            editModalIsOpen: false,
            createModalIsOpen: false,
            fileArr: [],
            year_level_search: "All",
            subject: "All",
            subjectC: "",
            yearC: "",
            filenameC: "",
            sectionC: "",
            totalStudentsC: 0,
            totalItemsC: 10
        }
        autoBind(this);
    }

    yearHandler(e){ //React Select is different
        this.setState({year_level: e.value}, this.arrangeData);  
    }
    
    deptHandler(e){ //React Select is different
        this.setState({department: e.value}, this.arrangeData);  
    }

    posHandler(e){ //React Select is different
        this.setState({position: e.value}, this.arrangeData);  
    }

    yearSearchHandler(e){ //React Select is different
        this.setState({year_level_search: e.value}, this.arrangeData);  
    }
    
    subjectHandler(e){ //React Select is different
        this.setState({subject: e.value}, this.arrangeData);  
    }

    handleReg(e){
        if(this.state.year_level === "" || this.state.department === "" || this.state.position === ""){
            alert("You must fill out the details before proceeding.");
        }else{
            const body = {
                "email": this.state.user.email,
                "name": this.state.user.name,
                "position": this.state.position,
                "department": this.state.department,
                "year_level": this.state.year_level
            };
            
            axios.post('http://localhost:3001/teacher/create-teacher', body)
                .then(res =>{
                    this.setState({ registered: true })
                    this.render()
                }
                ).catch(err =>{
                    console.log(err)
                    this.render()
                });
        }
        e.preventDefault();
    }

    handleEditOne(e){
        this.setState({editing: true})
    }
    cancelEdit(){
        this.setState({editing: false})
    }

    handleEditFinal(e){
        if(this.state.year_level === "" || this.state.department === "" || this.state.position === ""){
            alert("You must fill out the details before proceeding.");
        }else{
            const body = {
                "email": this.state.user.email,
                "position": this.state.position,
                "department": this.state.department,
                "year_level": this.state.year_level
            };
            axios.post('http://localhost:3001/teacher/edit-teacher', body)
                .then(res =>{
                    this.setState({ editing: false })
                    this.render()
                }
                ).catch(err =>{
                    console.log(err)
                    this.render()
                });
        }
        e.preventDefault();
    }


    Login(){
        const onSuccess = (res) => {
            this.setState({
                user: res.profileObj,
                loggedIn:true,
                accessToken: res.accessToken
            });
            
            refreshTokenSetup(res);
        };
    
        const onFailure = (res) => {
            console.log("Login Fail: ", res);
        };
    
       return(
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{marginTop: '100px'}}
                isSignedIn={true}
            />
        )
    }

    logoutHandler(){
        console.log("Logout Success");
        this.setState({
            accessToken:"",
            loggedIn: false,
            registered: false,
            user: "",
            year_level: "",
            department: "",
            position: "",
            editing: false,
            teacher_id: null,
            editModalIsOpen: false,
            createModalIsOpen: false,
            fileArr: [],
            year_level_search: "All",
            subject: "All"
          });
          
        window.gapi.auth2.getAuthInstance().disconnect();
        
    }

    Logout(){
       return(
           <div class="logoutbutton">
            <button onClick={this.logoutHandler}>Log Out</button>
            </div>
        )
    }

    NotLogged(){
        return(
        <div>
            <div class="titlePage">
                <div class="title">Automated Item Analysis</div>
                <div class="profilePhoto">Online item analysis creator based on Commonwealth High School's format</div>
                <div class="getStarted">Get started here:</div>
                <div class="loginbutton"> {this.Login()} </div>
                
            </div>
            
        </div>
        )
    }

    openModal(){
        this.setState({editModalIsOpen: true});
    }

    afterOpenModal(){
        const body = {
            teacher_id: this.state.teacher_id
        }
        axios.post(`http://localhost:3001/itemanalysis/view-all-itemanalysis`, body)
            .then(res =>{
                this.setState({fileArr: res.data.data})
            }
            )
            .catch(err =>{
                this.setState({fileArr: []})
                console.log(err);
            });
    }

    closeModal(){
        this.setState({editModalIsOpen: false});
    }

    openModalC(){
        this.setState({createModalIsOpen: true});
    }

    closeModalC(){
        this.setState({createModalIsOpen: false});
    }

    filenameHandler(e){
        this.setState({filenameC: e.target.value});
    }
    
    sectionHandler(e){
        this.setState({sectionC: e.target.value});
    }
    
    yearCHandler(e){ //React Select is different
        this.setState({yearC: e.value});  
    }
    
    subjectCHandler(e){ //React Select is different
        this.setState({subjectC: e.value});
    }

    totalStudentsHandler(e){
        this.setState({totalStudentsC: e.target.value});
    }

    totalItemsHandler(e){
        this.setState({totalItemsC: e.target.value});
    }

    keypressHandler(e){
        if((e.key == "e") || (e.key == ".") || (e.key == "-") || (e.key == "+")){
          e.preventDefault();
        }
      }

    createItemPopup(){
        const content = []
        content.push(<button onClick={this.closeModalC} class="iconButton"><AiFillCloseCircle size="24"/></button>);
        content.push(<div class="about" style={{fontSize: "large"}}> Initialize your item analysis. </div>)
        content.push(<table><tbody>
            <tr><td> <b>Filename</b><input type="text" onChange={this.filenameHandler} placeholder={"Untitled"}></input> </td></tr>
            <tr><td ><b>Number of Items</b> <input type="number" min="0" onKeyPress={this.keypressHandler} key={10141} id={10141} onChange={this.totalItemsHandler} default={10} placeholder={10}></input> </td>
            <td ><b>Total number of students</b> <input type="number" min="0" onKeyPress={this.keypressHandler} key={10141} id={10141} onChange={this.totalStudentsHandler}></input> </td>
            <td> <b>Section</b> <input type="text" onChange={this.sectionHandler} placeholder={"Section"}></input> </td></tr>
            <tr><td><b>Year Level</b><Select id="selectButton" onChange={this.yearCHandler} options={yearOptions} placeholder="Year Level" /> </td>
            <td><b>Subject</b><Select id="selectButton" onChange={this.subjectCHandler} options={deptOptions} placeholder="Subject" /> </td></tr>
            </tbody></table>)

        content.push(<button ><Link to={{
            pathname: "/ItemAnalysis",
            state: { 
                user: this.state.user, 
                teacher_id: this.state.teacher_id,
                subjectC: this.state.subjectC,
                yearC: this.state.yearC,
                filenameC: this.state.filenameC,
                sectionC: this.state.sectionC,
                totalStudentsC: this.state.totalStudentsC,
                totalItemsC: this.state.totalItemsC
            }}}> Create Item Analysis </Link> </button>)
        
        return(content);
    }

    deleteIA(ia_id, index){
        const body = {
            teacher_id: this.state.teacher_id,
            itemanalysis_id: ia_id
        }
        axios.post(`http://localhost:3001/itemanalysis/delete-itemanalysis`, body)
            .then(res =>{
                var array = this.state.fileArr;
                if (index !== -1) {
                    array.splice(index, 1);
                    this.setState({fileArr: array});
                }
                
            }
            )
            .catch(err =>{
                console.log(err);
            });
    }

    viewAllPopup(pathname){
        const content = []
        content.push(<button onClick={this.closeModal} class="iconButton"><AiFillCloseCircle size="24"/></button>)
        
        const IAFiles = this.state.fileArr;
        if(IAFiles.length === 0){
            content.push(<div class="about" style={{fontSize: "large"}}> You have no item analyses. </div>)
        }else{
            content.push(<div class="about" style={{fontSize: "large"}}> You have a total of {IAFiles.length} item analyses. </div>)
            content.push(<tr style={{border: "0px"}}>
                <td style={{border: "0px"}}> <b>Subject</b> <Select id="selectButton" onChange={this.subjectHandler} value={this.state.subject} options={subjectOptions} placeholder={this.state.subject} /> </td>
                <td style={{border: "0px"}}> <b>Year Level</b> <Select id="selectButton" onChange={this.yearSearchHandler} value={this.state.year_level_search} options={yearSOptions} placeholder={this.state.year_level_search} /> </td>
                </tr>)
            
            content.push(<tr>
                <td id="stick"> <b>Filename</b> </td>
                <td id="stick"> <b>Year Level</b> </td>
                <td id="stick"> <b>Section</b> </td>
                <td id="stick"> <b>Subject</b> </td>
                </tr>)
            
            const subj = this.state.subject;
            const ylevel = this.state.year_level_search;
            
            for (let i = 0; i < IAFiles.length; i++) {
                const element = IAFiles[i];
                if(element.filename === ""){
                    element.filename = "Untitled";
                }
                const ia_id = element.itemanalysis_id;

                if(subj !== "All"){
                    if(element.subject !== subj){
                        continue;
                    }
                }
                if(ylevel !== "All"){
                    if(element.year !== ylevel){
                        continue;
                    }
                }
                content.push(
                    <tr>
                    <td>
                    <Link to={{
                        pathname: pathname,
                        state: {
                            user: this.state.user, 
                            teacher_id: this.state.teacher_id,
                            itemanalysis_id: ia_id
                        }}}> {element.filename}  </Link> </td>
                    <td>{element.year}</td>
                    <td>{element.section}</td>
                    <td>{element.subject}</td>
                    <button type="submit" class="iconButton" onClick={() => { this.deleteIA(ia_id, i) }}><AiFillDelete size="24px" color="red"/></button>
                    </tr>
                )
                  
            }

        }
        
        return(content)
    }

    checkRegistration(){
        if(!this.state.registered){
            const userEmail = {email: this.state.user.email};
            axios.post(`http://localhost:3001/teacher/view-teacher`, userEmail)
            .then(res =>{
                this.setState({
                    registered: true,
                    department: res.data.data.department,
                    position: res.data.data.position,
                    year_level: res.data.data.year_level,
                    teacher_id: res.data.data.teacher_id
                })
            }
            )
            .catch(err =>{
                console.log(err);
            });
        }
        if(this.state.registered){
            if(this.state.editing){
                return(
                    <div class="about">
                        <table class="profileTable"><tbody class="profileTable2">
                        <tr class="profileTable2">
                        <td class="profileTable2"><b>Position</b><Select id="selectButton" onChange={this.posHandler} value={this.state.position} options={positionOptions} placeholder={this.state.position} /></td>
                        <td class="profileTable2"><b>Department</b><Select id="selectButton" onChange={this.deptHandler} value={this.state.department} options={deptOptions} placeholder={this.state.department} /></td>
                        <td class="profileTable2"><b>Year Level</b><Select id="selectButton" onChange={this.yearHandler} value={this.state.year_level} options={yearOptions} placeholder={this.state.year_level} /></td>                        
                        </tr>
                        <tr class="profileTable2">
                        <td class="profileTable2"><button onClick={this.cancelEdit} class="iconButton"><FcCancel size="30px" color="red"/></button></td>
                        <td class="profileTable2"></td>
                        <td class="profileTable2"><button onClick={this.handleEditFinal} class="iconButton"><RiSave3Fill size="30px" color="blue"/></button></td>
                        </tr>
                        </tbody></table>
                    </div>
                )
            }else{
                return(<div>
                <table class="profileData"><tbody class="profileData2"><tr class="profileData2">
                    <td class="profileData2"><b>Position:<br></br>{this.state.position}</b></td>
                    <td class="profileData2"><b>Department:<br></br>{this.state.department}</b></td>
                    <td class="profileData2"><b>Year Level:<br></br>{this.state.year_level}</b></td>
                    <td class="profileData2"><button onClick={this.handleEditOne} class="iconButton"><AiFillEdit size="30px" color="blue"/></button></td>
                </tr></tbody></table>

                <div class="links">
                <button onClick={this.openModalC}>Create Item Analysis</button>
                <Modal
                    isOpen={this.state.createModalIsOpen}
                    onRequestClose={this.closeModalC}
                    contentLabel="Create Item Analysis"
                >
                    {this.createItemPopup("/ViewItemAnalysis")}
                </Modal>
                {' '}
                <button onClick={this.openModal}>Edit Item Analysis</button>
                <Modal
                    isOpen={this.state.editModalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    contentLabel="Edit Item Analysis"
                >
                    {this.viewAllPopup("/ViewItemAnalysis")}
                </Modal>
                </div>

                <div class="links2">
                <button><Link to={{
                        pathname: "/CombineItemAnalysis",
                        state: { 
                            user: this.state.user, 
                            teacher_id: this.state.teacher_id
                        }}}> Merge Item Analyses </Link> </button>
                </div>
    
                </div>)
            }
        }else{
            return(
                <div class="about">
                    Your account is not yet registered.
                    Fill out the details and click "Register" to register your account.
                    <div class="about">
                        <table class="profileTable"><tbody class="profileTable2">
                        <tr class="profileTable2">
                        <td class="profileTable2"><b>Position</b><Select id="selectButton" onChange={this.posHandler} options={positionOptions} placeholder="Position" /></td>
                        <td class="profileTable2"><b>Department</b><Select id="selectButton" onChange={this.deptHandler} options={deptOptions} placeholder="Department" /></td>
                        <td class="profileTable2"><b>Year Level</b><Select id="selectButton" onChange={this.yearHandler} options={yearOptions} placeholder="Year Level" /></td>
                        </tr>
                        <tr class="profileTable2">
                        <td class="profileTable2"></td>
                        <td class="profileTable2"></td>
                        <td class="profileTable2"><form onSubmit={this.handleReg}><input type="submit" value="Register"></input></form></td>
                        </tr>
                        </tbody></table>
                    </div>
                </div>
            )
        }
    }

    LoggedIn(){
        return(
        <div class="titlePage">
            <div class="title">Welcome {this.state.user.name}</div>
            <div class="profilePhoto"><img src={this.state.user.imageUrl} alt={this.state.user.name}></img></div>
            
            {this.checkRegistration()}
            
            {this.Logout()}
        </div>
        )
    }

    render(){
        let PageStyle;
        if (this.state.loggedIn) {
            PageStyle = this.LoggedIn();
        }else{
            PageStyle = this.NotLogged();
        }
        return(
            <div class="titlePage">
            <div class="logo"> <img src={logo} width='100' height='100' alt='logo'></img></div>
            <div class="chs_logo"> <img src={chs_logo} width='100' height='100' alt='chs_logo'></img></div>
                {PageStyle}
            <div class="footer"> All rights reserved.</div>
            </div>
        )
    }
}

export default LoginPage;