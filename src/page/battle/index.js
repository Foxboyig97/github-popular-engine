import { faAirFreshener, faTrophy, faUserFriends, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row, Input, Space, Popconfirm, Button, Image } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { asyncGetAuthor } from "../../features/popular/battleSlice";
import moment from "moment";
import { objectToQueryString } from "../../tools/queryString";
import { useNavigate } from "react-router";

const { Search } = Input
const Battle = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { AuthorInfo } = useSelector(state => state.author)
    const [PlayerA, setPlayerA] = useState({});
    const [PlayerB, setPlayerB] = useState({});
    const [PlayType, setPlayType] = useState(null);
    const presetRuleBlocks = [
        {
            text: "Enter two Github users",
            icon: faUserFriends,
            color: "rgb(255, 191, 116)",
        },
        {
            text: "Battle",
            icon: faAirFreshener,
            color: "rgb(114, 114, 114)",
        },
        {
            text: "See the winner",
            icon: faTrophy,
            color: "rgb(255, 215, 0)",
        },
    ];
    useEffect(() => {
        if (Object.keys(AuthorInfo).length != 0) {
            if (PlayType == "A") {
                setPlayerA(AuthorInfo)
            }
            if (PlayType == "B") {
                setPlayerB(AuthorInfo)
            }
        }
        return () => {

        }
    }, [AuthorInfo])
    const handleBattle = () => {
        let params = {
            playerone: PlayerA?.login,
            playertwo: PlayerB?.login
        }
        navigate(`/result?${objectToQueryString(params)}`);
    }
    const onSearch = (e, type) => {
        setPlayType(type)
        dispatch(asyncGetAuthor(e))
    }
    return <div>
        <h1 style={{ textAlign: 'center' }}>Instructions</h1>
        <div style={{ display: 'flex', alignSelf: 'center', justifyContent: 'center' }}>
            <Row>
                {presetRuleBlocks?.map((ruleBlock) => {
                    return (
                        <Col
                            xs={{ span: 24 }}
                            sm={{ span: 24 }}
                            md={{ span: 12 }}
                            lg={{ span: 8 }}
                            key={ruleBlock?.text}
                        >
                            <div style={{ margin: '0px 10px' }}>
                                <h4 style={{ textAlign: 'center' }}>{ruleBlock?.text}</h4>
                                <div
                                    style={{
                                        backgroundColor: "rgba(0, 0, 0, 0.10)",
                                        padding: "3.5rem 5rem",
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={ruleBlock?.icon}
                                        size="6x"
                                        color={ruleBlock?.color}
                                    />
                                </div>
                            </div>
                        </Col>
                    );
                })}
            </Row>
        </div>
        <h1 style={{ textAlign: 'center' }}>Players</h1>
        <Row wrap>
            <Col
                style={{ margin: '10px 10px 0px 0px', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 11 }}
                lg={{ span: 11 }}>
                <Space style={{ display: 'flex', flexDirection: 'column' }}>
                    <h3>Player one</h3>
                    <Search
                        placeholder="input search text"
                        enterButton="Search"
                        size="large"
                        onSearch={(e) => { onSearch(e, 'A') }}
                    />
                    {
                        Object.keys(PlayerA).length == 0 ? null : <div style={{ display: 'flex', flexDirection: 'row', }}>
                            <Image style={{ width: '70px' }} src={PlayerA.avatar_url} />

                            <div style={{ display: 'flex', flexDirection: 'column', }}>
                                <div>&emsp; name: {PlayerA.login}&emsp;&emsp;</div>
                                <div>&emsp; register: {moment(PlayerA.created_at).format('YYYY-MM-DD hh:mm:ss')}&emsp;&emsp;</div>
                                <div>&emsp; updated: {moment(PlayerA.updated_at).format('YYYY-MM-DD hh:mm:ss')}&emsp;&emsp;</div>
                            </div>

                            <div style={{ flex: 1, justifyContent: "center", display: 'flex', alignItems: 'center' }}>
                                <Button onClick={() => setPlayerA({})} type='text'>
                                    <FontAwesomeIcon
                                        icon={faWindowClose}
                                        size='2x'
                                    />
                                </Button>
                            </div>
                        </div>
                    }
                </Space>

            </Col>
            <Col
                style={{ margin: '10px 0px 0px 0px', justifyContent: 'center', display: 'flex' }}
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 12 }}
                lg={{ span: 12 }}>
                <Space style={{ display: 'flex', flexDirection: 'column' }}>
                    <h3>Player Two</h3>
                    <Search
                        placeholder="input search text"
                        enterButton="Search"
                        size="large"
                        onSearch={(e) => { onSearch(e, 'B') }}
                    />
                    {
                        Object.keys(PlayerB).length == 0 ? null :
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <Image style={{ width: '70px' }} src={PlayerB.avatar_url} />
                                <div style={{ display: 'flex', flexDirection: 'column', }}>
                                    <div>&emsp; name: {PlayerB.login}&emsp;&emsp;</div>
                                    <div>&emsp; register: {moment(PlayerB.created_at).format('YYYY-MM-DD hh:mm:ss')}&emsp;&emsp;</div>
                                    <div>&emsp; updated: {moment(PlayerB.updated_at).format('YYYY-MM-DD hh:mm:ss')}&emsp;&emsp;</div>
                                </div>
                                <div style={{ flex: 1, justifyContent: "center", display: 'flex', alignItems: 'center' }}>
                                    <Button onClick={() => setPlayerB({})} type='text'>
                                        <FontAwesomeIcon
                                            icon={faWindowClose}
                                            size='2x'
                                        />
                                    </Button>
                                </div>
                            </div>
                    }
                </Space>
            </Col>
        </Row>
        <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "150px" }}>
            <Button disabled={Object.keys(PlayerA).length == 0 || Object.keys(PlayerB).length == 0} onClick={handleBattle} type='primary' size='large'>Battle</Button>
        </div>
    </div>
}
export default Battle

