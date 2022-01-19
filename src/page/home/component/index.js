import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Row, List, Card, Button, Space, Image } from 'antd'
import { useSelector } from 'react-redux'
import { getFailImage } from '../../../tools'
import {
    faUser,
    faStar,
    faCodeBranch,
    faCode,
} from "@fortawesome/free-solid-svg-icons";
import './index.css'

const ListItem = (props) => {
    const { loadMore, } = props
    const { popularList } = useSelector(state => state.popular)
    return (
        <Row>
            <List
                grid={{
                    column: 4,
                    xs: 2,
                    sm: 3,
                    md: 4,
                    lg: 5,
                    xl: 5,
                    xxl: 5,
                }}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={popularList}
                renderItem={(item, index) => (
                    <Space key={index} size='small'>
                        <div style={{ flexDirection: 'column', alignItems: "center", justifyContent: 'center', display: 'flex' }}>
                            <div style={{ height: '40px', display: 'flex', alignItems: 'center', fontSize: 16, fontWeight: "300" }}>#{index + 1}</div>
                            <div style={{ width: '150px', height: '150px' }}>
                                <Card.Meta
                                    avatar={<Image
                                        preview={false}
                                        fallback={getFailImage()}
                                        src={item?.owner?.avatar_url}
                                        style={{ width: '150px', }}
                                        alt={`Avatar for ${item?.owner?.login}`} />} />
                            </div>
                            <div style={{ width: "100%" }}>
                                <div className='card_title'>{item?.name?.length > 10 ? `${item?.name?.substr(0, 10)}...` : item?.name}</div>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '30px' }}>
                                        <FontAwesomeIcon icon={faStar} color="rgb(255, 215, 0)" />
                                        <FontAwesomeIcon icon={faCodeBranch} color="rgb(129, 194, 245)" />
                                        <FontAwesomeIcon icon={faCode} color="rgb(241, 138, 147)" />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <div className='card_desc'>
                                            <span>{item?.stargazers_count} stars</span>
                                        </div>
                                        <div className='card_desc'>
                                            <span>{item?.forks_count} forks</span>
                                        </div>
                                        <div className='card_desc'>
                                            <span>{item?.open_issues_count} open issues</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Space>

                )}

            />
        </Row>
    )
}
export default ListItem