import { useState } from 'react';
import { Typography, Select, Avatar, Row, Col, Card, Spin } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/CryptoApi';

const { Title, Text } = Typography;
const { Option } = Select;

const demoImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';

const News = ({ simplified }) => {
	const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
	const { data: cryptoNews } = useGetCryptoNewsQuery({
		newsCategory,
		count: simplified ? 6 : 12,
	});
	const { data } = useGetCryptosQuery(100);

	if (!cryptoNews?.value)
		return (
			<div className='flex justify-center items-center h-screen'>
				<Spin tip='Loading' size='large' />
			</div>
		);

	console.log(cryptoNews);
	return (
		<div>
			<Row gutter={[24, 24]}>
				{!simplified && (
					<Col span={24} className='mt-5'>
						<Select
							showSearch
							placeholder='select crypto'
							optionFilterProp='children'
							onChange={(value) => setNewsCategory(value)}
							filterOption={(input, option) =>
								option.children.toLowerCase().indexOf(input.toLowerCase())
							}>
							<Option value='Cryptocurrency'>Cryptocurrency</Option>
							{data?.data?.coins.map((coin, index)=>(
								<Option value={coin.name} key={index}></Option>
							))}
						</Select>
					</Col>
				)}
				{cryptoNews?.value.map((news, index) => (
					<Col xs={24} sm={12} lg={8} key={index}>
						<Card hoverable className='h-72 overflow-hidden'>
							<a href={news.url} target='_blank' rel='noreferrer'>
								<div className='flex'>
									<Title level={5}>
										{news.name.length > 60 ? `${news.name.substring(0, 60)}...` : news.name}{' '}
									</Title>
									<img
										src={news?.image?.thumbnail?.contentUrl || demoImage}
										alt=''
										className='w-24'
									/>
								</div>
								<p>
									{news.description.length > 150
										? `${news.description.substring(0, 150)}...`
										: news.description}
								</p>
								<div className='pt-5 flex justify-between items-center'>
									<div>
										<Avatar src={news?.provider[0]?.image?.thumbnail?.contentUrl || demoImage} />
										<Text>{news?.provider[0]?.name}</Text>
									</div>
									<Text>{moment(news?.datePublished).startOf('ss').fromNow()}</Text>
								</div>
							</a>
						</Card>
					</Col>
				))}
			</Row>
		</div>
	);
};

export default News;
