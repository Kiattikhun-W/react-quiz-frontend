import {Link, useParams, useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";

const SummaryScore = () => {
    let {state} = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!state) {
            return navigate(`/`)
        }


        return () => {
            window.history.replaceState({}, document.title);
        }
    }, [])
    return (
        <div className={' grid place-content-center '}>
            <div className={'card mx-2 lg:mx-0 rounded-3xl mt-24 mb-2 p-[64px]'}>
                <div>
                    <h1 className={'text-4xl text-center font-extrabold '}>
                        คะแนนของคุณคือ !?!
                    </h1>
                    <h1 className={'text-4xl text-center text-red-300 font-extrabold'}>
                        {state?.score}
                    </h1>
                </div>

            </div>
        </div>
    )
}
export default SummaryScore;