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
            month: {
                type: DataTypes.STRING,
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE(3),
                allowNull: false,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
            },
            createdAt: {
                type: DataTypes.DATE(3),
                allowNull: false,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
            }
        },
        {
            freezeTableName: true,
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