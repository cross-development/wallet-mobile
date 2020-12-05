//Core
import moment from 'moment';

const prettyDate = {
	formatDate(date, format = '') {
		return moment(date).format(format);
	},

	getMonthName(date) {
		// const month = new Date(date).toLocaleDateString('ru-RU', {
		// 	month: 'long',
		// });

		return moment(date).format('MMMM');

		// return month[0].toUpperCase() + month.slice(1);
	},

	getMonthNumber(date = Date.now()) {
		return moment(date).month() + 1;
	},

	getYearNumber(date = Date.now()) {
		return new Date(date).getFullYear();
	},

	getUniqueYearsNumber(transactions) {
		const years = transactions.map(({ transactionDate }) => this.getYearNumber(transactionDate));

		return [...new Set(years)].sort((a, b) => a - b);
	},

	getUniqueTransactions(transactions, statYearPeriod) {
		let uniqueTransactionsItem = [];

		const itemCheck = item => {
			const monthName = this.getMonthName(item.transactionDate);

			if (uniqueTransactionsItem.indexOf(monthName) === -1) {
				uniqueTransactionsItem.push(monthName);
				return true;
			}
			return false;
		};

		const filterByTransactionMonth = item => {
			const year = this.getYearNumber(item.transactionDate);

			if (year === parseInt(statYearPeriod)) return item;
		};

		const sortMonthByTransactionDate = (a, b) =>
			this.getMonthNumber(a.transactionDate) - this.getMonthNumber(b.transactionDate);

		return transactions
			.map(({ id, type, transactionDate }) => ({
				id,
				type,
				transactionDate,
			}))
			.filter(itemCheck)
			.filter(filterByTransactionMonth)
			.sort(sortMonthByTransactionDate);
	},
};

export default prettyDate;
