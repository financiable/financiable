module.exports = function(sequelize, DataTypes) {
    var Expense = sequelize.define("Expense", {
            groceries: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            gas: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            mortgage: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            utilities: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            miscellaneous: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            updatedAt: {
                type: DataTypes.DATE(3),
                allowNull: false,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)')
            },
            createdAt: {
                type: DataTypes.DATE(3),
                allowNull: false,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)')
            }
        },
        {
            classMethods: {
                associate: function (models) {
                    Expense.belongsTo(models.User, {
                        allowNull: false
                    })
                }
            }
        }
    );
    return Expense;
};