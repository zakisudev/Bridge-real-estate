import { Model, DataTypes, Sequelize } from "sequelize";

export class Property extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public address!: string;
  public bathrooms!: number;
  public bedrooms!: number;
  public furnished!: boolean;
  public parking!: boolean;
  public size!: number;
  public discountedPrice!: number;
  public regularPrice!: number;
  public type!: string;
  public offer!: string;
  public imageUrls!: any[];
  public user_id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  Property.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bathrooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bedrooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      furnished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      parking: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      discountedPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      regularPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      offer: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      imageUrls: {
        type: DataTypes.TEXT,
        allowNull: false,
        get() {
          return this.getDataValue("imageUrls")
            ? JSON.parse(this.getDataValue("imageUrls"))
            : [];
        },
        set(value: any) {
          if (value) {
            this.setDataValue("imageUrls", JSON.stringify(value));
          }
        },
      },
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "properties",
      modelName: "property",
    }
  );
};
