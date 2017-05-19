/**
 * Created by esteb on 5/18/2017.
 */
module.exports = function (sequelize, DataTypes) {
    var Budget = sequelize.define("Budget", {
        salary: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        savings: {
            type: DataTypes.INTEGER,
        },
        month: {
            type: DataTypes.DATE(3)
        }
    }, {
        classMethods: {
            associate: function (models) {
                Budget.belongsTo(models.User, {
                    allowNull: false
                })
            }
        }
        }

    )
    return Budget
}