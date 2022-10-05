import './App.css'
import DataTable from 'react-data-table-component';
import DataTableBase from "./components/Datatable";
import {useEffect, useState} from "react";
import axios from "axios";


function App() {
    const [data, setData] = useState([])


    const _fetchData = async () => {
        try {
            const topicData = await axios.get('http://localhost:3000/topic')

            setData(topicData.data)

        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        _fetchData()
    }, [])


    return (
        <div>
            <div className={'text-center text-8xl mt-24 font-extrabold'}>
                <h1 className={'text-white'}>REACT </h1>
                <h1 className={'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'}>QUIZ</h1>
            </div>
            <div className={'mt-16'}>
                <h1 className={'text-white text-4xl text-center font-extrabold'}>List of quiz</h1>
            </div>
            <div className={'grid place-content-center   '}>
                {data.map(({id, topic_name}) => {
                    return (
                        <div key={id}
                             className={'bg-gradient-to-l from-purple-400 to-pink-600 md:px-20 px-6 py-2 md:py-5 mt-5 rounded-full  hover:bg-gradient-to-r hover:cursor-pointer hover:scale-110'}>
                            <p className={' text-2xl text-white '}>{topic_name}</p>
                        </div>
                    )
                })}

                <div></div>
            </div>
        </div>

    )
}

export default App
