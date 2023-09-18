import React, { useEffect, useState } from 'react'
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Link } from 'react-router-dom';
import moment from "moment"
import {TbActivityHeartbeat} from "react-icons/tb"
import {MdTaskAlt} from "react-icons/md"
import {BsListTask} from "react-icons/bs"
import ResponsivePagination from 'react-responsive-pagination'
import 'react-responsive-pagination/themes/classic.css'
import { useSelector } from 'react-redux';
import {FcExpired} from "react-icons/fc";

const QuestionList = ({questionList}) => {

  const pageItemCount=10;
  const allUsers=useSelector((state)=>state.usersReducer);
  const[currentPage, setCurrentPage]=useState(1);
  const[currentTask, setCurrentTask]=useState([]);
  // const totalPages=10;
  const totalPages=Math.ceil(questionList?.length/pageItemCount);

  useEffect(()=>{
    setCurrentTask(questionList?.slice
      (0, pageItemCount));
  }, []);

  useEffect(()=>{
    const changePage=(index)=>{
      //setCurrentPage(index);
      const startItem=((index-1)*pageItemCount)+1;
      setCurrentTask(questionList?.slice(startItem-1, (pageItemCount*index)));
    }

    changePage(currentPage);

  }, [currentPage]);

  return (
    <div>
      <Table className="display-question-container">
        <Thead>
          <Tr>
            <Th>
              S. No.
            </Th>
            <Th>
              Title
            </Th>
            <Th>
              Description
            </Th>
            <Th>
              Assigned To
            </Th>
            <Th>
              Deadline
            </Th>
            <Th>
              Tags
            </Th>
          </Tr>
        </Thead>
      
        <Tbody>
          {
            currentTask?.map((question, index)=>(
                <Tr key={index} >
                  <Td>
                    <div>
                      {index+1+((currentPage-1)*pageItemCount)}
                    </div>
                  </Td>
                  <Td>
                    {
                      (Date.parse(question?.deadline)<Date.now() && question?.status!=='Done')?(
                        <div className='question-title-link'>
                          <FcExpired/>
                          {question?.questionTitle}
                        </div>
                      ):(
                        <Link to={`/Questions/${question._id}`} className='question-title-link'>
                          {
                            question?.status==='Assigned'?(
                              <BsListTask/>
                            ):(
                              question?.status==='Done'?(
                                <MdTaskAlt/>
                              ):(
                                <TbActivityHeartbeat/>
                              )
                            )
                          }
                          {question?.questionTitle}
                        </Link>
                      )
                    }
                    
                  </Td>
                  <Td>
                    <div>
                      {question?.questionBody}
                    </div>
                  </Td>
                  <Td>
                    <div>
                      {question?.assignedTo}
                    </div>
                  </Td>
                  <Td>
                    <div>
                      {
                        Date.parse(question?.deadline)<Date.now()?(
                          <p>Expired</p>
                        ):(
                          moment(question?.deadline).fromNow()
                        )
                      }
                    </div>
                  </Td>
                  <Td>
                    <div className='display-tags display-tags-time'>
                    {
                        question.questionTags.map((tag)=>(
                            <p key={tag}>{tag}</p>
                        ))
                    }
                    </div>
                    <p className='display-time'>
                      Created {moment(question.askedOn).fromNow()} by {question.userPosted}
                  </p>
                  </Td>
                </Tr>
              ))
          }
        </Tbody>
      </Table>

      <ResponsivePagination current= {currentPage} total={totalPages} onPageChange={setCurrentPage} />
      {/* <Pagination dir='ltr' page={currentPage} count={pageCount} onChange={handleChange} variant="outlined" shape="rounded"/> */}
    </div>
  )
}

export default QuestionList
