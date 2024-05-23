

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Voiture', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    model: {
      type: DataTypes.INTEGER,
      allowNull: false,
      
    },
    fuelType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        
      },
    kilometre: {
      type: DataTypes.STRING,
      allowNull: false,
     
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,  
    },
  
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  
  });
}