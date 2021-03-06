module.exports = function(sequelize, DataTypes) {
    var Budget = sequelize.define("Budget", {
            earnings: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    len: [1]
                }
            },
            totalExpenses: {
                type:DataTypes.INTEGER,
                defaultValue: "0"
            },
            month: {
                type: DataTypes.STRING,
                defaultValue: "0"
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
            getterMethods: {
            savings: function () {
                return this.getDataValue('earnings')
                    - this.getDataValue('totalExpenses')
            }
        },
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