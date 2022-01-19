import { Result } from "antd";
import { useEffect } from "react";
import { useNavigate, useRoutes } from "react-router";
import Battle from "../page/battle";
import Home from "../page/home";
import BattleResult from "../page/result";

const Pages = () => {
    const navigate = useNavigate()
    useEffect(() => {
        window.navigate = navigate
        return () => {

        }
    }, [])
    const element = useRoutes([
        {
            path: '/',
            index: true,
            element: <Home />
        },
        {
            path: '/result',
            element: <BattleResult />
        },
        {
            path: '/battle',
            element: <Battle />
        },
        {
            path: '*',
            element: <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
            </main>
        },
    ]);
    return element;
}
export default Pages