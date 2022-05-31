const { DataTypes, Sequelize }= require('sequelize');

const create = async (sequelize) => {
  const shCommentTable = await sequelize.define('shComment', {
      // Model attributes are defined here
      shCommentIdx: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userIdx: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'userIdx',
          },
      },
      secondhandIdx: {
        type: DataTypes.INTEGER,
        onDelete: "cascade",
        references: {
            model: 'secondhand',
            key: 'secondhandIdx',
          },
      },
      comment: {
        type: DataTypes.STRING
      },
      created: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
      },

    }, {
      // Other model options go here
      timestamps: false,
      freezeTableName: true
    }
  );
  shCommentTable.associate = function (models) {
    shCommentTable.belongsTo(models.user, {
      foreignKey: 'userIdx',
      onDelete: 'CASCADE',
    });
    shCommentTable.belongsTo(models.secondhand, {
        foreignKey: 'secondhandIdx',
        onDelete: 'CASCADE',
      });
  };

  return shCommentTable;
}
module.exports = create;