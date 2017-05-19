/**
 * Created by esteb on 5/18/2017.
 */
module.exports = function (sequelize, DataTypes) {
    var Goal = sequelize.define("Goal", {
        createdAT: {
            type: DataTypes.DATE(3),
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)')
        },
        goal: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
        {
            classMethods: {
                associate: function (models) {
                    Goal.belongsTo(models.User, {
                        allowNull: false
                    })
                }
            }
        }
    )
    return Goal
}