'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('secondhand', {
      secondhandIdx: {
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
      subject: {
        type: Sequelize.STRING(255)
      },
      content: {
        type: Sequelize.STRING(10485760)
      },
      created: { 
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      type: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('secondhand');
  }
};
