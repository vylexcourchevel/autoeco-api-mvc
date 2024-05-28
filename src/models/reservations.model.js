
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Reservation', {
   
  
    status: {
      type: DataTypes.ENUM('en cours', 'termine'),
      allowNull: false

    },
    created: {
      type: DataTypes.DATE,
      allowNull: false
    }
  })
} 
  
