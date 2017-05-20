module.exports = function(sequelize, DataTypes) {
    var Expenses = sequelize.define("Expenses", {
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
            // We're saying that we want our Author to have Posts
            classMethods: {
                associate: function(models) {
                    // An Author (foreignKey) is required or a Post can't be made
                    Expenses.belongsTo(models.User, {//                foreignKey: {
                        allowNull: false//                }
                    });
                }
            }
        }
    );
    return Expenses;
};