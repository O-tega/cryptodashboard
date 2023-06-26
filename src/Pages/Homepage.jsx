import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/CryptoApi';

const { Title } = Typography;

const Homepage = () => {
	const { data, isFetching } = useGetCryptosQuery();
  const globalData = data?.data?.stats


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
					<Statistic title='Total Cryptocurrencies' value={millify(globalData.totalCoins)} />
				</Col>
				<Col span={12}>
					<Statistic title='Total Markets' value={millify(globalData.totalMarkets)} />
				</Col>
			</Row>
		</div>
	);
};

export default Homepage;
