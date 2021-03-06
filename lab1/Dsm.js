const StateMachine = require('../StateMachine');
class Dsm extends StateMachine {
    /**
     * конструктор
     * @param {Array} alphabet - алфавит
     * @param {number} initStateId - идентификатор начального состояния 
     * @param {number} endStateId - идентификатор конечного состояния
     * @param {Array} states - состояния 
     */
    constructor(alphabet = [], initStateId = 0, endStateId = 0, states = []) {
        super(alphabet, initStateId, endStateId, states);
        this.currentStateId = initStateId;
    };
    /**
     * Установить начальное состояние
     * @param {number} initStateId - идентификатор начального состояния
     */
    setInitStateId(initStateId = 0) {
        super.setInitStateId(initStateId);
        this.currentStateId = initStateId;
    };
    /**
     * Запустить автомат
     * @param {string} str - строка
     * @returns {boolean|string}
     */
    run(str = '') {
        this.currentStateId = this.initStateId;
        const isCorrectString = this.checkString(str);
        if (isCorrectString) {
            const strArr = str.split('');
            strArr.forEach((ch) => {
                let state = this.states.find(state => state.stateId === this.currentStateId) || {};
                let {rule = function () {}} = state;
                this.currentStateId = rule(ch);
            });
            return this.currentStateId === this.endStateId ? true : false;
        }
        else {
            return 'invalid string';
        }
    };
};

module.exports = Dsm;