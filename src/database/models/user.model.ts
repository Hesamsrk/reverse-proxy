import {AllowNull, AutoIncrement, Column, Model, PrimaryKey, Table, Unique,} from "sequelize-typescript";
import {DataTypes} from "sequelize";


@Table({
    timestamps: true,
})
export class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataTypes.BIGINT)
    ID: number;

    @Unique(true)
    @AllowNull(false)
    @Column(DataTypes.STRING)
    Username: string;

    @AllowNull(false)
    @Column(DataTypes.STRING)
    Password: string;

    @AllowNull(false)
    @Column(DataTypes.STRING)
    Email: string;

    @Column(DataTypes.TEXT)
    Token: string;


    @Column(DataTypes.STRING)
    FirstName: string;

    @Column(DataTypes.STRING)
    LastName: string;

}
