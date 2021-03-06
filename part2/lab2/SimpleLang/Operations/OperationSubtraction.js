const TypeNumber = require('../Types/TypeNumber');
const OperationBase = require('./OperationBase');
/**
 * Класс для операции вычитания
 * @extends OperationBase
 */
class OperationSubtraction extends OperationBase {
    /**
     * Конструктор
     * @param {Object} left - левый оператор
     * @param {Object} right - правый оператор
     */
    constructor(left = {}, right = {}) {
        super(left, right);
    };
    /**
     * Получить строковое представление значения
     * @returns {String}
     */
    getStr() {
        return super.getStr('-');
    };
    /**
     * Свертка
     * @param {Object} environment - окружение
     * @returns {Object}
     */
    reduce(environment = {}) {
        const {reducibleLeft = false, reducibleRight = false, valueLeft = 0, valueRight = 0} = super.reduce();
        if (reducibleLeft)
            return new OperationSubtraction(this.left.reduce(environment), this.right);
        else if (reducibleRight)
            return new OperationSubtraction(this.left, this.right.reduce(environment));
        else
            return new TypeNumber(parseInt(valueLeft) - parseInt(valueRight));
    };
};
module.exports = OperationSubtraction;