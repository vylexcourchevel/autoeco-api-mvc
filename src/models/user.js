
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        adress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isAdmin : {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        created: {
            type: DataTypes.DATE,
            allowNull: false

        }
    })
}