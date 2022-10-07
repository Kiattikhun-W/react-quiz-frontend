import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {useLocation, useParams, useNavigate} from "react-router-dom";
import AssessmentChoice from "./AssessmentChoice.jsx";
import Swal from "sweetalert2";

const Assessment = () => {
    let {topicId} = useParams();
    let state = useLocation().state

    const ansRef = useRef(null)
    const firstFetch = useRef(true)

    const [page, setPage] = useState(1)
    const [answers, setAnswers] = useState([])
    const [data, setData] = useState([])
    const [no, setNo] = useState(1)
    const navigate = useNavigate();

    const _fetchData = async () => {
        try {
            const asessmentData = await axios.get(`http://localhost:3000/assessment/${topicId}/session`, {
                params: {
                    page

                }
            })

            //finish
            if (asessmentData.data.length === 0) {
                return navigate(`/assessment/${topicId}`)
            }
            setData(asessmentData.data)
        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        let getData = true

        if (!state) {
            return navigate(`/assessment/${topicId}`)
        }
        _fetchData();

        ansRef.current = null


        return () => {
            window.history.replaceState({}, document.title);
            getData = false;
        }
    }, [page])


    const _onNext = async () => {
        //sweet alert doing
        if (!ansRef.current) {
            return Swal.fire({
                icon: 'warning',
                title: 'โปรดตอบคำถาม',
                text: 'เลือกคำตอบ!',

            })
        }
        setAnswers((prevState) => [...prevState, ansRef.current])


        setPage(prevCount => prevCount + 1)
        if (ansRef.current) {
            // stack.push(ansRef.current)
        }


    }

    const _onChange = (e) => {
        ansRef.current = e.target.value
    }

    return (
        <div className={'container  mx-auto min-h-screen '}>
            <div className={'grid place-items-center  mx-2'}>
                <div className={'card   w-full lg:w-2/4 lg:mx-0  mt-28 mb-2 '}>
                    <div className={'my-2'}>
                        <h1 className={'text-2xl font-extrabold '}>Question {no}</h1>
                        <h1 className={'text-left'}>{data[0]?.question_name}</h1>
                    </div>
                    <div className={'mb-2'}>
                        {data[0]?.choices?.map(({choiceId, choice_desc}) => (
                                <AssessmentChoice key={choiceId} ref={ansRef}
                                                  onChange={_onChange}
                                                  choiceId={choiceId}
                                                  choice_desc={choice_desc}/>
                            )
                        )
                        }
                    </div>
                    <div>
                        <button
                            onClick={_onNext}
                            className="bg-yellow-500  hover:bg-yellow-700 text-white text-md font-bold py-3 px-9 rounded-full">
                            ข้อถัดไป
                        </button>
                    </div>
                </div>

            </div>

        </div>
    )
}
export default Assessment