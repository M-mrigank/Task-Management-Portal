import { useState } from "react"
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"
import "./chartDiagram.css"
import LeftSidebar from "../LeftSidebar/LeftSidebar"
import { useSelector } from "react-redux"

Chart.register(...registerables)

export default function InstructorChart({ questionList }) {
    
    console.log("hehehehe",questionList);
    const user=useSelector((state)=>state.currentUserReducer);
    console.log("user", user);
    if(user?.result?.accountType==='Admin'){
        questionList=questionList?.filter((data)=>data?.assinee===user?.result?.email);
    }
    else if(user?.result?.accountType==='User'){
        questionList=questionList?.filter((data)=>data?.assignedTo===user?.result?.email);
    }

  const labelName=[];
  labelName.push('Assigned');
  labelName.push('InProgress');
  labelName.push('Done');
  console.log("label name", labelName);

  const assignStatus=questionList?.filter((question)=>question.status==='Assigned');
  const inProgressStatus=questionList?.filter((question)=>question.status==='InProgress');
  const doneStatus=questionList?.filter((question)=>question.status==='Done');
  console.log("ass", assignStatus);
  console.log("prg", inProgressStatus);
  console.log("dn", doneStatus);

  const totlength=[];
  totlength.push(assignStatus?.length);
  totlength.push(inProgressStatus?.length);
  totlength.push(doneStatus?.length);

  console.log("leg", totlength);

  const generateRandomColors = (numColors) => {
    const colors = []
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`
      colors.push(color)
    }
    return colors
  }

  const chartDataStudents = {
    labels: labelName?.map((data) => data),
    datasets: [
      {
        data: totlength?.map((len) =>len),
        backgroundColor: generateRandomColors(questionList?.length),
      },
    ],
  }

  const options = {
    maintainAspectRatio: false,
  }

  return (
    <div className='home-container-1'>
        <LeftSidebar/>
        <div className='home-container-2'>
            <p className="chart-sub-heading">Track Your Activity</p>
            <div className="chart-container">
                <Pie
                    data={chartDataStudents}
                    options={options}
                />
            </div>
        </div>
    </div>
  )
}