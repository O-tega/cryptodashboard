import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { Navbar } from './components';
import { Homepage, Exchanges, Cryptocurrencies, CryptoDetails, News } from './Pages';

function App() {
	return (
		<div className='flex'>
			<div className='flex bg-[#001529] w-1/5 '>
				<Navbar />
			</div>
			<div className='relative w-full'>
				<Layout>
					<Routes>
						<Route path='/' element={<Homepage />} />
						<Route path='/exchanges' element={<Exchanges />} />
						<Route path='/cryptocurrencies' element={<Cryptocurrencies />} />
						<Route path='/crypto/:coinID' element={<CryptoDetails />} />
						<Route path='/news' element={<News />} />
					</Routes>
				</Layout>
				<div className='bg-[#001529] py-4'>
					<Typography.Title level={5}>
						<p className='text-white text-center'>
							cyrptoverse <br />
							All rights reserved
						</p>
					</Typography.Title>
					<Space className='flex justify-center'>
					<Link className='link' to="/">Home</Link>
					<Link className='link' to="/exchange">Exchange</Link>
					<Link className='link' to="/news">News</Link>
					</Space>

				</div>
			</div>
		</div>
	);
}

export default App;
