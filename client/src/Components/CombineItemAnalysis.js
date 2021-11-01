/* eslint-disable */
import React, { Component, useState } from 'react';
import {Link} from 'react-router-dom';
import { CSVLink } from 'react-csv';
import CSVReader from 'react-csv-reader';
import './css/ItemAnalysis.css';

var autoBind = require('auto-bind');
//initialize arrays
var item_freq = []
var nswgrs = []
var rank_arr = []
for (var i = 0; i < 50; i++) {
  item_freq.push(0)
  nswgrs.push(0)
  rank_arr.push(null)
}
nswgrs.push(0)

var headers = [
  { label: 'Subject', key: 'subject' },
  { label: 'Year and Section', key: 'section' },
  { label: 'Total Number of Students', key: 'total_num_of_students' },
  { label: 'Item Number', key: 'item_num' },
  { label: 'Frequency of Error', key: 'item_froe' },
  { label: 'Rank', key: 'foe_rank' },
  { label: 'Raw Score', key: 'rawscore' },
  { label: 'Number of Students who got the Raw Score', key: 'ns_rawscore' },
  { label: 'Product (Raw Score x Number of Students who got the Raw Score)', key: 'prod' },
  { label: 'Mean', key: 'mean' },
  { label: 'Students above mean', key: 'students_above_mean' },
  { label: 'Students equals mean', key: 'students_equals_mean' },
  { label: 'Students below mean', key: 'students_below_mean' }
]

var data = [];
class CombineItemAnalysis extends Component{
  constructor(props){
    super(props)
    this.state = {
      user: "",
      subject: "",
      filename: "Untitled",
      total_rawscore: 0,
      total_num_of_students: 0,
      number_of_items: 10,
      mean: 0,
      students_above_mean: 0,
      students_equals_mean: 0,
      students_below_mean: 0,
      section: "",
      item_foe: item_freq.slice(),
      num_of_studs_rawscore: nswgrs.slice(),
      product: nswgrs.slice(),
      rank: rank_arr.slice(),
      number_of_files: 0,
      filearray: []
    }
    autoBind(this);
  }

  filenameHandler(e){
    this.setState({filename: e.target.value}, this.arrangeData);
    
  }

  sectionHandler(e){
    this.setState({section: e.target.value}, this.arrangeData);
    
  }

  subjectHandler(e){
    this.setState({subject: e.target.value}, this.arrangeData);

  }

  updateRank(foe){
    var rankarray = this.state.rank;
    var rank_checker;
    var newfoe = foe.slice();
    var highest_foes = newfoe.sort((a,b) => b-a).slice(0,10);
    if(highest_foes[0] != 0){
      for (let i = 0; i < foe.length; i++) {
        const element = foe[i];
        if(highest_foes.includes(element) && element != 0){          
          rank_checker = highest_foes.indexOf(element) + 1;
          if(rank_checker == 1){
            rank_checker = "1st";
          }else if(rank_checker == 2){
            rank_checker = "2nd";
          }else if(rank_checker == 3){
            rank_checker = "3rd";
          }else{
            rank_checker = rank_checker.toString().concat("th");
          }
          rankarray[i] = rank_checker;
        }else{
          rankarray[i] = null;
        }
      }
    }

    return rankarray;
  }

  updateStudents(mean, stdnts){

    this.setState({students_equals_mean: stdnts[mean]});

    var below = 0;
    var above = 0;

    for (let i = 0; i < stdnts.length; i++) {
      if(i < mean){
        below += stdnts[i];
      }
      if(i > mean){
        above += stdnts[i];
      }
    }

    this.setState({students_below_mean: below});
    this.setState({students_above_mean: above}, this.arrangeData);
  }


  createItems(){
    var table_d = []
    var num_items = this.state.number_of_items
    for (var i = 0; i < num_items; i++) {

      table_d.push( 
          <tr>
            <td >{i+1} </td>
            <td> {this.state.item_foe[i]} </td>
            <td>{this.state.rank[i]}</td>
            <td>{num_items-i} </td>
            <td> {this.state.num_of_studs_rawscore[i]} </td>
            <td>{this.state.product[i]} </td>
          </tr>
      )
    }
    table_d.push(
      <tr>
        <td ></td>
        <td></td>
        <td></td>
        <td>0</td>
        <td> {this.state.num_of_studs_rawscore[num_items]} </td>
        <td>{this.state.product[num_items]} </td>
      </tr>
      )
      table_d.push(
        <tr>
          <td ></td>
          <td></td>
          <td></td>
          <td>Total</td>
          <td></td>
          <td> {this.state.total_rawscore} </td>
        </tr>
        )
    return table_d;
    
  }


  handleFiles(filedata, fileInfo){
    var total_files = this.state.number_of_files+1;
    this.setState({number_of_files: total_files});
    var farray = this.state.filearray;
    farray.push(filedata);
    this.setState({filearray: farray});
  }

