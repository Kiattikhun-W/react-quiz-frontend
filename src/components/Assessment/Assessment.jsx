import {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import AssessmentChoice from "./AssessmentChoice.jsx";
import Swal from "sweetalert2";
import {useMutation, useQuery} from "@tanstack/react-query";
import {checkAssessment, getAssessment} from "../Api/assessmentApi.js"
import Loading from "../Base/Loading.jsx";
import {getMinuteFromSeconds} from "../utils/index.js";
import ProgressBar from "@ramonak/react-progress-bar";
import HeaderBar from "../Api/components/HeaderBar.jsx";

const Assessment = () => {
    let {topicId} = useParams();
    let state = useLocation().state
    let progressBarRef = useRef(1)
    const [page, setPage] = useState(1)
    const [time, setTime] = useState(5)
    const [isDone, setIsDone] = useState(false)
    const {
        data,
        isLoading,
        isError,
        error
    } = useQuery(['assessment', topicId, page], () => getAssessment(topicId, page))

    const ansRef = useRef(null)
    const topicNameRef = useRef(state?.topicName)

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
        let entryMode = state?.entryMode ?? false
        if (!entryMode) {
            return navigate(`/assessment/${topicId}`)
        }


        ansRef.current = null
        return () => {
            window.history.replaceState({}, document.title)
        }
    }, [page,])

    useEffect(() => {
        if (time === 0) {
            mutate({topicId, answers})
        }

        if (answers.length === data?.count) {
            mutate({topicId, answers})
        }

    }, [answers, time])

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


    // if (isLoading) return <Loading/>
    if (isError) return <p className={'text-4xl text-white text-center'}> no data found</p>

    const _validate = () => {
        if (!ansRef.current) {
            Swal.fire({
                icon: 'warning',
                title: '????????????????????????????????????',
                text: '??????????????????????????????!',

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
            progressBarRef.current++
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
                    <HeaderBar
                        topicName={topicNameRef.current}
                        dataCount={data?.count}
                        time={time}
                        progressBarNum={progressBarRef.current}
                        page={page}
                        questionName={data?.result[0]?.question_name}
                    />

                    <div className={'mb-2'}>
                        {
                            data?.result[0]?.choices?.map(({choiceId, choice_desc}) => (
                                    <AssessmentChoice key={choiceId} ref={ansRef}
                                                      onChange={_onChange}
                                                      choiceId={choiceId}
                                                      choice_desc={choice_desc}/>
                                )
                            )}
                    </div>
                    <div>
                        {
                            data?.hasNext ?
                                <button
                                    onClick={_onNext}
                                    className="bg-yellow-500  hover:bg-yellow-700 text-white text-md font-bold py-3 px-9 rounded-full ">
                                    ????????????????????????
                                </button> :
                                <button
                                    onClick={_onSubmit}
                                    className="bg-yellow-500  hover:bg-yellow-700 text-white text-md font-bold py-3 px-9 rounded-full">
                                    ????????????????????????
                                </button>
                        }

                    </div>
                </div>

            </div>

        </div>
    )
}
export default Assessment