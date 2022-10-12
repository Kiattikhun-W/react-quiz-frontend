import loading from "../../assets/loader.json";
import Lottie from "lottie-react";

const Loading = ({width = 200}) => {
    return <Lottie className={`h-[${width}px]`} animationData={loading} loop={true}/>
}
export default Loading