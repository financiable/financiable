module.exports = function (sequelize, Datatypes) {
    var Expenses  = sequelize.define("Expenses", {
        month: {
            type: Datatypes.DATE(3),
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)')
        },
        groceries: {
            type: Datatypes.INTEGER,
            allowNull: false,
            defaultValue: "0"
        },
        gas: {
            type: Datatypes.INTEGER,
            allowNull: false,
            defaultValue: "0"
        },
        mortgage: {
            type: Datatypes.INTEGER,
            allowNull: false,
            defaultValue: "0"
        },
        utilities: {
            type: Datatypes.INTEGER,
            allowNull: false,
            defaultValue: "0"
        },
        miscellaneous: {
            type: Datatypes.INTEGER,
            allowNull: false,
            defaultValue: "0"
        }
    },
        {
            classMethods: {
                associate: function (models) {
                    Expenses.belongsTo(models.User, {
                        allowNull: false
                    })
                }
            }
        }
    )
    return Expenses
}