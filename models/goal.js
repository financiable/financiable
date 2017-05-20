module.exports = function (sequelize, DataTypes) {
    var Goal = sequelize.define("Goal", {
        targetGoal: {
            type: DataTypes.INTEGER,
            allowNull: false
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
                    Goal.belongsTo(models.User, {
                        allowNull: false
                    })
                }
            }
        }
    );
    return Goal;
}