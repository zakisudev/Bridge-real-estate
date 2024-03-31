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

/**
 * Represents a Property model.
 */
export default (sequelize: Sequelize) => {
  /**
   * Represents the Property class.
   */
  Property.init(
    {
      /**
       * The unique identifier of the property.
       */
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      /**
       * The title of the property.
       */
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      /**
       * The description of the property.
       */
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      /**
       * The address of the property.
       */
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      /**
       * The number of bathrooms in the property.
       */
      bathrooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      /**
       * The number of bedrooms in the property.
       */
      bedrooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      /**
       * Indicates whether the property is furnished or not.
       */
      furnished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      /**
       * Indicates whether parking is available for the property or not.
       */
      parking: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      /**
       * The size of the property in square feet.
       */
      size: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      /**
       * The discounted price of the property.
       */
      discountedPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      /**
       * The regular price of the property.
       */
      regularPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      /**
       * The type of the property.
       */
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      /**
       * Indicates whether there is an offer available for the property or not.
       */
      offer: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      /**
       * The URLs of the property images.
       */
      imageUrls: {
        type: DataTypes.TEXT,
        allowNull: false,
        /**
         * Getter function to parse the imageUrls from JSON string to an array.
         */
        get() {
          return this.getDataValue("imageUrls")
            ? JSON.parse(this.getDataValue("imageUrls"))
            : [];
        },
        /**
         * Setter function to convert the imageUrls array to a JSON string.
         * @param value - The imageUrls array.
         */
        set(value: any) {
          if (value) {
            this.setDataValue("imageUrls", JSON.stringify(value));
          }
        },
      },
      /**
       * The unique identifier of the user who owns the property.
       */
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
