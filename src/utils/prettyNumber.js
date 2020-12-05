import numbro from 'numbro';

const prettyNumber = {
	getPrettyNumber(number) {
		return numbro(number).format({
			thousandSeparated: true,
			mantissa: 2,
		});
	},
};

export default prettyNumber;
