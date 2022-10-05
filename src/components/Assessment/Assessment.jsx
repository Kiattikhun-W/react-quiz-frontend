import axios from "axios";
import {useEffect, useState} from "react";
import {useLocation, useParams, useNavigate} from "react-router-dom";


const Assessment = () => {
    let {topicId} = useParams();
    let state = useLocation().state
    const [data, setData] = useState([])
    const [count, setCount] = useState(0)
    const navigate = useNavigate();
    console.log(state)
    const _fetchData = async () => {
        try {
            const topicData = await axios.get(`http://localhost:3000/assessment/${topicId}/session`)
            setData(topicData.data)
            console.log(topicData.data)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        if (!state) {
            navigate(`/assessment/${topicId}`)
        }

        _fetchData()

        return () => {
            window.history.replaceState({}, document.title)

        }
    }, [])

    return (
        <div className={'container  mx-auto min-h-screen '}>
            <div className={'grid place-items-center  mx-2'}>
                <div className={'card  w-full lg:w-2/4 lg:mx-0  mt-28 mb-2 '}>
                    <div className={'my-2'}>
                        <h1 className={'text-2xl font-extrabold '}>Question {count}</h1>
                        <h1 className={'text-left'}>{data[0]?.question_name}</h1>
                    </div>
                    <div className={'mb-2'}>
                        {data[0]?.choices.map(({id, choice_desc}) =>
                            <div
                                key={id}
                                onClick={() => setCount((prevState) => prevState += 1)}
                                className={'bg-slate-300  rounded-2xl px-2 py-3 hover:bg-slate-600 hover:cursor-pointer mb-2'}>
                                <p className={'p-3'}>
                                    {choice_desc}

                                </p>
                            </div>)}

                    </div>

                </div>
            </div>

        </div>
    )
}
export default Assessment