  handleMerge(){
    var total_files = this.state.number_of_files;
    var farray = this.state.filearray;

    var nofItems = farray[0].length - 4;
    this.setState({number_of_items: nofItems});
    var nofStudents = 0;
    var total_rscore = 0;

    var foeSum = 0;
    var nswgrsSum = 0;

    var foeArr = [];
    var nswgrsArr = [];
    var prodArr = [];
    
    for (let i = 1; i < (farray[0].length - 2); i++) {
      if(i == 1){
        for (let j = 0; j < total_files; j++) {
          nofStudents += parseInt(farray[j][i][2]);
        }
      }else{
        // foe=4, rawscore=6, nswgrs=7
        for (let j = 0; j < total_files; j++) {
          const element = farray[j][i];
          foeSum += parseInt(element[4]);
          nswgrsSum += parseInt(element[7]);
          
        }
        foeArr.push(foeSum);
        nswgrsArr.push(nswgrsSum);
        prodArr.push(nswgrsSum * parseInt(farray[0][i][6]));
        foeSum=0;
        nswgrsSum=0;
      }
    };
    for (let i = 0; i < total_files; i++) {
      const element = farray[i][farray[0].length-2];
      nswgrsSum += parseInt(element[7]);
    }
    nswgrsArr.push(nswgrsSum);
    prodArr.push(0);
    for (let i = 0; i < total_files; i++) {
      const element = farray[i][farray[0].length-1];
      total_rscore += parseInt(element[8]);
      
    }
    this.setState({
      total_num_of_students: nofStudents,
      item_foe: foeArr,
      num_of_studs_rawscore: nswgrsArr,
      product: prodArr,
      total_rawscore: total_rscore
    });
    this.updateRank(foeArr);
    var meanval = total_rscore/nofStudents;
    this.setState({mean: meanval}, () => {this.updateStudents(nofItems - Math.round(meanval), nswgrsArr)});
  }

  arrangeData(){
    data = [this.state];
    var total = this.state.number_of_items;
    var item_froe1 = this.state.item_foe;
    var foe_rank1 = this.state.rank;
    var ns_rawscore1 = this.state.num_of_studs_rawscore;
    var prod1 = this.state.product;

    for (let i = 0; i < total; i++) {
      data.push(
        {
          item_num: i+1,
          item_froe: item_froe1[i],
          foe_rank: foe_rank1[i],
          rawscore: total-i,
          ns_rawscore: ns_rawscore1[i],
          prod: prod1[i]
        }
      )
    }
    data.push(
      {
        rawscore: 0,
        ns_rawscore: ns_rawscore1[total],
        prod: prod1[total]
      }
    );
    data.push(
      {
        rawscore: "Total",
        prod: this.state.total_rawscore
      }
    );
  }

  render(){
    return(
      <div>
      <div class="feed"> 
        <Link to="/">Back</Link>
        <table class="bordered">
        <tbody>
          <br></br>
        <tr>
          <CSVReader onFileLoaded={(filedata, fileInfo) => this.handleFiles(filedata, fileInfo)} />
        </tr>
        <tr> <td> <b> Files uploaded: {this.state.number_of_files}</b></td></tr>
        <br></br>
        <button onClick={this.handleMerge}> Merge Uploaded Files</button>
        </tbody>
        </table>
        <div>
        {/*item analysis table (excel like)*/}
        <div id="edittables">
          <table>
          <tbody>
            <tr>
            <td> <input type="text" key={10140} id={10140} onChange={this.filenameHandler} placeholder={"Untitled"}></input> </td>
            </tr>
            <tr>
            <td ><b>Number of Items: </b> {this.state.number_of_items}  </td>
              <td ><b>Total number of students: </b> {this.state.total_num_of_students} </td>
              <td> <b>Year level</b> <input type="text" key={10142} id={10142} onChange={this.sectionHandler} placeholder={"Year"}></input> </td>
              <td> <b>Subject </b><input type="text" key={10143} id={10143} onChange={this.subjectHandler} placeholder={"Subject"}></input> </td>
            </tr>
            <tr>
              <td id="stick"><b>Item Number</b></td>
              <td id="stick"><b>Frequency of Error</b></td>
              <td id="stick"><b>Rank</b></td>
              <td id="stick"><b>Raw Score</b></td>
              <td id="stick"><b>Number of Students who got the Raw Score</b></td>
              <td id="stick"><b>Product (Raw Score x Number of Students who got the Raw Score)</b></td>
              {/* Download button */}
              <td id="stick"> <CSVLink data={data} headers={headers} filename={this.state.filename +".csv"}>
              <b>Save File</b> </CSVLink> </td>
            </tr>
              {this.createItems()}
            <tr>
              <td ><b>Mean</b></td>
              <td>{this.state.mean}</td>
            </tr>
            <tr>
              <td ><b>Students above mean</b></td>
              <td>{this.state.students_above_mean}</td>
            </tr>
            <tr>
              <td ><b>Students equals mean (rounded off)</b></td>
              <td>{this.state.students_equals_mean}</td>
            </tr>
            <tr>
              <td ><b>Students below mean</b></td>
              <td>{this.state.students_below_mean}</td>
            </tr>
          </tbody>
          </table>
        </div>
        </div>
      </div>
      </div>
    )
  }
}

export default CombineItemAnalysis;