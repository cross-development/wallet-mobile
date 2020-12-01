//Core
import axios from 'axios';

const proxyurl = 'https://cors-anywhere.herokuapp.com/';

const URL = 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11';

const getLatestCurrency = async () => {
	try {
		const { data } = await axios.get(`${proxyurl + URL}`);

		return await data;
	} catch (error) {
		throw Error(error);
	}
};

export { getLatestCurrency };
