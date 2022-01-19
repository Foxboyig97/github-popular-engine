import { Button, Tabs } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { asyncGetPopularList, clearPopularList } from '../../features/popular/popularSlice';
import { objectToQueryString } from '../../tools/queryString';
import ListItem from './component';

const { TabPane } = Tabs

export const Home = () => {
    const dispatch = useDispatch()
    const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python",];
    const [select, setselect] = useState('All');
    const { loading } = useSelector(state => state.app)
    const [startPage, setstartPage] = useState(1);

    useEffect(() => {
        loadMore()
        return () => {

        }
    }, [startPage, select])

    const loadMore = () => {
        const params = {
            repositoties: [],
            per_page: 10,
            page: startPage,
            language: select,
            additional: false,
            q:
                select && select == "All"
                    ? "stars:3E1"
                    : `stars:3E1+language:${select?.toLowerCase()}`,
            sort: "stars",
            order: "desc",
            type: "Repositories",
        }
        dispatch(asyncGetPopularList(objectToQueryString(params)))
    }

    const handleLoadingMore = () => {
        setstartPage(startPage + 1)
    }

    const loadMoreCom =
        !loading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={handleLoadingMore}>加载更多</Button>
            </div>
        ) : null;

    return (
        <div >

            <Tabs onChange={(e) => {
                dispatch(clearPopularList())
                setselect(e)
                setstartPage(1)
            }} defaultActiveKey="1" centered>
                {
                    languages.map(item => {
                        return (

                            <TabPane style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} tab={item} key={item}>
                                <ListItem loadMore={loadMoreCom} />
                            </TabPane>
                        )
                    })
                }

            </Tabs>
        </div>
    )
}
export default Home