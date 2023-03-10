module.exports = (sequelize, DataTypes) => {
  // <>= parameter ke 1, ^^= parameter ke 2, ##= parameter ke 3,
  // const RefreshToken = sequelize.define(nama <>Model nya("RefreshToken",),^^data/field nya(id,token,user_id dll), ## { tableName: "refresh_token", timestamps: true })
  const RefreshToken = sequelize.define(
    "RefreshToken",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
        allowNull: false,
      },
    },
    // nama tabel di DB
    { tableName: "refresh_token", timestamps: true }
  );
  return RefreshToken;
};
