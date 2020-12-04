//Core
import axios from 'axios';

const URL = 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11';

const getLatestCurrency = async () => {
	try {
		const { data } = await axios.get(`${URL}`);

		return await data;
	} catch (error) {
		throw Error(error);
	}
};

export { getLatestCurrency };
