module.exports = function (sequelize, DataTypes) {
    var Goal = sequelize.define("Goal", {
        targetGoal: {
            type: DataTypes.INTEGER,
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
                    Goal.belongsTo(models.User, {
                        allowNull: false
                    })
                }
            }
        }
    );
    return Goal;
}