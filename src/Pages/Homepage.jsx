import millify from 'millify';
import { Typography, Row, Col, Statistic, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/CryptoApi';
import {Cryptocurrencies, News} from '../Pages'

const { Title } = Typography;

const Homepage = () => {
	const { data, isFetching } = useGetCryptosQuery(10);
	const globalData = data?.data?.stats;

	if (isFetching)
		return (
			<div className='flex justify-center items-center h-screen'>
				<Spin tip='Loading' size='large' />
			</div>
		);

	console.log(data);
	return (
		<div className='ml-5'>
			<Title level={2}>Global Crypto Stat</Title>
			<Row>
				<Col span={12}>
					<Statistic title='Total Cryptocurrencies' value={globalData.total} />
				</Col>
				<Col span={12}>
					<Statistic title='Total Exchanges' value={millify(globalData.totalExchanges)} />
				</Col>
				<Col span={12}>
					<Statistic title='Total Market Cap:' value={millify(globalData.totalMarketCap)} />
				</Col>
				<Col span={12}>
					<Statistic title='Total 24h Volume' value={millify(globalData.total24hVolume)} />
				</Col>
				<Col span={12}>
					<Statistic title='Total Markets' value={millify(globalData.totalMarkets)} />
				</Col>
			</Row>
			<div>
				<div className='flex justify-between items-center mt-10'>
					<Title level={2} className='mb-0'>
						Top 10 Cryptocurrencies in the world
					</Title>
					<Title level={5}>
						<Link to='/cryptocurrencies'>Show more...</Link>
					</Title>
				</div>
        <Cryptocurrencies simplified />
				<div className='flex justify-between items-center my-10'>
					<Title level={2} className='mb-0'>
						Latest Crypto News
					</Title>
					<Title level={5}>
						<Link to='/news'>Show more...</Link>
					</Title>
				</div>
        <News simplified />
			</div>
		</div>
	);
};

export default Homepage;
