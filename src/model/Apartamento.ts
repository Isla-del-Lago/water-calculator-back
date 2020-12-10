import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export const Apartamento = sequelize.define('Apartamento', {
    num_apt: {
        type: DataTypes.STRING,
        allowNull: false
    },
    owner_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        tableName: 'Apartamentos'
    }
);