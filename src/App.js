import React from 'react';
import Total from './components/Total/Total';
import History from './components/History/History';
import Operation from './components/Operation/Operation';

class App extends React.Component {
    
    state = {
        transactions: JSON.parse(localStorage.getItem('calcMoney')) || [],
        description : '',
        amount : '',
        resultIncome : 0,
        resultExpenses : 0,
        totalBalance : 0,
    }

    addTransaction = add => {
        const transactions = [...this.state.transactions];

        transactions.push({
            id : `cmr${(+new Date()).toString(16)}`,
            description : this.state.description,
            amount : +this.state.amount,
            add,
        });

        this.setState({
            transactions,
            description : '',
            amount : ''
        }, this.getTotalBalance);
    }

    addDescription = e => {
        this.setState({ description : e.target.value });
    }

    addAmount = e => {
        this.setState({ amount : e.target.value });
    }

    getIncome = () =>  this.state.transactions
        .reduce((acc, item) => item.add ? item.amount + acc : acc, 0);

    getExpenses = () => this.state.transactions
        .reduce((acc, item) => !item.add ? item.amount + acc : acc, 0);

    getTotalBalance = () => {
        const resultIncome = this.getIncome();
        const resultExpenses = this.getExpenses();

        const totalBalance = resultIncome - resultExpenses;

        this.setState({
            resultIncome,
            resultExpenses,
            totalBalance,
        });
    }

    addStorage = () => {
        localStorage.setItem('calcMoney', JSON.stringify(this.state.transactions));
    }

    deleteTransaction = (id) => {
        const transactions = this.state.transactions.filter(item => item.id !== id);

        this.setState({ transactions }, this.getTotalBalance);
    }

    componentDidUpdate = () => {
        this.addStorage();
    }

    componentWillMount = () => {
        this.getTotalBalance();
    }
    
    render() {
        return (
            <React.Fragment>

                <header>
                    <h1>Кошелек</h1>
                    <h2>Калькулятор расходов</h2>
                </header>

                <main>
                    <div className="container">
                        <Total
                            resultExpenses={this.state.resultExpenses}
                            resultIncome={this.state.resultIncome}
                            totalBalance={this.state.totalBalance}
                        />

                        <History 
                            transactions={this.state.transactions}
                            deleteTransaction={this.deleteTransaction}
                        />

                        <Operation
                            addTransaction={this.addTransaction}
                            addDescription={this.addDescription}
                            addAmount={this.addAmount}
                            description={this.state.description}
                            amount={this.state.amount}
                        />
                    </div>
                </main>

            </React.Fragment>
        );
    }
}

export default App;
