'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bComment', { 
      bCommentIdx: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userIdx: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
            model: 'user',
            key: 'userIdx',
          },
      },
      boardIdx: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
            model: 'board',
            key: 'boardIdx',
          },
      },
      comment: {
        type: Sequelize.STRING
      },
      created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
   });
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('bComment');
  }
};
