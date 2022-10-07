import './App.css'
import Header from "./components/Header.jsx";
import TopicList from "./components/Topic/TopicList.jsx";

import {createBrowserRouter, Outlet, RouterProvider,} from "react-router-dom";
import TopicCover from "./components/Topic/TopicCover.jsx";
import Assessment from "./components/Assessment/Assessment.jsx";
import SummaryScore from "./components/Page/SummaryScore.jsx";

const Layout = () => {
    return (
        <>
            <Header/>
            <Outlet/>

        </>
    );
};


function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout/>,
            children: [
                {
                    path: "/",
                    element: <TopicList/>,
                },
            ],
        },
        {
            path: "/assessment/:topicId",
            element: <TopicCover/>,

        },
        {
            path: "/assessment/:topicId/session",
            element: <Assessment/>,

        },
        {
            path: "/summary",
            element: <SummaryScore/>,

        },

    ]);


    return (
        <div>
            <RouterProvider router={router}/>

        </div>

    )
}

export default App
