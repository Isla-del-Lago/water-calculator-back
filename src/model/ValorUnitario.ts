import { INTEGER } from 'sequelize';
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

const ValorUnitario = sequelize.define('ValorUnitario', {
    bill_date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    m3_rsd_bsc: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    m3_rsd_bsc_sup: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    disscounts: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    acue_fijo_resd: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    acue_rsd_bsc: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    acue_rsd_bsc_sup: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    alc_fijo_resd: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    alc_rsd_bsc: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    alc_rsd_bsc_sup: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    aseo_total: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
    {
        tableName: 'ValoresUnitarios'
    }
);

export default ValorUnitario;