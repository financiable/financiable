module.exports = function(sequelize, DataTypes) {
    var Budget = sequelize.define("Budget", {
            earnings: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    len: [1]
                }
            },
            savings: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            month: {
                type: DataTypes.STRING,
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
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                    Budget.belongsTo(models.User, {
                        allowNull: false
                    })
                }
            }

        }
    );
    return Budget;
};