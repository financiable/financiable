module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING,
            validate: {
                len: [1]
            }
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
                    User.hasMany(models.Expenses, {
                        onDelete: "cascade"
                    }
                    )
                },
                associate: function (models) {
                    User.hasMany(models.Budget, {
                        onDelete: "cascade"
                    })
                },
                associate: function (models) {
                    User.hasMany(models.Goal, {
                        onDelete: "cascade"
                    })
                }
            }

        }
    );
    return User;
}