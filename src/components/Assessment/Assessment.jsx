import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {useLocation, useParams, useNavigate} from "react-router-dom";
import AssessmentChoice from "./AssessmentChoice.jsx";
import Swal from "sweetalert2";
import {useMutation, useQuery} from "@tanstack/react-query";
import {getAssessment, checkAssessment} from "../Api/assessmentApi.js"
import Loading from "../Base/Loading.jsx";
import {getMinuteFromSeconds} from "../utils/index.js";

const Assessment = () => {
    let {topicId} = useParams();
    let state = useLocation().state

    const [page, setPage] = useState(1)
    const [time, setTime] = useState(900)
    const [isDone, setIsDone] = useState(false)
    const {
        data,
        isLoading,
        isError,
        error
    } = useQuery(['assessment', topicId, page], () => getAssessment(topicId, page))
    const ansRef = useRef(null)

    const [answers, setAnswers] = useState([])
    const navigate = useNavigate();

    const {mutate, isSuccess} = useMutation(checkAssessment, {
        onSuccess: (scoreData) => {

            navigate('/summary', {
                state: scoreData,
            })
        }
    })


    //
    useEffect(() => {
        if (!state) {
            return navigate(`/assessment/${topicId}`)
        }


        ansRef.current = null
        return () => {
            window.history.replaceState({}, document.title);

        }
    }, [page,])

    useEffect(() => {
        if (answers.length === data?.count) {
            mutate({topicId, answers})
        }

    }, [answers])

    useEffect(() => {
        const initialTime = Date.now();
        if (!isDone) {
            const intervalId = setInterval(() => {
                const currentTime = Date.now();
                const elapsedTime = Math.floor((currentTime - initialTime) / 1000);
                const remainingTime = time - elapsedTime;
                if (remainingTime <= 0) {
                    setTime(0);
                    clearInterval(intervalId);
                } else {
                    setTime(remainingTime);
                }
            }, 1000);
            return () => {
                clearInterval(intervalId);
            };
        }
    }, [isDone]);


    if (isLoading) return <Loading/>
    if (isError) return <p className={'text-4xl text-white text-center'}> no data found</p>

    const _validate = () => {
        if (!ansRef.current) {
            Swal.fire({
                icon: 'warning',
                title: 'โปรดตอบคำถาม',
                text: 'เลือกคำตอบ!',

            })
            return false
        }
        return true

    }

    const _onNext = async () => {
        //sweet alert doing
        if (_validate()) {
            setAnswers((prevState) => [...prevState, ansRef.current])
            setPage(prevCount => prevCount + 1)
        }
    }

    const _onChange = (e) => {
        ansRef.current = e.target.value
    }
    const _onSubmit = async () => {
        if (_validate()) {
            setAnswers((prevState) => [...prevState, ansRef.current])
        }


    }
    return (
        <div className={'container  mx-auto min-h-screen '}>
            <div className={'grid place-items-center  mx-2'}>
                <div className={'card   w-full lg:w-2/4 lg:mx-0  mt-28 mb-2 font-sarabun'}>
                    <div className={'my-2'}>
                        <div className={'flex justify-between'}>
                            <div>
                                <h1 className={'text-2xl'}>
                                    {/*{topicName}*/}
                                </h1>
                            </div>
                            <hr className="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700"/>
                            <div>
                                <h1 className={'font-bold text-2xl'}>
                                    {getMinuteFromSeconds(time)}
                                </h1>

                            </div>

                        </div>
                        <h1 className={'text-2xl font-extrabold '}>Question {page}</h1>
                        <h1 className={'text-left'}>{data?.result[0]?.question_name}</h1>
                    </div>
                    <div className={'mb-2'}>
                        {data?.result[0]?.choices?.map(({choiceId, choice_desc}) => (
                                <AssessmentChoice key={choiceId} ref={ansRef}
                                                  onChange={_onChange}
                                                  choiceId={choiceId}
                                                  choice_desc={choice_desc}/>
                            )
                        )
                        }
                    </div>
                    <div>
                        {
                            data?.hasNext ?
                                <button
                                    onClick={_onNext}
                                    className="bg-yellow-500  hover:bg-yellow-700 text-white text-md font-bold py-3 px-9 rounded-full ">
                                    ข้อถัดไป
                                </button> :
                                <button
                                    onClick={_onSubmit}
                                    className="bg-yellow-500  hover:bg-yellow-700 text-white text-md font-bold py-3 px-9 rounded-full">
                                    ส่งคำตอบ
                                </button>
                        }

                    </div>
                </div>

            </div>

        </div>
    )
}
export default Assessment