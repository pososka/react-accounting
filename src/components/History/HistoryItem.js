import React from 'react';

const HistoryItem = ({ transaction, deleteTransaction }) => {
	return (
		<li className={`history__item history__item-${transaction.add ? 'plus' : 'minus'}`}>
			{transaction.description}
			<span className="history__money">{transaction.add ? '+' : '-'}{transaction.amount} ₽</span>
			<button className="history__delete" onClick={() => {deleteTransaction(transaction.id)}}>x</button>
		</li>
	);
}

export default HistoryItem;

// <li className="history__item history__item-minus">Получил зарплату
// 	<span className="history__money">+30000 ₽</span>
// 	<button className="history__delete">x</button>
// </li>
