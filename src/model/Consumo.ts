import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

const Consumo = sequelize.define('Consumo', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    num_apt: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bill_date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    consumption_price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    m3_rsd_bsc: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    m3_rsd_bsc_sup: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    counter_value: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
},
    {
        tableName: 'Consumos',
        createdAt: false,
        updatedAt: false
    }
);

export default Consumo;