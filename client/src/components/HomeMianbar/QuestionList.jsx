import React from 'react'
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Link } from 'react-router-dom';
import moment from "moment"

const QuestionList = ({questionList}) => {
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
            questionList.map((question, index)=>(
                <Tr key={index} >
                  <Td>
                    <div>
                      {index+1}
                    </div>
                  </Td>
                  <Td>
                    <Link to={`/Questions/${question._id}`} className='question-title-link'>
                          {question?.questionTitle}
                    </Link>
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
                      {moment(question?.deadline).fromNow()}
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
    </div>
  )
}

export default QuestionList
