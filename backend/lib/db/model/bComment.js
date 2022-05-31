const { DataTypes, Sequelize }= require('sequelize');

const create = async (sequelize) => {
  const bCommentTable = await sequelize.define('bComment', {
      // Model attributes are defined here
      bCommentIdx: {
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
      boardIdx: {
        type: DataTypes.INTEGER,
        onDelete: "cascade",
        references: {
            model: 'board',
            key: 'boardIdx',
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
  bCommentTable.associate = function (models) {
    bCommentTable.belongsTo(models.user, {
      foreignKey: 'userIdx',
      onDelete: 'CASCADE',
    });
    bCommentTable.belongsTo(models.board, {
        foreignKey: 'boardIdx',
        onDelete: 'CASCADE',
      });
  };

  return bCommentTable;
}
module.exports = create;