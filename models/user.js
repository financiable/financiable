/**
 * Created by esteb on 5/18/2017.
 */
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
                len: [1]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [10],
                msg: "Password must be at least ten characters long"
            }
        },
        createdAt: {
            type: DataTypes.DATE(3),
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)')
        },
    },
        {
            classMethods: {
                associate: function (models) {
                    User.hasMany(models.Expenses, {
                        onDelete: "cascade"
                    })
                }
            }

        }
    );
    return User;
}

