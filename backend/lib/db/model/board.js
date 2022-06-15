const { DataTypes, Sequelize }= require('sequelize');

const create = async (sequelize) => {
  const boardTable = await sequelize.define('board', {
      boardIdx: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userIdx: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
            model: 'user',
            key: 'userIdx',
          },
      },
      subject: {
        type: DataTypes.STRING
      },
      content: {
        type: DataTypes.STRING
      },
      created: { 
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      type: {
        type: DataTypes.INTEGER
      },

    }, {
      // Other model options go here
      timestamps: false,
      freezeTableName: true
    }
  );
  boardTable.associate = function (models) {
    boardTable.belongsTo(models.user, {
      foreignKey: 'userIdx',
      onDelete: 'CASCADE',
    },
    );
  };

  return boardTable;
}
module.exports = create;