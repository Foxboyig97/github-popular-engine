import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "../../component/Card";
import PlayerDescription from "../../component/Card/PlayerDescription";
import { queryRepositoryAuthorDetails as queryPlayersDetailsByPlayerName } from "../../api/modules/api";
import { queryStringToObject } from "../../tools/queryString";
import { useNavigate } from 'react-router'

const WorkProgressStatus = {
    Pendding: "Pendding",

    Check: "Check",
    CheckFailure: "CheckFailure",
    CheckPass: "CheckPass",

    Fetch: "Fetch",
    FetchFailure: "FetchFailure",
    FetchPass: "CheckPass",

    Battle: "Battle",
    BattleFailure: "BattleFailure",
    BattlePass: "BattlePass",
};

const noop = (playerDetails) => playerDetails?.status === "fulfilled";

export default function BattleResult() {
    const location = useLocation();
    const navigate = useNavigate()
    // state
    const [[data], setPlayers] = useState([[], []]);
    const [currentworkStatus, setCurrentWorkStatus] = useState({
        status: WorkProgressStatus.Pendding,
        reason: {},
    });

    // NOTE: 构建每个玩家的异步任务
    const generatorPlayerTasksPromise = (players = []) => {
        return players.map((playerName) =>
            queryPlayersDetailsByPlayerName(playerName)
        );
    };

    /**
     * @title 校验所有参赛者的详情信息
     *
     * @param {Array<PlayerDetails>} playersDetails 所有玩家信息
     * @param { Function = (playerDetails) => Boolean } checkRule 校验函数 返回Boolean
     * @returns {
     *    passedPlayers: Array<PlayerDetails>,
     *    failedPlayers: Array<PlayerDetails>,
     *    allPassed: Boolean,
     *    canBattle: Boolean,
     *  }
     */
    const checkPlayersDetails = (playersDetails = [], checkRule = noop) => {
        let [passedPlayers, failedPlayers] = [[], []];

        const hasAllPlayersPassed = playersDetails?.every((playerDetail) => {
            const rule = checkRule(playerDetail);
            if (rule) {
                passedPlayers = [...passedPlayers, playerDetail?.value?.data];
            } else {
                failedPlayers = [...failedPlayers, playerDetail?.reason];
            }

            return rule;
        });

        return {
            passedPlayers,
            failedPlayers,
            allPassed: hasAllPlayersPassed,
            canBattle: passedPlayers.length >= 2,
            allPlayersNumber: playersDetails.length,
            passedPlayersNumber: playersDetails.length,
            failedPlayersNumber: failedPlayers.length,
        };
    };

    // 并发获取玩家信息
    const concurrencyGetPlayersDetails = useCallback((players = []) => {
        const tasksPromise = generatorPlayerTasksPromise(players);
        setCurrentWorkStatus({ status: WorkProgressStatus.Fetch, reason: {} });

        Promise.allSettled(tasksPromise).then((allPlayersDetails) => {
            const checkResult = checkPlayersDetails(allPlayersDetails);
            setPlayers([checkResult?.passedPlayers, checkResult?.failedPlayers]);

            setCurrentWorkStatus({
                status: checkResult?.canBattle
                    ? WorkProgressStatus.Battle
                    : WorkProgressStatus.BattleFailure,
                reason: checkResult?.canBattle
                    ? {}
                    : { message: "有参赛玩家的信息错误" },
            });
        });
        // TODO: 补充报错
    }, []);

    // 校验参赛玩家必须的信息
    const checkPlayers = (players = {}) => {
        setCurrentWorkStatus({ status: WorkProgressStatus.Check, reason: {} });

        const effectivePlayersResult = Object.keys(players).reduce(
            (effectivePlayers, currentPlayer) => {
                // XXX: players[currentPlayer] !== "undefined" 是否需要放在更前期处理
                if (players[currentPlayer] && players[currentPlayer] !== "undefined") {
                    effectivePlayers = [...effectivePlayers, players[currentPlayer]];
                }
                return effectivePlayers;
            },
            []
        );

        return {
            effectivePlayers: effectivePlayersResult,
            canBattle: effectivePlayersResult?.length >= 2,
            playersNumber: effectivePlayersResult?.length,
        };
    };

    useEffect(() => {
        // XXX: 使用 URLSearchParams 替代 queryString ?
        // new URLSearchParams(location?.search).entries().next().value;

        if (!location.search) {
            setCurrentWorkStatus({
                status: WorkProgressStatus.CheckFailure,
                reason: { message: "参赛玩家不足或玩家的用户名有误" },
            });
            return;
        }
        const players = queryStringToObject(location.search);
        const { canBattle, effectivePlayers } = checkPlayers(players);
        if (!canBattle) {
            setCurrentWorkStatus({
                status: WorkProgressStatus.CheckFailure,
                reason: { message: "参赛玩家不足或玩家的用户名有误" },
            });
            return;
        }
        concurrencyGetPlayersDetails(effectivePlayers);
    }, [concurrencyGetPlayersDetails, location]);
    const goBack = () => navigate(-1)
    return (
        <Container>
            <span onClick={goBack}>返回</span>
            <Row
                style={{
                    margin: "auto",
                    justifyContent: "center",
                    wordBreak: "break-word",
                }}
            >
                <code className="text-center mb-4">
                    {JSON.stringify(currentworkStatus)}
                </code>
                {data?.map((player, index) => (
                    <Col lg={3} md={4} sm={6} key={player?.login || index}>
                        <Card
                            item={player}
                            title={"Player" + (index + 1)}
                            renderDescription={<PlayerDescription item={player} />}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
