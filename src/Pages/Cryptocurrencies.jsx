import { useState, useEffect } from 'react';
import millify from 'millify';
import { Card, Row, Col, Input, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/CryptoApi';

const Cryptocurrencies = ({ simplified }) => {
	const count = simplified ? 10 : 100;
	const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
	const [cryptos, setCryptos] = useState(cryptoList?.data?.coins);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		const filteredData = cryptoList?.data?.coins.filter((coin) =>
			coin.name.toLowerCase().includes(searchTerm.toLowerCase())
		);

		setCryptos(filteredData);
	}, [searchTerm, cryptoList]);

	if (isFetching)
		return (
			<div className='flex justify-center items-center h-screen'>
				<Spin tip='Loading' size='large' />
			</div>
		);

	console.log(cryptos);

	return (
		<div>
		{
			!simplified && <div className='my-5 flex justify-center'>
				<Input className='w-1/2'
					placeholder='search cryptocurrency'
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>
		}
			
			<Row gutter={[32, 32]}>
				{cryptos?.map((currency) => (
					<Col xs={24} sm={12} lg={6} key={currency.uuid}>
						<Link to={`/currency/${currency.uuid}`}>
							<Card
								title={`${currency.rank}. ${currency.name}`}
								extra={<img className='w-[20px]' src={currency.iconUrl} />}
								hoverable>
								<p className='info'>price: {millify(currency.price)}</p>
								<p className='info'>Market Cap: {millify(currency.marketCap)}</p>
								<p className='info'>Daily Change: {millify(currency.change)}%</p>
							</Card>
						</Link>
					</Col>
				))}
			</Row>
		</div>
	);
};

export default Cryptocurrencies;
